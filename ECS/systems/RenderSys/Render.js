class Render {
    constructor (canvas,width,height){
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
    }

    clearScreen(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    drawRect(x,y,width,height,color){
        this.ctx.fillStyle = color
        this.ctx.fillRect(x,y,width,height)
    }

}

export default Render;