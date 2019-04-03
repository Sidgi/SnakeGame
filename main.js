let body = document.querySelector('body');
let canvas = document.getElementById('mainCanvas');
let ctx = canvas.getContext("2d");
let cell = 30;
let count = 0;
let initialPositionX = 2;
let initialPositionY =2;
let canvasWidth = 600;
let canvasHeight = 600;


class CarachterClass{
    constructor(xAxis,yAxis,size,color){
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.size =  size;
        this.color = color;
    }
}
class Snakes extends CarachterClass{
    constructor(size,color,length,speedX,speedY,movingHistory){
        super(size,color)
        this.length = length;
        this.speedX = speedX; 
        this.speedY = speedY; 
        this.movingHistory = movingHistory; 
    }
    move(){
        initialPositionX+=this.speedX;
        initialPositionY+=this.speedY;
        let newCell = {
            x:initialPositionX,
            y:initialPositionY
        }   
        this.movingHistory.shift();
        this.movingHistory.push(newCell);
        
    }
    eat(){
        if(apple.xAxis===mySnake.xAxis && apple.yAxis === mySnake.yAxis){
            apple.updatePosition();
            this.movingHistory.push({xAxis:mySnake.xAxis,yAxis:mySnake.yAxis})
            this.length++;
        }
    }
}
const mySnake = new Snakes(cell,"black",5,0,0,[]);
class Food extends CarachterClass{
    constructor(xAxis,yAxis,size,color,length,speed){
        super(xAxis,yAxis,size,color);
    }
    updatePosition(){
        ctx.fillStyle = this.color;
        this.xAxis = Math.floor(Math.random()*(cell-3));
        this.yAxis = Math.floor(Math.random()*(cell-3));
    }
}
const random = Math.floor(Math.random()*500);
const apple =  new Food(random,random,cell-3,'red');
const drawFood = ()=>{
        ctx.beginPath();
        // apple.updatePosition();
        ctx.fillStyle = 'red';
        ctx.fillRect(apple.xAxis,apple.yAxis,apple.size,apple.size);
}

const drawSnake = function(){
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
                // for(index in mySnake.movingHistory){
                //     ctx.fillRect() 
                // }
                    mySnake.movingHistory.forEach(element=>{
                    ctx.fillRect(element.x*cell,element.y*cell,cell-3,cell-3);
                })
            }        
           
}


const moveTheSnake = (event)=>{
    if(event.key === ('ArrowLeft'||'Left')){
        mySnake.speedX = -1;
        mySnake.speedY = 0;

    }
    else if(event.key === ('ArrowRight'|| 'Right') ){
        mySnake.speedX = 1;
        mySnake.speedY = 0;

    }
    else if(event.key === ('ArrowUp'||'Up')){
        mySnake.speedX = 0;
        mySnake.speedY = -1;

    }
    else if(event.key === ('ArrowDown'||'Down')){
        mySnake.speedX = 0;
        mySnake.speedY =1;

    }
}
function startGame(){
    setInterval(()=>{
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        drawSnake();
        drawFood();
        mySnake.move(); 
    },100)
    // checkForCollision();
    }

 document.addEventListener('load',startGame());
 document.addEventListener('keydown',moveTheSnake);
