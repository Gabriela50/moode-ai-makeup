const looks = {
  Radiante: {
    es: {
      title: 'Glow Radiante ✨',
      text: 'Te recomendamos una piel luminosa, blush rosado, iluminador suave y labios glossy para resaltar tu energía.',
      style: 'Glow Radiante',
      palette: ['Rosa suave', 'Champagne', 'Melocotón'],
      finish: 'Luminoso',
      products: ['Base ligera glow', 'Blush rosado', 'Iluminador champagne', 'Gloss transparente'],
    },
    en: {
      title: 'Radiant Glow ✨',
      text: 'Try luminous skin, rosy blush, a soft highlighter and glossy lips to enhance your natural energy.',
      style: 'Radiant Glow',
      palette: ['Soft pink', 'Champagne', 'Peach'],
      finish: 'Luminous',
      products: ['Lightweight glow foundation', 'Rosy blush', 'Champagne highlighter', 'Clear lip gloss'],
    },
  },
  Elegante: {
    es: {
      title: 'Elegancia Clásica 🖤',
      text: 'Un look sofisticado con piel uniforme, sombras neutras, delineado definido y labios nude o rojo elegante.',
      style: 'Elegancia Clásica',
      palette: ['Nude', 'Marrón', 'Rojo profundo'],
      finish: 'Satinado',
      products: ['Base de cobertura media', 'Sombras neutras', 'Delineador negro', 'Labial rojo elegante'],
    },
    en: {
      title: 'Classic Elegance 🖤',
      text: 'A sophisticated look with an even complexion, neutral eyeshadow, defined eyeliner and nude or elegant red lips.',
      style: 'Classic Elegance',
      palette: ['Nude', 'Brown', 'Deep red'],
      finish: 'Satin',
      products: ['Medium-coverage foundation', 'Neutral eyeshadow', 'Black eyeliner', 'Elegant red lipstick'],
    },
  },
  Romántica: {
    es: {
      title: 'Soft Romantic 🌸',
      text: 'Tonos rosados, blush suave, sombras delicadas e iluminador ligero para conseguir un estilo romántico y femenino.',
      style: 'Soft Romantic',
      palette: ['Rosa', 'Malva', 'Champagne'],
      finish: 'Suave',
      products: ['Base natural', 'Blush rosa', 'Sombra rosada', 'Gloss rosado'],
    },
    en: {
      title: 'Soft Romantic 🌸',
      text: 'Rosy tones, soft blush, delicate eyeshadow and a light highlighter create a romantic, feminine look.',
      style: 'Soft Romantic',
      palette: ['Pink', 'Mauve', 'Champagne'],
      finish: 'Soft',
      products: ['Natural-finish foundation', 'Pink blush', 'Pink eyeshadow', 'Pink lip gloss'],
    },
  },
  Tranquila: {
    es: {
      title: 'Natural Calm 🌙',
      text: 'Un maquillaje natural con tonos tierra, piel fresca, cejas suaves y labios nude para un resultado relajado.',
      style: 'Natural Calm',
      palette: ['Beige', 'Café claro', 'Nude'],
      finish: 'Natural',
      products: ['BB Cream', 'Bronzer suave', 'Cejas naturales', 'Labial nude'],
    },
    en: {
      title: 'Natural Calm 🌙',
      text: 'A natural makeup look with earthy tones, fresh-looking skin, soft brows and nude lips for a relaxed finish.',
      style: 'Natural Calm',
      palette: ['Beige', 'Light brown', 'Nude'],
      finish: 'Natural',
      products: ['BB cream', 'Soft bronzer', 'Natural brow product', 'Nude lipstick'],
    },
  },
};

