// ===========================
// REGISTER SERVICE WORKER (PWA)
// ===========================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/dadan-cell/sw.js', { scope: '/dadan-cell/' })
      .then(function() {
        console.log('DADAN CELL: PWA aktif!');
      })
      .catch(function(err) {
        console.log('Service worker gagal:', err);
      });
  });
}

// ===========================
// NAVBAR MOBILE TOGGLE
// ===========================

// Tombol hamburger untuk membuka/menutup menu di HP
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');

navToggle.addEventListener('click', function() {
  navMobile.classList.toggle('open');
});

// Tutup mobile menu saat salah satu link diklik
const mobileLinks = navMobile.querySelectorAll('a');
mobileLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    navMobile.classList.remove('open');
  });
});


// ===========================
// NAVBAR SHADOW SAAT SCROLL
// ===========================

// Tambahkan shadow ke navbar saat halaman di-scroll ke bawah
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


// ===========================
// ANIMASI MUNCUL SAAT SCROLL
// ===========================

// Elemen yang akan diberi animasi saat terlihat di layar
const animatedElements = document.querySelectorAll('.card, .testi-card, .keunggulan-item');

// Fungsi untuk mengecek apakah elemen terlihat di layar
function isVisible(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight - 60;
}

// Tambahkan style awal (tersembunyi)
animatedElements.forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Fungsi untuk menampilkan elemen yang sudah terlihat
function revealElements() {
  animatedElements.forEach(function(el) {
    if (isVisible(el)) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

// Jalankan saat scroll dan saat pertama kali halaman dimuat
window.addEventListener('scroll', revealElements);
revealElements(); // Jalankan sekali saat halaman pertama dibuka


// ===========================
// TAHUN OTOMATIS DI FOOTER
// ===========================

// Update tahun di footer secara otomatis
const footer = document.querySelector('.footer p');
if (footer) {
  const tahun = new Date().getFullYear();
  footer.innerHTML = footer.innerHTML.replace('2025', tahun);
}
