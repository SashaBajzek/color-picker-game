var numSquares = 6;
var colors = [];
var pickedColor;
//Selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector(".colorDisplay");
var messageDisplay = document.querySelector(".message");
var h1 = document.querySelector("h1");
var resetButton =  document.querySelector(".reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  resetButton.addEventListener("click", reset);
  reset();
}

function setupModeButtons() {
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      //hardcoded removal of selected class from all buttons. refactor in future
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? 
        numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function setupSquares() {
  for(var i = 0; i < squares.length; i++){
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if(clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  //reset message
  messageDisplay.textContent = "";
  //change colors of squares
  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  //reset button text
  resetButton.textContent = "New Colors";
  //reset span colors
  h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
  for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var colorNumber = Math.floor(Math.random() * colors.length);
  return colors[colorNumber];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //repeat num times
  for(var i = 0; i < num; i++){
    //get random color and push into arr
    arr.push(randomColor());
  }
  //return that array
  return arr;
}

function randomColor(){
  //pick a 'red' from 0 - 255
    var r = Math.floor(Math.random() * 256);
  //pick a 'red' from 0 - 255
    var g = Math.floor(Math.random() * 256);
  //pick a 'red' from 0 - 255
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}