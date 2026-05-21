/* ========================================= */
/* 1. MÚSICA E TELA INICIAL                  */
/* ========================================= */
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let isPlaying = false;

function startSite() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  if(welcomeScreen) welcomeScreen.style.opacity = '0';
  
  if(music) {
    music.play().then(() => {
      isPlaying = true;
      if(musicToggle) musicToggle.innerHTML = "❚❚";
    }).catch((e) => console.log("Áudio bloqueado pelo navegador:", e));
  }
  
  setTimeout(() => {
    if(welcomeScreen) welcomeScreen.style.display = 'none';
  }, 800);
}

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
/* 2. NAVEGAÇÃO E ANIMAÇÃO DE ROLAGEM        */
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
  const mobileMenu = document.getElementById('mobileMenu');
  if(mobileMenu) mobileMenu.classList.remove('active');
  const menuToggle = document.getElementById('menuToggle');
  if(menuToggle) menuToggle.innerHTML = '☰';
}

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal();

/* ========================================= */
/* 3. CONTAGEM REGRESSIVA                    */
/* ========================================= */
try {
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
} catch (e) { console.log(e); }

/* ========================================= */
/* 4. CARROSSEIS (IMAGENS)                   */
/* ========================================= */
try {
  const heroImages = [
    "1Ib8Jd_IK-O2-Zzndg-V57MPDqPuNspeQ",
    "1NbgLj-abHYd8g5ybmlpL1wtsdOZ2Lbwe"
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

  const galleryImages = [
    "1hYB-peHdc_iJZwDxbxZfra6n4Y-HejUr",
    "1NbgLj-abHYd8g5ybmlpL1wtsdOZ2Lbwe",
    "1Ib8Jd_IK-O2-Zzndg-V57MPDqPuNspeQ"
  ];
  const carouselTrack = document.getElementById("carouselTrack");
  if (carouselTrack) {
    galleryImages.forEach(id => {
      const img = document.createElement("img");
      img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
      img.loading = "lazy";
      carouselTrack.appendChild(img);
    });
  }

  let currentSlide = 0;
  setInterval(() => {
    const slides = document.querySelectorAll(".hero-slider img");
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove("active"));
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 5000);

  let currentCarousel = 0;
  window.moveCarousel = function(direction) {
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
} catch (e) { console.log(e); }

/* MENU MOBILE TOGGLE */
try {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      menuToggle.innerHTML = mobileMenu.classList.contains("active") ? "✕" : "☰";
    });
  }
} catch (e) { console.log(e); }

/* ========================================= */
/* 5. MODAL DE LOCALIZAÇÃO (MAPA)            */
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
  const btn = document.getElementById('btnCopiarEndereco');
  if(btn) {
    btn.innerText = "Copiar Endereço";
    btn.style.background = "#5F742F";
  }
}
function copyMapAddress() {
  const text = document.getElementById('mapAddress').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btnCopiarEndereco');
    btn.innerText = "Copiado! ✓";
    btn.style.background = "#AAB38C";
  });
}

/* ========================================= */
/* 6. GERADOR DE PIX COPIA E COLA CORRIGIDO  */
/* ========================================= */
function removeAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '');
}

function gerarPayloadPix(valorStr, descricao) {
  // ATENÇÃO: Chaves de celular exigem o +55 na frente! 
  // O código não roda nos bancos sem ele.
  const chave = "+5531993539240"; 
  const nome = "IGOR BRUNO ALVES MALTA".substring(0, 25);
  const cidade = "Belo Horizonte";
  
  // Limpa o formato de moeda para o padrão do Banco Central (ex: 5353.23)
  const valorNum = parseFloat(valorStr.replace(/\./g, '').replace(',', '.')).toFixed(2);
  
  // Limpa caracteres especiais do comentário
  const desc = removeAcentos(descricao).substring(0, 40);

  // Função criadora de TLV (Tag, Length, Value)
  const tlv = (id, val) => {
    const strVal = String(val);
    const len = strVal.length.toString().padStart(2, '0');
    return id + len + strVal;
  };

  // Montagem da estrutura EMV padrão do PIX
  let merchantAccount = tlv('00', 'br.gov.bcb.pix') + tlv('01', chave) + tlv('02', desc);

  let payload = tlv('00', '01') + 
                tlv('26', merchantAccount) +
                tlv('52', '0000') + 
                tlv('53', '986') + 
                tlv('54', valorNum) + 
                tlv('58', 'BR') + 
                tlv('59', nome) + 
                tlv('60', cidade) + 
                tlv('62', tlv('05', '***')) +
                '6304'; // Finaliza com a TAG do CRC16

  // Cálculo matemático do CRC16 CCITT
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= (payload.charCodeAt(i) << 8) & 0xFFFF;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  const crcFinal = crc.toString(16).toUpperCase().padStart(4, '0');
  
  return payload + crcFinal;
}

function openPixModal(name, price) {
  document.getElementById('pixTargetName').innerText = name;
  document.getElementById('pixTargetPrice').innerText = price;
  
  // Gera a string na hora que o usuário clica no presente
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
  const code = document.getElementById('realPixString').value;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('btnCopiarPix');
    btn.innerText = "Código Copiado! ✓";
    btn.style.background = "#AAB38C";
  });
}
