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
/* RSVP */
/* ========================= */


const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwAJ6f_Pnx-qRFAdjR9ufyrp8aj2DpDle899iZax2i51sFB1sN17maVd1YbczmvVqS7nQ/exec";

const loginForm =
  document.getElementById("loginForm");

const guestList =
  document.getElementById("guestList");

loginForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const telefone =
      document
        .getElementById("telefone")
        .value
        .replace(/\D/g,'');

    const response = await fetch(
      APPS_SCRIPT_URL,
      {
        method:"POST",
        body:JSON.stringify({
          action:"login",
          telefone
        })
      }
    );

    const convidados =
      await response.json();

    if(convidados.length === 0){

      guestList.innerHTML = `
        <p>
          Telefone não encontrado.
        </p>
      `;

      return;

    }

    let html = `
      <h3 style="
        margin-bottom:30px;
        color:#5F742F;
      ">
        Confirme os convidados
      </h3>
    `;

    convidados.forEach((pessoa, index) => {

      html += `
        <div style="
          background:white;
          padding:24px;
          border-radius:18px;
          margin-bottom:18px;
          text-align:left;
        ">

          <h4>
            ${pessoa.convidado}
          </h4>

          <div style="
            margin-top:18px;
            display:flex;
            gap:20px;
          ">

            <label>
              <input
                type="radio"
                name="confirmacao_${index}"
                value="Sim"
              >
              Vou
            </label>

            <label>
              <input
                type="radio"
                name="confirmacao_${index}"
                value="Não"
              >
              Não Vou
            </label>

          </div>

        </div>
      `;

    });

    html += `
      <button
        id="saveRsvp"
        style="
          margin-top:20px;
          background:#5F742F;
          color:white;
          border:none;
          padding:18px 40px;
          border-radius:14px;
          cursor:pointer;
        "
      >
        Salvar confirmação
      </button>
    `;

    guestList.innerHTML = html;

    document
      .getElementById("saveRsvp")
      .addEventListener(
        "click",
        async () => {

          const confirmacoes = [];

          convidados.forEach((pessoa, index) => {

            const checked =
              document.querySelector(
                `input[name="confirmacao_${index}"]:checked`
              );

            confirmacoes.push({
              rowIndex:pessoa.rowIndex,
              confirmado:
                checked
                  ? checked.value
                  : ""
            });

          });

          await fetch(
            APPS_SCRIPT_URL,
            {
              method:"POST",
              body:JSON.stringify({
                action:"confirmar",
                confirmacoes
              })
            }
          );

          guestList.innerHTML = `
            <h3 style="
              color:#5F742F;
            ">
              Presença confirmada!
            </h3>
          `;

        }
      );

  }
);
