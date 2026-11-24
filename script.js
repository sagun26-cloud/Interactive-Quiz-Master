const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Language", "Home Tool Language", "Hyper Tool Language"],
        answer: "Hyper Text Markup Language"
    },
    { 
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "CSS"
    },
    {
        question: "What does JS stand for?",
        options: ["Java System", "JavaScript", "Just Script", "Java Source"],
        answer: "JavaScript"
    },
    {
        question: "Which tag is used for the largest heading?",
        options: ["<h6>", "<h1>", "<p>", "<head>"],
        answer: "<h1>"
    },
    {
        question: "Which keyword declares a constant?",
        options: ["var", "let", "const", "function"],
        answer: "const"
    },
    {
        question: "Which method selects an element by ID?",
        options: ["getElementById()", "getClass()", "queryAll()", "getName()"],
        answer: "getElementById()"
    },
    {
        question: "Which event occurs when a button is clicked?",
        options: ["mouseover", "click", "load", "change"],
        answer: "click"
    },
    {
        question: "Which method adds an element to an array?",
        options: ["pop()", "push()", "shift()", "slice()"],
        answer: "push()"
    },
    {
        question: "What is the brain of a computer?",
        options: ["RAM", "CPU", "Mouse", "Keyboard"],
        answer: "CPU"
    },
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        answer: "New Delhi"
    }
];
let currentQuestion = 0;
let score = 0;
let wrongAnswers = 0;
let selected = false;
const startButton = document.getElementById("start-btn");
if (startButton) {
    startButton.addEventListener("click", function() {
        currentQuestion = 0;
        score = 0;
        wrongAnswers = 0;
        window.location.href = "quiz.html";
    });
}
function loadQuestion() {

    selected = false;

    let questionElement = document.getElementById("question");
    let optionsElement = document.getElementById("options");
    let nextButton = document.getElementById("next-btn");
    let current = questions[currentQuestion];
    document.getElementById("question-number").innerText =
        "Question " + (currentQuestion + 1) + " / " + questions.length;
    questionElement.innerText = current.question;
    optionsElement.innerHTML = "";
    nextButton.disabled = true;
    current.options.forEach(function(option) {
        let button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", function() {
            checkAnswer(button, option);
        });
        optionsElement.appendChild(button);
    });
}
function checkAnswer(button, selectedAnswer) {
    if (selected) {
        return;
    }
    selected = true;
    let correctAnswer = questions[currentQuestion].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
        button.classList.add("correct");
    } else {
        wrongAnswers++;
        button.classList.add("wrong");
        let allOptions = document.querySelectorAll(".option");
        allOptions.forEach(function(option) {
            if (option.innerText === correctAnswer) {
                option.classList.add("correct");
            }
        });
    }
    document.getElementById("next-btn").disabled = false;
}
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        sessionStorage.setItem("score", score);
        sessionStorage.setItem("wrong", wrongAnswers);
        sessionStorage.setItem("total", questions.length);
        window.location.href = "results.html";
    }
}
function showResults() {
    let finalScore = Number(sessionStorage.getItem("score")) || 0;
    let wrong = Number(sessionStorage.getItem("wrong")) || 0;
    let total = Number(sessionStorage.getItem("total")) || 0;
    let percentage = total > 0 ? (finalScore / total) * 100 : 0;
    document.getElementById("final-score").innerText =
        "Your Score: " + finalScore + " / " + total;
    document.getElementById("correct").innerText =
        "Correct Answers: " + finalScore;
    document.getElementById("wrong").innerText =
        "Wrong Answers: " + wrong;
    document.getElementById("total").innerText =
        "Total Questions: " + total;
    document.getElementById("percentage").innerText =
        "Percentage: " + percentage.toFixed(2) + "%";
    let message = document.getElementById("message");
    if (percentage >= 70) {
        message.innerText = "Excellent Work! Keep it up! 🌟";
    } else {
        message.innerText = "Good try! Keep practicing! 💪";
    }
}
function restartQuiz() {
    sessionStorage.removeItem("score");
    sessionStorage.removeItem("wrong");
    sessionStorage.removeItem("total");
    window.location.href = "index.html";
}
const nextButton = document.getElementById("next-btn");
if (nextButton) {
    nextButton.addEventListener("click", nextQuestion);
    loadQuestion();
}
const resultElement = document.getElementById("final-score");

if (resultElement) {

    showResults();

    document.getElementById("restart-btn").addEventListener("click", restartQuiz);
} 