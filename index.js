let questions = [
    "Quel est le plus grand pays du monde ?",
    "Quel est l'élément chimique dont le symbole est O ?",
    "Quelle est la langue la plus parlée dans le monde ?",
    "Quel est le plus long fleuve du monde ?",
    "Qui a peint la Joconde ?"
];

let options = [
    ["Canada", "Russie", "Chine", "États-Unis"],
    ["Or", "Oxygène", "Hydrogène", "Azote"],
    ["Anglais", "Chinois", "Espagnol", "Arabe"],
    ["Amazon", "Nil", "Yangtsé", "Mississippi"],
    ["Vincent van Gogh", "Pablo Picasso", "Leonard de Vinci", "Claude Monet"]
];

let answers = [1, 1, 1, 0, 2]; 

let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function loadQuestions() {
    
    let shuffledIndices = [];
    for (let i = 0; i < questions.length; i++) {
        shuffledIndices.push(i);
    }
    shuffle(shuffledIndices);
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion(shuffledIndices);
}

function displayQuestion(shuffledIndices) {
    let index = shuffledIndices[currentQuestionIndex];
    document.getElementById("question").textContent = questions[index];
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';
    
    options[index].forEach(function(option, index) {
        let optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.textContent = option;
        optionDiv.onclick = function() {
            validateAnswer(index, shuffledIndices);
        };
        optionsContainer.appendChild(optionDiv);
    });
}

function validateAnswer(selectedIndex, shuffledIndices) {
    let currentIndex = shuffledIndices[currentQuestionIndex];
    if (selectedIndex === answers[currentIndex]) {
        score++;
    }
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion(shuffledIndices);
    } else {
        displayScore();
    }
}

function displayScore() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";
    document.getElementById("score").textContent = score + " sur " + questions.length;
}

document.getElementById("restart-button").onclick = function() {
    document.getElementById("score-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestions();
};

document.addEventListener("DOMContentLoaded", loadQuestions);
