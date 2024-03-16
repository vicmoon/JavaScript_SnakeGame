
const playBoard= document.querySelector('.board');
const scoreCounter = document.querySelector('.score')
const highScoreCounter = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i'); 
const wrapper = document.querySelector('.wrapper'); 


 
let foodX;
let foodY; 
let snakeX = 5; 
let snakeY = 10; 
let speedX = 0; 
let speedY = 0; 
let snakeBody= []; 
let gameOver = false;
let setIntervalId;
let score = 0;



// Get high-score from local storage 
let highScore = localStorage.getItem('high-score') || 0; 
highScoreCounter.innerHTML = `Highest Score : ${highScore}`;

//Generate random positon of the food 

const changefoodPosition = function(){
    foodX = Math.floor(Math.random() * 30) +1; 
    foodY = Math.floor(Math.random() * 30) +1;
};

const handleGameOver= function(){
    clearInterval(setIntervalId); 
    alert("Game over💥 Press OK to restart 🐍");
    location.reload(); 
}

const changeDirection = function(e){
    if(e.key === "ArrowUp" && speedY !=1){
        speedX = 0; 
        speedY =-1;
    } else if(e.key === "ArrowDown" && speedY !=-1){
        speedX = 0; 
        speedY = 1;
    }else if(e.key === "ArrowLeft" && speedX != 1 ) {
        speedX = -1; 
        speedY = 0;
    } else if(e.key === "ArrowRight" && speedX != -1 ){
        speedX = 1; 
        speedY = 0;
    }
   
}; 


const initGame = function(){
    if(gameOver) return handleGameOver(); 
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div> `; 
     
    // Check if the snake ate the food 
    if(snakeX === foodX && snakeY === foodY){
    changefoodPosition(); 
    changeBorderColorEat();
    snakeBody.push([foodX, foodY]);  // Add food to the snake body 
    score++; // Increment score by 1 when the snake ate 
    highScore = score >= highScore? score : highScore; 

    localStorage.setItem("high-score", highScore);  // storing to local storage 
    scoreCounter.innerHTML= `Score : ${score}`;
    highScoreCounter.innerHTML = `Highest Score : ${highScore}`;
    };


    for(let i= snakeBody.length - 1; i > 0; i--){
        //shifting forward the snake body elements 
        snakeBody[i]= snakeBody[i-1]; 
    }     
    
        snakeBody[0]= [snakeX, snakeY];  // Set the first snake body element to current snake position 


    // Change head position  based on current velocity 
    snakeX += speedX; 
    snakeY += speedY;

   //If the snake hits the wall, set gameOver to true
   if(snakeX <=0|| snakeX >30 || snakeY <=0|| snakeY >30){
    gameOver = true;
    wrapper.style.borderColor = "red";
    wrapper.style.backgroundColor = "red";
   }

    for(let i=0; i <snakeBody.length; i++){
        //Adding a div to the snake body 
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div> `;
        if(i !== 0 && snakeBody[0][i] === snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true; 
           }
       }
      
    playBoard.innerHTML = htmlMarkup; 
};


const changeBorderColorEat = function(){
    wrapper.style.borderColor = "yellow";
}

// Event listener 

document.addEventListener('keydown', changeDirection); 
controls.forEach(key => {
    //Calling the change Direction function on each key and passing the key dataset value as an objct 
  key.addEventListener('click', () => changeDirection({key: key.dataset.key}) ); 
});



// Start functions 

changefoodPosition(); 
setIntervalId = setInterval(initGame, 130); 
