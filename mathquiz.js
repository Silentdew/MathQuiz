const problemElement = document.querySelector(".problem")//the problem is from a class in HTML
const ourForm =document.querySelector(".form")
const ourField =document.querySelector(".field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")


let state ={
  score: 0,
  wrongAnswers: 0
}

function updateProblem (){//generates a new problem
  state.currentProblem = generateProblem() //store it the problem in our state
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`/*And renders it to the user interface i.e visually display the problem --> .innerHTML*/
  ourField.value = ""// Nothing is in the apostrophe, this is because we want to clear out the previous value in the input "field" box
  ourField.focus () //The .focus method makes a HTML active in the document/website e.g after an event you don't have to click the input field to type as it already the focus in document/website
  //this is to output the quiz problem visually. we used a back tick instead of a apostrophe
} //we use this function to generate a new problem and store it in state//

updateProblem () //calling the function so it works

function generateNumber(max) {
  return Math.floor (Math.random () * (max +1))
}/*This function is used to generate random numbers between 1- 10 it can also be written as:
function generateNumber() {
  return Math.floor (Math.random () * 11))
}*/


function generateProblem (){
  return{
    numberOne: generateNumber (10),
    numberTwo: generateNumber(10),
    operator: ['+', '-', 'x'] [generateNumber(2)]
  }//the three lines above are to generate numbers and maths signs between +, - ,and x.//
}

ourForm.addEventListener ("submit",  handleSubmit) // (event, functionName)
function handleSubmit(e) {
e.preventDefault ()

  let correctAnswer
  const p = state.currentProblem
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(ourField.value, 10) === correctAnswer) {
  state.score++
  pointsNeeded.textContent = 10 - state.score
  updateProblem ()
  renderProgressBar ()
  problemElement.classList.add("animate-right")
  setTimeout(() => problemElement.classList.remove("animate-right"), 500)//timer to animate right Answers
  }else {
    state.wrongAnswers++
    mistakesAllowed.textContent = 2 - state.wrongAnswers
    /*instead of using   alert ("good job") "which shows a pop up bar at the top of the screen we use" we want to increment the score and the mistakes allowed i.e <span class="points-needed">10</span> etc
    textContent is used for ntml with few characters*/
    problemElement.classList.add("animate-wrong")
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 331)//timer to animate wrongAnswers
  }
  checkLogic ()
}


function checkLogic () {
  // a condition for if you won
  if  (state.score === 10) {
    endMessage.textContent = "Congrats, you won!"
    document.body.classList.add("overlay-is-open")
    setTimeout ( /*function*/() => resetButton.focus (), 331) // since it takes .330 milliseconds for the overlay class to animate we use a timeout function in which (a,b) a is a placeholder for the function that has to run after the time written in placeholder b is complete. The function in placeholder a is an arrowfuction that doesn't need the word "function". So after 331 milliseconds there os focus on the resetButton.
  }
    //a condition for if you lost
  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry, you lost."
    document.body.classList.add("overlay-is-open") //this is used to classify the body tag in html to set the css attributes in motion without complicating the other elements within the body in HTML
    setTimeout ( /*function*/() => resetButton.focus (), 331)
  }
}

resetButton.addEventListener("click", resetGame)

function resetGame () {
  document.body.classList.remove("overlay-is-open")
  updateProblem ()
  state.score = 0
  state.wrongAnswers = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
  renderProgressBar()
}
function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score/10})`
}
