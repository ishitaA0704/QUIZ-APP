const question = document.getElementById("question");
const option = document.querySelectorAll(".op");
const nextButton = document.getElementById("next");
const qdisplay = document.getElementById("qdisplay");
const adisplay = document.getElementById("adisplay");
let questions = [];
let currentquestion = 0;
let score = 0;
async function fetchQuestions() {
    const apiURL = "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple";
    const response = await fetch(apiURL);
    const data = await response.json();
    questions = data.results;
    showq();
}
function showq() {
    nextButton.style.display = "none";
    let currentQuiz = questions[currentquestion];
    qdisplay.innerHTML = `Question ${currentquestion + 1} of ${questions.length}`;
    question.innerHTML = currentQuiz.question;
    let answers = [...currentQuiz.incorrectanswers];
    answers.push(currentQuiz.correctanswer);
    answers.sort(() => Math.random() - 0.5);

    option.forEach((button, index) => {
        button.innerHTML = answers[index];
        button.disabled = false;
        button.style.backgroundColor = "#8bb6e3";

        button.onclick = function () {

            option.forEach(btn => {
                btn.disabled = true;
            });
            if (button.innerHTML === currentQuiz.correctanswer) {
                button.style.backgroundColor = "green";
                score++;

            } else {

                button.style.backgroundColor = "red";
                option.forEach(btn => {

                    if (btn.innerHTML === currentQuiz.correctanswer) {
                        btn.style.backgroundColor = "green";
                    }

                });
            }
            nextButton.style.display = "block";
        };

    });

}
nextButton.addEventListener("click", () => {

    currentquestion++;
    if (currentquestion < questions.length) {

        showq();

    } else {
        showscore();
    }

});

function showscore() {
    nextButton.style.display = "none";
    question.innerHTML =
        `Quiz Finished! <br><br> Your Score: ${score} / ${questions.length}`;
    document.getElementById("adisplay").style.display = "none";
    qdisplay.innerHTML = "Completed!";
}
fetchQuestions();