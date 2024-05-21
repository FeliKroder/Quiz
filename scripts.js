document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const questionScreen = document.getElementById("question-screen");
  const startScreen = document.getElementById("start-screen");
  const resultScreen = document.getElementById("result-screen");
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const resultText = document.getElementById("result-text");

  const questions = [
    {
      question: "Warum tanzen Bienen?",
      answers: [
        {
          text: "Weil sie sehr soziale und gesellige Tiere sind.",
          correct: false,
        },
        { text: "Um ihre Artgenossen vor Feinden zu warnen.", correct: false },
        {
          text: "Um ihren Artgenossen mitzuteilen, wo sich gute Blüten befinden.",
          correct: true,
        },
        { text: "Zur Entspannung nach dem vielen Fliegen.", correct: false },
      ],
    },
    {
      question: "Wozu machen Bienen Honig?",
      answers: [
        {
          text: "Sie füttern damit ihre Brut und ernähren sich davon im Winter.",
          correct: true,
        },
        {
          text: "Der Honig entsteht zufällig, wenn Bienen Wachs machen.",
          correct: false,
        },
        {
          text: "Der Honig dient dazu, den Bienenstock zusammenzuhalten.",
          correct: false,
        },
      ],
    },
    {
      question:
        "Wie viel Honig kann eine Honigbiene in ihrem Leben herstellen?",
      answers: [
        {
          text: "1-2 Teelöffel",
          correct: true,
        },
        {
          text: "Etwa einen Esslöffel",
          correct: false,
        },
        {
          text: "Etwa ein Glas",
          correct: false,
        },
      ],
    },
    {
      question: "Was passiert mit Honigbienen im Winter?",
      answers: [
        {
          text: "Sie halten ihren Bau bei 35° Celsius.",
          correct: true,
        },
        {
          text: "Sie verfallen in Winterstarre.",
          correct: false,
        },
        {
          text: "Alle Honigbienen sterben. Nur die Eier überstehen den Winter.",
          correct: false,
        },
      ],
    },
    {
      question: "Welche Farbe können Bienen nicht sehen?",
      answers: [
        {
          text: "Blau",
          correct: false,
        },
        {
          text: "Rot",
          correct: true,
        },
        {
          text: "Grün",
          correct: false,
        },
        {
          text: "Gelb",
          correct: false,
        },
      ],
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startButton.addEventListener("click", startQuiz);
  restartButton.addEventListener("click", restartQuiz);

  function startQuiz() {
    gsap.to(startScreen, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        startScreen.classList.add("hidden");
        questionScreen.classList.remove("hidden");
        gsap.from(questionScreen, { duration: 0.5, opacity: 0 });
        setNextQuestion();
      },
    });
  }

  function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionText.innerText = question.question;
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }

  function resetState() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
      score++;
    }
    if (questions.length > currentQuestionIndex + 1) {
      currentQuestionIndex++;
      setNextQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    questionScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    resultText.innerText = `Du hast ${score} von ${questions.length} richtig beantwortet!`;
    gsap.from(resultScreen, { duration: 0.5, opacity: 0 });
  }

  function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    resetState();
    resultScreen.classList.add("hidden");
    questionScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    startQuiz();
  }
});
