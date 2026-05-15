//SLIDESHOW 
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

//MANIPULAÇÃO DE STRINGS 
function limparTexto(str) {
  return str.trim();
}

function validarEmail(email) {
  return email.includes('@') && email.includes('.');
}

function formatarTelefone(valor) {
  let nums = valor.replace(/\D/g, '');

  if (nums.length <= 2) return '(' + nums;
  if (nums.length <= 6) return '(' + nums.slice(0, 2) + ') ' + nums.slice(2);
  if (nums.length <= 10) return '(' + nums.slice(0, 2) + ') ' + nums.slice(2, 6) + '-' + nums.slice(6);
  return '(' + nums.slice(0, 2) + ') ' + nums.slice(2, 7) + '-' + nums.slice(7, 11);
}


