let board; //reference the canvas
//setting the width and height -- 21 rows, 19 columns
//meaning there is 21 tiles vertically, 19 tiles horizontally
//each tile size is 32px x 32px
const rowCount = 21;
const colCount = 19;
const tileSize = 32;
const boardWidth = colCount * tileSize;
const boardHeight = rowCount * tileSize;
let context;

//Images
let blueGhostImage;
let orangeGhostImage;
let pinkGhostImage;
let redGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d'); //used for drawing on the board
    loadImage();
    loadMap();
    update(); 
}

function loadImage(){
    //wall
    wallImage = new Image();
    wallImage.src = "./wall.png";


    //ghosts
    blueGhostImage = new Image();
    blueGhostImage.src ="./blueGhost.png";
    redGhostImage = new Image();
    redGhostImage.src = "./redGhost.png";
    orangeGhostImage = new Image();
    orangeGhostImage.src = "./orangeGhost.png";
    pinkGhostImage = new Image();
    pinkGhostImage.src= "./pinkGhost.png";


    //pacman
    pacmanUpImage = new Image();
    pacmanUpImage.src = "./pacmanUp.png";
    pacmanDownImage = new Image();
    pacmanDownImage.src = "./pacmanDown.png";
    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "./pacmanLeft.png";
    pacmanRightImage = new Image();
    pacmanRightImage.src = "./pacmanRight.png";
}

//based on the map
// p,o,b,r = ghosts position
// P as pacman, w as wall
// to draw, we need the x and y coord
// it all start counting from the top left corner 0 
// the point of drawing the tile start from the top left corner coord of the tile
// lets say we want to draw a 32 x 32 tile at point (4,3)
// then we need to draw (4,3) to (4*32, 3*32) = (128,96)
// the tiles are added in a 2d array manner: [0][1] means (0,1), [0][2] means (0,2)
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX"
]

//since we have lot of walls img in the game, we need a data structure to manage it
const walls = new Set();
//a set can only have unique values so no duplicates is accepted
const foods = new Set();
const ghosts = new Set();
let pacman;

function loadMap(){

    //reuse the same function for resetting the game 
    walls.clear();
    foods.clear();
    ghosts.clear();

    for(let r=0; r<rowCount; r++){
        for(let c=0; c<colCount; c++){
            const row = tileMap[r];
            const timeMapChar = row[c];

            //x position is the column
            //scale everything with the timesize
            const x = c*tileSize;
            const y = r*tileSize;

            if (timeMapChar == 'X') { //block wall
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall);
            }
            else if(timeMapChar == 'b') {//blue ghosts
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if(timeMapChar == 'o') {//blue ghosts
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if(timeMapChar == 'p') {//blue ghosts
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if(timeMapChar == 'r') {//blue ghosts
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if(timeMapChar == 'P') {//blue ghosts
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            }
            else if(timeMapChar == ' ') {//blue ghosts
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            }
        }
    }
}

function update(){
    //game loop
    draw();
    setTimeout(update, 50); //recursive
    //in a game loop, the draw and update coord keep calling again
    //if use setinterval -- the function is called in a fix interval instead of dynamic
    //settimeout, setinterval, requestanimationframe -- depend on the machine
    //fixed refresh rate of 20fps
    //set interval called once -- specify how often call the function 
    //settimeout is similar settimeout(update, 50)
}

function draw(){
    //the image we are drawing, the x and y, the width and height
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    for(let ghost of ghosts.values()){
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }
    for(let wall of walls.values()){
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }

    //draw food as rectangle using fillStyle()
    context.fillStyle = "white";
    for(let food of foods.values()){
        context.fillRect(food.x, food.y, food.width, food.height);
    }
}


//creating a class for each tile
class Block {
    constructor(image, x, y, width, height){
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //since x and y coord for ghosts and pacman keep changing, so a start position is needed
        this.startX = x;
        this.startY = y;

    }
}
