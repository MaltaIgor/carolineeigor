/* ========================================= */
/* INICIALIZAÇÃO E BOAS VINDAS (MÚSICA)      */
/* ========================================= */
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let isPlaying = false;

function startSite() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  welcomeScreen.style.opacity = '0';
  
  // Tenta tocar a música assim que o usuário clica
  if(music) {
    music.play().then(() => {
      isPlaying = true;
      musicToggle.innerHTML = "❚❚";
    }).catch((e) => console.log("Audio block:", e));
  }
  
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
  }, 800);
}

// Botão de Pause/Play flutuante
if (musicToggle && music) {
  musicToggle.addEventListener("click", () => {
    if (!isPlaying) {
      music.play();
      isPlaying = true;
      musicToggle.innerHTML = "❚❚";
    } else {
      music.pause();
      isPlaying = false;
      musicToggle.innerHTML = "♫";
    }
  });
}

/* ========================================= */
/* NAVEGAÇÃO SINGLE-PAGE (NÃO PARA A MÚSICA) */
/* ========================================= */
function showPresentes() {
  document.getElementById('home-view').style.display = 'none';
  document.getElementById('presentes-view').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome() {
  document.getElementById('presentes-view').style.display = 'none';
  document.getElementById('home-view').style.display = 'block';
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('active');
  document.getElementById('menuToggle').innerHTML = '☰';
}

/* ========================================= */
/* ANIMAÇÃO DE SCROLL (REVEAL)               */
/* ========================================= */
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 80;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal(); // Chama no início

/* ========================================= */
/* COUNTDOWN LOGIC                           */
/* ========================================= */
const weddingDate = new Date("Oct 31, 2026 20:30:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  const daysEl = document.getElementById("days");
  if (daysEl) daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hoursEl = document.getElementById("hours");
  if (hoursEl) hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesEl = document.getElementById("minutes");
  if (minutesEl) minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secondsEl = document.getElementById("seconds");
  if (secondsEl) secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

/* ========================================= */
/* CARROSSEIS DE IMAGENS DO DRIVE            */
/* ========================================= */
const heroImages = [
  "1Ib8Jd_IK-O2-Zzndg-V57MPDqPuNspeQ",
  "1NbgLj-abHYd8g5ybmlpL1wtsdOZ2Lbwe"
];
const galleryImages = [
  "1hYB-peHdc_iJZwDxbxZfra6n4Y-HejUr",
  "1NbgLj-abHYd8g5ybmlpL1wtsdOZ2Lbwe",
  "1Ib8Jd_IK-O2-Zzndg-V57MPDqPuNspeQ"
];

const heroSlider = document.getElementById("heroSlider");
if (heroSlider) {
  heroImages.forEach((id, index) => {
    const img = document.createElement("img");
    img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
    if (index === 0) img.classList.add("active");
    heroSlider.appendChild(img);
  });
}

const carouselTrack = document.getElementById("carouselTrack");
if (carouselTrack) {
  galleryImages.forEach(id => {
    const img = document.createElement("img");
    img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
    img.loading = "lazy";
    carouselTrack.appendChild(img);
  });
}

/* CROSSFADE HERO */
let currentSlide = 0;
setInterval(() => {
  const slides = document.querySelectorAll(".hero-slider img");
  if (slides.length === 0) return;
  slides.forEach(slide => slide.classList.remove("active"));
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 5000);

/* CAROUSEL LOGIC */
let currentCarousel = 0;
function moveCarousel(direction) {
  const track = document.getElementById("carouselTrack");
  if (!track) return;
  const images = document.querySelectorAll(".carousel-track img");
  if (images.length === 0) return;
  currentCarousel += direction;
  if (currentCarousel < 0) currentCarousel = 0;
  if (currentCarousel > images.length - 1) currentCarousel = images.length - 1;
  const imageWidth = images[0].offsetWidth + 24;
  track.style.transform = `translateX(-${currentCarousel * imageWidth}px)`;
}
setInterval(() => {
  const track = document.getElementById("carouselTrack");
  if (!track) return;
  const images = document.querySelectorAll(".carousel-track img");
  if (images.length === 0) return;
  currentCarousel++;
  if (currentCarousel >= images.length) currentCarousel = 0;
  const imageWidth = images[0].offsetWidth + 24;
  track.style.transform = `translateX(-${currentCarousel * imageWidth}px)`;
}, 4000);

/* ========================================= */
/* MENU MOBILE TOGGLE                        */
/* ========================================= */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    menuToggle.innerHTML = mobileMenu.classList.contains("active") ? "✕" : "☰";
  });
}

