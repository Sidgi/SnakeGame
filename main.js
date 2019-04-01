let body = document.querySelector('body');
let canvas = document.getElementById('mainCanvas');
let ctx = canvas.getContext("2d");
ctx.font = 'bold oblique 30px cursive';
// ctx.strokeText('Hello world mypth',50,50);
// ctx.fillStyle = 'red';
// ctx.fillRect(100,400,150,150);
// let img = document.getElementById('snakeImage');
// ctx.drawImage(img,100,100);
class Snakes{
    constructor(x,y,size,speed,audio){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.audio = audio
    }
    getX(){
       return this.x;
    }
    getY(){
        return this.y;
    }
    getSize(){
        this.size
    }
    getSpeed(){
        this.speed = speed;
    }
    setAudio(music){
        this.audio = music;
    }
    drawSnake(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }
    eat(){

    }
}
const drawSnake = () =>{
    const mySnake = new Snakes(50,50,50,30,'snake.mp3');
    mySnake.drawSnake();
}
document.querySelector('button').addEventListener('click',drawSnake)