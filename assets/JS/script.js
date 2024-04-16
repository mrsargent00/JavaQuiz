var startButton = document.getElementById("start"); // access start button in html
startButton.setAttribute("style", "font-size: 2.5vh; padding: 15px; margin-top: 2vh;"); //start button styling
startButton.textContent = "Start Quiz"; // start button text
var resetButton = document.getElementById("reset"); // access reset button in html
resetButton.setAttribute("style", "font-size: 2.5vh; padding: 15px; margin-top: 2vh;"); // reset button styling
var viewScoresButton = document.getElementById("view-score"); // access view-scores button in html

var scoreEl = document.getElementById("total-score"); // access total-score in HTML
scoreEl.style.visibility = "hidden"; // hide the total score bar at page load

var questionContainer = document.getElementById("question-container"); // access question-container in HTML
var choicesContainer = document.getElementById("choices-container"); // access choices-container in HTML

var accuracyEl = document.getElementById("accuracy"); // access accuracy div in HTML
accuracyEl.style.visibility = "hidden"; // hide the accuracy result at page load

var saveScoreForm = document.getElementById("score-form");  // access score-form form in HTML
saveScoreForm.style.visibility = "hidden"; // hide the score form at page load

var currentProblemIndex = 0; // keeps track of which problem user is on 
var timerInterval;

var points = 0; // starting points

// timer
var timerEl = document.getElementById('timer'); // retrieves #timer from html, hidden at page load
var timeLeft = 30; // quiz time length - 30 seconds
var timerStart = document.getElementById('start-time'); // retrieves #start-timer from html (time before quiz starts)
timerEl.textContent = "Time: " + timeLeft; // timer text content before timer starts, allows for smooth transition once timer starts
 

// timer countdown function
function startTime() {
    // sets interval in variable
    
    timerInterval = setInterval(function() { // setInterval executes code repeatedly 1s (1000ms)
        timeLeft--; // timer decrement by 1s

        if (timeLeft <= 0) {  
            clearInterval(timerInterval); // stops setInterval at 0s, prevents from going into negatives
            // when timer runs out...
            questionContainer.style.visibility = "hidden"; // hide question
            choicesContainer.style.visibility = "hidden"; // hide answers
            saveScoreForm.style.visibility = "visible"; // show score form
            console.log("time ran out!");
            console.log("total score:", points);
            scoreEl.textContent = "Total Score: " + points; // show the final score
            scoreEl.setAttribute("style", "background-color:rgba(100, 216, 177, 0.7); color:black"); // change bar color
            timerEl.textContent = "Time: 0"; // set timer to 0 (in case there were seconds left before penalty, otherwise timer will stop at this time)
            var submitButton = document.getElementById('submit');
            submitButton.style.setProperty('visibility','visible');
        } else {
            timerEl.textContent = "Time: " + timeLeft; // timer text content during countdown
        }
    }, 1000); // sets interval for 1000ms 
}
  

// clicking start starts timer and removes the start button from the screen and pulls up the first question
startButton.addEventListener("click", function() {
    startTime(); // start timer countdown function
    var instructionsEl = document.getElementById("instructions"); // access intructions in HTML
    instructionsEl.style.display = "none"; // hide the instructions and remove from page once quiz starts
    timerEl.style.display = "inline"; // show timer
    timerStart.style.display = "none"; // hide time <a> element
    startButton.style.display = "none"; // hide start quiz button
    console.log ('startBtn', currentProblemIndex)
    displayProblem(currentProblemIndex); // show first quiz problem
    });



// quiz problems
var quizProblems = [
    {   
        question: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: 2 // [2] is the correct choice
      },
    {   
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: 2 // [2] is the correct choice
      },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: 3 // [3] is the correct choice
      },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: 2 // [2] is the correct choice
      },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console log"],
        correctAnswer: 3 // [3] is the correct choice
      },
    ];


function displayProblem(index) { // index represents which q in the questions array

    accuracyEl.style.visibility = "visible"; // show the accuracy result at page load (neutral to start)
    scoreEl.style.visibility = "visible"; // show the score counter at page load
    var currentProblem = quizProblems[index]; // retrieves indexed problem, then assigns in 'currentProblem' variable 
    questionContainer.textContent = currentProblem.question; // takes q from currentProblem and displays through HTML
    choicesContainer.innerHTML = ""; // clear previous answer choices
    
    // makes each answer choice a functional button 
    currentProblem.choices.forEach(function(choice, choiceIndex) { // sets each answer choice button
        var choiceButton = document.createElement("button"); // creates each choice button
        choiceButton.textContent = choice; // sets the button text to the answer choices from the quizProblems variable
        choiceButton.classList.add("choice"); // adds a "choice" class - use in CSS
        choiceButton.addEventListener("click", function() { // adds functionality to buttons
          checkAnswer(choiceIndex);});
        choicesContainer.appendChild(choiceButton); // adds button to choices container 
    });
};


