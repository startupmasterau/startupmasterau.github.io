/*
  Rock Paper Scissors 🚀🔥
  Concepts covered in this project
    👉 For loops
    👉 Dom Manipulation
    👉 Variables
    👉 Conditionals (if else if)
    👉 Template Literals
    👉 Event Listeners
    👉 Higher order Function (Math.random())
*/
// variable to keep track of score
let totalScore = {computerScore: 0, playerScore: 0}
var globalPlayername = {} // empty global object to store playername to use in other functions

// event Listener for when enter key is pressed in the inputName field
const playerInput = document.getElementById("nameInput")
playerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    console.log("Enter worked")
    event.preventDefault();
    document.getElementById("nameButton").click();
  }
})

// Get name from #nameInput and on enter display it after user hits "Go" and then hide the input field
function getNameValue() {
  const playerInput = document.getElementById("nameInput")
  const playerName = playerInput.value
  globalPlayername.name = playerName //store this in the globalPlayername object
  const playerNameButton = document.getElementById("nameButton")
  const playerNameDiv = document.querySelector(".nameInput")
  const gameSectionDiv = document.querySelector(".gameSection")

  playerInput.style.display = "none"
  playerNameButton.style.display = "none"
  gameSectionDiv.style.visibility = "visible"

  // Display playername if entered
  if (playerName.trim().length != 0) {
    playerNameDiv.innerHTML = "<span class='animate-charcter'>"+playerName+", Let's play!</span>"
  }
  else {
    playerNameDiv.innerHTML = "<span class='animate-charcter'>Human, Let's play!</span>"
  }
}
// ** getComputerChoice randomly selects between `Rock` `Paper` `Scissors` and returns that string **
// getComputerChoice() 👉 'Rock'
// getComputerChoice() 👉 'Scissors'
function getComputerChoice() {

  let rpsChoices = ['Rock', 'Paper', 'Scissors']
  let computerChoice = rpsChoices[Math.floor(Math.random() * 3)]
  return computerChoice
}
//test = getComputerChoice()
// console.log(test)

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
// human wins - getResult('Rock', 'Scissors') 👉 1
// human loses - getResult('Scissors', 'Rock') 👉 -1
// human draws - getResult('Rock', 'Rock') 👉 0
function getResult(playerChoice, computerChoice) {
  // return the result of score based on if you won, drew, or lost
  // score object stores core of current played game for both computer and player
  let score = {computerScoreNow: 0, playerScoreNow: 0}
  // All situations where human wins, set `score` to 1
  
  if ((playerChoice == "Rock" && computerChoice == "Scissors") || (playerChoice == "Scissors" && computerChoice == "Paper") || (playerChoice == "Paper" && computerChoice == "Rock")) { 
    score.playerScoreNow = 1
  }

  // All situations where human draws, set `score` to 0
  // make sure to use else ifs here
  else if (playerChoice == computerChoice) {
    score.playerScoreNow = 0
    score.computerScoreNow = 0
  }

  // Otherwise human loses (aka set score to -1)
  else {
    score.computerScoreNow = 1
  }

  // return score
  return score
}

// test2 = getResult("Rock", test)
// console.log({test2})
// console.log(`computer is ${test}`)

// Create computerChoice button live div innerHTML to display
function createComputerButton(computerChoice) {
  switch(computerChoice) {
    case "Rock":
      buttonHTML = "<div id='buttonCompChoice'>✊</div>";
        break;
    case "Scissors":
      buttonHTML = "<div id='buttonCompChoice'>✌</div>";
        break;
    case "Paper":
      buttonHTML = "<div id='buttonCompChoice'>🤚</div>";
        break;
  }
    return buttonHTML
} 
// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, buttonHTML) {
  // Hint: on a score of -1
  // You should do result.innerText = 'You Lose!'
  // Don't forget to grab the div with the 'result' id!
  const resultDiv = document.getElementById("result")
  const playerScoreDiv = document.getElementById("player-score")
  const handsDiv = document.getElementById("hands")

  console.log(score.playerScoreNow)
  console.log(score.computerScoreNow)

  if (score.playerScoreNow == 1) {
    resultDiv.innerHTML = "<h2 class='resultH2' id='resultWin' style='color:green;'>You Win!</h2>"
  }
  else if (score.playerScoreNow == 0 && score.computerScoreNow == 0) {
    resultDiv.innerHTML = "<h2 class='resultH2' id='resultDraw' style='color:white;'>It's a Draw!</h2>"
  }
  else if (score.computerScoreNow == 1) {
    resultDiv.innerHTML = "<h2 class='resultH2' id='resultLose' style='color:red;'>You Lose!</h2>"
  }
  else {
    resultDiv.innerText = "Oops!! Something went wrong"
  }
  // get globalPlayer object name property if present
  // console.log(globalPlayername.name)
  // if (globalPlayername.name != "") {    
  // handsDiv.innerText = `👨🏻‍🦰${globalPlayername.name}:${playerChoice} vs 🤖${computerChoice}` //get emoji with Windows key + .
  // } 
  // else {
  // handsDiv.innerText = `👨🏻‍🦰Human:${playerChoice} vs 🤖${computerChoice}`
  // }

  // use the buttonHTML from createComputerButton() to display the button of the computerChoice
  handsDiv.innerHTML = buttonHTML
  
  playerScoreDiv.innerText = `👨🏻‍🦰: ${totalScore.playerScore} 🤖: ${totalScore.computerScore}`
}

// ** Calculate who won and show it on the screen **
function onClickRPS(playerChoice) {
  const computerChoice = getComputerChoice()
  const score = getResult(playerChoice, computerChoice)
  totalScore.playerScore += score.playerScoreNow // alternatively you can access the property using totalScore['playerScore']
  totalScore.computerScore += score.computerScoreNow
  createComputerButton(computerChoice) // this function passes computerChoice from here to determine what innerHTML to show for Computer's move button like div
  showResult(score, buttonHTML)
}

// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
  // use querySelector to select all RPS Buttons
  const rpsButtons = document.querySelectorAll('.rpsButton')
  // * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *

  // 1. loop through the buttons using a forEach loop
  // 2. Add a 'click' event listener to each button
  // 3. Call the onClickRPS function every time someone clicks
  // 4. Make sure to pass the currently selected rps button as an argument

  rpsButtons.forEach(rpsButton => {
    rpsButton.onclick = () => onClickRPS(rpsButton.value)
  })

  // Add a click listener to the end game button that runs the endGame() function on click
  const endGameButton = document.getElementById('endGameButton')
  endGameButton.onclick = () => endGame(totalScore)
}

// ** endGame function clears all the text on the DOM and resets the score **
function endGame(totalScore) {
  totalScore.playerScore = 0
  totalScore.computerScore = 0
  
  const resultDiv = document.getElementById("result")
  const playerScoreDiv = document.getElementById("player-score")
  const handsDiv = document.getElementById("hands")

  resultDiv.innerText = ""
  playerScoreDiv.innerText = ""
  handsDiv.innerText = ""
}

playGame()
