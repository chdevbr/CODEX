const profileData = {
  name: "Você",
  handle: "@professor_andre",
  level: "Nível 1",
  avatarInitial: "A",
  stats: [
    {
      label: "Dias Seguidos",
      value: "14",
      icon: "icon-flame",
      color: "bg-orange",
    },
    { label: "Livros Lidos", value: "28", icon: "icon-book", color: "bg-blue" },
    {
      label: "Horas Lidas",
      value: "124h",
      icon: "icon-clock",
      color: "bg-purple",
    },
  ],
  currentBook: {
    title: "O Padrão Codex",
    author: "Insígnia de Mestre",
    progress: 68,
    coverUrl:
      "../images/mestre.jpg",
  },
};

const avatarEl = document.getElementById("user-avatar");
const nameEl = document.getElementById("user-name");
const handleEl = document.getElementById("user-handle");
const levelEl = document.getElementById("user-level");
const statsContainer = document.getElementById("stats-container");
const currentBookContainer = document.getElementById("current-book-container");

function renderProfile() {
  avatarEl.textContent = profileData.avatarInitial;
  nameEl.textContent = profileData.name;
  handleEl.textContent = profileData.handle;
  levelEl.textContent = profileData.level;

  statsContainer.innerHTML = profileData.stats
    .map(
      (stat) => `
    <div class="stat-card">
      <div class="stat-card__icon ${stat.color}">
        <svg><use href="#${stat.icon}"></use></svg>
      </div>
      <h3 class="stat-card__value">${stat.value}</h3>
      <p class="stat-card__label">${stat.label}</p>
    </div>
  `,
    )
    .join("");

  currentBookContainer.innerHTML = `
    <div class="current-book__cover">
      <img src="${profileData.currentBook.coverUrl}" alt="Capa do livro" class="current-book__img">
    </div>
    <div class="current-book__info">
      <h3 class="current-book__title">${profileData.currentBook.title}</h3>
      <p class="current-book__author">${profileData.currentBook.author}</p>
      <div class="current-book__progress-wrapper">
        <div class="current-book__progress-bar">
          <div class="current-book__progress-fill" style="width: 0%"></div>
        </div>
        <span class="current-book__progress-text">${profileData.currentBook.progress}% concluído</span>
      </div>
    </div>
  `;

  setTimeout(() => {
    const fill = document.querySelector(".current-book__progress-fill");
    if (fill) fill.style.width = `${profileData.currentBook.progress}%`;
  }, 150);
}

document.addEventListener("DOMContentLoaded", renderProfile);