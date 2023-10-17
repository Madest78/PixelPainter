const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const cellSize = 10;//размер ячейки в пикселях

canvas.width = 320;//ширина холста
canvas.height = 320;//высота холста

let isDrawing = false;

let lastX = 0;
let lastY = 0;

const lines = [];

function drawCell(x,y,color){
    context.fillStyle = color;
    context.fillRect(x * cellSize, y * cellSize, cellSize,cellSize)
}

const selectedColor = 'black';

canvas.addEventListener('mousedown',function(event){
    const line = [];
    lines.push(line);
    isDrawing = true
    const x = Math.floor(event.offsetX / cellSize);
    const y = Math.floor(event.offsetY / cellSize);
    line.push({ x, y });
    redrawLines();
    lastX = x;
    lastY = y;
});

canvas.addEventListener('click', function(event){
    const canvasRect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - canvasRect.left) / cellSize);
    const y = Math.floor((event.clientY - canvasRect.top) / cellSize);
    const line = [];
    line.push({ x, y });
    lines.push(line);
    redrawLines();
});

canvas.addEventListener('mousemove', function(event){
    if(isDrawing){
        const canvasRect = canvas.getBoundingClientRect();
        const x = Math.floor(event.offsetX / cellSize);
        const y = Math.floor(event.offsetY / cellSize);
        if (x === lastX && y === lastY){
            return;
        }
        lines[lines.length - 1].push({ x, y });
        redrawLines();
        lastX = x;
        lastY = y;
    }
});

canvas.addEventListener('mouseup', function(event){
    isDrawing = false;
    lastX = 0;
    lastY = 0;
});

function drawLine(startX, startY, endX, endY, color) {
    const dx = Math.abs(endX - startX);
    const dy = Math.abs(endY - startY);
    const sx = (startX < endX) ? 1 : -1;
    const sy = (startY < endY) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        drawCell(startX, startY, color);

        if(startX === endX && startY === endY) {
            break;
        }
        const err2 = 2 * err;
        
        if (err2 > -dy) {
            err -= dy;
            startX += sx;
        }
        
        if (err2 < dx) {
            err += dx;
            startY += sy;
        }
    }
}

function redrawLines(){
    clearCanvas();
    for (const line of lines){
        for (let i = 1; i < line.length; i++) {
            const start = line[i - 1];
            const end = line[i];
            drawLine(start.x, start.y, end.x, end.y, selectedColor);
        }
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  
canvas.style.cursor = 'crosshair'

canvas.addEventListener('mouseenter', function() {
    canvas.style.cursor ='url(square-coursor.png) 5 5, auto';
  });

canvas.addEventListener('mouseleave', function() {
  canvas.style.cursor = 'crosshair';
});

const colors = document.querySelectorAll('.color');

colors.forEach(color => {
    color.addEventListener('click', function() {
        const selectedColor = color.style.backgroundColor;
        // Добавь здесь логику для использования выбранного цвета
    });
});