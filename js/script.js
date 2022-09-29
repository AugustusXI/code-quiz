let startQuiz = document.getElementById("startQuiz");
let quizContainer = document.getElementById("quizContainer");
let optionA = document.getElementById("optionA");
let optionB = document.getElementById("optionB");
let optionC = document.getElementById("optionC");
let optionD = document.getElementById("optionD");
let questionTitle = document.getElementById("questionTitle");
let scoresContainer = document.getElementById("scoresContainer");
let quizTimer = document.getElementById("quizTimer");
let finalScore = document.getElementById("finalScore");
let scores = document.getElementById("scores");
let score = 0;
let questions = questionList;
let qI = 0;
let timer = 75;
let clockInterval = setInterval(setClock, 1000);
let leaderboard = [];
// -----------------------------------------------------
function getQuestion() {
  // start the clock
  clockInterval;
  //   get the questions
  if (qI <= questions.length - 1) {
    let currentQuestion = questions[qI];
    questionTitle.textContent = currentQuestion.title;
    optionA.textContent = currentQuestion.choices[0];
    optionB.textContent = currentQuestion.choices[1];
    optionC.textContent = currentQuestion.choices[2];
    optionD.textContent = currentQuestion.choices[3];
  } else {
    gameOver();
  }
}
optionA.addEventListener("click", checkAnswer);
optionB.addEventListener("click", checkAnswer);
optionC.addEventListener("click", checkAnswer);
optionD.addEventListener("click", checkAnswer);
// -----------------------------------------------------
function checkAnswer() {
  console.log(questions[qI].answer);
  console.log(this.textContent);

  if (this.textContent !== questions[qI].answer) {
    timer -= 15;

    if (timer < 0) {
      gameOver();
    }
  } else {
    score += 100;
    console.log("The Answer was Right");
  }
  questionTitle.textContent = "";
  optionA.textContent = "";
  optionB.textContent = "";
  optionC.textContent = "";
  optionD.textContent = "";
  qI++;
  getQuestion();
}
// -----------------------------------------------------
function setClock() {
  timer--;
  quizTimer.textContent = timer;
  if (timer <= 0) {
    gameOver();
  }
}
// -----------------------------------------------------
function gameOver() {
  console.log(score);
  finalScore.innerHTML = score;
  scoresContainer.classList.remove("hide");
  quizContainer.classList.add("hide");
  quizTimer.classList.add("hide");
  console.log("game over");
  clearInterval(clockInterval);
}
// -----------------------------------------------------
function saveScore() {
  leaderboard.push(score);

  localStorage.setItem("yourScore", JSON.stringify(leaderboard));
}
// -----------------------------------------------------
function getScore() {
  let highScores = JSON.parse(localStorage.getItem("yourScore"));
  leaderboard = highScores;
  scores.innerHTML = leaderboard;
}
$("#startQuiz").on("click", function () {
  quizContainer.classList.remove("hide");
  getQuestion();
});
$("#saveScore").on("click", function () {
  saveScore();
});
