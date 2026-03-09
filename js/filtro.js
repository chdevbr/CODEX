(function () {
  if (localStorage.getItem("codex_logged") !== "true") {
    window.location.href = "../index.html";
    return;
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

  const steps = Array.from(document.querySelectorAll(".fx-step"));

  function showStep(n) {
    steps.forEach((s) => s.classList.remove("active"));
    document
      .querySelector(`.fx-step[data-step="${n}"]`)
      ?.classList.add("active");
  }

  let profile = null;
  const picks = document.querySelectorAll(".fx-cardPick");
  picks.forEach((p) => {
    p.addEventListener("click", () => {
      picks.forEach((x) => x.classList.remove("selected"));
      p.classList.add("selected");
      profile = p.getAttribute("data-profile");
      setTimeout(() => showStep(2), 150);
    });
  });

  const fxHello = document.getElementById("fxHello");
  const idade = document.getElementById("fxIdade");
  const escola = document.getElementById("fxEscola");
  const naoEstudo = document.getElementById("fxNaoEstudo");
  const info = document.getElementById("fxInfo");
  const btn2 = document.getElementById("fxContinuar2");

  try {
    const u = JSON.parse(localStorage.getItem("codex_user") || "{}");
    const nome = u.usuario || u.email || "leitor(a)";
    fxHello.textContent = `Olá, ${nome}!`;
  } catch {}

  function updateInfo() {
    const hasIdade = !!idade.value;
    const hasEscola = !!escola.value.trim();
    if (info) {
      info.hidden = !(hasIdade && (hasEscola || naoEstudo.checked));
    }
  }

  idade.addEventListener("input", updateInfo);
  escola.addEventListener("input", updateInfo);
  naoEstudo.addEventListener("change", () => {
    if (naoEstudo.checked) {
      escola.value = "";
      escola.disabled = true;
      escola.classList.add("is-disabled");
    } else {
      escola.disabled = false;
      escola.classList.remove("is-disabled");
    }
    updateInfo();
  });

  btn2.addEventListener("click", () => {
    const idadeVal = idade.value.trim();
    const escolaVal = escola.value.trim();

    if (!idadeVal) {
      showToast("Informe sua idade.");
      return;
    }

    if (!naoEstudo.checked && !escolaVal) {
      showToast("Informe a escola (ou marque 'Não estudo mais').");
      return;
    }

    const user = JSON.parse(localStorage.getItem("codex_user") || "{}");
    user.profile = profile || user.profile || "iniciante";
    user.idade = Number(idadeVal);
    user.escola = naoEstudo.checked ? null : escolaVal;

    localStorage.setItem("codex_user", JSON.stringify(user));
    showStep(3);
  });

  const btnComecar = document.getElementById("fxComecar");
  if (btnComecar) {
    btnComecar.addEventListener("click", () => {
      localStorage.setItem("codex_onboarding_done", "true");
      window.location.href = "./conectando.html";
    });
  }

  showStep(1);
})();