function checkAnswer(selectedIndex) { // selectedIndex represents selected answer choice
    var currentProblem = quizProblems[currentProblemIndex]; // retrieving the answer from the quizProblems array
    
    if (selectedIndex === currentProblem.correctAnswer) { // if the selected answer is CORRECT
      points += 10; // add 10 pts to the "points" array
      console.log (points); 
      console.log("correct 😎"); 
      accuracyEl.textContent = "Correct 😎"; // show "correct" in the accuracyEl
      scoreEl.textContent = "Score: " + points; // show the score
    
    } else { // if the selected answer is an INCORRECT
      points -= 5; // subtract pts to the "points" array
      console.log (points); 
        function timePenalty () { // timer penalty for incorrect choice
            if (timeLeft > 5) {
                timeLeft -= 5; // timer loses 5s for incorrect choice, but  
            } else {
                timeLeft = 0; }} // if there are less than 5s left, timer goes to 0
      console.log("incorrect 😩"); 
      accuracyEl.innerHTML = ""; // clear previous result
      accuracyEl.textContent = "Incorrect 😩"; // show "incorrect" in the accuracyEl 
      scoreEl.textContent = "Score: " + points; // show the score
      timePenalty();
    }

    currentProblemIndex++; // go on to the next question
    if (currentProblemIndex < (quizProblems.length)) { // go to the next q, as long as there are more qs
        console.log('checkAnswer', currentProblemIndex)
        displayProblem(currentProblemIndex); // show the next q per the displayProblem function
    } else { // if there are no questions left...
        clearInterval(timerInterval); // reset timer if there's any time left
        timerEl.textContent = "Time: 0"; // set timer to show 0s
        questionContainer.style.visibility = "hidden"; // hide question
        choicesContainer.style.visibility = "hidden"; // hide answer
        saveScoreForm.style.visibility = "visible"; // show score form
        var submitButton = document.getElementById("submit"); 
        submitButton.style.setProperty('visibility','visible');
        console.log("finished quiz");
        console.log("final score:", points); // 
        scoreEl.textContent = "Total Score: " + points; //
        scoreEl.setAttribute("style", "background-color: rgba(100, 216, 177, 0.7); color:black; font-size:2vh;"); // revert bar color
    }
}   


//score form functionality 
saveScoreForm.addEventListener("submit", function(event) {
    event.preventDefault(); // prevents page reload

    var userName = document.getElementById("name").value; // access inputted name from form input
    var userScore = points; // set points as current player's score

    // retrieve existing scores from local storage, add the new score
    // create array with name and score or retrieve existing scores from local storage   
    var highScores = JSON.parse(localStorage.getItem("highScores")) || []; 

    // sort the scores, and update local storage:
    highScores.push({ name: userName, score: userScore }); // add new score to highScores 
    highScores.sort(function(a, b) { return b.score - a.score; }); // sort highScores array high to low using 'push' function

    localStorage.setItem("highScores", JSON.stringify(highScores)); // store highScores in local storage

    var submitButton = document.getElementById("submit");
    //submitButton.style.visibility = "hidden";
    submitButton.style.setProperty('visibility','hidden');
    console.log('hidding button')

    displayHighScores(); // show all the scores including latest user's score

    // show a "Try Again" button where the Start Quiz button was, with same functionality
        var startOverButton = document.getElementById("start-over"); // access start button in html again, but assign to a different variable
    startOverButton.setAttribute("style", "font-size: 2.5vh; padding: 15px; margin-top: 2vh;"); // keep same button styling as initial start button
    startOverButton.textContent = "Take Quiz Again"; //start over button text
    startOverButton.style.display = "block"; // show start over button again with revised text

    // reset timer and score bar to initial settings
    timeLeft = 30; // reset timer to 30 seconds
    var timerStart = document.getElementById('start-time'); // retrieves #start-timer from html (time before quiz starts)
    timerEl.textContent = "Time: " + timeLeft; // timer text content before timer starts, allows for smooth transition once timer starts
    timerStart.style.display = "block"; // show initial time <a> element
    timerEl.style.display = "none"; // hide timer
    points = 0; // reset points to 0
    scoreEl.textContent = "Score: " + points; // show the reset score
    scoreEl.setAttribute("style", "background-color: black; color:rgb(100, 216, 177)"); // revert bar color

    // need functionality for the startOverButton but it does not work... time decreases too fast?
    startOverButton.addEventListener("click", function() {
        clearInterval(timerInterval);
        console.log("start q again button clicked");
        index = 0; // reset problem index
        currentProblemIndex = 0; // reset problem index
        startTime(timeLeft); // start timer countdown function
        timerStart.style.display = "none"; // hide time <a> el
        timerEl.style.display = "inline"; // show timer
        startOverButton.style.visibility = "hidden"; // hide start quiz again button, without any shifting
        questionContainer.style.visibility = "visible"; // show question
        choicesContainer.style.visibility = "visible"; // show answer
        saveScoreForm.style.visibility = "hidden"; // hide score form
        console.log('startOverBtn', currentProblemIndex)
        displayProblem(currentProblemIndex); // show first quiz problem
        });
        
});


function displayHighScores() {
    var highScoresList = document.getElementById("high-scores-list"); // access ordered list high-scores-list in HTML
    var highScores = JSON.parse(localStorage.getItem("highScores")) || []; // retrieve scores from local storage

    highScoresList.innerHTML = ""; // clear previous list

    var scoresToShow = Math.min(8, highScores.length); // add scores to high score list, but limit to 8 items
    for (var i = 0; i < scoresToShow; i++) {
        var score = highScores[i];
        var listItem = document.createElement("li"); // creates a list item
        listItem.textContent = score.name + ": " + score.score; // text to be displayed in list item
        listItem.classList.add("user-score"); // adds a "user-score" class - use in CSS
        highScoresList.appendChild(listItem); // append to ol
    };

    //     could add code to style list when it exceeds 8 scores...?
}

// view scores and reset buttons
viewScoresButton.addEventListener("click", function() {displayHighScores();}); // shows existing scores  
resetButton.addEventListener("click", function () { // clears existing scores 
    localStorage.clear();
    displayHighScores();
})