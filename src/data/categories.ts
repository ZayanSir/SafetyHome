export type Lang = 'ar' | 'en';

export interface Category {
  slug: string;
  ar: string;
  en: string;
  shortAr: string;
  shortEn: string;
  introAr: string;
  introEn: string;
  /** Spec rows shown on every product page of this category */
  specsAr: [string, string][];
  specsEn: [string, string][];
  /** Feature chips (no numbers) */
  featuresAr: string[];
  featuresEn: string[];
  makerAr?: string;
  makerEn?: string;
  cover: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'armored',
    ar: 'أبواب مصفحة تركي',
    en: 'Turkish armored doors',
    shortAr: 'مصفح تركي',
    shortEn: 'Armored',
    introAr: 'أبواب مصفحة تركي أصلي لمدخل الشقة والفيلا، من المستورد مباشرة. اختار الموديل وابعتلنا الكود على واتساب.',
    introEn: 'Original Turkish armored entrance doors for apartments and villas, straight from the importer. Pick a model and send us the code on WhatsApp.',
    specsAr: [['المنشأ', 'تركي'], ['الاستخدام', 'مدخل شقة / فيلا'], ['المقاس', 'حسب فتحة الباب — بنقيس عندك']],
    specsEn: [['Origin', 'Turkey'], ['Use', 'Apartment / villa entrance'], ['Size', 'To fit your opening — we measure on site']],
    featuresAr: ['تركي أصلي', 'من المستورد مباشرة', 'تشكيلة ألوان وتصميمات', 'تركيب'],
    featuresEn: ['Original Turkish', 'Direct from importer', 'Wide range of finishes', 'Installation'],
    cover: '/products/armored-306/main-sm.webp',
  },
  {
    slug: 'wpc',
    ar: 'أبواب WPC',
    en: 'WPC doors',
    shortAr: 'WPC',
    shortEn: 'WPC',
    introAr: 'أبواب WPC الضلفة فيها قطعة واحدة من غير حشوات. مش بتتأثر بالمية ولا بتحتاج دهان، ومتاحة بـ 11 لون و4 مقاسات.',
    introEn: 'One-piece WPC door leaves with no infill. Water-resistant, never needs painting, available in 11 colors and 4 sizes.',
    specsAr: [
      ['الخامة', 'WPC بطبقة لون UPVC'],
      ['الضلفة', 'قطعة واحدة بدون حشوات — سمك 4.5 سم'],
      ['المقاسات', 'عرض 80 / 90 / 100 / 110 سم × ارتفاع 215 سم'],
      ['الحلق', 'من 12.5 لحد 30 سم'],
      ['الاستخدام', 'داخلي — سكني وتجاري'],
    ],
    specsEn: [
      ['Material', 'WPC with UPVC color layer'],
      ['Leaf', 'One piece, no infill — 4.5 cm thick'],
      ['Sizes', 'Width 80 / 90 / 100 / 110 cm × height 215 cm'],
      ['Frame', '12.5 to 30 cm'],
      ['Use', 'Interior — residential & commercial'],
    ],
    featuresAr: ['مش بيتأثر بالمية', 'مش بيساعد على الاشتعال', 'كاتم للصوت', 'مانع للحشرات', 'مش محتاج دهان', 'اكسسوارات تركي'],
    featuresEn: ['Water-resistant', 'Flame-retardant', 'Sound-dampening', 'Insect-proof', 'No painting needed', 'Turkish hardware'],
    makerAr: 'إنتاج المصرية الألمانية لصناعة منتجات WPC & PVC',
    makerEn: 'Made by Egyptian German Co. for WPC & PVC products',
    cover: '/products/wpc-d114/C182-sm.webp',
  },
  {
    slug: 'room',
    ar: 'أبواب غرف جاهزة',
    en: 'Ready room doors',
    shortAr: 'أبواب غرف',
    shortEn: 'Room doors',
    introAr: 'أبواب غرف جاهزة بمقاسات قياسية، تخلّص بيها تشطيب الشقة في وقت أقل.',
    introEn: 'Ready-made room doors in standard sizes to finish your apartment faster.',
    specsAr: [], specsEn: [], featuresAr: [], featuresEn: [],
    cover: '',
  },
  {
    slug: 'wood',
    ar: 'أبواب خشب',
    en: 'Wooden doors',
    shortAr: 'خشب',
    shortEn: 'Wood',
    introAr: 'أبواب خشب بتشطيبات مختلفة للشقق والفيلات.',
    introEn: 'Wooden doors in a range of finishes for apartments and villas.',
    specsAr: [], specsEn: [], featuresAr: [], featuresEn: [],
    cover: '',
  },
  {
    slug: 'pvc',
    ar: 'شبابيك PVC',
    en: 'PVC windows',
    shortAr: 'شبابيك PVC',
    shortEn: 'PVC windows',
    introAr: 'شبابيك PVC عازلة للحرارة والصوت، بمقاسات حسب الطلب.',
    introEn: 'Heat- and sound-insulating PVC windows, made to measure.',
    specsAr: [], specsEn: [], featuresAr: [], featuresEn: [],
    cover: '',
  },
];

export const catBySlug = (s: string) => CATEGORIES.find((c) => c.slug === s)!;
