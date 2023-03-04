var ball;
var database;

function setup(){
    database=firebase.database()

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPosRef=database.ref("ball/position");
    ballPosRef.on("value",readPosition,showError)

   
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").set({
      "x": ball.x+x,
      "y":ball.y+y 
    })
    
}
function readPosition(data)
{
    var pos=data.val();
    ball.x=pos.x;
    ball.y=pos.y;
}
function showError()
{
    console.log("Error")
}