const badgesData = [
  {
    id: 1,
    title: "Primeiro Livro",
    desc: "Complete seu primeiro livro",
    icon: "icon-book-open",
    colorClass: "bg-blue",
    isUnlocked: true,
    progress: 1,
    total: 1,
  },
  {
    id: 2,
    title: "Semana Dedicada",
    desc: "Mantenha uma sequência de 7 dias de leitura",
    icon: "icon-fire",
    colorClass: "bg-orange",
    isUnlocked: true,
    progress: 7,
    total: 7,
  },
  {
    id: 3,
    title: "Madrugador",
    desc: "Leia antes das 8h da manhã",
    icon: "icon-star",
    colorClass: "bg-yellow",
    isUnlocked: true,
    progress: 1,
    total: 1,
  },
  {
    id: 4,
    title: "Ratinho de Biblioteca",
    desc: "Complete 5 livros no total",
    icon: "icon-medal",
    colorClass: "bg-purple",
    isUnlocked: true,
    progress: 5,
    total: 5,
  },
  {
    id: 5,
    title: "Leitor Veloz",
    desc: "Termine um livro em menos de 3 dias",
    icon: "icon-zap",
    colorClass: "bg-green",
    isUnlocked: false,
    progress: 1,
    total: 3,
  },
  {
    id: 6,
    title: "Mês Focado",
    desc: "Mantenha uma sequência de 30 dias",
    icon: "icon-fire",
    colorClass: "bg-orange",
    isUnlocked: false,
    progress: 12,
    total: 30,
  },
  {
    id: 7,
    title: "Colecionador",
    desc: "Adicione 20 livros à sua lista",
    icon: "icon-book-open",
    colorClass: "bg-blue",
    isUnlocked: false,
    progress: 8,
    total: 20,
  },
  {
    id: 8,
    title: "Crítico Literário",
    desc: "Avalie e comente em 5 livros",
    icon: "icon-star",
    colorClass: "bg-yellow",
    isUnlocked: false,
    progress: 2,
    total: 5,
  },
  {
    id: 9,
    title: "Mestre Supremo",
    desc: "Alcance o nível 10 no aplicativo",
    icon: "icon-trophy",
    colorClass: "bg-purple",
    isUnlocked: false,
    progress: 1,
    total: 10,
  },
  {
    id: 10,
    title: "Desbravador",
    desc: "Complete todos os desafios de um mês",
    icon: "icon-target",
    colorClass: "bg-green",
    isUnlocked: false,
    progress: 4,
    total: 15,
  },
];

const badgesList = document.getElementById("badgesList");
const filters = document.querySelectorAll(".badge-filter");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

function updateHeroAndFilters() {
  const total = badgesData.length;
  const unlockedCount = badgesData.filter((b) => b.isUnlocked).length;
  const lockedCount = total - unlockedCount;

  progressText.textContent = `${unlockedCount} de ${total} insígnias desbloqueadas`;

  setTimeout(() => {
    progressFill.style.width = `${(unlockedCount / total) * 100}%`;
  }, 100);

  document.querySelector('[data-filter="all"]').textContent =
    `Todas (${total})`;
  document.querySelector('[data-filter="unlocked"]').textContent =
    `Desbloqueadas (${unlockedCount})`;
  document.querySelector('[data-filter="locked"]').textContent =
    `Bloqueadas (${lockedCount})`;
}

function renderBadges(filterType = "all") {
  badgesList.innerHTML = "";

  const filteredData = badgesData.filter((badge) => {
    if (filterType === "unlocked") return badge.isUnlocked;
    if (filterType === "locked") return !badge.isUnlocked;
    return true;
  });

  filteredData.forEach((badge, index) => {
    const lockedClass = badge.isUnlocked ? "" : "is-locked";
    const statusIcon = badge.isUnlocked ? "icon-check-circle" : "icon-lock";
    const statusClass = badge.isUnlocked
      ? "badge-card__status--unlocked"
      : "badge-card__status--locked";
    const animationDelay = `${index * 0.05}s`;

    let progressBarHtml = "";
    if (!badge.isUnlocked && badge.total > 1) {
      const progressPercent = (badge.progress / badge.total) * 100;
      progressBarHtml = `
        <div class="badge-card__mini-progress">
          <div class="mini-progress-track">
            <div class="mini-progress-fill" style="width: ${progressPercent}%"></div>
          </div>
          <span class="mini-progress-text">${badge.progress}/${badge.total}</span>
        </div>
      `;
    }

    const html = `
      <article class="badge-card ${lockedClass} fade-up" style="animation-delay: ${animationDelay}">
        <div class="badge-card__left">
          <div class="badge-card__icon ${badge.colorClass}">
            <svg><use href="#${badge.icon}"></use></svg>
          </div>
          <div class="badge-card__info">
            <h3 class="badge-card__title">${badge.title}</h3>
            <p class="badge-card__desc">${badge.desc}</p>
            ${progressBarHtml}
          </div>
        </div>
        <div class="badge-card__status ${statusClass}">
          <svg><use href="#${statusIcon}"></use></svg>
        </div>
      </article>
    `;

    badgesList.insertAdjacentHTML("beforeend", html);
  });
}

filters.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filters.forEach((f) => f.classList.remove("active"));
    e.target.classList.add("active");
    const filterValue = e.target.getAttribute("data-filter");
    renderBadges(filterValue);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  updateHeroAndFilters();
  renderBadges("all");
});