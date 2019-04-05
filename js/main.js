let body = document.querySelector('body');
body.style.display = 'flex';
body.style.backgroundColor = "rgb(0, 255, 225)";
let modal = document.getElementById('outerModal');
// creating and styling canvas and conponents of canvas
let canvas = document.getElementById('mainCanvas');
canvas.width = canvas.height = "608";
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let initialSnakeLength = 1;
let winningScore = 1;
canvas.style.margin = '0 auto';
canvas.style.border = '10px solid black';
let ctx = canvas.getContext("2d");
let cell = canvasWidth/19;
const bground = new Image();
bground.src = 'images/bground.png';
let ResetInitXansdYPosition = 9;
let initialPositionX = 9;
let initialPositionY = 9;
let gameStatus;
let gamePaused = false;
let level = 1;
let setIntervalSpeed = 350;
let  mobileInterface = false;
const playSounds = (filePath)=>{
let mediaSound = new Audio(filePath);
mediaSound.play();
return mediaSound;
}
const mediaQinJs = (mobileSize)=>{
    if(mobileSize.matches){  
        modal.style.display = 'none';
        body.style.background = "red";
        canvas.width = '304';
        canvas.height = '304';
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        cell = canvasWidth/19;
        mobileInterface = true;
    }
    else{
        body.style.background = "rgb(0, 255, 225)";
        modal.style.display = 'none';
        canvas.width = '608';
        canvas.height = '608';
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        cell = canvasWidth/19;
        mobileInterface = false;
    }
 }
