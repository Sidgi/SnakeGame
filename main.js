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
    let count = 0;
       for(let i = 1;i<this.length;i++){
        ctx.beginPath();
        ctx.fillstyle = this.color;
        ctx.rect(this.x+count,this.y,this.size-3,this.size-3);
        ctx.fill();
        count+=30;
        }
    }
    eat(){

    }
}

const drawSnake = () =>{
    let mySnake = new Snakes(50,50,30,3,"black",3);
    mySnake.drawSnake();
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
document.querySelector('button').addEventListener('click',drawSnake)