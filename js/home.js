document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-pill");
  const streakBar = document.querySelector(".js-streak-progress");
  const challengeBar = document.querySelector(".js-challenge-progress");
  const cards = document.querySelectorAll(".card-entrance");
  const videoCard = document.querySelector(".js-video-card");

  const streakTarget = 20;
  const challengeTarget = 66;

  const animateProgress = (element, target, duration = 700) => {
    if (!element) return;

    let start = 0;
    const startTime = performance.now();

    const frame = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(start + (target - start) * progress);
      element.style.width = `${value}%`;

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  };

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("is-visible");
    }, 80 * index);
  });

  animateProgress(streakBar, streakTarget, 850);
  animateProgress(challengeBar, challengeTarget, 850);

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  if (videoCard) {
    const openVideo = () => {
      alert("Abrir vídeo recomendado.");
    };

    videoCard.addEventListener("click", openVideo);

    videoCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openVideo();
      }
    });
  }
});