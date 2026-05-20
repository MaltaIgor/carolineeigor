/* ========================= */
/* DATA DO CASAMENTO */
/* ========================= */
const weddingDate = new Date("Oct 31, 2026 20:30:00").getTime();

/* ========================= */
/* COUNTDOWN */
/* ========================= */
setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
  document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
}, 1000);

/* ========================= */
/* IMAGENS DO DRIVE (HERO & CAROUSEL) */
/* ========================= */
const driveImages = [
  "1hYB-peHdc_iJZwDxbxZfra6n4Y-HejUr",
  "1NbgLj-abHYd8g5ybmlpL1wtsdOZ2Lbwe",
  "1Ib8Jd_IK-O2-Zzndg-V57MPDqPuNspeQ"
];

const heroSlider = document.getElementById("heroSlider");
const carouselTrack = document.getElementById("carouselTrack");

// Injetar imagens no DOM
driveImages.forEach((id, index) => {
  const imageUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;

  // Para o Banner Inicial (Hero)
  if (heroSlider) {
    const heroImg = document.createElement("img");
    heroImg.src = imageUrl;
    if (index === 0) heroImg.classList.add("active");
    heroSlider.appendChild(heroImg);
  }

  // Para o Carrossel da Seção Fotos
  if (carouselTrack) {
    const carouselImg = document.createElement("img");
    carouselImg.src = imageUrl;
    carouselImg.loading = "lazy";
    carouselTrack.appendChild(carouselImg);
  }
});

/* ========================= */
/* HERO CROSSFADE LOGIC */
/* ========================= */
let currentSlide = 0;
setInterval(() => {
  if (!heroSlider) return;
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
  if (!carouselTrack) return;
  const images = document.querySelectorAll(".carousel-track img");
  if (images.length === 0) return;

  currentCarousel += direction;

  if (currentCarousel < 0) currentCarousel = 0;
  if (currentCarousel > images.length - 1) currentCarousel = images.length - 1;

  const imageWidth = images[0].offsetWidth + 24; // largura + gap
  carouselTrack.style.transform = `translateX(-${currentCarousel * imageWidth}px)`;
}

// Autoplay Carrossel
setInterval(() => {
  if (!carouselTrack) return;
  const images = document.querySelectorAll(".carousel-track img");
  if (images.length === 0) return;

  currentCarousel++;
  if (currentCarousel >= images.length) {
    currentCarousel = 0;
  }

  const imageWidth = images[0].offsetWidth + 24;
  carouselTrack.style.transform = `translateX(-${currentCarousel * imageWidth}px)`;
}, 4000);

/* ========================= */
/* MÚSICA BACKGROUND */
/* ========================= */
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let playing = false;

if (musicToggle) {
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
/* MENU MOBILE */
/* ========================= */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    menuToggle.innerHTML = mobileMenu.classList.contains("active") ? "✕" : "☰";
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuToggle.innerHTML = "☰";
    });
  });
}
