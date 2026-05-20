/* ========================= */
/* DATA */
/* ========================= */

const weddingDate = new Date(
  "Oct 31, 2026 20:30:00"
).getTime();

/* ========================= */
/* COUNTDOWN */
/* ========================= */

setInterval(() => {

  const now = new Date().getTime();

  const distance = weddingDate - now;

  document.getElementById("days").innerText =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("hours").innerText =
    Math.floor(
      (distance % (1000 * 60 * 60 * 24))
      / (1000 * 60 * 60)
    );

  document.getElementById("minutes").innerText =
    Math.floor(
      (distance % (1000 * 60 * 60))
      / (1000 * 60)
    );

  document.getElementById("seconds").innerText =
    Math.floor(
      (distance % (1000 * 60))
      / 1000
    );

}, 1000);

/* ========================= */
/* GOOGLE DRIVE */
/* ========================= */

const driveImages = [
  "1hYB-peHdc_iJZwDxbxZfra6n4Y-HejUr",
  "1NbgLj-abHYd8g5ybmlpL1wtsdOZ2Lbwe",
  "1Ib8Jd_IK-O2-Zzndg-V57MPDqPuNspeQ"
];

const gallery =
  document.getElementById("gallery");

const heroSlider =
  document.getElementById("heroSlider");

driveImages.forEach((id, index) => {

  const imageUrl =
    `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;

  const img =
    document.createElement("img");

  img.src = imageUrl;

  gallery.appendChild(img);

  const heroImg =
    document.createElement("img");

  heroImg.src = imageUrl;

  if(index === 0){
    heroImg.classList.add("active");
  }

  heroSlider.appendChild(heroImg);

});

/* ========================= */
/* HERO SLIDER */
/* ========================= */

let currentSlide = 0;

setInterval(() => {

  const slides =
    document.querySelectorAll(".hero-slider img");

  if(slides.length === 0) return;

  slides.forEach(slide =>
    slide.classList.remove("active")
  );

  currentSlide =
    (currentSlide + 1) % slides.length;

  slides[currentSlide]
    .classList.add("active");

}, 5000);




/* ========================= */
/* CAROUSEL */
/* ========================= */

const carouselImages = [

  "1hYB-peHdc_iJZwDxbxZfra6n4Y-HejUr",
  "1NbgLj-abHYd8g5ybmlpL1wtsdOZ2Lbwe",
  "1Ib8Jd_IK-O2-Zzndg-V57MPDqPuNspeQ"

];

const carouselTrack =
  document.getElementById("carouselTrack");

carouselImages.forEach(id => {

  const img =
    document.createElement("img");

  img.src =
    `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;

  img.loading = "lazy";

  carouselTrack.appendChild(img);

});

let currentCarousel = 0;

function moveCarousel(direction){

  const images =
    document.querySelectorAll(
      ".carousel-track img"
    );

  if(images.length === 0) return;

  currentCarousel += direction;

  if(currentCarousel < 0){
    currentCarousel = 0;
  }

  if(currentCarousel > images.length - 1){
    currentCarousel = images.length - 1;
  }

  const imageWidth =
    images[0].offsetWidth + 24;

  carouselTrack.style.transform =
    `translateX(-${currentCarousel * imageWidth}px)`;

}

/* AUTOPLAY */

setInterval(() => {

  const images =
    document.querySelectorAll(
      ".carousel-track img"
    );

  if(images.length === 0) return;

  currentCarousel++;

  if(currentCarousel >= images.length){
    currentCarousel = 0;
  }

  const imageWidth =
    images[0].offsetWidth + 24;

  carouselTrack.style.transform =
    `translateX(-${currentCarousel * imageWidth}px)`;

}, 4000);

/* ========================= */
/* MUSICA */
/* ========================= */

const music =
  document.getElementById("bgMusic");

const musicToggle =
  document.getElementById("musicToggle");

let playing = false;

musicToggle.addEventListener(
  "click",
  async () => {

    if(!playing){

      await music.play();

      playing = true;

      musicToggle.innerHTML = "❚❚";

    }else{

      music.pause();

      playing = false;

      musicToggle.innerHTML = "♫";

    }

  }
);

/* ========================= */
/* MENU MOBILE */
/* ========================= */

const menuToggle =
  document.getElementById("menuToggle");

const mobileMenu =
  document.getElementById("mobileMenu");

menuToggle.addEventListener(
  "click",
  () => {

    mobileMenu.classList.toggle("active");

    if(
      mobileMenu.classList.contains("active")
    ){
      menuToggle.innerHTML = "✕";
    }else{
      menuToggle.innerHTML = "☰";
    }

  }
);

/* FECHAR MENU AO CLICAR */

document
  .querySelectorAll(".mobile-menu a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mobileMenu.classList.remove("active");

        menuToggle.innerHTML = "☰";

      }
    );

  });



