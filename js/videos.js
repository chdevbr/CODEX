document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".video-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  cards.forEach((card) => observer.observe(card));

  const categories = document.querySelectorAll(".category-pill");

  categories.forEach((button) => {
    button.addEventListener("click", () => {
      categories.forEach((b) => b.classList.remove("active"));

      button.classList.add("active");
    });
  });

  const videoCards = document.querySelectorAll(".video-card");

  videoCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.style.transform = "scale(0.97)";

      setTimeout(() => {
        card.style.transform = "";
      }, 120);
    });
  });
});