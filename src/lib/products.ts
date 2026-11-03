import { getCollection, type CollectionEntry } from 'astro:content';

export type Product = CollectionEntry<'products'>;

export async function getProducts(category?: string) {
  const all = await getCollection('products', (p) => !p.data.hidden && (!category || p.data.category === category));
  return all.sort((a, b) => a.data.order - b.data.order || a.data.model.localeCompare(b.data.model));
}

export const slugOf = (p: Product) => p.id.replace(/\.json$/, '');

/** Lowest known price (from sizes, else the single price) */
export function priceOf(p: Product): { price: number | null; old: number | null } {
  const ps = (p.data.sizes ?? []).filter((s) => s.price);
  if (ps.length) {
    const min = ps.reduce((a, b) => (b.price! < a.price! ? b : a));
    return { price: min.price!, old: min.oldPrice ?? null };
  }
  return { price: p.data.price ?? null, old: p.data.oldPrice ?? null };
}

export const smallImg = (src: string) => src.replace(/\.webp$/, '-sm.webp');
/** 3D / lifestyle shots fill the frame instead of floating on the backdrop */
export const isScene = (p: Product) => p.data.category === 'wpc' && /^D8\d$/.test(p.data.model);
/** Catalog photos (showroom scenes, floor boards) shown edge to edge */
export const isPhoto = (p: Product) => ['armored', 'spc', 'floors'].includes(p.data.category);
export const swatchOf = (v: { color?: string; swatch?: string }) => v.swatch || (v.color ? `/swatches/${v.color}.webp` : '');
