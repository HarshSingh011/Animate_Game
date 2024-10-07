const canvas = document.getElementById("canvasContent");
console.log("hello");
const list_of_wolf = []
console.log(canvas);
canvas.width = window.innerWidth; // 982
canvas.height = window.innerHeight;
console.log(canvas.width);
console.log(canvas.height);
const wolfs = canvas.getContext("2d");
const sheep = canvas.getContext("2d");
let level = 1;

setInterval( function wolf_increase(){
    let x1 = Math.random() * (canvas.width - 100) + 30;
    let y1 = Math.random() * (canvas.height - 100) + 30;
    wolfs.beginPath();
    wolfs.arc(x1, y1, 50, 0, Math.PI * 2);
    wolfs.fillStyle = "red"; 
    wolfs.fill();
    movement(level);
}, 2000);

function movement(i){
    vX = (Math.random() - 0.2) * (i+5);
    vY = (Math.random() - 0.2) * (i+5);
    list_of_wolf.push({x1,y1,vX,vY});
}

function hunt(){
    list_of_wolf.forEach(wolf => {
        wolf.x += wolf.vX;
        wolf.y += wolf.vY;
        if( wolf.x <= 0 ){
            wolf.x += 50;
        }
        if( wolf.y >= 0){
            wolf.y += 50;
        }
    });
    

    // if(wolf.)
}

// let x2 = Math.random() * (canvas.width - 60) + 30;
    // let y2 = Math.random() * (canvas.height - 60) + 30;
    
    // sheep.beginPath();
    // sheep.arc(x2, y2, 30, 0, Math.PI * 2);
    // sheep.fillStyle = "green";
    // sheep.fill();