const saveBtn = document.getElementById("save");
const textInput =document.getElementById("text");
const fileInput =document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destoryBtn =document.getElementById("desstroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const color =document.getElementById("color");
const lineWidth =document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx =canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;


function onMove(event) {
    if (isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    isPainting =false;
}

function onLineWidthChange(event){    
    ctx.lineWidth = event.target.value;
}

function strokeStyleAndfillStyle(event){
    ctx.strokeStyle = event;
    ctx.fillStyle = event;
}

function onColorChange(event){
    strokeStyleAndfillStyle(event.target.value);
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    strokeStyleAndfillStyle(colorValue);
    color.value = colorValue;
}

function onModeClick(){    

    if(isFilling){
        isFilling = false;
        modeBtn.innerText ="Fill";
    } else{
        isFilling = true;
        modeBtn.innerText ="Draw";
    }
}

function onCanvasFillingClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function omEraserClick(){
    ctx.strokeStyle ="white";
    isFilling = false;
    modeBtn.innerText ="Fill";
}

function onFileChange(event){
    const file = event.target.files[0];
    const url =URL.createObjectURL(file);
    const image = new Image();
    image.src =url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value= null;
    }
}

function textStamp(event){
    const text = textInput.value;
    if(text !==""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "48px serif";
        ctx.fillText(text,event.offsetX,event.offsetY);
        ctx.restore();
    }
}

function onSaveClick(event){
    const url = (canvas.toDataURL());
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawinf.png";
    a.click();
}



canvas.addEventListener("dblclick",textStamp);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting);
canvas.addEventListener("click",onCanvasFillingClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change",onColorChange);
colorOption.forEach(color => color.addEventListener("click",onColorClick));
modeBtn.addEventListener("click", onModeClick);
destoryBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", omEraserClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click",onSaveClick);
