(function () {
  if (localStorage.getItem("codex_logged") !== "true") {
    window.location.href = "../index.html";
    return;
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
    info.hidden = !(hasIdade && (hasEscola || naoEstudo.checked));
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
      alert("Informe sua idade.");
      return;
    }

    if (!naoEstudo.checked && !escolaVal) {
      alert("Informe a escola (ou marque 'Não estudo mais').");
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
  btnComecar.addEventListener("click", () => {
    localStorage.setItem("codex_onboarding_done", "true");
    window.location.href = "./conectando.html";
  });

  showStep(1);
})();
