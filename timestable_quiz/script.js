// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter, errMsg) {
    [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
      textbox.addEventListener(event, function(e) {
        if (inputFilter(this.value)) {
          // Accepted value.
          if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
            this.classList.remove("input-error");
            this.setCustomValidity("");
          }
  
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        }
        else if (this.hasOwnProperty("oldValue")) {
          // Rejected value: restore the previous one.
          this.classList.add("input-error");
          this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
        else {
          // Rejected value: nothing to restore.
          this.value = "";
        }
      });
    });
  }

// get all document elements to display information
const checkboxContainerDiv = document.getElementById('checkbox-container');
const checkboxesDiv = document.getElementById('timestable-checkboxes');
const questionDiv = document.getElementById('question');
// const resultDiv = document.getElementById('result');
const questionAmount = setInputFilter(document.getElementById("question-amount"), function(value) {
    return /^\d*?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
  }, "Only digits are allowed");
const errorSpan = document.getElementById('error-span');
const letsgoButton = document.getElementById('lets-go-button');
const questionAmountDiv = document.getElementById('question-amount-container');
const questionContainerDiv = document.getElementById('question-container');
const answerContainerDiv = document.getElementById('answer-container');
const answerInputCheck = setInputFilter(document.getElementById("answer-input"), function(value) {
    return /^\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
  }, "Only digits are allowed");
const answerInput = document.getElementById("answer-input");
const answerButton = document.getElementById('answer-button');
const resultSpan = document.getElementById('result-span');
const practiseButton = document.getElementById('practise-button');
const clearButton = document.getElementById('clear-button');

// hide answer-container & question-container elements initially
answerContainerDiv.style.display = 'none';
questionContainerDiv.style.display = 'none';
practiseButton.style.visibility = 'hidden';

// global variables
let checkboxResults = [];
let answer = "";
let questionAmountFinal = 0;
let questionAmountRunning = 0;
let correctAnswers = 0;
let questionCounter = 0;
endGame = false;

//function to check at least one checkbox checked
const atLeastOneChecked = (checkboxGroup) => {
 for (let i = 0; i < checkboxGroup.length; i++) {
    if (checkboxGroup[i].checked) {
        return true;
    }
 }
 return false;
};

//function to to get checkbox values
const getCheckboxValues = () => {
  const checkboxValues = document.querySelectorAll('.timestable-range');
  console.log("🚀 | getCheckboxValues | checkboxValues:", checkboxValues);
  // check if at least one checkbox is selected
  const isValidCheckboxSelection = atLeastOneChecked(checkboxValues);
  if (!isValidCheckboxSelection) {
    errorSpan.textContent = "Please select at least one timestable"
    questionAmountDiv.classList.toggle('show'); //show the question amount div when no checkboxes selected
    return;
  }
  //loop through checkbox values and add the selected timestables to checkboxResults array
  checkboxValues.forEach( (checkbox) => {
    if (checkbox.checked === true) {
        checkboxResults.push(checkbox.value) //push value of checkbox to checkboxResults array
        return;
    };
  })
}

// function to amount of questions from input
const getQuestionAmount = () => {
  const questionAmount = parseInt(document.getElementById('question-amount').value);
  console.log("🚀 | getQuestionAmount | questionAmount:", questionAmount);
  if (questionAmount < 1 || questionAmount > 50 || !questionAmount) {
      errorSpan.textContent = "Please enter between 1 and 50 questions only"
      return
  }
  return questionAmount
};

// function to get random element from checkboxResults (the timestables that we want to generate questions for)
const getRandomElement = (array) => {
  const randomElement = array[(Math.floor(Math.random() * array.length))]
  return randomElement;
};


// function to generate questions
const generateQuestion = () => {
  // pick a random element (selected timestable) from checkboxResults array
  const randomElement = getRandomElement(checkboxResults);
  //generate a random number between 1-12 to multiply against range
  const random12 = Math.ceil(Math.random() * 12)
  // multiply it by a random timetable range selected
  answer = random12 * randomElement;
  // display the question
  const questionString = `${random12} X ${randomElement} =`;
  questionContainerDiv.innerText = questionString;
  // increment the question counter
  questionCounter ++
  console.log("🚀 | generateQuestion | questionCounter:", questionCounter);
  // show how many questions are left
  resultSpan.textContent = `${questionCounter} out of ${questionAmountFinal}`
  // unhide the answer input and enter button (hidden initially from checkAnswer)
  answerContainerDiv.style.visibility = 'visible';
  // focus the cursor to the answer input
  document.getElementById("answer-input").focus();
};

