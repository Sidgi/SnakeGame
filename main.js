let body = document.querySelector('body');
let canvas = document.getElementById('mainCanvas');
let ctx = canvas.getContext("2d");
class Snakes{
    constructor(x,y,size,speed,color,length){
        this.x = x;
        this.y = y;
        this.size = size;
        this.length = length;
        this.color = color;
        this.speed = speed;   
    }
    drawSnake(){
    let count = 0;
       for(let i = 1;i<this.length;i++){
        ctx.beginPath();
        ctx.fillstyle = 'black';
        ctx.fillRect(this.x+count,this.y,this.size-3,this.size-3);
        count+=30;
        }
    }
    eat(){

    }
}
class Food extends Snakes{
    constructor(x,y,color){
        super(x,y);
         this.colorFood = 'red';
    }
    create(){
        ctx.beginPath();
        ctx.fillStyle = this.colorFood;
        ctx.fillRect(this.x,this.y,28,28);
    }
}
const random = Math.floor(Math.random()*500);
const food = new Food(random,random,'red');
let mySnake = new Snakes(50,50,30,5,"black",8);
 const createSnake = () =>{
    mySnake.drawSnake();
    food.create();
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
 document.querySelector('button').addEventListener('click',createSnake)