# Kaladeco Font Generator

Static web app untuk preview & download font dekorasi backdrop — bagian dari ekosistem [Kaladeco](https://kaladeco.vercel.app/).

Live: https://kaladeco-font.vercel.app

## Fitur

- 90+ Google Fonts terkurasi (Script, Serif, Sans Serif, Handwriting, Dekoratif)
- Preview real-time dengan kontrol ukuran (24–150px)
- Pencarian font + filter kategori
- Download PNG (background putih atau transparan, 2x DPI)
- Mobile responsive

## Stack

Pure static — HTML + vanilla JS + CSS. Tidak ada build step.

```
.
├── index.html         # Landing page
├── generator.html     # Tool generator
├── js/
│   ├── fonts.js       # Katalog font (4 kategori)
│   ├── app.js         # Navbar, mobile menu, scroll animations
│   └── generator.js   # Logic preview + download canvas
├── styles/
│   └── main.css       # Tema cream + gold (selaras dengan kaladeco.vercel.app)
└── vercel.json        # Clean URLs + cache headers
```

## Development

Buka [index.html](index.html) langsung di browser, atau jalankan local server:

```bash
npx serve .
```

## Deploy

Auto-deploy ke Vercel via GitHub push.
