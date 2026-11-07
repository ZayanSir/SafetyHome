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
    introAr: 'أبواب مصفحة تصفيح تركي بالكامل لمدخل الشقة والفيلا، من المستورد مباشرة. اختار الموديل وابعتلنا الكود على واتساب.',
    introEn: 'Fully Turkish-armored entrance doors for apartments and villas, straight from the importer. Pick a model and send us the code on WhatsApp.',
    specsAr: [['التصفيح', 'تصفيح تركي بالكامل'], ['المنشأ', 'تركيا'], ['الاستخدام', 'مدخل شقة / فيلا'], ['المقاس', 'حسب فتحة الباب — بنقيس عندك']],
    specsEn: [['Armoring', 'Fully Turkish armored'], ['Origin', 'Turkey'], ['Use', 'Apartment / villa entrance'], ['Size', 'To fit your opening — we measure on site']],
    featuresAr: ['تركي أصلي', 'من المستورد مباشرة', 'تشكيلة ألوان وتصميمات', 'تركيب'],
    featuresEn: ['Original Turkish', 'Direct from importer', 'Wide range of finishes', 'Installation'],
    cover: '/products/armored-3/main-sm.webp',
  },
  {
    slug: 'room',
    ar: 'أبواب غرف تركي',
    en: 'Turkish room doors',
    shortAr: 'أبواب غرف',
    shortEn: 'Room doors',
    introAr: 'أبواب غرف جاهزة صناعة تركي، بألوان وتصميمات تمشي مع أي تشطيب. تخلّص بيها الشقة في وقت أقل.',
    introEn: 'Ready-made Turkish room doors in finishes that suit any interior — finish your apartment faster.',
    specsAr: [['المنشأ', 'صناعة تركي'], ['الاستخدام', 'غرف النوم والمعيشة والحمامات'], ['المقاس', 'حسب فتحة الباب — بنقيس عندك']],
    specsEn: [['Origin', 'Made in Turkey'], ['Use', 'Bedrooms, living rooms and bathrooms'], ['Size', 'To fit your opening — we measure on site']],
    featuresAr: ['صناعة تركي', 'جاهز للتركيب', 'اكسسوارات معاه'],
    featuresEn: ['Made in Turkey', 'Ready to install', 'Hardware included'],
    cover: '/products/room-604/main-sm.webp',
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
    slug: 'wood',
    ar: 'أبواب خشب',
    en: 'Wooden doors',
    shortAr: 'خشب',
    shortEn: 'Wood',
    introAr: 'أبواب خشب للشقق والفيلات بتصميمات وتشطيبات مختلفة. اختار الموديل وابعتلنا الكود على واتساب.',
    introEn: 'Wooden doors for apartments and villas in a range of designs and finishes. Pick a model and send us the code on WhatsApp.',
    specsAr: [['الاستخدام', 'غرف النوم والمعيشة والحمامات'], ['المقاس', 'حسب فتحة الباب — بنقيس عندك']],
    specsEn: [['Use', 'Bedrooms, living rooms and bathrooms'], ['Size', 'To fit your opening — we measure on site']],
    featuresAr: [], featuresEn: [],
    cover: '/products/wood-w01/main-sm.webp',
  },
  {
    slug: 'pvc',
    ar: 'شبابيك PVC',
    en: 'PVC windows',
    shortAr: 'شبابيك PVC',
    shortEn: 'PVC',
    introAr: 'شبابيك PVC عازلة للحرارة والصوت، بمقاسات حسب الطلب. دي صور من شغل اتركّب عند زباينّا.',
    introEn: 'Heat- and sound-insulating PVC windows, made to measure. These are photos of jobs we installed for our customers.',
    specsAr: [['المقاس', 'حسب الفتحة — بنقيس عندك'], ['التركيب', 'فريق سيفتى هوم']],
    specsEn: [['Size', 'Made to measure — we measure on site'], ['Installation', 'By the Safety Home team']],
    featuresAr: ['عازل للحرارة', 'عازل للصوت', 'مقاسات حسب الطلب'],
    featuresEn: ['Heat insulating', 'Sound insulating', 'Made to measure'],
    cover: '/products/pvc-p01/main-sm.webp',
  },
  {
    slug: 'kitchens',
    ar: 'مطابخ',
    en: 'Kitchens',
    shortAr: 'مطابخ',
    shortEn: 'Kitchens',
    introAr: 'مطابخ بتتعمل على مقاس مطبخك، بخامات وألوان تختارها. دي صور من مطابخ ركّبناها عند زباينّا.',
    introEn: 'Kitchens made to fit your space, in the finishes and colors you choose. These are kitchens we installed for our customers.',
    specsAr: [['المقاس', 'حسب مساحة المطبخ — بنقيس عندك'], ['التصميم', 'بنصمّمه معاك قبل التنفيذ'], ['التركيب', 'فريق سيفتى هوم']],
    specsEn: [['Size', 'Made to fit your kitchen — we measure on site'], ['Design', 'Designed with you before production'], ['Installation', 'By the Safety Home team']],
    featuresAr: ['تفصيل على المقاس', 'ألوان وخامات كتير', 'تركيب'],
    featuresEn: ['Made to measure', 'Many colors and finishes', 'Installation'],
    cover: '/products/kitchens-k-09/main-sm.webp',
  },
  {
    slug: 'dressing',
    ar: 'دريسنج روم',
    en: 'Dressing rooms',
    shortAr: 'دريسنج',
    shortEn: 'Dressing',
    introAr: 'دريسنج روم ودواليب بتتفصّل على مساحة أوضتك. دي صور من شغل ركّبناه عند زباينّا.',
    introEn: 'Dressing rooms and wardrobes built to fit your room. These are jobs we installed for our customers.',
    specsAr: [['المقاس', 'حسب مساحة الأوضة — بنقيس عندك'], ['التصميم', 'بنصمّمه معاك قبل التنفيذ'], ['التركيب', 'فريق سيفتى هوم']],
    specsEn: [['Size', 'Made to fit your room — we measure on site'], ['Design', 'Designed with you before production'], ['Installation', 'By the Safety Home team']],
    featuresAr: ['تفصيل على المقاس', 'تقسيمات حسب احتياجك', 'تركيب'],
    featuresEn: ['Made to measure', 'Layout to your needs', 'Installation'],
    cover: '/products/dressing-dr-02/main-sm.webp',
  },
  {
    slug: 'floors',
    ar: 'أرضيات',
    en: 'Flooring',
    shortAr: 'أرضيات',
    shortEn: 'Flooring',
    introAr: 'أرضيات SPC وباركيه بشكل الخشب الطبيعي، بديكورات كتير من EGGER وArea Floors والخليل. اختار الديكور وابعتلنا الكود ومساحة المكان على واتساب.',
    introEn: 'SPC and laminate wood-look flooring in many decors from EGGER, Area Floors and Elkhalil. Pick a decor and send us the code and your floor area on WhatsApp.',
    specsAr: [['الكمية', 'حسب مساحة المكان — ابعتلنا المساحة']],
    specsEn: [['Quantity', 'Based on your floor area — send us the size']],
    featuresAr: [], featuresEn: [],
    cover: '/products/floor-egger-pl2654/main-sm.webp',
  },
];

export const catBySlug = (s: string) => CATEGORIES.find((c) => c.slug === s)!;
