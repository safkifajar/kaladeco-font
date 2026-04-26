document.addEventListener('DOMContentLoaded', () => {
  const previewText = document.getElementById('preview-text');
  const nameInput = document.getElementById('name-input');
  const fontSearch = document.getElementById('font-search');
  const fontListEl = document.getElementById('font-list');
  const catTabsEl = document.getElementById('cat-tabs');
  const fontInfoEl = document.getElementById('font-info');
  const sizeSlider = document.getElementById('size-slider');
  const sizeVal = document.getElementById('size-val');
  const btnDownloadPng = document.getElementById('btn-download-png');
  const btnDownloadTransparent = document.getElementById('btn-download-transparent');

  let currentFont = 'Great Vibes';
  let currentCategory = 'Semua';
  let currentSize = 72;

  // Load all fonts on start for 'Semua' tab
  loadAllFonts();

  // Build category tabs (with 'Semua' tab first)
  function renderCatTabs() {
    catTabsEl.innerHTML = '';

    // 'Semua' tab
    const allTab = document.createElement('button');
    const totalFonts = getAllFonts().length;
    allTab.className = `cat-tab${currentCategory === 'Semua' ? ' active' : ''}`;
    allTab.innerHTML = `🌟 Semua <span class="cat-count">${totalFonts}</span>`;
    allTab.onclick = () => {
      currentCategory = 'Semua';
      loadAllFonts();
      renderCatTabs();
      renderFontList();
    };
    catTabsEl.appendChild(allTab);

    // Per-category tabs
    Object.entries(FONT_CATEGORIES).forEach(([cat, data]) => {
      const tab = document.createElement('button');
      tab.className = `cat-tab${cat === currentCategory ? ' active' : ''}`;
      tab.innerHTML = `${data.icon} ${cat} <span class="cat-count">${data.fonts.length}</span>`;
      tab.onclick = () => {
        currentCategory = cat;
        loadFontCategory(cat);
        renderCatTabs();
        renderFontList();
      };
      catTabsEl.appendChild(tab);
    });
  }

  // Build font list
  function renderFontList(filter = '') {
    fontListEl.innerHTML = '';

    // Get fonts based on category
    let fonts;
    if (currentCategory === 'Semua') {
      fonts = getAllFonts();
    } else {
      const cat = FONT_CATEGORIES[currentCategory];
      if (!cat) return;
      fonts = cat.fonts.map(f => ({ ...f, category: currentCategory }));
    }

    const filtered = fonts.filter(f =>
      f.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      fontListEl.innerHTML = '<div style="padding:1rem;color:var(--text-muted);font-size:0.85rem;">Tidak ada font ditemukan</div>';
      return;
    }

    // Show result count
    const countEl = document.createElement('div');
    countEl.className = 'font-list-count';
    countEl.textContent = `${filtered.length} font tersedia`;
    fontListEl.appendChild(countEl);

    filtered.forEach(font => {
      const item = document.createElement('div');
      item.className = `font-item${font.family === currentFont ? ' active' : ''}`;
      const catBadge = currentCategory === 'Semua' ? `<span class="fi-cat">${font.category}</span>` : '';
      item.innerHTML = `
        <div class="fi-header"><span class="fi-name">${font.name}</span>${catBadge}</div>
        <div class="fi-preview" style="font-family:'${font.family}',cursive">Kaladeco</div>
      `;
      item.onclick = () => selectFont(font.family, font.name);
      fontListEl.appendChild(item);
    });

    // Add scroll hint if list overflows
    requestAnimationFrame(() => {
      if (fontListEl.scrollHeight > fontListEl.clientHeight) {
        fontListEl.classList.add('has-scroll');
      } else {
        fontListEl.classList.remove('has-scroll');
      }
    });
  }

  function selectFont(family, name) {
    currentFont = family;
    loadSingleFont(family);
    previewText.style.fontFamily = `'${family}', cursive`;
    fontInfoEl.innerHTML = `Font: <strong>${name}</strong>`;
    renderFontList(fontSearch.value);
  }

  // Name input
  nameInput.addEventListener('input', () => {
    const val = nameInput.value.trim();
    previewText.textContent = val || 'Nama Anda';
  });

  // Font search
  fontSearch.addEventListener('input', () => {
    renderFontList(fontSearch.value);
  });

  // Size slider
  sizeSlider.addEventListener('input', () => {
    currentSize = sizeSlider.value;
    previewText.style.fontSize = currentSize + 'px';
    sizeVal.textContent = currentSize + 'px';
  });

  // Download PNG (white background)
  btnDownloadPng.addEventListener('click', () => downloadImage(false));
  btnDownloadTransparent.addEventListener('click', () => downloadImage(true));

  async function downloadImage(transparent) {
    const text = previewText.textContent || 'Nama Anda';
    const font = currentFont;
    const size = parseInt(currentSize);

    // Show loading state
    const btn = transparent ? btnDownloadTransparent : btnDownloadPng;
    const originalText = btn.textContent;
    btn.textContent = '⏳ Menyiapkan...';
    btn.disabled = true;

    try {
      // Ensure font is loaded via FontFace API
      const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
      
      // Wait for document fonts to be ready
      await document.fonts.ready;
      
      // Force load the specific font if not already
      const fontFaceSet = document.fonts;
      const isFontLoaded = fontFaceSet.check(`${size}px '${font}'`);
      
      if (!isFontLoaded) {
        // Load font explicitly
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fontUrl;
        document.head.appendChild(link);
        // Wait for it to load
        await new Promise(resolve => setTimeout(resolve, 1500));
        await document.fonts.ready;
      }

      // Create offscreen canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Use high DPI for crisp output
      const scale = 2;
      const fontStr = `${size * scale}px '${font}', cursive`;

      // Set font first to measure
      ctx.font = fontStr;
      const metrics = ctx.measureText(text);
      const textW = metrics.width;
      const textH = size * scale * 1.6;

      const pad = 80 * scale;
      canvas.width = Math.max(textW + pad * 2, 400 * scale);
      canvas.height = textH + pad * 2;

      // Background
      if (!transparent) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Text
      ctx.font = fontStr;
      ctx.fillStyle = transparent ? '#1a1a1a' : '#1a1a1a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      // Download
      const dlLink = document.createElement('a');
      const safeName = text.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_') || 'preview';
      dlLink.download = `kaladeco_${safeName}_${font.replace(/ /g, '-')}.png`;
      dlLink.href = canvas.toDataURL('image/png');
      dlLink.click();
    } catch (err) {
      console.error('Download error:', err);
      alert('Gagal download. Coba lagi setelah font selesai loading.');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }

  // Init
  renderCatTabs();
  renderFontList();
  selectFont('Great Vibes', 'Great Vibes');
  previewText.textContent = 'Nama Anda';
  previewText.style.fontSize = currentSize + 'px';

  // Hide scroll hint when user scrolls font list
  fontListEl.addEventListener('scroll', () => {
    const atBottom = fontListEl.scrollTop + fontListEl.clientHeight >= fontListEl.scrollHeight - 20;
    if (atBottom) {
      fontListEl.classList.remove('has-scroll');
    }
  });
});
