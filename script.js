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

let totalScore = {computerScore: 0, playerScore: 0}

// ** getComputerChoice randomly selects between `Rock` `Paper` `Scissors` and returns that string **
// getComputerChoice() 👉 'Rock'
// getComputerChoice() 👉 'Scissors'
function getComputerChoice() {

  let rpsChoices = ['Rock', 'Paper', 'Scissors']
  let computerChoice = rpsChoices[Math.floor(Math.random() * 3)]
  return computerChoice
}
test = getComputerChoice()
// console.log(test)

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
// human wins - getResult('Rock', 'Scissors') 👉 1
// human loses - getResult('Scissors', 'Rock') 👉 -1
// human draws - getResult('Rock', 'Rock') 👉 0
function getResult(playerChoice, computerChoice) {
  // return the result of score based on if you won, drew, or lost
  let score
  // All situations where human wins, set `score` to 1
  
  if ((playerChoice == "Rock" && computerChoice == "Scissors") || (playerChoice == "Scissors" && computerChoice == "Paper") || (playerChoice == "Paper" && computerChoice == "Rock")) { 
    score = 1
  }

  // All situations where human draws, set `score` to 0
  // make sure to use else ifs here
  else if (playerChoice == computerChoice) {
    score = 0
  }

  // Otherwise human loses (aka set score to -1)
  else {
    score = -1
  }

  // return score
  return score
}


// test2 = getResult("Rock", test)
// console.log({test2})
// console.log(`computer is ${test}`)

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {
  // Hint: on a score of -1
  // You should do result.innerText = 'You Lose!'
  // Don't forget to grab the div with the 'result' id!

  const resultDiv = document.getElementById("result")
  const playerScoreDiv = document.getElementById("player-score")
  const handsDiv = document.getElementById("hands")

  if (score == 1) {
    resultDiv.innerText = "You Win!"
  }
  else if (score == 0) {
    resultDiv.innerText = "It's a Draw!"
  }
  else if (score == -1) {
    resultDiv.innerText = "You Lose!"
  }
  else {
    resultDiv.innerText = "Oops!! Something went wrong"
  }
  
  handsDiv.innerText = `👨🏻‍🦰Player: ${playerChoice} vs 🤖Computer: ${computerChoice}` //get emoji with Windows key + .
  playerScoreDiv.innerText = `👨🏻‍🦰: ${totalScore.playerScore} 🤖: ${totalScore.computerScore}`
}

// ** Calculate who won and show it on the screen **
function onClickRPS(playerChoice) {
  const computerChoice = getComputerChoice()
  const score = getResult(playerChoice, computerChoice)
  totalScore.playerScore += score // alternatively you can access the property using totalScore['playerScore']
  totalScore.computerScore -= score
  
  // console.log({computerChoice})
  // console.log({playerChoice})
  // console.log({score})
  // console.log(score[1])
  // console.log(totalScore)
  showResult(score, playerChoice, computerChoice)
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

// ** endGame function clears all the text on the DOM **
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