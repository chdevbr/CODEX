(function () {
  const btn = document.getElementById("btnComecar");

  const s2 = document.getElementById("s2");
  const s3 = document.getElementById("s3");
  const s4 = document.getElementById("s4");

  function setDone(stepEl) {
    stepEl.classList.remove("is-loading", "is-idle");
    stepEl.classList.add("is-done");
    stepEl.querySelector(".cx-step-ico").innerHTML =
      `<i class="fa-solid fa-check"></i>`;
  }

  function setLoading(stepEl) {
    stepEl.classList.remove("is-idle", "is-done");
    stepEl.classList.add("is-loading");
    stepEl.querySelector(".cx-step-ico").innerHTML =
      `<span class="cx-spinner" aria-hidden="true"></span>`;
  }

  function goHome() {
    // window.location.href = "./home.html";

    // Coloquei para ir para o index enquanto não tem Home
    window.location.href = "../index.html";
  }

  if (!btn || !s2 || !s3 || !s4) return;

  setTimeout(() => {
    setDone(s2);
    setLoading(s3);
  }, 1000);

  setTimeout(() => {
    setDone(s3);
    setLoading(s4);
  }, 2000);

  setTimeout(() => {
    setDone(s4);
    btn.disabled = false;
  }, 3000);

  btn.addEventListener("click", goHome);
})();