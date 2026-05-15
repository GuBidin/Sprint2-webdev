// ── SLIDESHOW ──────────────────────────────────────────────
const slides = document.querySelectorAll('.slide');
let slideAtual = 0;
let intervaloSlide;

function atualizarSlide(index) {
  slides.forEach(function(s) {
    s.classList.remove('active');
  });
  slides[index].classList.add('active');
}

function proximoSlide() {
  slideAtual = slideAtual + 1;
  if (slideAtual >= slides.length) {
    slideAtual = 0;
  }
  atualizarSlide(slideAtual);
}

if (slides.length > 0) {
  intervaloSlide = setInterval(proximoSlide, 4000);
}


