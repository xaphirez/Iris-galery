# Anya Art Portfolio 🎨

Website portfolio karya seni kakak — HTML, CSS, JS murni + Netlify CMS.

---

## 📁 Struktur Folder

```
art-portfolio/
├── index.html              ← halaman utama
├── netlify.toml            ← konfigurasi Netlify
├── css/style.css           ← styling
├── js/main.js              ← filter, lightbox, CMS loader
├── admin/
│   ├── index.html          ← panel admin CMS
│   └── config.yml          ← konfigurasi CMS
├── _data/
│   ├── about.json          ← data profil seniman
│   ├── contact.json        ← data kontak & sosmed
│   └── gallery/            ← data karya (dikelola CMS)
└── images/
    ├── gallery/            ← file gambar karya
    └── about/              ← foto kakak
```

---

## 🚀 Cara Deploy ke Netlify (Sekali Setup)

### Langkah 1 — Push ke GitHub
1. Buat repo baru di GitHub (contoh: `anya-art`)
2. Upload semua file ini ke repo

### Langkah 2 — Connect ke Netlify
1. Buka [netlify.com](https://netlify.com) → login pakai GitHub
2. Klik **"Add new site" → "Import an existing project"**
3. Pilih repo `anya-art`
4. Klik **Deploy** — website langsung live!

### Langkah 3 — Aktifkan CMS
1. Di dashboard Netlify → **Identity** → klik **"Enable Identity"**
2. Scroll ke **Registration** → pilih **"Invite only"**
3. Klik **"Invite users"** → masukkan email kakak
4. Di **Services → Git Gateway** → klik **"Enable Git Gateway"**
5. Kakak akan dapat email undangan → klik link → buat password

### Langkah 4 — Kakak login ke CMS
- Buka: `https://nama-site.netlify.app/admin`
- Login pakai email & password yang sudah dibuat
- Selesai! Kakak bisa upload karya kapan saja 🎉

---

## 🖼️ Cara Kakak Upload Karya Baru (Setelah Setup)

1. Buka `https://nama-site.netlify.app/admin`
2. Login
3. Klik **"🖼️ Galeri Karya"** → **"New Karya"**
4. Isi judul, upload gambar, pilih kategori & tahun
5. Klik **Publish** → gambar otomatis muncul di website dalam ~1 menit

---

## ✏️ Cara Ganti Info Profil & Kontak

Bisa lewat CMS (lebih mudah):
1. Login ke `/admin`
2. Klik **"👤 Info Seniman"** → edit nama, foto, bio
3. Klik **"📬 Kontak & Sosmed"** → isi Instagram, email, WA
4. Klik **Save**

---

## 🎨 Fitur Website

- ✅ Galeri dengan filter kategori
- ✅ Lightbox — klik gambar untuk zoom
- ✅ Halaman About dengan foto & bio
- ✅ Kontak (Instagram, Email, WhatsApp)
- ✅ Responsive — HP dan laptop
- ✅ CMS — kakak bisa upload mandiri tanpa coding
- ✅ Gratis total (Netlify free tier)
