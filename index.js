const canvas = document.getElementById("canvasContent");
console.log("hello");
const list_of_wolf = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const wolfs = canvas.getContext("2d");
const sheep = canvas.getContext("2d");
let level = 1;

const sheepX = Math.random() * (canvas.width - 100) + 50;
const sheepY = Math.random() * (canvas.height - 100) + 50;

function drawSheep(sheepX,sheepY) {
    wolfs.beginPath();
    wolfs.arc(sheepX, sheepY, 30, 0, Math.PI * 2);
    wolfs.fillStyle = "green";
    wolfs.fill();
}
    
function make() {
    let x1 = Math.random() * (canvas.width - 100) + 30;
    let y1 = Math.random() * (canvas.height - 100) + 30;
    let vX = (Math.random() - 0.2) * (level*10);
    let vY = (Math.random() - 0.2) * (level*10);
    list_of_wolf.push({ x: x1, y: y1, vX, vY });
}
    
function update() {
    wolfs.clearRect(0, 0, canvas.width, canvas.height);
    drawSheep(sheepX,sheepY);
    list_of_wolf.forEach(wolf => {
    wolf.x += wolf.vX;
    wolf.y += wolf.vY;
    if (wolf.x - 30 <= 0 || wolf.x + 30 >= canvas.width) {
        wolf.vX *= -1;
    }
    if (wolf.y - 30 <= 0 || wolf.y + 30 >= canvas.height) {
        wolf.vY *= -1;
        }
        wolfs.beginPath();
        wolfs.arc(wolf.x, wolf.y, 30, 0, Math.PI * 2);
        wolfs.fillStyle = "red";
        wolfs.fill();
    });
}
    
    
drawSheep(sheepX,sheepY);
setInterval(() => {
    let prelevel = level;
    level+=1;
    console.log(level);
    for (let i = prelevel; i < level; i++) {
        make();
    }
},5000);
setInterval(update, 100);

