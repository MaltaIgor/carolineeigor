```javascript
/* ========================= */
/* CONTAGEM REGRESSIVA */
/* ========================= */

const weddingDate = new Date(
  "Aug 15, 2026 16:00:00"
).getTime();

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
/* FOTOS GOOGLE DRIVE */
/* ========================= */

const driveImages = [

  /*
    COLOQUE AQUI OS IDS DAS IMAGENS

    EXEMPLO:

    "1AbCdEfGh",
    "9XyZwKlmN"

  */

];

const gallery =
  document.getElementById("gallery");

const heroSlider =
  document.getElementById("heroSlider");

driveImages.forEach((id, index) => {

  const imageUrl =
    `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;

  /* GALERIA */

  const img =
    document.createElement("img");

  img.src = imageUrl;

  gallery.appendChild(img);

  /* HERO */

  const heroImg =
    document.createElement("img");

  heroImg.src = imageUrl;

  if(index === 0){
    heroImg.classList.add("active");
  }

  heroSlider.appendChild(heroImg);

});

/* ========================= */
/* HERO AUTO SLIDE */
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
/* RSVP */
/* ========================= */

const form =
  document.getElementById("rsvpForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = {
    nome: form.nome.value,
    acompanhantes: form.acompanhantes.value
  };

  await fetch(
    "COLE_AQUI_O_LINK_DO_APPS_SCRIPT",
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

  alert("Presença confirmada!");

  form.reset();

});
```
