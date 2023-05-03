const startBtn = document.querySelector("#startBtn");
const instructions = document.querySelector("#instructions");
const questionbox = document.querySelector("#questions");
const scorebox = document.querySelector("#score-box");
const initialsinput = document.querySelector("#initials");
const submitBtn = document.querySelector("#save-score");
let counter = 60;
let questionNumber = 0;
let score = 0;

startBtn.onclick = () => {
  instructions.style.display = "none";
  questionbox.classList.remove("hide");
  function countdown() {
    counter--;
    if (counter === 0) {
      clearInterval(startCountdown);
      quizEnd();
    }
    let timeRem = document.querySelector("#time");
    let timeTag = "<span>Time Left: " + counter + "</span>";
    timeRem.innerHTML = timeTag;
  }
  var startCountdown = setInterval(countdown, 1000);
  showQuestions(questionNumber);
};

function showQuestions(index) {
  if (questionNumber >= 10) {
    return;
  }
  const queText = document.querySelector(".que-text");
  const optionList = document.querySelector("#choices");
  let queTag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let optionTag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;
  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  if (questionNumber >= 10) {
    return;
  }
  let userAns = answer.textContent;
  let correctAns = questions[questionNumber].answer;
  if (userAns == correctAns) {
    console.log("Answer is Correct");
    setTimeout(nextQuestion, 500);
    score += 1;
  } else {
    console.log("Answer is Wrong");
    setTimeout(nextQuestion, 500);
    counter -= 5;
  }
}

function nextQuestion() {
  questionNumber++;
  if (questionNumber == 10) {
    quizEnd();
  }
  showQuestions(questionNumber);
}

function quizEnd() {
  questionbox.style.display = "none";
  scorebox.classList.remove("hide");
  initialsinput.classList.remove("hide");
  submitBtn.classList.remove("hide");
  let scoreText = document.querySelector("#scoretext");
  let scoreTag = "<h3> Your score was " + score + " out of 10!</h3>";
  scoreText.innerHTML = scoreTag;
}

submitBtn.onclick = () => {
  let initials = initialsinput.value;
  //Store Initials and Score in Local Storage
  var resultsDataObj = {
    initials: initials,
    score: score,
  };
  localStorage.setItem(localStorage.length + 1, JSON.stringify(resultsDataObj));
  initialsinput.value = "";
  location.reload();
};
