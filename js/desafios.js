document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("challenge-loading");
  const content = document.getElementById("challenge-page-content");
  const filters = document.querySelectorAll(".challenge-filter");
  const cards = document.querySelectorAll(".challenge-card");
  const totalEl = document.getElementById("challenge-total");
  const progressEl = document.getElementById("challenge-progress");
  const doneEl = document.getElementById("challenge-done");

  setTimeout(() => {
    if (loading) {
      loading.style.display = "none";
    }

    if (content) {
      content.classList.remove("is-hidden");
      requestAnimationFrame(() => {
        content.classList.add("is-ready");
      });
    }
  }, 2000);

  function updateStats() {
    let total = 0;
    let inProgress = 0;
    let done = 0;

    cards.forEach((card) => {
      const status = card.dataset.status;

      total += 1;

      if (status === "progress") {
        inProgress += 1;
      }

      if (status === "done") {
        done += 1;
      }
    });

    if (totalEl) totalEl.textContent = total;
    if (progressEl) progressEl.textContent = inProgress;
    if (doneEl) doneEl.textContent = done;
  }

  function applyFilter(filterValue) {
    cards.forEach((card) => {
      const difficulty = card.dataset.difficulty;

      if (filterValue === "todos" || difficulty === filterValue) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
  }

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");

      const filterValue = filter.dataset.filter;
      applyFilter(filterValue);
    });
  });

  cards.forEach((card) => {
    const button = card.querySelector(".challenge-card__button");

    if (!button) return;
    if (card.dataset.status === "done") return;

    button.addEventListener("click", () => {
      if (card.dataset.status === "novo") {
        card.dataset.status = "progress";
        button.textContent = "Em andamento";
        button.classList.add("challenge-card__button--progress");
      } else if (card.dataset.status === "progress") {
        card.dataset.status = "done";
        button.textContent = "Concluído";
        button.disabled = true;
        button.classList.remove("challenge-card__button--progress");
        button.classList.add("challenge-card__button--done");

        const icon = card.querySelector(".challenge-card__icon");
        if (icon) {
          icon.classList.add("challenge-card__icon--done");
          icon.innerHTML = '<svg><use href="#icon-check"></use></svg>';
        }

        const meta = card.querySelector(".challenge-card__meta");
        if (meta) {
          meta.textContent = "Desafio concluído";
        }
      }

      updateStats();
    });
  });

  updateStats();
});