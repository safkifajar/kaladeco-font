document.addEventListener('DOMContentLoaded', () => {
  const previewText = document.getElementById('preview-text');
  const nameInput = document.getElementById('name-input');
  const eventInput = document.getElementById('event-input');
  const fontSearch = document.getElementById('font-search');
  const fontListEl = document.getElementById('font-list');
  const fontListCountEl = document.getElementById('font-list-count');
  const fontInfoEl = document.getElementById('font-info');
  const sizeSlider = document.getElementById('size-slider');
  const sizeVal = document.getElementById('size-val');
  const weightTabsEl = document.getElementById('weight-tabs');
  const weightHintEl = document.getElementById('weight-hint');
  const catSheetEl = document.getElementById('cat-sheet');
  const catSheetTabsEl = document.getElementById('cat-sheet-tabs');
  const catFilterBtn = document.getElementById('cat-filter-btn');
  const catFilterCurrentEl = document.getElementById('cat-filter-current');
  const fontPickerTrigger = document.getElementById('font-picker-trigger');
  const fontSheetEl = document.getElementById('font-sheet');
  const fpCurrentName = document.getElementById('fp-current-name');
  const fpCurrentPreview = document.getElementById('fp-current-preview');
  const btnDownloadPng = document.getElementById('btn-download-png');
  const btnDownloadTransparent = document.getElementById('btn-download-transparent');
  const btnDownloadTemplate = document.getElementById('btn-download-template');

  const WEIGHT_LABELS = {
    100: 'Thin', 200: 'Extra Light', 300: 'Light', 400: 'Regular',
    500: 'Medium', 600: 'Semi Bold', 700: 'Bold', 800: 'Extra Bold', 900: 'Black'
  };

  let currentFont = 'Great Vibes';
  let currentCategory = 'Semua';
  let currentSize = 72;
  let currentWeight = 400;

  // Load all fonts on start for 'Semua' tab
  loadAllFonts();

  // Build category tabs — render hanya ke sheet (modal)
  function renderCatTabs() {
    if (!catSheetTabsEl) return;
    catSheetTabsEl.innerHTML = '';

    // 'Semua' tab
    const totalFonts = getAllFonts().length;
    const allTab = document.createElement('button');
    allTab.className = `cat-tab${currentCategory === 'Semua' ? ' active' : ''}`;
    allTab.innerHTML = `🌟 Semua <span class="cat-count">${totalFonts}</span>`;
    allTab.onclick = () => {
      currentCategory = 'Semua';
      loadAllFonts();
      renderCatTabs();
      renderFontList();
      closeCatSheet();
    };
    catSheetTabsEl.appendChild(allTab);

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
        closeCatSheet();
      };
      catSheetTabsEl.appendChild(tab);
    });

    // Update label tombol filter
    if (catFilterCurrentEl) catFilterCurrentEl.textContent = currentCategory;
  }

  function openCatSheet() {
    catSheetEl.hidden = false;
    requestAnimationFrame(() => catSheetEl.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }
  function closeCatSheet() {
    catSheetEl.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { catSheetEl.hidden = true; }, 250);
  }
  catFilterBtn.addEventListener('click', openCatSheet);
  catSheetEl.addEventListener('click', (e) => {
    if (e.target.dataset.close !== undefined) closeCatSheet();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !catSheetEl.hidden) closeCatSheet();
  });

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
      fontListCountEl.textContent = '0 font tersedia';
      fontListEl.innerHTML = '<div style="padding:1rem;color:var(--text-muted);font-size:0.85rem;">Tidak ada font ditemukan</div>';
      return;
    }

    fontListCountEl.textContent = `${filtered.length} font tersedia`;

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

    // Scroll hint kalau list overflow
    requestAnimationFrame(() => {
      if (fontListEl.scrollHeight > fontListEl.clientHeight) {
        fontListEl.classList.add('has-scroll');
      } else {
        fontListEl.classList.remove('has-scroll');
      }
    });
  }

  function selectFont(family, name, opts = {}) {
    currentFont = family;
    const fontData = getFontByFamily(family);
    const weights = (fontData && fontData.weights && fontData.weights.length) ? fontData.weights : [400];

    // Pick a sensible default weight: keep current if still available, else nearest, else first
    if (!weights.includes(currentWeight)) {
      // Prefer 400, else nearest available
      currentWeight = weights.includes(400) ? 400 : weights[0];
    }

    loadSingleFont(family, weights);
    previewText.style.fontFamily = `'${family}', cursive`;
    previewText.style.fontWeight = currentWeight;
    fontInfoEl.innerHTML = `Font: <strong>${name}</strong>`;
    if (fpCurrentName) fpCurrentName.textContent = name;
    if (fpCurrentPreview) fpCurrentPreview.style.fontFamily = `'${family}', cursive`;
    renderWeightTabs(weights);
    renderFontList(fontSearch.value);

    // Auto-close picker setelah user memilih (kecuali init)
    if (opts.closePicker !== false) closeFontPicker();
  }

  // Font picker — modal sheet (sama pola dengan cat-sheet)
  function openFontPicker() {
    fontSheetEl.hidden = false;
    requestAnimationFrame(() => fontSheetEl.classList.add('open'));
    document.body.style.overflow = 'hidden';
    fontPickerTrigger.setAttribute('aria-expanded', 'true');
    setTimeout(() => fontSearch.focus(), 100);
  }
  function closeFontPicker() {
    fontSheetEl.classList.remove('open');
    fontPickerTrigger.setAttribute('aria-expanded', 'false');
    // Restore body scroll hanya kalau cat-sheet juga tertutup
    if (catSheetEl.hidden) document.body.style.overflow = '';
    setTimeout(() => { fontSheetEl.hidden = true; }, 250);
  }
  fontPickerTrigger.addEventListener('click', openFontPicker);
  fontSheetEl.addEventListener('click', (e) => {
    if (e.target.dataset.closeFont !== undefined) closeFontPicker();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !fontSheetEl.hidden) {
      // Kalau cat-sheet juga buka, biar handler kategori yang menangani dulu
      if (!catSheetEl.hidden) return;
      closeFontPicker();
    }
  });

  function renderWeightTabs(weights) {
    weightTabsEl.innerHTML = '';
    weights.forEach(w => {
      const btn = document.createElement('button');
      btn.className = `weight-tab${w === currentWeight ? ' active' : ''}`;
      btn.style.fontWeight = w;
      btn.innerHTML = `<span class="w-num">${w}</span><span class="w-label">${WEIGHT_LABELS[w] || ''}</span>`;
      btn.disabled = weights.length === 1;
      btn.onclick = () => {
        currentWeight = w;
        previewText.style.fontWeight = w;
        renderWeightTabs(weights);
      };
      weightTabsEl.appendChild(btn);
    });
    weightHintEl.hidden = weights.length !== 1;
  }

  // Name input — preserve newlines untuk preview multi-line
  function renderPreviewText() {
    const val = nameInput.value.trim();
    if (!val) {
      previewText.textContent = 'Nama Anda';
      return;
    }
    // Pakai textContent + white-space: pre-line via CSS untuk handle newline aman dari XSS
    previewText.textContent = val;
  }
  nameInput.addEventListener('input', renderPreviewText);

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
  btnDownloadPng.addEventListener('click', () => { downloadImage(false); closePngMenu(); });
  btnDownloadTransparent.addEventListener('click', () => { downloadImage(true); closePngMenu(); });
  btnDownloadTemplate.addEventListener('click', () => downloadTemplate());

  // PNG dropdown menu
  const pngTrigger = document.getElementById('btn-png-trigger');
  const pngMenu = document.getElementById('png-menu');
  function openPngMenu() {
    pngMenu.hidden = false;
    requestAnimationFrame(() => pngMenu.classList.add('open'));
    pngTrigger.classList.add('open');
    pngTrigger.setAttribute('aria-expanded', 'true');
  }
  function closePngMenu() {
    pngMenu.classList.remove('open');
    pngTrigger.classList.remove('open');
    pngTrigger.setAttribute('aria-expanded', 'false');
    setTimeout(() => { pngMenu.hidden = true; }, 200);
  }
  pngTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pngMenu.hidden) openPngMenu();
    else closePngMenu();
  });
  document.addEventListener('click', (e) => {
    if (pngMenu.hidden) return;
    if (!e.target.closest('.png-dropdown')) closePngMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !pngMenu.hidden) closePngMenu();
  });

  async function downloadImage(transparent) {
    const text = previewText.textContent || 'Nama Anda';
    const font = currentFont;
    const size = parseInt(currentSize);
    const weight = currentWeight;

    // Show loading state
    const btn = transparent ? btnDownloadTransparent : btnDownloadPng;
    const originalText = btn.textContent;
    btn.textContent = '⏳ Menyiapkan...';
    btn.disabled = true;

    try {
      // Ensure font is loaded via FontFace API
      await document.fonts.ready;

      // Force load the specific font+weight if not already
      const isFontLoaded = document.fonts.check(`${weight} ${size}px '${font}'`);

      if (!isFontLoaded) {
        const fontData = getFontByFamily(font);
        loadSingleFont(font, fontData ? fontData.weights : [weight]);
        await new Promise(resolve => setTimeout(resolve, 1500));
        await document.fonts.ready;
      }

      // Create offscreen canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Use high DPI for crisp output
      const scale = 2;
      const fontStr = `${weight} ${size * scale}px '${font}', cursive`;

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
      dlLink.download = `kaladeco_${safeName}_${font.replace(/ /g, '-')}_${weight}.png`;
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

  // Download spesifikasi font template (mengikuti referensi Kaladeco)
  async function downloadTemplate() {
    const font = currentFont;
    const weight = currentWeight;
    const eventName = (eventInput.value || '').trim();
    const nameLines = (nameInput.value || '').trim().split('\n').map(s => s.trim()).filter(Boolean);
    if (nameLines.length === 0) nameLines.push('Nama Anda');

    const btn = btnDownloadTemplate;
    const originalText = btn.textContent;
    btn.textContent = '⏳ Menyiapkan...';
    btn.disabled = true;

    try {
      await document.fonts.ready;
      if (!document.fonts.check(`${weight} 100px '${font}'`)) {
        const fontData = getFontByFamily(font);
        loadSingleFont(font, fontData ? fontData.weights : [weight]);
        await new Promise(r => setTimeout(r, 1500));
        await document.fonts.ready;
      }

      // Canvas dimensi mengikuti referensi (4:5 portrait, A4-ish)
      const scale = 2;
      const W = 1080 * scale;
      const H = 1350 * scale;
      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');

      // Background putih
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);

      const margin = 80 * scale;
      const charcoal = '#1a1410';
      const accent = '#c9a961';

      // ===== HEADER: Logo Kaladeco.id + tagline =====
      const logoY = 80 * scale;
      ctx.fillStyle = charcoal;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      // "Kaladeco" sans-serif bold
      ctx.font = `700 ${44 * scale}px 'Inter', system-ui, sans-serif`;
      const kaladecoText = 'Kaladeco';
      const kalW = ctx.measureText(kaladecoText).width;
      ctx.fillText(kaladecoText, margin, logoY);

      // ".id" italic accent
      ctx.fillStyle = accent;
      ctx.font = `italic 700 ${44 * scale}px Georgia, 'Playfair Display', serif`;
      ctx.fillText('.id', margin + kalW + 4 * scale, logoY);

      // Tagline
      ctx.fillStyle = '#666';
      ctx.font = `italic 400 ${16 * scale}px 'Inter', system-ui, sans-serif`;
      ctx.fillText('Sewa Dekorasi Purwokerto dan Sekitarnya', margin, logoY + 56 * scale);

      // ===== EVENT INFO (Khitanan / Nama) =====
      // Header ringkas: nama digabung jadi 1 baris (preview yang multi-line)
      const headerName = nameLines.join(' ');
      let eventY = logoY + 160 * scale;
      ctx.fillStyle = charcoal;
      // Auto-shrink kalau header terlalu lebar
      let headerSize = 42 * scale;
      const headerMaxW = W - margin * 2;
      const measureHeader = (s) => {
        ctx.font = `700 ${s}px 'Inter', system-ui, sans-serif`;
        const w1 = eventName ? ctx.measureText(eventName).width : 0;
        const w2 = headerName ? ctx.measureText(headerName).width : 0;
        return Math.max(w1, w2);
      };
      while (headerSize > 24 * scale && measureHeader(headerSize) > headerMaxW) {
        headerSize -= 2 * scale;
      }
      ctx.font = `700 ${headerSize}px 'Inter', system-ui, sans-serif`;
      const headerLineH = headerSize * 1.35;
      const headerLines = [];
      if (eventName) headerLines.push(eventName);
      if (headerName) headerLines.push(headerName);
      headerLines.forEach((line, i) => {
        ctx.fillText(line, margin, eventY + i * headerLineH);
      });

      // ===== GARIS PEMISAH =====
      const lineY = eventY + headerLines.length * headerLineH + 30 * scale;
      ctx.strokeStyle = charcoal;
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(margin, lineY);
      ctx.lineTo(W - margin, lineY);
      ctx.stroke();

      // ===== "Spesifikasi Font" label =====
      const labelY = lineY + 50 * scale;
      ctx.fillStyle = charcoal;
      ctx.font = `700 ${36 * scale}px 'Inter', system-ui, sans-serif`;
      const labelText = 'Spesifikasi Font';
      ctx.fillText(labelText, margin, labelY);
      // Underline
      const labelW = ctx.measureText(labelText).width;
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(margin, labelY + 44 * scale);
      ctx.lineTo(margin + labelW, labelY + 44 * scale);
      ctx.stroke();

      // ===== PREVIEW FONT BESAR (center) =====
      // Auto-fit: cari font-size yang muat lebar DAN tinggi block
      const previewMaxW = W - margin * 2;
      const previewStartY = labelY + 130 * scale;
      const previewBlockH = 480 * scale;
      const lineHeightRatio = 1.25;

      // Cap tinggi per-baris berdasarkan ukuran block & jumlah baris
      const maxSizeByHeight = previewBlockH / (nameLines.length * lineHeightRatio);
      // Cap absolut: tidak lebih dari 200px (cukup besar untuk nama 1 baris)
      const absoluteCap = 200 * scale;
      let previewSize = Math.min(maxSizeByHeight, absoluteCap);
      const minSize = 50 * scale;

      // Iterate turun sampai muat lebar
      while (previewSize > minSize) {
        ctx.font = `${weight} ${previewSize}px '${font}', cursive`;
        const widest = Math.max(...nameLines.map(l => ctx.measureText(l).width));
        if (widest <= previewMaxW) break;
        previewSize -= 4 * scale;
      }

      ctx.font = `${weight} ${previewSize}px '${font}', cursive`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const lineH = previewSize * lineHeightRatio;
      const totalH = lineH * nameLines.length;
      const startY = previewStartY + (previewBlockH - totalH) / 2 + lineH / 2;
      nameLines.forEach((line, i) => {
        ctx.fillText(line, W / 2, startY + i * lineH);
      });

      // ===== FOOTER INFO =====
      const footerY = previewStartY + previewBlockH + 60 * scale;
      ctx.fillStyle = charcoal;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = `500 ${28 * scale}px 'Inter', system-ui, sans-serif`;
      ctx.fillText(`Font : ${font}`, margin, footerY);
      const weightLabel = WEIGHT_LABELS[weight] || '';
      ctx.fillText(`Ketebalan : ${weight}${weightLabel ? ` (${weightLabel})` : ''}`, margin, footerY + 44 * scale);

      // Download
      const dlLink = document.createElement('a');
      const slug = (eventName || nameLines[0] || 'spesifikasi').toLowerCase()
        .replace(/[^a-z0-9 ]/g, '').replace(/ /g, '_').slice(0, 40) || 'spesifikasi';
      dlLink.download = `kaladeco_spesifikasi_${slug}_${font.replace(/ /g, '-')}.png`;
      dlLink.href = canvas.toDataURL('image/png');
      dlLink.click();
    } catch (err) {
      console.error('Template download error:', err);
      alert('Gagal download template. Coba lagi setelah font selesai loading.');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }

  // Hide scroll hint saat user scroll sampai bawah font list
  fontListEl.addEventListener('scroll', () => {
    const atBottom = fontListEl.scrollTop + fontListEl.clientHeight >= fontListEl.scrollHeight - 20;
    if (atBottom) fontListEl.classList.remove('has-scroll');
  });

  // Update CSS var --preview-bottom agar Kategori sticky tepat di bawah preview
  const previewEl = document.querySelector('.gen-preview');
  function updatePreviewBottom() {
    if (!previewEl) return;
    const rect = previewEl.getBoundingClientRect();
    // Preview sticky `top: 80px`, jadi tinggi preview + 80 = posisi bottom dari atas viewport
    const stickyTop = window.innerWidth < 768 ? 64 : 80;
    document.documentElement.style.setProperty('--preview-bottom', `${stickyTop + rect.height}px`);
  }
  updatePreviewBottom();
  window.addEventListener('resize', updatePreviewBottom);
  // ResizeObserver agar tinggi preview yang berubah (size/weight) auto-update
  if (window.ResizeObserver && previewEl) {
    new ResizeObserver(updatePreviewBottom).observe(previewEl);
  }

  // Init
  renderCatTabs();
  renderFontList();
  selectFont('Great Vibes', 'Great Vibes', { closePicker: false });
  previewText.textContent = 'Nama Anda';
  previewText.style.fontSize = currentSize + 'px';

});
