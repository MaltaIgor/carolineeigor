/* ========================= */
/* DATA DO CASAMENTO */
/* ========================= */
const weddingDate = new Date("Oct 31, 2026 20:30:00").getTime();

/* ========================= */
/* COUNTDOWN LOGIC */
/* ========================= */
setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
  if (hoursEl) hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (minutesEl) minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  if (secondsEl) secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

/* ========================= */
/* IMAGENS DO DRIVE APARTADAS */
/* ========================= */

// 1. Imagens exclusivas do Slider Inicial de Fundo (Hero)
const heroImages = [
  "1Ib8Jd_IK-O2-Zzndg-V57MPDqPuNspeQ",
  "1NbgLj-abHYd8g5ybmlpL1wtsdOZ2Lbwe"
];

// 2. Imagens exclusivas do Carrossel de Momentos (Galeria debaixo)
const galleryImages = [
  "1hYB-peHdc_iJZwDxbxZfra6n4Y-HejUr",
  "1NbgLj-abHYd8g5ybmlpL1wtsdOZ2Lbwe",
  "1Ib8Jd_IK-O2-Zzndg-V57MPDqPuNspeQ"
];

/* INJEÇÃO DAS IMAGENS NO BANNER PRINCIPAL (HERO) */
const heroSlider = document.getElementById("heroSlider");
if (heroSlider) {
  heroImages.forEach((id, index) => {
    const imageUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
    const img = document.createElement("img");
    img.src = imageUrl;
    if (index === 0) {
      img.classList.add("active");
    }
    heroSlider.appendChild(img);
  });
}

/* INJEÇÃO DAS IMAGENS NO CARROSSEL DE MOMENTOS */
const carouselTrack = document.getElementById("carouselTrack");
if (carouselTrack) {
  galleryImages.forEach(id => {
    const img = document.createElement("img");
    img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
    img.loading = "lazy";
    carouselTrack.appendChild(img);
  });
}

/* ========================= */
/* AUTOMAÇÃO HERO SLIDER (CROSSFADE) */
/* ========================= */
let currentSlide = 0;
setInterval(() => {
  const slides = document.querySelectorAll(".hero-slider img");
  if (slides.length === 0) return;

  slides.forEach(slide => slide.classList.remove("active"));
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 5000);

/* ========================= */
/* CAROUSEL LOGIC */
/* ========================= */
let currentCarousel = 0;

function moveCarousel(direction) {
  const track = document.getElementById("carouselTrack");
  if (!track) return;
  
  const images = document.querySelectorAll(".carousel-track img");
  if (images.length === 0) return;

  currentCarousel += direction;

  if (currentCarousel < 0) {
    currentCarousel = 0;
  }
  if (currentCarousel > images.length - 1) {
    currentCarousel = images.length - 1;
  }

  const imageWidth = images[0].offsetWidth + 24; // Largura da imagem + Gap do CSS
  track.style.transform = `translateX(-${currentCarousel * imageWidth}px)`;
}

/* AUTOPLAY DO CARROSSEL DE FOTOS */
setInterval(() => {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  const images = document.querySelectorAll(".carousel-track img");
  if (images.length === 0) return;

  currentCarousel++;
  if (currentCarousel >= images.length) {
    currentCarousel = 0;
  }

  const imageWidth = images[0].offsetWidth + 24;
  track.style.transform = `translateX(-${currentCarousel * imageWidth}px)`;
}, 4000);

/* ========================= */
/* MUSICA LOGIC */
/* ========================= */
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let playing = false;

if (musicToggle && music) {
  musicToggle.addEventListener("click", async () => {
    if (!playing) {
      await music.play();
      playing = true;
      musicToggle.innerHTML = "❚❚";
    } else {
      music.pause();
      playing = false;
      musicToggle.innerHTML = "♫";
    }
  });
}

/* ========================= */
/* MENU MOBILE LOGIC */
/* ========================= */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    if (mobileMenu.classList.contains("active")) {
      menuToggle.innerHTML = "✕";
    } else {
      menuToggle.innerHTML = "☰";
    }
  });

  // Fecha o menu mobile de forma automática ao clicar em qualquer item
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuToggle.innerHTML = "☰";
    });
  });
}