//function to check answer entered
const checkAnswer = () => {
  const answerInput = parseInt(document.getElementById('answer-input').value);
  console.log("🚀 | checkAnswer | answerInput:", answerInput);
  console.log('answer: ', answer)
  const compare = (answerInput === answer)
  console.log('answer = answerInput', compare)

  //hide the answer input field enter button
  answerContainerDiv.style.visibility = 'hidden';

  if (answer === answerInput) {
    questionContainerDiv.innerText = "Correct";
    document.getElementById('answer-input').value = "";
    console.log('correct');
    correctAnswers ++;
  } else {
    questionContainerDiv.innerText = "Wrong";
    document.getElementById('answer-input').value = "";
    console.log('wrong');
  }
}


// function to reset quiz to practise the same timestables again
const practiseAgain = () => {
  //reset variables, but not the questionAmountFinal
  questionCounter = 0;
  questionAmountRunning = 0;
  endGame = false;
  correctAnswers = 0;
  generateQuestion();
};

// function to play game
const playGame = () => {
  // show the enter button
  answerContainerDiv.style.visibility  = 'visible';

  // reset all variables
  questionAmountRunning = 0;
  errorSpan.textContent = "";
  correctAnswers = 0;
  // reset global variable checkboxResults array back to blank
  checkboxResults = [];

  // get the values from the checkboxes (timetable ranges) and store it into checkboxResults array
  getCheckboxValues();
  console.log("🚀 | checkboxResults:", checkboxResults);

  // console.log("🚀 | letsgoButton.addEventListener | randomElement:", randomElement);
  // generateQuestion(randomElement);
  // console.log("🚀 | letsgoButton.addEventListener | questionAmountFinal2:", questionAmountFinal);
  
  //stores how many questions for the quiz
  questionAmountFinal = getQuestionAmount();
  console.log("🚀 | letsgoButton.addEventListener | questionAmountFinal:", questionAmountFinal);
  // questionAmountRunning = questionAmountFinal; << might need to turn this back on later for the counter
  // console.log("🚀 | letsgoButton.addEventListener | questionAmountRunning:", questionAmountRunning);

  // when a timestable and question amount is valid, then hide/unhide elements for quiz to begin and generate first question
  if (questionAmountFinal && checkboxResults.length > 0) {
      checkboxContainerDiv.style.display = 'none';
      letsgoButton.classList.toggle('hidden');
      questionAmountDiv.style.display = 'none';
      checkboxesDiv.style.display = 'none';
      answerContainerDiv.style.display = 'flex';
      questionContainerDiv.style.display = 'flex';
      generateQuestion();
  }
}
    
// add click event listener to let's go button
letsgoButton.addEventListener('click', () => {
  playGame();
});

// add click event listener to Enter answer button
answerButton.addEventListener('click', () => {
  // check if answer input field is empty first
  if (!document.getElementById("answer-input").value) {
    document.getElementById("answer-input").reportValidity();
    return
  }
  checkAnswer();
  // finish game if all questions answered
  if (questionCounter === questionAmountFinal) {
    setTimeout( () => {questionContainerDiv.innerText = "Quiz Completed"}, 1000);
    answerContainerDiv.style.visibility = 'hidden';
    practiseButton.style.visibility = 'visible';
    endGame = true;
    resultSpan.innerText = `You got ${correctAnswers} correct out of ${questionAmountFinal}`
  } else {
    setTimeout( () => {generateQuestion()}, 2000);
  }
})

// add keypress event listenr to answerInput
answerInput.addEventListener('keydown',function(e) {
  if (e.key === "Enter"){
    checkAnswer();
    // finish game if all questions answered
    if (questionCounter === questionAmountFinal) {
      setTimeout( () => {questionContainerDiv.innerText = "Quiz Completed"}, 2000);
      answerContainerDiv.style.visibility = 'hidden';
      practiseButton.style.visibility = 'visible';
      endGame = true;
      resultSpan.innerText = `You got ${correctAnswers} correct out of ${questionAmountFinal}`
    } else {
      setTimeout( () => {generateQuestion()}, 2000);
    }
  }
});

// add click event listener to Enter practise again button
practiseButton.addEventListener('click', () => {
  practiseAgain();
})