/* ========================================= */
/* MODAL MAPA                                */
/* ========================================= */
function openMap(title, address, iframeSrc) {
  document.getElementById('mapTitle').innerText = title;
  document.getElementById('mapAddress').innerText = address;
  document.getElementById('mapIframe').src = iframeSrc;
  document.getElementById('modalMap').style.display = 'flex';
}
function closeMapModal() {
  document.getElementById('modalMap').style.display = 'none';
  document.getElementById('mapIframe').src = "";
}
function copyMapAddress() {
  const text = document.getElementById('mapAddress').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Endereço copiado com sucesso!");
  });
}

/* ========================================= */
/* GERADOR DE PIX COPIA E COLA OFICIAL       */
/* ========================================= */
function removeAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '');
}

function gerarPayloadPix(valorStr, descricao) {
  const chave = "31993539240";
  const nome = removeAcentos("Igor Bruno Alves Malta").substring(0,25);
  const cidade = "Belo Horizonte";
  // Trata formato de moeda (ex: "5.353,23" -> "5353.23")
  const valorNum = parseFloat(valorStr.replace(/\./g, '').replace(',', '.')).toFixed(2);
  const desc = removeAcentos(descricao).substring(0, 40);

  // Função utilitária para o formato TLV do Banco Central
  const tlv = (id, val) => id + val.length.toString().padStart(2, '0') + val;

  // Montando Account Information (Onde vai a chave PIX e descrição)
  let merchantAccount = tlv('00', 'br.gov.bcb.pix') + tlv('01', chave);
  if(desc) merchantAccount += tlv('02', desc);

  // Montando payload base
  let payload = tlv('00', '01') + // Payload Format Indicator
                tlv('26', merchantAccount) +
                tlv('52', '0000') + // Merchant Category Code
                tlv('53', '986') + // Moeda R$
                tlv('54', valorNum) + // Valor da transação
                tlv('58', 'BR') + // Country Code
                tlv('59', nome) + // Nome
                tlv('60', cidade) + // Cidade
                tlv('62', tlv('05', '***')); // TxId (*** é obrigatório se for livre)
                
  payload += '6304'; // CRC16 Header

  // Calcula o CRC16 CCITT
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) crc = (crc << 1) ^ 0x1021;
      else crc = crc << 1;
    }
  }
  const crcFinal = (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  
  return payload + crcFinal;
}

/* FUNÇÕES DO MODAL PIX */
function openPixModal(name, price) {
  document.getElementById('pixTargetName').innerText = name;
  document.getElementById('pixTargetPrice').innerText = price;
  
  // Gera a string do PIX Copia e Cola automaticamente!
  const pixCopiaECola = gerarPayloadPix(price, name);
  document.getElementById('realPixString').value = pixCopiaECola;

  document.getElementById('modalPix').style.display = 'flex';
}

function closePixModal() {
  document.getElementById('modalPix').style.display = 'none';
  const btn = document.getElementById('btnCopiarPix');
  btn.innerText = "Copiar Código PIX";
  btn.style.background = "#5F742F";
}

function copyPixCode() {
  // Copia o código que foi gerado em background
  const code = document.getElementById('realPixString').value;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('btnCopiarPix');
    btn.innerText = "Código Copiado! ✓";
    btn.style.background = "#AAB38C";
  });
}
