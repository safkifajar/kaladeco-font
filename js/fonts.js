// Curated Google Fonts for backdrop decoration
const FONT_CATEGORIES = {
  'Script': {
    icon: '✍️',
    fonts: [
      { name: 'Great Vibes', family: 'Great Vibes' },
      { name: 'Dancing Script', family: 'Dancing Script' },
      { name: 'Pacifico', family: 'Pacifico' },
      { name: 'Sacramento', family: 'Sacramento' },
      { name: 'Alex Brush', family: 'Alex Brush' },
      { name: 'Allura', family: 'Allura' },
      { name: 'Tangerine', family: 'Tangerine' },
      { name: 'Pinyon Script', family: 'Pinyon Script' },
      { name: 'Satisfy', family: 'Satisfy' },
      { name: 'Marck Script', family: 'Marck Script' },
      { name: 'Ruthie', family: 'Ruthie' },
      { name: 'Rouge Script', family: 'Rouge Script' },
      { name: 'Parisienne', family: 'Parisienne' },
      { name: 'Italianno', family: 'Italianno' },
      { name: 'Mrs Saint Delafield', family: 'Mrs Saint Delafield' },
      { name: 'Petit Formal Script', family: 'Petit Formal Script' },
      { name: 'Yellowtail', family: 'Yellowtail' },
      { name: 'Kaushan Script', family: 'Kaushan Script' },
      { name: 'Cookie', family: 'Cookie' },
      { name: 'Birthstone', family: 'Birthstone' },
      { name: 'Mea Culpa', family: 'Mea Culpa' },
      { name: 'Imperial Script', family: 'Imperial Script' },
      { name: 'Monsieur La Doulaise', family: 'Monsieur La Doulaise' },
    ]
  },
  'Serif': {
    icon: '🅰️',
    fonts: [
      { name: 'Playfair Display', family: 'Playfair Display' },
      { name: 'Cormorant Garamond', family: 'Cormorant Garamond' },
      { name: 'Cinzel', family: 'Cinzel' },
      { name: 'EB Garamond', family: 'EB Garamond' },
      { name: 'Libre Baskerville', family: 'Libre Baskerville' },
      { name: 'Lora', family: 'Lora' },
      { name: 'Merriweather', family: 'Merriweather' },
      { name: 'DM Serif Display', family: 'DM Serif Display' },
      { name: 'Bodoni Moda', family: 'Bodoni Moda' },
      { name: 'Cormorant', family: 'Cormorant' },
      { name: 'Italiana', family: 'Italiana' },
      { name: 'Marcellus', family: 'Marcellus' },
      { name: 'Forum', family: 'Forum' },
      { name: 'Cardo', family: 'Cardo' },
      { name: 'Cormorant Infant', family: 'Cormorant Infant' },
      { name: 'Cormorant SC', family: 'Cormorant SC' },
    ]
  },
  'Sans Serif': {
    icon: '🔤',
    fonts: [
      { name: 'Montserrat', family: 'Montserrat' },
      { name: 'Poppins', family: 'Poppins' },
      { name: 'Raleway', family: 'Raleway' },
      { name: 'Outfit', family: 'Outfit' },
      { name: 'Josefin Sans', family: 'Josefin Sans' },
      { name: 'Quicksand', family: 'Quicksand' },
      { name: 'Nunito', family: 'Nunito' },
      { name: 'Work Sans', family: 'Work Sans' },
      { name: 'DM Sans', family: 'DM Sans' },
      { name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans' },
      { name: 'Tenor Sans', family: 'Tenor Sans' },
      { name: 'Jost', family: 'Jost' },
      { name: 'Manrope', family: 'Manrope' },
      { name: 'Archivo', family: 'Archivo' },
    ]
  },
  'Dekoratif': {
    icon: '🌸',
    fonts: [
      { name: 'Abril Fatface', family: 'Abril Fatface' },
      { name: 'Lobster', family: 'Lobster' },
      { name: 'Righteous', family: 'Righteous' },
      { name: 'Bebas Neue', family: 'Bebas Neue' },
      { name: 'Alfa Slab One', family: 'Alfa Slab One' },
      { name: 'Permanent Marker', family: 'Permanent Marker' },
      { name: 'Bungee Shade', family: 'Bungee Shade' },
      { name: 'Fascinate Inline', family: 'Fascinate Inline' },
      { name: 'Cinzel Decorative', family: 'Cinzel Decorative' },
      { name: 'Pirata One', family: 'Pirata One' },
      { name: 'Monoton', family: 'Monoton' },
      { name: 'Unica One', family: 'Unica One' },
    ]
  }
};

// Track loaded fonts
const loadedFonts = new Set();

function buildGoogleFontsUrl(fonts) {
  const families = fonts.map(f => f.family.replace(/ /g, '+')).join('&family=');
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
}

function loadFontCategory(category) {
  const cat = FONT_CATEGORIES[category];
  if (!cat) return;
  const unloaded = cat.fonts.filter(f => !loadedFonts.has(f.family));
  if (unloaded.length === 0) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = buildGoogleFontsUrl(unloaded);
  document.head.appendChild(link);
  unloaded.forEach(f => loadedFonts.add(f.family));
}

function loadSingleFont(fontFamily) {
  if (loadedFonts.has(fontFamily)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(fontFamily);
}

function loadAllFonts() {
  Object.keys(FONT_CATEGORIES).forEach(loadFontCategory);
}

function getAllFonts() {
  const all = [];
  Object.entries(FONT_CATEGORIES).forEach(([cat, data]) => {
    data.fonts.forEach(f => all.push({ ...f, category: cat }));
  });
  return all;
}
