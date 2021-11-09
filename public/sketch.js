let socket = io();
let newColor;
let naBut = document.querySelector("#na");
let saBut = document.querySelector("#sa");
let europeBut = document.querySelector("#europe");
let asiaBut = document.querySelector("#asia");
let ausBut = document.querySelector("#australia");
let africaBut = document.querySelector("#africa");
let img1, img2;

socket.on('connect', () => {
    console.log('connected');
});

socket.on('drawPath', (data) => {
    // console.log(data);
    drawPath(data);
});

function preload() {
    img1 = loadImage('assets/mandala.png');
    img2 = loadImage('assets/skull.jpg');
}

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvasContainer');
    background(255);
    newColor = random(255);
    img1.resize(740, window.innerHeight);
    image(img1, width/6, 0);
}

function draw() {
    noStroke();

    if (naBut.checked == true) {
        // console.log('na clicked');
        newColor = 'blue'; //blue
    } else if (saBut.checked == true) {
        // console.log('sa clicked');
        newColor = 'purple'; //purple
    } else if (africaBut.checked == true) {
        // console.log('africa checked');
        newColor = 'limegreen'; //green
    } else if (europeBut.checked == true) {
        // console.log('europe checked');
        newColor = 'red' //red
    } else if (asiaBut.checked == true) {
        // console.log('asia checked');
        newColor = 'orange'; //orange
    } else if (ausBut.checked == true) {
        // console.log('aus checked');
        newColor = 'yellow';
    } else {
        newColor = newColor;
        // console.log('nothing has been clicked');
    }

    path = {
        x: mouseX,
        y: mouseY,
        "color": newColor,
        size: 15
    }

    socket.emit('data', path);
}

function drawPath(data) {
    // noCursor();
    if (mouseIsPressed) {
        fill(data.color);
        ellipse(data.x, data.y, data.size);
    }
    copy(img, mouseX, mouseY, 20, 20);
}
