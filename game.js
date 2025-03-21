﻿// Creating variables
//var myX = 0, myY = 0;

endlessCanvas = true

var width = 1000;
var height = 700;

var player = {x: width/2, y: 600, sx: 150, sy: 30}
var lives = 5

var ball = {x: 100, y: 300, sx: 30, sy: 30, direction: "upleft", speed: 2 }

var grid = [], numX = 8, numY = 5, tile = {sx: 100, sy: 30};
var padding = 1, margin = 100

for(let i = 0; i < numX; i ++){
    grid[i] = []
    for(let j = 0; j < numY; j ++){
        grid[i][j] = 1
    }
}

function update() {
    //myX = myX+(mouseX-myX)/10;
    //myY = myY+(mouseY-myY)/10;

    //Introduce player movement and border control
    player.x = mouseX - player.sx/2

    if(player.x <= 0){
        player.x = 0
    }
    if((player.x + player.sx) >= width){
        player.x = width - player.sx
    }

    //Ball Movement
    switch (ball.direction) {
        case "upleft":
            ball.y -= ball.speed
            ball.x -= ball.speed
            break;
        case "upright":
            ball.y -= ball.speed
            ball.x += ball.speed
            break;    
        case "downleft":
            ball.y += ball.speed
            ball.x -= ball.speed
            break;
        case "downright":
            ball.y += ball.speed
            ball.x += ball.speed
            break;
        default:
            break;
    }

    //Check for collision to the left and the right
    if(ball.direction == 'upleft' && ball.x <= 0){
        ball.direction = "upright"
    }
    if(ball.direction == 'upright' && ball.x >= (width - ball.sx)){
        ball.direction = "upleft"
    }
    if(ball.direction == 'downleft' && ball.x <= 0){
        ball.direction = "downright"
    }
    if(ball.direction == 'downright' && ball.x >= (width - ball.sx)){
        ball.direction = "downleft"
    }

    //Check for top and bottom collissions
    if(ball.direction == 'upleft' && ball.y <= 0){
        ball.direction = "downleft"
    }
    if(ball.direction == 'downleft' && ball.y >= (height - ball.sy)){
        ball.direction = "upleft"
    }
    if(ball.direction == 'upright' && ball.y <= 0){
        ball.direction = "downright"
        lives--
    }
    if(ball.direction == 'downright' && ball.y >= (height - ball.sy)){
        ball.direction = "upright"
        lives--
    }

    //Check for collision with the tiles of the grid
    for(let i = 0; i < numX; i ++){
        for(let j = 0; j < numY; j ++){
                            
            if (grid[i][j] === null) continue;
                
            if (areColliding(ball.x, ball.y, ball.sx, ball.sy, i * (tile.sx + padding) + margin, j * (tile.sy + padding) + margin, tile.sx, tile.sy)) {
    
                grid[i][j] = null; // Remove tile

                let ballCenterX = ball.x + ball.sx / 2;
                let ballCenterY = ball.y + ball.sy / 2;
                let tileCenterX = i * (tile.sx + padding) + margin + tile.sx / 2;
                let tileCenterY = j * (tile.sy + padding) + margin + tile.sy / 2;
            
                let dx = Math.abs(ballCenterX - tileCenterX);
                let dy = Math.abs(ballCenterY - tileCenterY);
            
                if (dx > dy) {
                    // Horizontal collision: Reverse X direction
                    if (ball.direction == "upleft") ball.direction = "upright";
                    else if (ball.direction == "upright") ball.direction = "upleft";
                    else if (ball.direction == "downleft") ball.direction = "downright";
                    else if (ball.direction == "downright") ball.direction = "downleft";
                } else {
                    // Vertical collision: Reverse Y direction
                    if (ball.direction == "upleft") ball.direction = "downleft";
                    else if (ball.direction == "upright") ball.direction = "downright";
                    else if (ball.direction == "downleft") ball.direction = "upleft";
                    else if (ball.direction == "downright") ball.direction = "upright";
                }

                return; // Exit the loop to prevent multiple bounces per frame
            } 
        }
    }

    //Ball and player collision
    if(areColliding(ball.x, ball.y, ball.sx, ball.sy, player.x, player.y, player.sx, player.sy)){
        if (ball.direction == "upleft") ball.direction = "downleft";
        else if (ball.direction == "upright") ball.direction = "downright";
        else if (ball.direction == "downleft") ball.direction = "upleft";
        else if (ball.direction == "downright") ball.direction = "upright";
    }

    //Check for out of lives
    if(lives <= 0){
        alert("OUT OF LIVES")
    }
    
    //CHECK FOR WIN
    let wincondition = true
    for(let i = 0; i < numX; i ++){
        for(let j = 0; j < numY; j ++){
            if(grid[i][j] != null){
                wincondition = false
            }
        }
    }
    if(wincondition){
        alert("WON THE GAME")
    }
}

function draw() {
    // This is how you draw a rectangle
    context.strokeRect(0, 0, width, height);

    context.fillStyle = "blue"
    context.fillRect(player.x, player.y, player.sx, player.sy);

    context.fillStyle = "black"
    context.fillRect(ball.x, ball.y, ball.sx, ball.sy);
  
    for(let i = 0; i < numX; i ++){
        for(let j = 0; j < numY; j ++){
            switch (j) {
                case 0:
                  context.fillStyle = "red"
                  break;
                case 1:
                  context.fillStyle = "blue"
                  break;
                case 2:
                  context.fillStyle = "green"
                  break;
                case 3:
                    context.fillStyle = "yellow"
                    break;
                case 4:
                    context.fillStyle = "pink"
                    break;
                case 5:
                    context.fillStyle = "orange"
                    break;
                default:
                  context.fillStyle = "black"
                  break;
            }
            if(grid[i][j] != null){
                context.fillRect(i * (tile.sx + padding) + margin, j * (tile.sy + padding) + margin, tile.sx, tile.sy);
            }
        }
    }
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
