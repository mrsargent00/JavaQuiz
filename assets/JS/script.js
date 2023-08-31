//questions
const Questions = [{

    q: "Commonly used data types DO not include:",
    a: [{ text: "strings", isCorrect: false },
    { text: "booleans", isCorrect: false },
    { text: "alerts", isCorrect: true },
    { text: "numbers", isCorrect: false }
    ]
 
},
{
    q: "Arrays in JavaScript can be used to store.",
    a: [{ text: "numbers and strings", isCorrect: false},
    { text: "other arrays", isCorrect: false },
    { text: "booleans", isCorrect: false },
    { text: "all the above", isCorrect: true }
    ]
 
},
{
    q: "The condition in an if/else statement is enclosed with ___.",
    a: [{ text: "quotes", isCorrect: true},
    { text: "curly brackets", isCorrect: false },
    { text: "parenthesis", isCorrect: false },
    { text: "square brackets", isCorrect: false }
    ]
 
},
{
    q: "String vaules must be enclosed with ___ when being assigned to variables.",
    a: [{ text: "commas", isCorrect: false },
    { text: "curly brackets", isCorrect: false },
    { text: "quotes", isCorrect: true },
    { text: "parenthesis", isCorrect: false }
    ]
 
},
{
    q: "A very useful tool used during development and debugging for printing content to the debugger is",
    a: [{ text: "JavaScript", isCorrect: false },
    { text: "terminal/bash", isCorrect: false },
    { text: "for loops", isCorrect: false },
    { text: "console.log", isCorrect: true }
    ]
 
}

]
 
let currQuestion = 0
let score = 0
//loads next question once it is submitted 
function loadQues() {
    const question = document.getElementById("ques")
    const opt = document.getElementById("opt")
 
    question.textContent = Questions[currQuestion].q;
    opt.innerHTML = ""
 
    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        const choicesdiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");
 
        choice.type = "radio";
        choice.name = "answer";
        choice.value = i;
 
        choiceLabel.textContent = Questions[currQuestion].a[i].text;
 
        choicesdiv.appendChild(choice);
        choicesdiv.appendChild(choiceLabel);
        opt.appendChild(choicesdiv);
    }
}
 
loadQues();
 
function loadScore() {
    const totalScore = document.getElementById("score")
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`
}
 
 
function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove()
        document.getElementById("ques").remove()
        document.getElementById("btn").remove()
        loadScore();
    }
}
 
function checkAns() {
    const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);
 
    if (Questions[currQuestion].a[selectedAns].isCorrect) {
        score++;
        console.log("Correct")
        nextQuestion();
    } else {
        nextQuestion();
    }
}