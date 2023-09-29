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
const elseColor = document.getElementById("else-color");
const lineWidthDisplay =document.querySelector("#line-width-display");
const lineWidthBtnThin =document.querySelector("#line-width-thinbtn");
const lineWidthBtnBold =document.querySelector("#line-width-boldbtn");
const textModeBtn = document.querySelector("#text-mode-btn");
const fontSizeInput = document.querySelector("#font-size-input");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";


let isTextTransfroming =false;
let isPainting = false;
let isFilling = false;
let fontSize = 100; 

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
    lineWidthDisplay.innerText = ctx.lineWidth;
}

function onLineWidthBtnClick(event){

    const lineWidthBtn = ctx.lineWidth;

    if(lineWidthBtn > 0){
        if(event.target.textContent === "Thin"){            
            ctx.lineWidth = lineWidthBtn  - event.detail*0.5; 
        }
    }

    if(lineWidthBtn < 20){   
        if(event.target.textContent === "Bold"){        
            ctx.lineWidth = lineWidthBtn  + event.detail*0.5;
        }
    }

    lineWidthDisplay.innerText = ctx.lineWidth; 
    lineWidth.value = ctx.lineWidth;   
}

function strokeStyleAndfillStyle(event){
    ctx.strokeStyle = event;
    ctx.fillStyle = event;
}

function onColorChange(event){
    strokeStyleAndfillStyle(event.target.value);
    elseColor.style.backgroundColor = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    strokeStyleAndfillStyle(colorValue);
    color.value = colorValue;
    elseColor.style.backgroundColor = color.value;    
}

function onModeClick(){    

    if(isFilling){
        isFilling = false;
        modeBtn.innerText ="🩸 Fill";
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

function onEraserClick(){
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

function fontSizeChange(event){
    if( fontSize !== parseInt(event.target.value)){
        fontSize = parseInt(event.target.value);
    };       
}

function textStamp(event){
    const text = textInput.value;  
    if(text !==""){
        ctx.save();
        ctx.lineWidth = 1; 

        ctx.font = `${fontSize}px serif`;  
        
        /* rotate */
        ctx.translate(event.offsetX, event.offsetY);
        ctx.rotate(-(90/180)*Math.PI);
        ctx.translate(-event.offsetX, -event.offsetY);

        if (isTextTransfroming){
            ctx.fillText(text,event.offsetX,event.offsetY);
        }else{        
            ctx.strokeText(text,event.offsetX,event.offsetY);
        }
        console.log(event.offsetX,event.offsetY);
        ctx.restore();
    }
}


function ontextModeClick(){
    
    if(isTextTransfroming){
        isTextTransfroming = false;
        textModeBtn.innerText ="Stroke Text";
    }else{
        isTextTransfroming = true;
        textModeBtn.innerText ="Fill Text";
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
lineWidthBtnThin.addEventListener("click",onLineWidthBtnClick);
lineWidthBtnBold.addEventListener("click",onLineWidthBtnClick);
color.addEventListener("change",onColorChange);
colorOption.forEach(color => color.addEventListener("click",onColorClick));
modeBtn.addEventListener("click", onModeClick);
destoryBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click", onSaveClick);
textModeBtn.addEventListener("click", ontextModeClick);
fontSizeInput.addEventListener("change", fontSizeChange);

