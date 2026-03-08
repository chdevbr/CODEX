const users = [
  { name: "Letícia ", level: 12, badges: ["🔥 Leitor Ávido", "📚 100 Livros"], avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Carlos Silva", level: 10, badges: ["📖 Explorador"], avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Juliana Lima", level: 9, badges: ["⭐ Destaque"], avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Rafael Souza", level: 8, badges: ["📚 50 Livros"], avatar: "https://i.pravatar.cc/150?img=4" },
  { name: "Fernanda Alves", level: 7, badges: ["🔥 Consistente"], avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "Lucas Pereira", level: 6, badges: ["📖 Iniciante"], avatar: "https://i.pravatar.cc/150?img=6" }
];

const podiumContainer = document.getElementById ("podium");
const rankingList = document.getElementById("rankingList");

function renderPodium() {
  const first = users[0];
  const second = users[1];
  const third = users[2];

  podiumContainer.innerHTML = `
    <div class="podium-item">
      <div class="position">2º</div>
      <img src="${second.avatar}" class="avatar">
      <div>${second.name}</div>
      <div class="podium-base silver">Prata</div>
    </div>

    <div class="podium-item">
      <div class="position">1º</div>
      <img src="${first.avatar}" class="avatar">
      <div>${first.name}</div>
      <div class="podium-base gold">Ouro</div>
    </div>

    <div class="podium-item">
      <div class="position">3º</div>
      <img src="${third.avatar}" class="avatar">
      <div>${third.name}</div>
      <div class="podium-base bronze">Bronze</div>
    </div>
  `;
}

function renderRankingList() {
  users.slice(3).forEach((user, index) => {
    const position = index + 4;

    const item = document.createElement("div");
    item.classList.add("ranking-item");

    item.innerHTML = `
      <div class="user-info">
        <span class="position-number">${position}º</span>
        <img src="${user.avatar}" class="user-avatar">
        <div>
          <div>${user.name}</div>
          <div class="level">Nível ${user.level}</div>
          <div class="badges">
            ${user.badges.map(b => `<span class="badge">${b}</span>`).join("")}
          </div>
        </div>
      </div>
    `;

    rankingList.appendChild(item);
  });
}

renderPodium();
renderRankingList();