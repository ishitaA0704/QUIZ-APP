// ===========================
// SELECTING HTML ELEMENTS
// ===========================

// Question text
const questionElement = document.getElementById("question");

// All option buttons
const optionButtons = document.querySelectorAll(".op");

// Next button
const nextButton = document.getElementById("next");

// Question number display
const qDisplay = document.getElementById("Qdisplay");


// ===========================
// VARIABLES
// ===========================

// Stores all questions from API
let questions = [];

// Current question index
let currentQuestion = 0;

// User score
let score = 0;


// ===========================
// FETCH QUESTIONS FROM API
// ===========================

async function fetchQuestions() {

    // API link
    const apiURL = "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple";

    // Fetch data from API
    const response = await fetch(apiURL);

    // Convert response into JSON
    const data = await response.json();

    // Store questions array
    questions = data.results;

    // Start quiz
    showQuestion();
}


// ===========================
// DISPLAY QUESTION
// ===========================

function showQuestion() {

    // Hide next button initially
    nextButton.style.display = "none";

    // Get current question object
    let currentQuiz = questions[currentQuestion];

    // Show question number
    qDisplay.innerHTML = `Question ${currentQuestion + 1} of ${questions.length}`;

    // Display question text
    questionElement.innerHTML = currentQuiz.question;


    // ===========================
    // CREATE OPTIONS ARRAY
    // ===========================

    // Correct answer
    let answers = [...currentQuiz.incorrect_answers];

    // Add correct answer also
    answers.push(currentQuiz.correct_answer);

    // Shuffle answers randomly
    answers.sort(() => Math.random() - 0.5);


    // ===========================
    // PUT OPTIONS INTO BUTTONS
    // ===========================

    optionButtons.forEach((button, index) => {

        // Set button text
        button.innerHTML = answers[index];

        // Enable buttons again
        button.disabled = false;

        // Reset button color
        button.style.backgroundColor = "#8bb6e3";


        // ===========================
        // BUTTON CLICK EVENT
        // ===========================

        button.onclick = function () {

            // Disable all buttons after selection
            optionButtons.forEach(btn => {
                btn.disabled = true;
            });

            // If correct answer
            if (button.innerHTML === currentQuiz.correct_answer) {

                button.style.backgroundColor = "green";

                score++;

            } else {

                button.style.backgroundColor = "red";

                // Show correct answer in green
                optionButtons.forEach(btn => {

                    if (btn.innerHTML === currentQuiz.correct_answer) {
                        btn.style.backgroundColor = "green";
                    }

                });
            }

            // Show next button
            nextButton.style.display = "block";
        };

    });

}


// ===========================
// NEXT BUTTON
// ===========================

nextButton.addEventListener("click", () => {

    // Move to next question
    currentQuestion++;

    // If questions still remain
    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        // Quiz finished
        showScore();
    }

});


// ===========================
// SHOW FINAL SCORE
// ===========================

function showScore() {

    questionElement.innerHTML =
        `Quiz Finished! <br><br> Your Score: ${score} / ${questions.length}`;

    // Remove options
    document.getElementById("options").innerHTML = "";

    // Hide next button
    nextButton.style.display = "none";

    // Remove question count
    qDisplay.innerHTML = "Completed!";
}


// ===========================
// START QUIZ
// ===========================

fetchQuestions();