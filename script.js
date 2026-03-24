// Dom Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-number");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz Data
const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      "Harper Lee",
      "Mark Twain",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
    correct: 0,
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correct: 3,
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: ["Oxygen", "Gold", "Osmium", "Oganesson"],
    correct: 0,
  },
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizData.length;
maxScoreSpan.textContent = quizData.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;
  const currentQuestion = quizData[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizData.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    // Store whether this button is the correct answer
    button.dataset.correct = index === currentQuestion.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // here array.from is used to convert the HTMLCollection of answer buttons into an array, allowing us to easily iterate over them and disable all buttons after an answer is selected. This prevents the user from changing their answer or selecting multiple answers for the same question.
  Array.from(answersContainer.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIndex++;
    // After a short delay to show the correct/incorrect feedback, we check if there are more questions to display. If there are, we call the showQuestion function to load the next question. If there are no more questions, we call the showResults function to display the final score and results screen.
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;
  const percentage = (score / quizData.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");

  startQuiz();
}
