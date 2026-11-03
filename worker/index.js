// Safety Home — Worker in front of the static site.
// Serves the built site from ASSETS, and a small admin API under /admin/api/*
// that reads and commits content to GitHub.
//
// Secrets (Cloudflare → Workers & Pages → safetyhome → Settings → Variables and Secrets):
//   ADMIN_PASSWORD  the dashboard password
//   GITHUB_TOKEN    fine-grained token, repo ZayanSir/SafetyHome, Contents: Read and write
// Vars (wrangler.jsonc): GITHUB_REPO, GITHUB_BRANCH

const PRODUCTS_DIR = 'src/content/products';
const SITE_FILE = 'src/data/site.json';
const COOKIE = 'sh_admin';
const SESSION_DAYS = 30;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/admin/api/')) {
      try {
        return await api(request, env, url);
      } catch (e) {
        return json({ error: e.message || String(e) }, e.status || 500);
      }
    }
    return env.ASSETS.fetch(request);
  },
};

async function api(request, env, url) {
  const route = url.pathname.replace('/admin/api/', '');
  if (route === 'login' && request.method === 'POST') return login(request, env);
  if (route === 'logout') return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=; Path=/admin; Max-Age=0; HttpOnly; Secure; SameSite=Strict` });
  if (!(await authed(request, env))) return json({ error: 'unauthorized' }, 401);
  if (!env.GITHUB_TOKEN) throw err('GITHUB_TOKEN مش متضاف في إعدادات Cloudflare', 500);

  if (route === 'state' && request.method === 'GET') return json(await readState(env));
  if (route === 'file' && request.method === 'GET') return rawFile(env, url.searchParams.get('path') || '');
  if (route === 'commit' && request.method === 'POST') {
    if (request.headers.get('X-Requested-With') !== 'sh-admin') throw err('bad request', 400);
    return json(await commit(env, await request.json()));
  }
  return json({ error: 'not found' }, 404);
}

/* ---------------- auth ---------------- */
async function login(request, env) {
  if (!env.ADMIN_PASSWORD) throw err('ADMIN_PASSWORD مش متضاف في إعدادات Cloudflare', 500);
  const { password } = await request.json().catch(() => ({}));
  if (!password || !(await safeEqual(password, env.ADMIN_PASSWORD))) {
    await new Promise((r) => setTimeout(r, 600));
    return json({ error: 'الباسورد غلط' }, 401);
  }
  const exp = Date.now() + SESSION_DAYS * 864e5;
  const token = `${exp}.${await sign(String(exp), env)}`;
  return json({ ok: true }, 200, {
    'Set-Cookie': `${COOKIE}=${token}; Path=/admin; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Strict`,
  });
}
async function authed(request, env) {
  const c = (request.headers.get('Cookie') || '').split(/;\s*/).find((x) => x.startsWith(COOKIE + '='));
  if (!c || !env.ADMIN_PASSWORD) return false;
  const [exp, sig] = c.slice(COOKIE.length + 1).split('.');
  if (!exp || !sig || +exp < Date.now()) return false;
  return safeEqual(sig, await sign(exp, env));
}
async function sign(msg, env) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode('sh:' + env.ADMIN_PASSWORD + ':' + (env.GITHUB_TOKEN || '').slice(-8)), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const s = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
  return [...new Uint8Array(s)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
async function safeEqual(a, b) {
  const [x, y] = await Promise.all([a, b].map((v) => crypto.subtle.digest('SHA-256', new TextEncoder().encode(v))));
  const A = new Uint8Array(x), B = new Uint8Array(y);
  let d = 0; for (let i = 0; i < A.length; i++) d |= A[i] ^ B[i];
  return d === 0;
}

/* ---------------- GitHub ---------------- */
const repoParts = (env) => (env.GITHUB_REPO || 'ZayanSir/SafetyHome').split('/');
const branch = (env) => env.GITHUB_BRANCH || 'main';

async function gql(env, query, variables) {
  const r = await fetch((env.GITHUB_API || 'https://api.github.com') + '/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'safetyhome-admin' },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.errors) throw err('GitHub: ' + (j.errors?.map((e) => e.message).join(' / ') || j.message || r.status), 502);
  return j.data;
}

async function readState(env) {
  const [owner, name] = repoParts(env);
  const b = branch(env);
  const data = await gql(env, `query($owner:String!,$name:String!,$ref:String!,$dir:String!,$site:String!){
    repository(owner:$owner,name:$name){
      ref(qualifiedName:$ref){ target{ oid } }
      products: object(expression:$dir){ ... on Tree { entries { name object { ... on Blob { text } } } } }
      site: object(expression:$site){ ... on Blob { text } }
    }
  }`, { owner, name, ref: `refs/heads/${b}`, dir: `${b}:${PRODUCTS_DIR}`, site: `${b}:${SITE_FILE}` });
  const repo = data.repository;
  const products = (repo.products?.entries || [])
    .filter((e) => e.name.endsWith('.json') && e.object?.text)
    .map((e) => { try { return { slug: e.name.replace(/\.json$/, ''), ...JSON.parse(e.object.text) }; } catch { return null; } })
    .filter(Boolean);
  return { head: repo.ref.target.oid, products, site: JSON.parse(repo.site?.text || '{}') };
}

async function rawFile(env, path) {
  if (!/^public\/[\w./-]+\.(webp|jpe?g|png)$/i.test(path) || path.includes('..')) throw err('bad path', 400);
  const [owner, name] = repoParts(env);
  const r = await fetch(`${env.GITHUB_API || 'https://api.github.com'}/repos/${owner}/${name}/contents/${path}?ref=${branch(env)}`, {
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github.raw', 'User-Agent': 'safetyhome-admin' },
  });
  if (!r.ok) return new Response('not found', { status: 404 });
  const ext = path.split('.').pop().toLowerCase();
  return new Response(r.body, { headers: { 'Content-Type': ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg', 'Cache-Control': 'private, max-age=300' } });
}

/**
 * body = {
 *   head: expected branch head oid,
 *   message: string,
 *   products: [{ slug, data }]   // full JSON to write
 *   deleteProducts: [slug]       // removes the JSON and its image folder
 *   files: [{ path, base64 }]    // new images under public/products/
 *   deleteFiles: [path]
 *   site: {...}                  // full site.json
 * }
 */
async function commit(env, body) {
  const additions = [];
  const deletions = [];
  const enc = (s) => b64(new TextEncoder().encode(s));
  for (const p of body.products || []) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(p.slug)) throw err('اسم المنتج فيه حروف مش مسموحة: ' + p.slug, 400);
    const data = { ...p.data }; delete data.slug;
    additions.push({ path: `${PRODUCTS_DIR}/${p.slug}.json`, contents: enc(JSON.stringify(data, null, 2) + '\n') });
  }
  for (const f of body.files || []) {
    if (!/^public\/products\/[a-z0-9-]+\/[\w-]+\.(webp|jpe?g|png)$/i.test(f.path)) throw err('مسار صورة غلط', 400);
    additions.push({ path: f.path, contents: f.base64 });
  }
  if (body.site) additions.push({ path: SITE_FILE, contents: enc(JSON.stringify(body.site, null, 2) + '\n') });
  for (const p of body.deleteFiles || []) {
    if (!/^public\/products\/[a-z0-9-]+\/[\w-]+\.(webp|jpe?g|png)$/i.test(p)) throw err('مسار صورة غلط', 400);
    deletions.push({ path: p });
  }
  if ((body.deleteProducts || []).length) {
    const [owner, name] = repoParts(env);
    for (const slug of body.deleteProducts) {
      if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) continue;
      deletions.push({ path: `${PRODUCTS_DIR}/${slug}.json` });
      const d = await gql(env, `query($owner:String!,$name:String!,$e:String!){ repository(owner:$owner,name:$name){ object(expression:$e){ ... on Tree { entries { path type } } } } }`,
        { owner, name, e: `${branch(env)}:public/products/${slug}` });
      for (const e of d.repository.object?.entries || []) if (e.type === 'blob') deletions.push({ path: e.path });
    }
  }
  if (!additions.length && !deletions.length) return { ok: true, nothing: true };

  const [owner, name] = repoParts(env);
  const data = await gql(env, `mutation($input:CreateCommitOnBranchInput!){ createCommitOnBranch(input:$input){ commit{ oid } } }`, {
    input: {
      branch: { repositoryNameWithOwner: `${owner}/${name}`, branchName: branch(env) },
      message: { headline: (body.message || 'Update from dashboard').slice(0, 120) + ' (via dashboard)' },
      expectedHeadOid: body.head,
      fileChanges: { additions, deletions },
    },
  });
  return { ok: true, head: data.createCommitOnBranch.commit.oid };
}

/* ---------------- utils ---------------- */
function b64(bytes) {
  let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
function err(message, status = 500) { const e = new Error(message); e.status = status; return e; }
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers } });
}
