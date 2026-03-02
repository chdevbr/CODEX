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

document.addEventListener("DOMContentLoaded", function () {
  const btnLogin = document.getElementById("btn-login");
  const btnCriar = document.getElementById("btn-cadastrar-conta");

  function goToFiltro() {
    window.location.href = "./pages/filtro.html";
  }

  if (btnLogin) {
    btnLogin.addEventListener("click", function () {
      const email = document.getElementById("login-email")?.value.trim();
      const senha = document.getElementById("login-senha")?.value.trim();

      if (!email || !senha) {
        alert("Preencha email e senha para entrar.");
        return;
      }

      localStorage.setItem("codex_logged", "true");

      const existing = localStorage.getItem("codex_user");
      if (!existing) {
        localStorage.setItem("codex_user", JSON.stringify({ email }));
      }

      goToFiltro();
    });
  }

  if (btnCriar) {
    btnCriar.addEventListener("click", function () {
      const usuario = document.getElementById("cad-usuario")?.value.trim();
      const email = document.getElementById("cad-email")?.value.trim();
      const senha = document.getElementById("cad-senha")?.value.trim();

      if (!usuario || !email || !senha) {
        alert("Preencha usuário, email e senha para cadastrar.");
        return;
      }

      localStorage.setItem("codex_logged", "true");
      localStorage.setItem("codex_user", JSON.stringify({ usuario, email }));

      goToFiltro();
    });
  }
});
