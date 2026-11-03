import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const num = z.number().nullable().optional();

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional().default(''),
    category: z.enum(['armored', 'wpc', 'room', 'wood', 'pvc']),
    model: z.string(),
    line: z.string().optional().default(''),
    lineEn: z.string().optional().default(''),
    variants: z
      .array(z.object({ color: z.string().optional().default(''), image: z.string() }))
      .min(1),
    sizes: z
      .array(z.object({ width: z.number(), height: z.number(), price: num, oldPrice: num }))
      .optional()
      .default([]),
    price: num,
    oldPrice: num,
    customSizes: z.boolean().optional().default(true),
    featured: z.boolean().optional().default(false),
    hidden: z.boolean().optional().default(false),
    order: z.number().optional().default(100),
    note: z.string().optional().default(''),
    noteEn: z.string().optional().default(''),
  }),
});

export const collections = { products };
