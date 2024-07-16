let formattedQuestions = null; // Null is better than Undefined
let questionIndex = 0;
let correctAnswer = null;
let clientAnswerIndex = null;
let clientScore = 0;
let isAccepted = true;
const loading = document.querySelector("#loading");
const main = document.querySelector("#main");
const questionText = document.querySelector("#question-text");
const answerText = document.querySelectorAll(".answer-text");
const nextButton = document.querySelector("#next-button");
const questionNumber = document.querySelector("#question-number");
const finishButton = document.querySelector("#finish-button");
const score = document.querySelector("#score");
const CORRECT_BUNOS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${
  localStorage.getItem("difficulty") || "medium"
}&type=multiple`;

async function questionsFromApi() {
  const response = await fetch(URL);
  const json = await response.json();
  destructureData(json.results);
  startGame();
}

function startGame() {
  loading.style.display = "none";
  main.style.display = "block";
  showQuestions();
}

function showQuestions() {
  correctAnswer = formattedQuestions[questionIndex].indexOfCorrectAnswer;
  questionText.innerText = formattedQuestions[questionIndex].text;
  for (let i = 0; i < 4; i++) {
    answerText[i].innerText = formattedQuestions[questionIndex].answers[i];
  }
}

function destructureData(arrayOfQuestions) {
  // Also you can use this function as module data
  formattedQuestions = arrayOfQuestions.map((obj) => {
    const answers = [...obj.incorrect_answers];
    const randomIndexMaker = Math.floor(Math.random() * 4);
    answers.splice(randomIndexMaker, 0, obj.correct_answer);
    const questions = {
      text: obj.question,
      answers: [...answers],
      indexOfCorrectAnswer: randomIndexMaker,
    };
    return questions;
  });
  console.log(formattedQuestions);
}

function answerChecker(clientAnswer) {
  if (!isAccepted) {
    return;
  }
  clientAnswerIndex = clientAnswer;
  if (clientAnswer == correctAnswer) {
    answerText[clientAnswer].style.backgroundColor = "green";
    clientScore += CORRECT_BUNOS;
    score.innerText = clientScore;
  } else {
    answerText[clientAnswer].style.backgroundColor = "red";
    answerText[correctAnswer].style.backgroundColor = "green";
  }
  isAccepted = false;
}

function nextQuestion() {
  if (questionIndex < 9) {
    if (!isAccepted) {
      answerText[clientAnswerIndex].style.backgroundColor = "white";
      answerText[correctAnswer].style.backgroundColor = "white";
    }
    isAccepted = true;
    questionIndex++;
    questionNumber.innerText = questionIndex + 1;
    startGame();
  } else {
    finishGame();
  }
}

function finishGame() {
  localStorage.setItem("score", JSON.stringify(clientScore));
  window.location.assign("/end.html");
}

window.addEventListener("load", questionsFromApi);
answerText.forEach((button, index) => {
  // for those functions which is need () - first way :
  //   const temp = () => answerChecker(index);
  //   button.addEventListener("click", temp);
  // for those functions which is need () - second way (better) :
  button.addEventListener("click", () => answerChecker(index));
});
nextButton.addEventListener("click", nextQuestion);
finishButton.addEventListener("click", finishGame);
