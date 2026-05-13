const [question, nextbut, qdisplay, adisplay] = 
  ["question", "next", "qdisplay", "adisplay"].map(id => document.getElementById(id));
const options = document.querySelectorAll(".op");
let questions = [], current = 0, score = 0;

async function fetchq() {
  const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple");
  questions = (await res.json()).results;
  showq();
}

function showq() {
  nextbut.style.display = "none";
  const q = questions[current];
  qdisplay.innerHTML = `Question ${current + 1} of ${questions.length}<br><br>${q.question}`;

  const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

  options.forEach((btn, i) => {
    btn.innerHTML = answers[i];
    btn.disabled = false;
    btn.style.backgroundColor = "#8bb6e3";
    btn.onclick = () => {
      options.forEach(btn => {
        btn.disabled = true;
        if (btn.innerHTML === q.correct_answer) btn.style.backgroundColor = "green";
      });
      if (btn.innerHTML !== q.correct_answer) { btn.style.backgroundColor = "red"; } 
      else score++;
      nextbut.style.display = "block";
    };
  });
}

nextbut.addEventListener("click", () => 
  ++current < questions.length ? showq() : showscore()
);

function showscore() {
  nextbut.style.display = "none";
  adisplay.style.display = "none";
  question.style.display = "none";
  qdisplay.innerHTML = `Quiz Finished!<br><br>Your Score: ${score} / ${questions.length}`;
}
fetchq();