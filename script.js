const [question, nextbut, qdisplay, adisplay] = 
["question", "next", "qdisplay", "adisplay"].map(id => document.getElementById(id));
const options = document.querySelectorAll(".op");
let questions = [], current = 0, score = 0;
const startbtn = document.getElementById("start");
const restartbtn = document.getElementById("restart");
let message = "";
const category = document.getElementById("category");
const timerdisplay = document.getElementById("timer");
let timer;
let timeleft = 10;

timerdisplay.style.display = "none";
qdisplay.style.display = "none";
nextbut.style.display = "none";
adisplay.style.display = "none";
restartbtn.style.display = "none";

startbtn.addEventListener("click", () => {
  document.getElementsByTagName("h2")[0].style.display = "none"
  startbtn.style.display = "none";
 qdisplay.style.display = "block";
  timerdisplay.style.display = "block";
  adisplay.style.display = "block";
  question.style.display = "block";
category.style.display = "none";
  fetchq();
});

async function fetchq() {
  const selectedcategory = category.value;
  const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${selectedcategory}&difficulty=medium&type=multiple`
  );
  questions = (await res.json()).results;
  showq();
}

function showq() {
  clearInterval(timer);
  timeleft = 10;
  timerdisplay.innerHTML = `Time Left: ${timeleft}`;
  const q = questions[current];
  timer = setInterval(() => {
timeleft--;
timerdisplay.innerHTML = `Time Left: ${timeleft}`;
    if(timeleft === 0){
      clearInterval(timer);
      options.forEach(btn => {
        btn.disabled = true;
if(btn.innerHTML === q.correct_answer){
          btn.style.backgroundColor = "green";
        }
      });
      nextbut.style.display = "block";
    }
  },1000);
nextbut.style.display = "none";
  qdisplay.innerHTML = `Question ${current + 1} of ${questions.length}<br><br>${q.question}`;
  const answers = [...q.incorrect_answers, q.correct_answer]
  .sort(() => Math.random() - 0.5);
 options.forEach((btn, i) => {
    btn.innerHTML = answers[i];
    btn.disabled = false;
    btn.style.backgroundColor = "#8bb6e3";
    btn.onclick = () => {
clearInterval(timer);
      options.forEach(btn => {
        btn.disabled = true;
        if(btn.innerHTML === q.correct_answer){
          btn.style.backgroundColor = "green";
        }
      });
      if(btn.innerHTML !== q.correct_answer){
        btn.style.backgroundColor = "red";
      }
else{
        score++;
      }
      nextbut.style.display = "block";
    };
  });
}
nextbut.addEventListener("click", () =>
++current < questions.length ? showq() : showscore()
);

function showscore() {
clearInterval(timer);
  timerdisplay.style.display = "none";
  nextbut.style.display = "none";
  question.style.display = "none";
  adisplay.style.display = "none";
if(score === 5){
    message = "Quiz Master 🔥";
  }
else if(score >= 3){
    message = "Great Job 😎";
  }
else{
    message = "Keep Practicing 💪";
}
  qdisplay.innerHTML =`Quiz Finished!<br><br>Your Score: ${score} / ${questions.length}<br><br>${message}`;
  restartbtn.style.display = "block";
}

restartbtn.addEventListener("click", () => {
  current = 0;score = 0;
  restartbtn.style.display = "none";
  adisplay.style.display = "block";
  timerdisplay.style.display = "block";
  fetchq();
});