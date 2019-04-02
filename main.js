let body = document.querySelector('body');
let canvas = document.getElementById('mainCanvas');
let ctx = canvas.getContext("2d");
class CarachterClass{
    constructor(xAxis,yAxis,size,color){
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.size =  size;
        this.color = color;
    }
}
class Snakes extends CarachterClass{
    constructor(xAxis,yAxis,size,color,length,speed){
        super(xAxis,yAxis,size,color)
        this.length = length;
        this.speed = speed;   
    }
    move(){

    }
    eat(){

    }
}
class Food extends CarachterClass{
    constructor(xAxis,yAxis,size,color,length,speed){
        super(xAxis,yAxis,size,color);
    }
    updatePosition(){
        ctx.fillStyle = this.color;
        this.xAxis = Math.floor(Math.random()*500);
        this.yAxis = Math.floor(Math.random()*500);
    }
}
const random = Math.floor(Math.random()*500);
const apple = new Food(random,random,28,'red');
const mySnake = new Snakes(50,50,30,"black",5,null);

const drawFood = ()=>{
        ctx.beginPath();
        // ctx.fillStyle = apple.color;
        apple.updatePosition();
        ctx.fillRect(apple.xAxis,apple.yAxis,apple.size,apple.size);
}

const drawSnake = function(){
    let count = 0;
           for(let i = 1;i<mySnake.length;i++){
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.fillRect(mySnake.xAxis+count,mySnake.yAxis,mySnake.size-3,mySnake.size-3);
            count+=30;
            }
}
 const createCharacters = () =>{
    drawSnake();
    drawFood();
    apple.updatePosition();
 }
const moveTheSnake = (event)=>{
    if(event.key === ('ArrowLeft'||'Left')){
        mySnake.speed = -1;
    }
    else if(event.key === ('ArrowRight'|| 'Right') ){
        mySnake.speed = 1;
    }
    else if(event.key === ('ArrowUp'||'Up')){
        mySnake.speed = 1;
    }
    else if(event.key === ('ArrowDown'||'Down')){
        mySnake.speed = -1;
    }
}
//document.addEventListener('keydown',moveTheSnake);
 document.querySelector('start').addEventListener('click',createCharacters)
//  document.querySelector('move').addEventListener('click',moveSnake)