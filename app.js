const saveBtn = document.getElementById("save");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file")
const eraserBtn = document.getElementById("eraser-btn");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 1287;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = 3;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

let url = "MISOM/bg_write.jpg";
const image = new Image()
image.src = url;
image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

function onMove(event){
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;    
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
    
}

function onModeClick(){
if(isFilling){
    isFilling = false
    modeBtn.innerText ="채우기";
}else{
    isFilling = true
    modeBtn.innerText ="그리기";
}
}
function onCanvasClick() {
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText ="Fill";
}
function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image()
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}
function onDoubleClick(event){
    const text = textInput.value;
if(text !== ""){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "48px serif"
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
}

}

function onSaveClick() {
    let url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "classSkech.png";
    a.click();
}
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
color.addEventListener("change", onColorChange);
lineWidth.addEventListener("change", onLineWidthChange);

colorOption.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
// const colors = [
//     "#ff3838",
//     "#ffb8b8",
//     "#c56cf0",
//     "#ff9f1a",
//     "#fff200",
//     "#32ff7e",
//     "#7efff5",
//     "#18dcff",
//     "#7d5fff",
// ]


// function onClick(event) {
//     ctx.beginPath();
//     ctx.moveTo(0,0);
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
// }
// canvas.addEventListener("mousemove", onClick);