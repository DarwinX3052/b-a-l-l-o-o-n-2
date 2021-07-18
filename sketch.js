var ball;
var position, database;
var bg, ballImg, ballRo;
function preload(){
    bg = loadImage("cityImage.png");
    ballImg = loadImage("hotairballoon1.png");
    ballRo = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png")
}
function setup(){
    createCanvas(1400,600);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.addAnimation("1", ballRo);
    ball.scale = 0.5
    var ballref = database.ref('ball/position');
    ballref.on('value', readposition, showerror);

}


function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        ball.scale = ball.scale - 0.001;
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,3);
        ball.scale = ball.scale + 0.001
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({
        x: position.x + x,
        y: position.y + y
    })
}

function readposition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showerror(){
    console.log("error in the program");
}