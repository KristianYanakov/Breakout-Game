// Creating variables
//var myX = 0, myY = 0;

endlessCanvas = true

var width = 1000;
var height = 700;

var player = {x: width/2, y: 600, sx: 150, sy: 30}

var ball = {x: 0, y: 300, direction: "up", speed: 3}

var grid = [], numX = 5, numY = 3, tile = {sx: 100, sy: 30};
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
    
}

function draw() {
    // This is how you draw a rectangle
    context.strokeRect(0, 0, width, height);
    context.fillRect(player.x, player.y, player.sx, player.sy);

  
    for(let i = 0; i < numX; i ++){
        for(let j = 0; j < numY; j ++){
            context.fillRect(i * (tile.sx + padding) + margin, j * (tile.sy + padding) + margin, tile.sx, tile.sy);
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