const tips = {
  es: {
    skinType: {
      dry: 'Prepara la piel con una crema hidratante.',
      oily: 'Prueba una base ligera de acabado mate.',
      combination: 'Combina hidratación con productos ligeros.',
      normal: 'Mantén una preparación equilibrada de la piel.',
    },
    skinTone: {
      light: 'En pieles claras, prueba los tonos en la mandíbula y comprueba el resultado con luz natural.',
      medium: 'En pieles medias, compara varios tonos en la mandíbula antes de elegir la base.',
      tan: 'En pieles morenas, busca una base que se funda con el tono del cuello.',
      deep: 'En pieles profundas, busca tonos que respeten la profundidad y el matiz natural de tu piel.',
    },
    skinUndertone: {
      unknown: 'Prueba los tonos con luz natural; no necesitas conocer tu subtono para empezar.',
      warm: 'Explora tonos cálidos y dorados, comprobando cómo armonizan con tu piel.',
      cool: 'Prueba tonos de matiz frío o rosado y observa cuál se integra mejor.',
      neutral: 'Compara tonos neutros y verifica que la base se funda con tu piel.',
    },
    occasion: {
      daily: 'Para el día a día, prioriza productos fáciles de aplicar.',
      work: 'Para estudiar o trabajar, elige un look cómodo y duradero.',
      date: 'Para una cita, destaca un rasgo que te encante.',
      party: 'Para una fiesta, puedes intensificar los ojos o los labios.',
    },
    coverage: {
      light: 'Cobertura ligera',
      medium: 'Cobertura media',
      full: 'Cobertura alta',
    },
    style: {
      natural: 'Estilo natural',
      glow: 'Acabado luminoso',
      elegant: 'Estilo elegante',
      creative: 'Estilo creativo',
    },
  },
  en: {
    skinType: {
      dry: 'Prepare your skin with a moisturizing cream.',
      oily: 'Try a lightweight matte-finish foundation.',
      combination: 'Combine hydration with lightweight products.',
      normal: 'Keep your skin preparation balanced.',
    },
    skinTone: {
      light: 'For light skin, test foundation along the jawline and check it in natural light.',
      medium: 'For medium skin, compare shades along the jawline before choosing a foundation.',
      tan: 'For tan skin, look for a foundation that blends with your neck.',
      deep: 'For deep skin, choose shades that respect your skin’s natural depth and undertone.',
    },
    skinUndertone: {
      unknown: 'Test shades in natural light; you do not need to know your undertone to begin.',
      warm: 'Explore warm or golden shades and see how they harmonize with your skin.',
      cool: 'Try cool or rosy shades and check which blends most naturally.',
      neutral: 'Compare neutral shades and check that the foundation blends into your skin.',
    },
    occasion: {
      daily: 'For everyday wear, choose easy-to-apply products.',
      work: 'For university or work, choose a comfortable, long-lasting look.',
      date: 'For a date, highlight a feature you love.',
      party: 'For a party, you can emphasize your eyes or lips.',
    },
    coverage: {
      light: 'Light coverage',
      medium: 'Medium coverage',
      full: 'Full coverage',
    },
    style: {
      natural: 'Natural style',
      glow: 'Glowy finish',
      elegant: 'Elegant style',
      creative: 'Creative style',
    },
  },
};

export const MOOD_OPTIONS = ['Radiante', 'Elegante', 'Romántica', 'Tranquila'];

export const DEFAULT_PREFERENCES = {
  skinType: 'normal',
  skinTone: 'medium',
  skinUndertone: 'unknown',
  occasion: 'daily',
  coverage: 'light',
  style: 'natural',
};

export function generateRecommendation(mood, preferences = DEFAULT_PREFERENCES, language = 'es') {
  const selected = looks[mood];

  if (!selected) {
    throw new Error('El estilo seleccionado no existe.');
  }

  const locale = language === 'en' ? 'en' : 'es';
  const content = selected[locale];
  const advice = tips[locale];

  const personalizedTips = [
    advice.skinType[preferences.skinType] || advice.skinType.normal,
    advice.skinTone[preferences.skinTone] || advice.skinTone.medium,
    advice.skinUndertone[preferences.skinUndertone] || advice.skinUndertone.unknown,
    advice.occasion[preferences.occasion] || advice.occasion.daily,
    advice.coverage[preferences.coverage] || advice.coverage.light,
    advice.style[preferences.style] || advice.style.natural,
  ];

  return {
    mood,
    title: content.title,
    text: content.text,
    style: content.style,
    palette: [...content.palette],
    finish: content.finish,
    products: [...content.products],
    preferences: { ...preferences },
    personalizedTips,
    language: locale,
    faceAnalyzed: false,
    date: new Date().toISOString(),
  };
}
