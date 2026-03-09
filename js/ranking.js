const rankingData = {
  semana: [
    {
      id: 1,
      name: "Carlos",
      role: "Lenda Literária",
      score: "1.520 pts",
      avatar: "C",
      trend: "up",
      trendValue: "+1",
    },
    {
      id: 2,
      name: "Ana",
      role: "Devoradora de Livros",
      score: "1.240 pts",
      avatar: "A",
      trend: "down",
      trendValue: "-1",
    },
    {
      id: 3,
      name: "Lucas",
      role: "Leitor assíduo",
      score: "1.110 pts",
      avatar: "L",
      trend: "up",
      trendValue: "+2",
    },
    {
      id: 4,
      name: "Maria Eduarda",
      role: "Leitora avançada",
      score: "980 pts",
      avatar: "M",
      trend: "up",
      trendValue: "+2",
    },
    {
      id: 5,
      name: "João Pedro",
      role: "Leitor frequente",
      score: "930 pts",
      avatar: "J",
      trend: "down",
      trendValue: "-1",
    },
    {
      id: 6,
      name: "Beatriz",
      role: "Leitora iniciante",
      score: "890 pts",
      avatar: "B",
      trend: "up",
      trendValue: "+4",
    },
    {
      id: 7,
      name: "Felipe",
      role: "Leitor assíduo",
      score: "860 pts",
      avatar: "F",
      trend: "same",
      trendValue: "-",
    },
    {
      id: 18,
      name: "Você",
      role: "Em evolução",
      score: "840 pts",
      avatar: "V",
      trend: "up",
      trendValue: "+3",
      isMe: true,
    },
  ],
  mes: [
    {
      id: 2,
      name: "Ana",
      role: "Devoradora de Livros",
      score: "4.240 pts",
      avatar: "A",
      trend: "up",
      trendValue: "+1",
    },
    {
      id: 3,
      name: "Lucas",
      role: "Leitor assíduo",
      score: "3.950 pts",
      avatar: "L",
      trend: "up",
      trendValue: "+2",
    },
    {
      id: 1,
      name: "Carlos",
      role: "Lenda Literária",
      score: "3.800 pts",
      avatar: "C",
      trend: "down",
      trendValue: "-2",
    },
    {
      id: 4,
      name: "João Pedro",
      role: "Leitor frequente",
      score: "3.100 pts",
      avatar: "J",
      trend: "down",
      trendValue: "-1",
    },
    {
      id: 6,
      name: "Beatriz",
      role: "Leitora iniciante",
      score: "2.890 pts",
      avatar: "B",
      trend: "up",
      trendValue: "+4",
    },
    {
      id: 7,
      name: "Felipe",
      role: "Leitor assíduo",
      score: "2.650 pts",
      avatar: "F",
      trend: "same",
      trendValue: "-",
    },
    {
      id: 12,
      name: "Você",
      role: "Em evolução",
      score: "1.450 pts",
      avatar: "V",
      trend: "up",
      trendValue: "+4",
      isMe: true,
    },
  ],
  todos: [
    {
      id: 1,
      name: "Carlos Silva",
      role: "Lenda Literária",
      score: "15.520 pts",
      avatar: "C",
      trend: "same",
      trendValue: "-",
    },
    {
      id: 2,
      name: "Ana Beatriz",
      role: "Devoradora de Livros",
      score: "14.240 pts",
      avatar: "A",
      trend: "same",
      trendValue: "-",
    },
    {
      id: 4,
      name: "Maria Eduarda",
      role: "Leitora avançada",
      score: "13.980 pts",
      avatar: "M",
      trend: "up",
      trendValue: "+1",
    },
    {
      id: 3,
      name: "Lucas Mendes",
      role: "Leitor assíduo",
      score: "13.810 pts",
      avatar: "L",
      trend: "down",
      trendValue: "-1",
    },
    {
      id: 6,
      name: "Beatriz",
      role: "Leitora iniciante",
      score: "12.890 pts",
      avatar: "B",
      trend: "up",
      trendValue: "+4",
    },
    {
      id: 7,
      name: "Felipe",
      role: "Leitor assíduo",
      score: "11.650 pts",
      avatar: "F",
      trend: "same",
      trendValue: "-",
    },
    {
      id: 42,
      name: "Você",
      role: "Em evolução",
      score: "5.840 pts",
      avatar: "V",
      trend: "up",
      trendValue: "+12",
      isMe: true,
    },
  ],
};

const tabs = document.querySelectorAll(".ranking-tab");
const podiumContainer = document.querySelector(".podium");
const listContainer = document.querySelector("#rankingList");
const verTudoBtn = document.querySelector(".section-link");

let currentPeriod = "semana";
let isExpanded = false;

function renderPodium(data) {
  const top3 = [
    { ...data[1], medal: "silver", place: "2º" },
    { ...data[0], medal: "gold", place: "1º" },
    { ...data[2], medal: "bronze", place: "3º" },
  ];

  podiumContainer.innerHTML = top3
    .map(
      (user) => `
    <div class="podium-item podium-item--${user.medal} fade-in">
      <div class="podium-avatar">${user.avatar}</div>
      <div class="podium-bar">
        <span class="podium-rank">${user.place}</span>
        <span class="podium-name">${user.name.split(" ")[0]}</span>
        <span class="podium-score">${user.score}</span>
      </div>
    </div>
  `,
    )
    .join("");
}

function renderList(data) {
  let restOfList = data.slice(3);
  const me = restOfList.find((user) => user.isMe);

  if (!isExpanded) {
    restOfList = restOfList.slice(0, 2);
    if (me && !restOfList.includes(me)) {
      restOfList.push(me);
    }
  }

  listContainer.innerHTML = restOfList
    .map((user, index) => {
      const realPosition = data.findIndex((u) => u.id === user.id) + 1;
      const trendIcon =
        user.trend === "up" ? "▲" : user.trend === "down" ? "▼" : "▬";
      const isMeClass = user.isMe ? "ranking-item--me" : "";

      return `
      <article class="ranking-item ${isMeClass} fade-in" style="animation-delay: ${index * 0.05}s">
        <div class="ranking-item__left">
          <span class="ranking-item__position">#${realPosition}</span>
          <div class="ranking-item__avatar">${user.avatar}</div>
          <div class="ranking-item__info">
            <h3 class="ranking-item__name">${user.name}</h3>
            <p class="ranking-item__meta">${user.role}</p>
          </div>
        </div>
        <div class="ranking-item__right">
          <strong class="ranking-item__score">${user.score}</strong>
          <span class="ranking-item__trend ${user.trend}">${trendIcon} ${user.trendValue}</span>
        </div>
      </article>
    `;
    })
    .join("");
}

function loadRanking(period) {
  const data = rankingData[period];

  isExpanded = false;
  verTudoBtn.textContent = "Ver tudo";

  podiumContainer.innerHTML = "";
  listContainer.innerHTML = "";

  setTimeout(() => {
    renderPodium(data);
    renderList(data);
  }, 10);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    currentPeriod = tab.getAttribute("data-period");
    loadRanking(currentPeriod);
  });
});

verTudoBtn.addEventListener("click", (e) => {
  e.preventDefault();

  isExpanded = !isExpanded;
  verTudoBtn.textContent = isExpanded ? "Ver menos" : "Ver tudo";

  renderList(rankingData[currentPeriod]);
});

document.addEventListener("DOMContentLoaded", () => {
  loadRanking("semana");
});