let mobileSize = window.matchMedia('(max-width:700px)');
class CarachterClass{
  constructor(size,color,xAxis,yAxis){
    this.size =  size;
    this.color = color;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
  }
}
class Snakes extends CarachterClass{
  constructor(size,color,length,speedX,speedY,movingHistory,score){
    super(size,color)
    this.length = length;
    this.speedX = speedX;
    this.speedY = speedY;
    this.movingHistory = movingHistory;
    this.score = score;
    this.music = {
      eat:'audio/eating.mp3',
      loose:'audio/gameOver.mp3',
      win:'audio/winner.mp3',
      move:'audio/move.mp3'
    };
  }
    changeScore(){
      this.score++;
    }
    move(){
      initialPositionX+=this.speedX;
      initialPositionY+=this.speedY;
        if(level!==3){
          if(initialPositionX>17){
            initialPositionX =1;
          }
          if(initialPositionX<1){
            initialPositionX =17;
          }
          if(initialPositionY<3){
            initialPositionY=17;
          }
          if(initialPositionY>17){
            initialPositionY=3;
          }
        }  
        if(level === 3){
          if(initialPositionY ===18 || initialPositionY === 2 || initialPositionX === 0 || initialPositionX === 18){
            if(!mobileInterface || mobileInterface === undefined){
              document.getElementById('outerGameOver').style.display = 'flex';
            }
            else if(mobileInterface === true){
             let confirmationMessage = confirm("do you want to replay?" );
             if(confirmationMessage){
               restartGame();
               this.lost();
               clearInterval(gameStatus);
               initialPositionX = initialPositionY = ResetInitXansdYPosition;
               this.speedX = this.speedY =0;
              return;
             }
            }
            this.lost();
            clearInterval(gameStatus);
            initialPositionX = initialPositionY = ResetInitXansdYPosition;
            this.speedX = this.speedY =0;
          }
        } 
        let newCell = {
          x:initialPositionX,
          y:initialPositionY
        }
        this.movingHistory.push(newCell);
        ///checking for collision
        for(let i=0;i<this.movingHistory.length-1;i++){
          if((this.movingHistory[i].x===initialPositionX&&this.movingHistory[i].y ===initialPositionY)){
            ///loose condition
            if(!mobileInterface || mobileInterface === undefined){
              document.getElementById('outerGameOver').style.display = 'flex';
            }
            else if(mobileInterface){
              let confirmationMessage = confirm('do you want to replay?');
              this.lost();
              clearInterval(gameStatus);
              initialPositionX = initialPositionY = ResetInitXansdYPosition;
              restartGame();
              return;
            }
            this.lost();
            clearInterval(gameStatus);
            initialPositionX = initialPositionY = ResetInitXansdYPosition;
          }
        }
          if(apple.xAxis === initialPositionX && apple.yAxis === initialPositionY){
            ///eating condition
            this.eat();
            this.changeScore();
            apple.updatePosition();
            this.length++;
          }
          else{
            this.movingHistory.shift();
          }
    }
    eat(){
      playSounds(this.music.eat);
    }
    lost(){
      playSounds(this.music.loose);
    }
    win(){
      playSounds(this.music.win);
    }
};
const mySnake = new Snakes(cell,"black",initialSnakeLength,0,0,[],0);
class Food extends CarachterClass{
  constructor(size,color,xAxis,yAxis){
    super(size,color,xAxis,yAxis);
  }
    updatePosition(){
      ctx.fillStyle =  this.color;
      this.xAxis    =  Math.floor(Math.random()*12+3);
      this.yAxis    =  Math.floor(Math.random()*12+3);
    }
}
const random = Math.floor(Math.random()*13+3);
const apple =  new Food(cell-3,'red',random,random);
const drawFood = ()=>{
  ctx.beginPath();
  ctx.fillStyle = apple.color;
  ctx.fillRect(apple.xAxis*cell,apple.yAxis*cell,cell-3,cell-3);
}
const drawSnake = function(){
    ctx.fillStyle = 'black';
    if(mySnake.movingHistory.length < mySnake.length){
      for(let i = 0;i<mySnake.length;i++){
      ctx.beginPath();
        ctx.fillStyle = 'black';
          ctx.fillRect(initialPositionX*cell,initialPositionY*cell,cell-3,cell-3);
          mySnake.movingHistory.push({x:initialPositionX,y:initialPositionY})
          initialPositionX++;
      }
    }
    else if(mySnake.movingHistory.length === mySnake.length){
      if(mySnake.speedX || mySnake.speedY){
          mySnake.movingHistory.forEach(element=>{
          ctx.fillRect(element.x*cell,element.y*cell,cell-3,cell-3); });
      }
    }
}
const moveTheSnake = (event)=>{
  const moveSound = new Audio(mySnake.music.move);
  moveSound.play();
  event.preventDefault();
  if(event.key === ('ArrowLeft'||'Left')&& mySnake.speedX !== 1 ){
    mySnake.speedX = -1;
    mySnake.speedY = 0;
    }
    else if(event.key === ('ArrowRight'|| 'Right') &&  mySnake.speedX !== -1){
        mySnake.speedX = 1;
        mySnake.speedY = 0;
    }
    else if(event.key === ('ArrowUp'||'Up')&& mySnake.speedY !==1){
        mySnake.speedX = 0;
        mySnake.speedY = -1;
    }
    else if(event.key === ('ArrowDown'||'Down')&& mySnake.speedY !==-1){
        mySnake.speedX = 0;
        mySnake.speedY =1;
    }
    else if(event.keyCode === 32){
        if(!gamePaused){
            gamePaused = true;
        }
        else{
            gamePaused = false;
        }
    }
}
const drawScore = ()=>{
  ctx.fillStyle = 'red';
  ctx.font = `30px Arbutus`;
  ctx.fillText(`Score ${mySnake.score}`,cell*2,cell*2);
}
const checkForWinner = ()=>{
    if(mySnake.score === winningScore){
      initialPositionX = initialPositionY = ResetInitXansdYPosition;
      mySnake.win();
      clearInterval(gameStatus);
        if(level !== 4){
          if(mobileInterface === undefined || !mobileInterface){
            document.getElementById('outerWinContent').style.display = 'flex';
          }
          else{
            let confirmationMessage = confirm('do you want to play next level?');
            confirmationMessage?changeLevel():restartGame();
          }  
        }
       else if (level>3){ 
         document.getElementById('outerWinContent').style.display = 'none';
         document.getElementById('finishedThirdLevel').style.display = 'flex';
       }
              mySnake.score = 0;
              mySnake.length = initialSnakeLength;
              mySnake.movingHistory = [];
    }
}
function startGame(){
    gameStatus = setInterval(()=>{
      if(!gamePaused){
        mobileSize.addListener(mediaQinJs);
        ctx.clearRect(0,0,canvasWidth,canvasHeight);     
        ctx.drawImage(bground,0,0,canvasWidth,canvasHeight);
        drawScore();
        if(mySnake.speedX || mySnake.speedY !==0){
          mySnake.move();
        }
        drawSnake();
        drawFood();
        checkForWinner();
      }
    },setIntervalSpeed);
}
document.addEventListener('load',startGame());
document.addEventListener('keydown',moveTheSnake);
document.addEventListener('touchstart',(event)=>{
  touchStartCoordinatesX = event.touches[0].clientX;
  touchStartCoordinatesY = event.touches[0].clientY;
});
const moveSnakeTouchPad = (direction)=>{
  if (direction ==='up' && mySnake.speedY !== 1) {
    mySnake.speedX = 0;
    mySnake.speedY = -1;
  }
  if(direction ==='down' && mySnake.speedY !== -1){
    mySnake.speedX = 0;
    mySnake.speedY =1;
  }
  if(direction ==='left' && mySnake.speedX !== 1){
    mySnake.speedX = -1;
    mySnake.speedY =0;
  }
  if(direction ==='right' && mySnake.speedX !== -1){
    mySnake.speedX = 1;
    mySnake.speedY =0;
  }
}
document.addEventListener('scroll',(event)=>{event.preventDefault()});
document.addEventListener('touchend',(event)=>{
  event.preventDefault();
    let touchEndCoordinatesY = event.changedTouches[0].clientY;
    let touchEndCoordinatesX = event.changedTouches[0].clientX;
      if(touchStartCoordinatesY > touchEndCoordinatesY+30){
        moveSnakeTouchPad('down');
      }else if(touchStartCoordinatesY < touchEndCoordinatesY-30){
        moveSnakeTouchPad('up');
      }
      else if(touchEndCoordinatesX<touchStartCoordinatesX+5){
        moveSnakeTouchPad('right');
      }
      else if(touchEndCoordinatesX>touchStartCoordinatesX-5){
        moveSnakeTouchPad('left');
      }
});
const modalDisplayNone = ()=>{
  modal.style.display = 'none';
}
function restartGame(){
    document.getElementById('outerGameOver').style.display = 'none';
    mySnake.length = initialSnakeLength;
    mySnake.score = 0;
    mySnake.speedX = 0;
    mySnake.movingHistory = [];
    startGame();
}
const changeLevel = ()=>{
  level++;
   if(level===2){
    setIntervalSpeed = 100;
    document.getElementById('outerWinContent').style.display = 'none';
    clearInterval(gameStatus);
    mySnake.speedX = mySnake.speedY = 0;
    startGame();
  }
  else if(level ===3){
    setIntervalSpeed = 150;
    document.getElementById('outerWinContent').style.display = 'none';
    clearInterval(gameStatus);
    mySnake.speedX = mySnake.speedY = 0;
    startGame();
  }
  else if (level>3){ 
    document.getElementById('outerWinContent').style.display = 'none';
    document.getElementById('finishedThirdLevel').style.display = 'flex';
    document.getElementById('signWinner').classList.add('winnerSign');
  }
}
document.getElementById('removeModal').addEventListener('click',modalDisplayNone);
