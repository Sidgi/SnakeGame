let body = document.querySelector('body');
body.style.display = 'flex';
body.style.backgroundColor = 'grey';
// creating and styling canvas and conponents of canvas
let canvas = document.getElementById('mainCanvas');
canvas.width = canvas.height = "608";
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
canvas.style.margin = '0 auto';
canvas.style.border = '10px solid black';
let ctx = canvas.getContext("2d");
let cell = canvasWidth/19;
const bground = new Image();
bground.src = 'bground.png';
let initialPositionX = 2;
let initialPositionY = 2;
let gameStatus;
let gamePaused = false;

const mediaQinJs = (mobileSize)=>{
    if(mobileSize.matches){
        body.style.background = "red";
        canvas.width = '304';
        canvas.height = '304';
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        cell = canvasWidth/19;
    }
    else{
        body.style.background = "grey";
    }
 }
let mobileSize = window.matchMedia('(max-width:700px)');
class CarachterClass{
    constructor(xAxis,yAxis,size,color){
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.size =  size;
        this.color = color;
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
            eat:'eating.mp3',
            loose:'',
            win:'',
            move:'move.mp3'
        };
    }
    changeScore(){
        this.score++;
    }
    move(){
        initialPositionX+=this.speedX;
        initialPositionY+=this.speedY;
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
        let newCell = {
            x:initialPositionX,
            y:initialPositionY
        }
        this.movingHistory.push(newCell);
        ///checking for collision
        for(let i=0;i<this.movingHistory.length-1;i++){
            if(this.movingHistory[i].x===initialPositionX&&this.movingHistory[i].y ===initialPositionY){
                alert('you lost');
            }
        }
        if(apple.xAxis === initialPositionX && apple.yAxis === initialPositionY){
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
        const eatSound = new Audio(this.music.eat);
        eatSound.play();
    }
    lost(){
        const lost = new Audio()
        lost.play();
    }
    won(){
        const won = new Audio();
        lost.play();
    }
}
 const mySnake = new Snakes(cell,"black",4,0,0,[],0);
class Food extends CarachterClass{
    constructor(xAxis,yAxis,size,color){
        super(xAxis,yAxis,size,color);
    }
    updatePosition(){
        ctx.fillStyle =  this.color;
        this.xAxis    =  Math.floor(Math.random()*12+3);
        this.yAxis    =  Math.floor(Math.random()*12+3);
    }
}
const random = Math.floor(Math.random()*13+3);
const apple =  new Food(random,random,cell-3,'red');
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
                        ctx.fillRect(element.x*cell,element.y*cell,cell-3,cell-3); })
                    }
                    else {
                        mySnake.speedX = 1;
                        mySnake.movingHistory.forEach(element=>{
                        ctx.fillRect(element.x*cell,element.y*cell,cell-3,cell-3); })
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
    ctx.font = `30px Arial`;
    ctx.fillText(`Score ${mySnake.score}`,cell*2,cell*2);
}
const checkForWinner = ()=>{
    if(mySnake.score === 17){
        clearInterval(gameStatus);
        const messag = confirm('Do you want to replay?')
        messag? alert('Great!') : clearInterval(gameStatus) ;
    }
}
function startGame(){
        gameStatus = setInterval(()=>{
            if(!gamePaused){
                ctx.clearRect(0,0,canvasWidth,canvasHeight);
                mobileSize.addListener(mediaQinJs);
                ctx.drawImage(bground,0,0,canvasWidth,canvasHeight);
                drawScore();
                mySnake.move();
                drawSnake();
                drawFood();
                checkForWinner();
            }
    },setIntervalSpeed)
    }
 document.addEventListener('load',startGame());
 document.addEventListener('keydown',moveTheSnake);
 document.addEventListener('touchstart',(event)=>{
    event.preventDefault();
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
})


const changeLevel = ()=>{
    let setIntervalSpeed;
    if(level ===1){
      setIntervalSpeed = 350;
    }
    level++;
    if(level>1){
      setIntervalSpeed = 10;
      document.getElementById('outerWinContent').style.display = 'none';
  }
  return setIntervalSpeed;
  }