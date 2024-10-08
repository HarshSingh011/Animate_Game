const canvas = document.getElementById("canvasContent");
console.log("hello");
const list_of_wolf = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
let level = 1;

let sheepX = Math.random() * (canvas.width - 100) + 50;
let sheepY = Math.random() * (canvas.height - 100) + 50;
let sheepRadius = 30 + (level * 2);

setInterval(() => {
    sheepRadius += 5;
}, 5000);


function drawSheep() {
    context.beginPath();
    context.arc(sheepX, sheepY, sheepRadius, 0, Math.PI * 2);
    context.fillStyle = "green";
    context.fill();
}

function makeWolf() {
    let x1 = Math.random() * (canvas.width - 100) + 30;
    let y1 = Math.random() * (canvas.height - 100) + 30;
    let vX = (Math.random() - 0.2) * (level * 5); 
    let vY = (Math.random() - 0.2) * (level * 5);
    list_of_wolf.push({ x: x1, y: y1, vX, vY });
}

let isGameOver = false;

function update() {
    if (isGameOver) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawSheep();

    list_of_wolf.forEach(wolf => {
        wolf.x += wolf.vX;
        wolf.y += wolf.vY;

        if (wolf.x - 30 <= 0 || wolf.x + 30 >= canvas.width) {
            wolf.vX *= -1;
        }
        if (wolf.y - 30 <= 0 || wolf.y + 30 >= canvas.height) {
            wolf.vY *= -1;
        }

        context.beginPath();
        context.arc(wolf.x, wolf.y, 30, 0, Math.PI * 2);
        context.fillStyle = "red";
        context.fill();
    });

    checkCollisions();
    requestAnimationFrame(update);
}

function checkCollisions() {
    let collided = false; 

    list_of_wolf.forEach(wolf => {
        const distance = Math.sqrt((wolf.x - sheepX) ** 2 + (wolf.y - sheepY) ** 2);
        if (distance < (30 + sheepRadius) && !collided) {
            sheepRadius -= 5;
            console.log(`Sheep Radius: ${sheepRadius}`);
            collided = true; 
            if (sheepRadius <= 10) {
                endGame();
            }
        }
    });
}

canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const targetX = event.clientX - rect.left;
    const targetY = event.clientY - rect.top;

    const dx = targetX - sheepX;
    const dy = targetY - sheepY;

    sheepX += dx * 0.1;
    sheepY += dy * 0.1;
});

canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    sheepX = event.clientX - rect.left;
    sheepY = event.clientY - rect.top;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

setInterval(() => {
    let prelevel = level;
    level += 1;
    console.log(`Level: ${level}`);
    for (let i = prelevel; i < level; i++) {
        makeWolf();
    }
}, 5000);

function endGame() {
    list_of_wolf.length = 0;
    let result = level;
    localStorage.setItem('gameResult', result);
    level = 1;
    sheepRadius = 0;
    isGameOver = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Game Over. All cleared, level reset to 1.");
    window.location.href = 'result.html';
}


requestAnimationFrame(update);