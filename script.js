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

//MÁSCARA DE TELEFONE 
const campoTelefone = document.getElementById('telefone');

campoTelefone.addEventListener('input', function() {
  this.value = formatarTelefone(this.value);
});


//FUNÇÕES DE ERRO 
function mostrarErro(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.add('visivel');
}

function limparErro(id) {
  const el = document.getElementById(id);
  el.textContent = '';
  el.classList.remove('visivel');
}

function marcarInvalido(campo) {
  campo.classList.add('invalido');
}

function marcarValido(campo) {
  campo.classList.remove('invalido');
}


//VALIDAÇÃO 
function validarCampos() {
  let valido = true;

  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const telefone = document.getElementById('telefone');
  const assunto  = document.getElementById('assunto');
  const mensagem = document.getElementById('mensagem');

  if (limparTexto(nome.value).length < 3) {
    mostrarErro('nomeErro', 'Por favor, informe seu nome completo.');
    marcarInvalido(nome);
    valido = false;
  } else {
    limparErro('nomeErro');
    marcarValido(nome);
  }

  if (!validarEmail(email.value)) {
    mostrarErro('emailErro', 'Informe um e-mail válido.');
    marcarInvalido(email);
    valido = false;
  } else {
    limparErro('emailErro');
    marcarValido(email);
  }

  const telLimpo = telefone.value.replace(/\D/g, '');
  if (telLimpo.length < 10) {
    mostrarErro('telefoneErro', 'Informe um telefone válido com DDD.');
    marcarInvalido(telefone);
    valido = false;
  } else {
    limparErro('telefoneErro');
    marcarValido(telefone);
  }

  if (assunto.value === '') {
    mostrarErro('assuntoErro', 'Selecione uma opção.');
    marcarInvalido(assunto);
    valido = false;
  } else {
    limparErro('assuntoErro');
    marcarValido(assunto);
  }

  if (limparTexto(mensagem.value).length < 10) {
    mostrarErro('mensagemErro', 'Escreva uma mensagem com pelo menos 10 caracteres.');
    marcarInvalido(mensagem);
    valido = false;
  } else {
    limparErro('mensagemErro');
    marcarValido(mensagem);
  }

  return valido;
}


//SUBMIT
const form = document.getElementById('form');

form.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const valido = validarCampos();

  if (!valido) {
    alert('⚠️ Por favor, corrija os campos destacados antes de enviar.');
    return;
  }

  const nomeVal = limparTexto(document.getElementById('nome').value);
  const assunto = document.getElementById('assunto');

  const confirmar = confirm('Olá, ' + nomeVal + '!\n\nDeseja confirmar o envio do formulário?');

  if (!confirmar) return;

  const btn = document.querySelector('.btn-enviar');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  setTimeout(function() {
    const sucesso = document.getElementById('sucesso');
    sucesso.hidden = false;

    if (assunto.value === 'nao') {
      alert('Ficamos tristes que ' + nomeVal + ' não esteja satisfeito(a). Vamos resolver isso! 📸');
    } else {
      alert('Obrigado, ' + nomeVal + '! Que bom que você gostou do resultado! 🎉');
    }

    form.reset();
    btn.disabled = false;
    btn.textContent = 'ENVIAR';

    setTimeout(function() {
      sucesso.hidden = true;
    }, 6000);

  }, 1200);
});


//LIMPEZA DE ERROS
const campos = ['nome', 'email', 'telefone', 'assunto', 'mensagem'];

campos.forEach(function(id) {
  const campo = document.getElementById(id);

  if (id === 'assunto') {
    campo.addEventListener('change', function() {
      marcarValido(campo);
      limparErro(id + 'Erro');
    });
  } else {
    campo.addEventListener('input', function() {
      marcarValido(campo);
      limparErro(id + 'Erro');
    });
  }
});


//BOTÃO LIMPAR USANDO DOM
const btnReset = document.createElement('button');
btnReset.type = 'button';
btnReset.textContent = 'Limpar formulário';
btnReset.style.cssText = `
  display: block;
  margin: 12px auto 0;
  background: transparent;
  border: none;
  color: #718096;
  font-size: 0.75rem;
  cursor: pointer;
  text-decoration: underline;
`;

btnReset.addEventListener('click', function() {
  const confirmar = confirm('Deseja limpar todos os campos?');

  if (confirmar) {
    form.reset();

    campos.forEach(function(id) {
      const campo = document.getElementById(id);
      marcarValido(campo);
      limparErro(id + 'Erro');
    });

    document.getElementById('sucesso').hidden = true;
  }
});

form.appendChild(btnReset);



