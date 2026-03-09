document.addEventListener("DOMContentLoaded", () => {
  function showToast(message) {
    const existingToast = document.querySelector(".codex-toast");
    if (existingToast) {
      existingToast.remove();
    }
    const toast = document.createElement("div");
    toast.className = "codex-toast";
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  const categoryButtons = document.querySelectorAll(".category-pill");
  const streakBar = document.querySelector(".js-streak-progress");
  const challengeBar = document.querySelector(".js-challenge-progress");
  const cards = document.querySelectorAll(".card-entrance");

  const videoCard = document.querySelector(".js-video-card");
  const videoOverlay = document.getElementById("videoOverlay");
  const closeVideoBtn = document.getElementById("closeVideoBtn");
  const mainPlayBtn = document.getElementById("mainPlayBtn");
  const btnFazerQuiz = document.querySelector(".action-btn--quiz");

  const quizOverlay = document.getElementById("quizOverlay");
  const closeQuizBtn = document.getElementById("closeQuizBtn");
  const quizProgressText = document.getElementById("quizProgressText");
  const quizProgressBar = document.getElementById("quizProgressBar");
  const quizQuestionText = document.getElementById("quizQuestionText");
  const quizOptionsContainer = document.getElementById("quizOptionsContainer");
  const quizNextBtn = document.getElementById("quizNextBtn");
  const quizNextBtnText = document.getElementById("quizNextBtnText");

  const quizQuestionView = document.getElementById("quizQuestionView");
  const quizResultView = document.getElementById("quizResultView");
  const quizHeader = document.getElementById("quizHeader");
  const quizProgressContainer = document.getElementById(
    "quizProgressContainer",
  );
  const resultCorrect = document.getElementById("resultCorrect");
  const resultWrong = document.getElementById("resultWrong");
  const resultPoints = document.getElementById("resultPoints");
  const quizFinishBtn = document.getElementById("quizFinishBtn");
  const confettiContainer = document.getElementById("quizConfettiContainer");
  const quizReviewList = document.getElementById("quizReviewList");

  const streakTarget = 20;
  const challengeTarget = 66;

  const quizData = [
    {
      question: "Quem é o melhor amigo da pequena sereia?",
      options: ["Sebastião", "Linguado", "Sabidão", "Max"],
      answer: 1,
    },
    {
      question:
        "O que Úrsula (a vilã) queria da pequena sereia em troca de pernas humanas?",
      options: [
        "Sua coroa de princesa",
        "Sua beleza",
        "Sua voz",
        "O tridente do Rei",
      ],
      answer: 2,
    },
    {
      question: "Por que Ariel queria se transformar em humana?",
      options: [
        "Para fugir das regras do seu pai",
        "Para poder se casar com o príncipe",
        "Para lutar contra a Úrsula na terra",
        "Para provar que os humanos são bons",
      ],
      answer: 1,
    },
    {
      question:
        "Qual é o nome do caranguejo maestro que atua como conselheiro do Rei Tritão?",
      options: ["Sebastião", "Sérgio", "Simão", "Samuel"],
      answer: 0,
    },
    {
      question:
        "Que objeto humano Ariel encontra e usa para pentear o cabelo, chamando-o de 'vira-vira'?",
      options: ["Uma colher", "Um espelho", "Um garfo", "Uma concha"],
      answer: 2,
    },
  ];

  let currentQuestionIndex = 0;
  let selectedOptionIndex = null;
  let userAnswers = [];

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

  if (videoCard && videoOverlay) {
    const openVideoOverlay = () => {
      videoOverlay.classList.add("is-active");
    };
    const closeVideoOverlay = () => {
      videoOverlay.classList.remove("is-active");
    };
    videoCard.addEventListener("click", openVideoOverlay);
    videoCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openVideoOverlay();
      }
    });
    closeVideoBtn.addEventListener("click", closeVideoOverlay);
    if (mainPlayBtn) {
      mainPlayBtn.addEventListener("click", () => {
        showToast("Vídeo meramente ilustrativo. Utilize o quiz ou a leitura!");
      });
    }
  }

  function throwConfetti() {
    confettiContainer.innerHTML = "";
    const colors = ["#00f0ff", "#7000ff", "#ff00c8", "#fcd34d", "#4ade80"];
    for (let i = 0; i < 60; i++) {
      let conf = document.createElement("div");
      conf.className = "confetti-piece";
      conf.style.left = Math.random() * 100 + "%";
      conf.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      conf.style.animation = `confettiFall ${Math.random() * 2 + 2}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
      conf.style.animationDelay = Math.random() * 0.5 + "s";
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiContainer.appendChild(conf);
    }
  }

  function showResults() {
    quizQuestionView.style.display = "none";
    quizHeader.style.visibility = "hidden";
    quizProgressContainer.style.visibility = "hidden";
    quizResultView.style.display = "flex";

    let score = 0;
    quizReviewList.innerHTML = "";

    userAnswers.forEach((answerIndex, i) => {
      const data = quizData[i];
      const isCorrect = answerIndex === data.answer;
      if (isCorrect) score++;

      const itemStatusClass = isCorrect ? "is-correct" : "is-wrong";
      const userTextClass = isCorrect ? "text-correct" : "text-wrong";
      const userIcon = isCorrect
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

      let reviewHTML = `
        <div class="quiz-review-item ${itemStatusClass}">
          <p class="review-question">${i + 1}. ${data.question}</p>
          <p class="review-answer review-answer--user ${userTextClass}">
            ${userIcon} ${data.options[answerIndex]}
          </p>
      `;

      if (!isCorrect) {
        reviewHTML += `
          <p class="review-answer review-answer--correct">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ${data.options[data.answer]}
          </p>
        `;
      }

      reviewHTML += `</div>`;
      quizReviewList.insertAdjacentHTML("beforeend", reviewHTML);
    });

    const wrongAnswers = quizData.length - score;
    resultCorrect.textContent = score;
    resultWrong.textContent = wrongAnswers;

    const earnedPoints = score * 50;
    resultPoints.textContent = `+${earnedPoints} pts`;

    if (score > 0) {
      throwConfetti();
    }
  }

  function renderQuizQuestion() {
    const data = quizData[currentQuestionIndex];
    quizProgressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    quizProgressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    quizQuestionText.textContent = data.question;

    quizOptionsContainer.innerHTML = "";
    selectedOptionIndex = null;
    quizNextBtn.disabled = true;
    quizNextBtnText.textContent =
      currentQuestionIndex === quizData.length - 1 ? "Finalizar" : "Próxima";

    data.options.forEach((optionText, index) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.innerHTML = `
        <div class="quiz-option__radio"></div>
        <span>${optionText}</span>
      `;
      btn.addEventListener("click", () => {
        const allOptions =
          quizOptionsContainer.querySelectorAll(".quiz-option");
        allOptions.forEach((o) => o.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        selectedOptionIndex = index;
        quizNextBtn.disabled = false;
      });
      quizOptionsContainer.appendChild(btn);
    });
  }

  function openQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    quizQuestionView.style.display = "flex";
    quizResultView.style.display = "none";
    quizHeader.style.visibility = "visible";
    quizProgressContainer.style.visibility = "visible";
    confettiContainer.innerHTML = "";

    renderQuizQuestion();
    quizOverlay.classList.add("is-active");
  }

  function closeQuiz() {
    quizOverlay.classList.remove("is-active");
  }

  if (btnFazerQuiz && quizOverlay) {
    btnFazerQuiz.addEventListener("click", openQuiz);
    closeQuizBtn.addEventListener("click", closeQuiz);

    quizNextBtn.addEventListener("click", () => {
      userAnswers.push(selectedOptionIndex);

      if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        renderQuizQuestion();
      } else {
        showResults();
      }
    });

    quizFinishBtn.addEventListener("click", () => {
      closeQuiz();
      if (videoOverlay) videoOverlay.classList.remove("is-active");

      const score = userAnswers.filter(
        (ans, i) => ans === quizData[i].answer,
      ).length;
      if (score > 0) showToast(`Incrível! Você ganhou ${score * 50} pts.`);
    });
  }
});
