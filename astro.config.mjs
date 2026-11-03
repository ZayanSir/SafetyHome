import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import site from './src/data/site.json' with { type: 'json' };

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ i18n: { defaultLocale: 'ar', locales: { ar: 'ar-EG', en: 'en' } } })],
});
