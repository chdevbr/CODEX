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

function showToast(message) {
  const existingToast = document.querySelector(".codex-toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "codex-toast";

  toast.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  const btnLogin = document.getElementById("btn-login");
  const btnCriar = document.getElementById("btn-cadastrar-conta");

  function goToFiltro() {
    window.location.href = "./pages/filtro.html";
  }

  if (btnLogin) {
    btnLogin.addEventListener("click", function (e) {
      e.preventDefault();
      const email = document.getElementById("login-email")?.value.trim();
      const senha = document.getElementById("login-senha")?.value.trim();

      if (!email || !senha) {
        showToast("Preencha email e senha para entrar.");
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
    btnCriar.addEventListener("click", function (e) {
      e.preventDefault();
      const usuario = document.getElementById("cad-usuario")?.value.trim();
      const email = document.getElementById("cad-email")?.value.trim();
      const senha = document.getElementById("cad-senha")?.value.trim();

      if (!usuario || !email || !senha) {
        showToast("Preencha usuário, email e senha para cadastrar.");
        return;
      }

      localStorage.setItem("codex_logged", "true");
      localStorage.setItem("codex_user", JSON.stringify({ usuario, email }));

      goToFiltro();
    });
  }
});