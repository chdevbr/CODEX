document.addEventListener("DOMContentLoaded", () => {
  const reserveButtons = document.querySelectorAll(".js-reserve-button");
  const cancelButtons = document.querySelectorAll(".js-cancel-button");
  const categoryButtons = document.querySelectorAll(".category-pill");

  const toast = document.getElementById("custom-toast");
  const toastMessage = document.getElementById("custom-toast-message");
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  const hasReservedBook = () => {
    return document.querySelector(".js-reserve-button.is-reserved") !== null;
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  reserveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("is-reserved")) return;

      if (hasReservedBook()) {
        showToast("Você só pode reservar 1 livro por vez.");
        return;
      }

      const card = button.closest(".book-card");
      const stockBadge = card.querySelector(".book-card__stock");

      let stock = parseInt(stockBadge.dataset.stock, 10);

      if (stock <= 0) {
        showToast("Este livro está indisponível no momento.");
        return;
      }

      stock -= 1;
      stockBadge.dataset.stock = stock;

      if (stock === 0) {
        stockBadge.textContent = "Indisponível";
        stockBadge.classList.add("is-empty");
      } else if (stock === 1) {
        stockBadge.textContent = "1 disponível";
        stockBadge.classList.remove("is-empty");
      } else {
        stockBadge.textContent = `${stock} disponíveis`;
        stockBadge.classList.remove("is-empty");
      }

      button.textContent = "Reservado";
      button.classList.add("is-reserved");

      const cancelButton = card.querySelector(".js-cancel-button");
      if (cancelButton) {
        cancelButton.classList.add("is-visible");
      }

      showToast("Livro reservado com sucesso.");
    });
  });

  cancelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".book-card");
      const reserveButton = card.querySelector(".js-reserve-button");
      const stockBadge = card.querySelector(".book-card__stock");

      let stock = parseInt(stockBadge.dataset.stock, 10);

      stock += 1;
      stockBadge.dataset.stock = stock;

      if (stock === 1) {
        stockBadge.textContent = "1 disponível";
        stockBadge.classList.remove("is-empty");
      } else {
        stockBadge.textContent = `${stock} disponíveis`;
        stockBadge.classList.remove("is-empty");
      }

      reserveButton.textContent = "Reservar";
      reserveButton.classList.remove("is-reserved");

      button.classList.remove("is-visible");

      showToast("Reserva cancelada.");
    });
  });
});