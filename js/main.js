/* =====================================================
   Anya Art Portfolio — main.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', async () => {

  // =====================
  // 1. MOBILE NAV TOGGLE
  // =====================
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // =====================
  // 2. LOAD DATA DARI CMS
  // =====================
  await loadAbout();
  await loadContact();
  await loadGallery();

  // =====================
  // 3. NAV SHADOW ON SCROLL
  // =====================
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 40 ? '0 4px 30px rgba(0,0,0,0.3)' : 'none';
  });

  // =====================
  // 4. SMOOTH SCROLL
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

/* =====================================================
   LOAD ABOUT
   ===================================================== */
async function loadAbout() {
  try {
    const res  = await fetch('_data/about.json');
    if (!res.ok) return;
    const data = await res.json();

    // Nama
    document.querySelectorAll('.artist-name').forEach(el => el.textContent = data.name || 'Anya');
    document.querySelector('.nav-logo').textContent = (data.name || 'Anya') + ' Art';

    // Foto
    const photoWrap = document.querySelector('.about-img-wrap');
    if (data.photo && photoWrap) {
      photoWrap.innerHTML = `<img src="${data.photo}" alt="Foto ${data.name}" />`;
    }

    // Bio
    const bio1El = document.getElementById('bio1');
    const bio2El = document.getElementById('bio2');
    if (bio1El && data.bio1) bio1El.textContent = data.bio1;
    if (bio2El && data.bio2) bio2El.textContent = data.bio2;

    // Stats
    const artEl  = document.getElementById('stat-artworks');
    const yearEl = document.getElementById('stat-years');
    if (artEl  && data.artworks) artEl.textContent  = data.artworks;
    if (yearEl && data.years)    yearEl.textContent  = data.years;

  } catch (e) {
    console.log('About data not found, using defaults.');
  }
}

/* =====================================================
   LOAD CONTACT
   ===================================================== */
async function loadContact() {
  try {
    const res  = await fetch('_data/contact.json');
    if (!res.ok) return;
    const data = await res.json();

    const igBtn = document.getElementById('btn-instagram');
    const emBtn = document.getElementById('btn-email');
    const waBtn = document.getElementById('btn-whatsapp');

    if (igBtn) {
      if (data.instagram) {
        igBtn.href = `https://instagram.com/${data.instagram}`;
        igBtn.style.display = 'inline-block';
      } else {
        igBtn.style.display = 'none';
      }
    }
    if (emBtn) {
      if (data.email) {
        emBtn.href = `mailto:${data.email}`;
        emBtn.style.display = 'inline-block';
      } else {
        emBtn.style.display = 'none';
      }
    }
    if (waBtn) {
      if (data.whatsapp) {
        waBtn.href = `https://wa.me/${data.whatsapp}`;
        waBtn.style.display = 'inline-block';
      } else {
        waBtn.style.display = 'none';
      }
    }

  } catch (e) {
    console.log('Contact data not found, using defaults.');
  }
}

/* =====================================================
   LOAD GALLERY DARI _data/gallery/*.json
   ===================================================== */
async function loadGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  try {
    // Fetch index daftar file galeri
    const res = await fetch('_data/gallery/index.json');
    if (!res.ok) {
      // Kalau belum ada index, pakai placeholder HTML yang sudah ada
      initGalleryInteractions();
      return;
    }

    const files = await res.json(); // array nama file: ["karya-1.json", "karya-2.json"]

    // Load semua file karya
    const artworks = await Promise.all(
      files.map(async (fname) => {
        const r = await fetch(`_data/gallery/${fname}`);
        return r.ok ? r.json() : null;
      })
    );

    // Render ke grid
    grid.innerHTML = '';
    artworks
      .filter(Boolean)
      .sort((a, b) => b.year - a.year) // terbaru dulu
      .forEach(art => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.filter = art.filter || 'digital';
        item.innerHTML = `
          <img src="${art.image}" alt="${art.title}" loading="lazy" />
          <div class="gallery-overlay">
            <h3>${art.title}</h3>
            <span>${labelFilter(art.filter)} · ${art.year}</span>
          </div>
        `;
        grid.appendChild(item);
      });

  } catch (e) {
    console.log('Gallery index not found, using placeholder items.');
  }

  initGalleryInteractions();
}

function labelFilter(filter) {
  const map = { digital: 'Digital', sketch: 'Sketsa', character: 'Karakter', landscape: 'Landscape' };
  return map[filter] || filter;
}

/* =====================================================
   FILTER + LIGHTBOX (dijalankan setelah gallery render)
   ===================================================== */
function initGalleryInteractions() {

  // --- FILTER ---
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const galleryItems = () => document.querySelectorAll('.gallery-item'); // dynamic

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems().forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.filter !== filter);
      });
    });
  });

  // --- LIGHTBOX ---
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose   = document.getElementById('lightboxClose');

  document.getElementById('galleryGrid').addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    const img     = item.querySelector('img');
    const title   = item.querySelector('h3')?.textContent || '';
    const caption = item.querySelector('span')?.textContent || '';

    if (!img?.src || img.src.includes('placeholder')) return;

    lightboxImg.src             = img.src;
    lightboxImg.alt             = title;
    lightboxCaption.textContent = `${title} — ${caption}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }
}
