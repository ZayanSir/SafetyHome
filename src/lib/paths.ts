import { CATEGORIES } from '../data/categories';
import { getProducts, slugOf } from './products';
export const catPaths = () => CATEGORIES.map((c) => ({ params: { cat: c.slug } }));
export async function productPaths() {
  const all = await getProducts();
  return all.map((p) => ({ params: { cat: p.data.category, slug: slugOf(p) }, props: { p } }));
}
