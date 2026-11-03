/** WPC color codes → swatch file and a human name. Add a code here and a /public/swatches/<code>.webp to use it. */
export const COLORS: Record<string, { ar: string; en: string }> = {
  C182: { ar: 'ماهوجني', en: 'Mahogany' },
  C102: { ar: 'جوز غامق', en: 'Dark walnut' },
  C205: { ar: 'بلوط عسلي', en: 'Honey oak' },
  C132: { ar: 'جوز فاتح', en: 'Light walnut' },
  C173: { ar: 'بلوط رمادي', en: 'Grey oak' },
  C160: { ar: 'بيج', en: 'Beige' },
  C198: { ar: 'كريمي', en: 'Cream' },
  C115: { ar: 'رمادي فاتح', en: 'Light grey' },
  C091: { ar: 'رمادي غامق', en: 'Dark grey' },
  C021: { ar: 'موكا', en: 'Mocha' },
  C8001: { ar: 'أبيض', en: 'White' },
  C155: { ar: 'سيلفر', en: 'Silver' },
};

export const colorName = (code: string, lang: 'ar' | 'en') => COLORS[code]?.[lang] ?? code;
