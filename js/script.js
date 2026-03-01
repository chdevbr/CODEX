function mostrarEntrar() {
  document.getElementById("form-entrar").classList.add("active");
  document.getElementById("form-cadastrar").classList.remove("active");
  document.getElementById("btn-entrar").classList.add("active");
  document.getElementById("btn-cadastrar").classList.remove("active");
}

function mostrarCadastrar() {
  document.getElementById("form-cadastrar").classList.add("active");
  document.getElementById("form-entrar").classList.remove("active");
  document.getElementById("btn-cadastrar").classList.add("active");
  document.getElementById("btn-entrar").classList.remove("active");
}