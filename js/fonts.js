// Curated Google Fonts for backdrop decoration
// `weights` lists the weights actually published on Google Fonts for that family.
// If unspecified, font is assumed single-weight 400.
const FONT_CATEGORIES = {
  'Script': {
    icon: '✍️',
    fonts: [
      { name: 'Great Vibes', family: 'Great Vibes', weights: [400] },
      { name: 'Dancing Script', family: 'Dancing Script', weights: [400, 500, 600, 700] },
      { name: 'Pacifico', family: 'Pacifico', weights: [400] },
      { name: 'Sacramento', family: 'Sacramento', weights: [400] },
      { name: 'Alex Brush', family: 'Alex Brush', weights: [400] },
      { name: 'Allura', family: 'Allura', weights: [400] },
      { name: 'Tangerine', family: 'Tangerine', weights: [400, 700] },
      { name: 'Pinyon Script', family: 'Pinyon Script', weights: [400] },
      { name: 'Satisfy', family: 'Satisfy', weights: [400] },
      { name: 'Marck Script', family: 'Marck Script', weights: [400] },
      { name: 'Ruthie', family: 'Ruthie', weights: [400] },
      { name: 'Rouge Script', family: 'Rouge Script', weights: [400] },
      { name: 'Parisienne', family: 'Parisienne', weights: [400] },
      { name: 'Italianno', family: 'Italianno', weights: [400] },
      { name: 'Mrs Saint Delafield', family: 'Mrs Saint Delafield', weights: [400] },
      { name: 'Petit Formal Script', family: 'Petit Formal Script', weights: [400] },
      { name: 'Yellowtail', family: 'Yellowtail', weights: [400] },
      { name: 'Kaushan Script', family: 'Kaushan Script', weights: [400] },
      { name: 'Cookie', family: 'Cookie', weights: [400] },
      { name: 'Birthstone', family: 'Birthstone', weights: [400] },
      { name: 'Mea Culpa', family: 'Mea Culpa', weights: [400] },
      { name: 'Imperial Script', family: 'Imperial Script', weights: [400] },
      { name: 'Monsieur La Doulaise', family: 'Monsieur La Doulaise', weights: [400] },
      { name: 'Berkshire Swash', family: 'Berkshire Swash', weights: [400] },
      { name: 'Mr Dafoe', family: 'Mr Dafoe', weights: [400] },
      { name: 'Herr Von Muellerhoff', family: 'Herr Von Muellerhoff', weights: [400] },
      { name: 'Yesteryear', family: 'Yesteryear', weights: [400] },
      { name: 'Niconne', family: 'Niconne', weights: [400] },
    ]
  },
  'Serif': {
    icon: '🅰️',
    fonts: [
      { name: 'Playfair Display', family: 'Playfair Display', weights: [400, 500, 600, 700, 800, 900] },
      { name: 'Cormorant Garamond', family: 'Cormorant Garamond', weights: [300, 400, 500, 600, 700] },
      { name: 'Cinzel', family: 'Cinzel', weights: [400, 500, 600, 700, 800, 900] },
      { name: 'EB Garamond', family: 'EB Garamond', weights: [400, 500, 600, 700, 800] },
      { name: 'Libre Baskerville', family: 'Libre Baskerville', weights: [400, 700] },
      { name: 'Lora', family: 'Lora', weights: [400, 500, 600, 700] },
      { name: 'Merriweather', family: 'Merriweather', weights: [300, 400, 700, 900] },
      { name: 'DM Serif Display', family: 'DM Serif Display', weights: [400] },
      { name: 'Bodoni Moda', family: 'Bodoni Moda', weights: [400, 500, 600, 700, 800, 900] },
      { name: 'Cormorant', family: 'Cormorant', weights: [300, 400, 500, 600, 700] },
      { name: 'Italiana', family: 'Italiana', weights: [400] },
      { name: 'Marcellus', family: 'Marcellus', weights: [400] },
      { name: 'Forum', family: 'Forum', weights: [400] },
      { name: 'Cardo', family: 'Cardo', weights: [400, 700] },
      { name: 'Cormorant Infant', family: 'Cormorant Infant', weights: [300, 400, 500, 600, 700] },
      { name: 'Cormorant SC', family: 'Cormorant SC', weights: [300, 400, 500, 600, 700] },
      { name: 'Yeseva One', family: 'Yeseva One', weights: [400] },
      { name: 'Fraunces', family: 'Fraunces', weights: [300, 400, 500, 600, 700, 900] },
      { name: 'Spectral', family: 'Spectral', weights: [300, 400, 500, 600, 700, 800] },
    ]
  },
  'Sans Serif': {
    icon: '🔤',
    fonts: [
      { name: 'Montserrat', family: 'Montserrat', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Poppins', family: 'Poppins', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Raleway', family: 'Raleway', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Outfit', family: 'Outfit', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Josefin Sans', family: 'Josefin Sans', weights: [300, 400, 500, 600, 700] },
      { name: 'Quicksand', family: 'Quicksand', weights: [300, 400, 500, 600, 700] },
      { name: 'Nunito', family: 'Nunito', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Work Sans', family: 'Work Sans', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'DM Sans', family: 'DM Sans', weights: [400, 500, 600, 700, 800, 900] },
      { name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Tenor Sans', family: 'Tenor Sans', weights: [400] },
      { name: 'Jost', family: 'Jost', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Manrope', family: 'Manrope', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Archivo', family: 'Archivo', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Inter', family: 'Inter', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Mulish', family: 'Mulish', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Urbanist', family: 'Urbanist', weights: [300, 400, 500, 600, 700, 800, 900] },
    ]
  },
  'Handwriting': {
    icon: '🖋️',
    fonts: [
      { name: 'Caveat', family: 'Caveat', weights: [400, 500, 600, 700] },
      { name: 'Caveat Brush', family: 'Caveat Brush', weights: [400] },
      { name: 'Shadows Into Light', family: 'Shadows Into Light', weights: [400] },
      { name: 'Architects Daughter', family: 'Architects Daughter', weights: [400] },
      { name: 'Indie Flower', family: 'Indie Flower', weights: [400] },
      { name: 'Homemade Apple', family: 'Homemade Apple', weights: [400] },
      { name: 'Beth Ellen', family: 'Beth Ellen', weights: [400] },
      { name: 'Patrick Hand', family: 'Patrick Hand', weights: [400] },
      { name: 'La Belle Aurore', family: 'La Belle Aurore', weights: [400] },
      { name: 'Annie Use Your Telescope', family: 'Annie Use Your Telescope', weights: [400] },
      { name: 'Kalam', family: 'Kalam', weights: [300, 400, 700] },
      { name: 'Nothing You Could Do', family: 'Nothing You Could Do', weights: [400] },
      { name: 'Just Me Again Down Here', family: 'Just Me Again Down Here', weights: [400] },
      { name: 'Sue Ellen Francisco', family: 'Sue Ellen Francisco', weights: [400] },
    ]
  },
  'Dekoratif': {
    icon: '🌸',
    fonts: [
      { name: 'Abril Fatface', family: 'Abril Fatface', weights: [400] },
      { name: 'Lobster', family: 'Lobster', weights: [400] },
      { name: 'Righteous', family: 'Righteous', weights: [400] },
      { name: 'Bebas Neue', family: 'Bebas Neue', weights: [400] },
      { name: 'Alfa Slab One', family: 'Alfa Slab One', weights: [400] },
      { name: 'Permanent Marker', family: 'Permanent Marker', weights: [400] },
      { name: 'Bungee Shade', family: 'Bungee Shade', weights: [400] },
      { name: 'Fascinate Inline', family: 'Fascinate Inline', weights: [400] },
      { name: 'Cinzel Decorative', family: 'Cinzel Decorative', weights: [400, 700, 900] },
      { name: 'Pirata One', family: 'Pirata One', weights: [400] },
      { name: 'Monoton', family: 'Monoton', weights: [400] },
      { name: 'Unica One', family: 'Unica One', weights: [400] },
    ]
  }
};

// Track loaded font URLs (key: "family|weights joined")
const loadedFonts = new Set();

function fontWeights(font) {
  return (font.weights && font.weights.length) ? font.weights : [400];
}

function fontKey(family, weights) {
  return `${family}|${weights.join(',')}`;
}

function buildGoogleFontsUrl(fonts) {
  // Each font: family[+weights]. Use css2 with @wght axis when weights > 1.
  const families = fonts.map(f => {
    const w = fontWeights(f);
    const fam = f.family.replace(/ /g, '+');
    if (w.length > 1) {
      return `${fam}:wght@${w.join(';')}`;
    }
    return `${fam}:wght@${w[0]}`;
  }).join('&family=');
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
}

function loadFontCategory(category) {
  const cat = FONT_CATEGORIES[category];
  if (!cat) return;
  const unloaded = cat.fonts.filter(f => !loadedFonts.has(fontKey(f.family, fontWeights(f))));
  if (unloaded.length === 0) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = buildGoogleFontsUrl(unloaded);
  document.head.appendChild(link);
  unloaded.forEach(f => loadedFonts.add(fontKey(f.family, fontWeights(f))));
}

function loadSingleFont(fontFamily, weights) {
  const w = (weights && weights.length) ? weights : [400];
  const key = fontKey(fontFamily, w);
  if (loadedFonts.has(key)) return;
  const fam = fontFamily.replace(/ /g, '+');
  const wAxis = w.length > 1 ? `:wght@${w.join(';')}` : `:wght@${w[0]}`;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fam}${wAxis}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(key);
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

function getFontByFamily(family) {
  return getAllFonts().find(f => f.family === family);
}
