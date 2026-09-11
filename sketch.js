var scl = 20;
var food;
var snake;

// Mobile touch vectors
let touchStartX = 0;
let touchStartY = 0;
let gameIsPlaying = true; 

function setup() {
  // 1. FIXED GRID SIZE: Hardcode your internal game dimensions (e.g., 400x400)
  // This gives you a consistent grid of exactly 20x20 tiles (400 / 20 = 20)
  let canvasSize = 400; 

  // Store the canvas reference
  let canvas = createCanvas(canvasSize, canvasSize);
  
  // INSTANT FOCUS: Forces the browser to listen to your keyboard right away
  canvas.elt.tabIndex = 0;
  canvas.elt.focus();
  
  // 2. CSS RESPONSIEVNESS: Let CSS stretch the fixed grid cleanly on mobile
  let canvasElement = document.querySelector('canvas');
  if (canvasElement) {
    canvasElement.style.margin = '20px auto';
    canvasElement.style.display = 'block';
    canvasElement.style.outline = 'none'; // Removes the default browser focus border
    
    // 👇 ADD THESE THREE LINES: Stretches the game safely on your phone screen
    canvasElement.style.maxWidth = '90vw';
    canvasElement.style.maxHeight = '70vh'; // Lowered slightly so text fits above it
    canvasElement.style.width = '100%';
    canvasElement.style.height = '100%';    // Changed 'auto' to '100%'
    canvasElement.style.objectFit = 'contain'; // 🌟 ADD THIS LINE to fix the stretching!
  }

  snake = new Snake();
  food = new Food();
  food.pickLocation();
  frameRate(10);
  gameIsPlaying = true;
}

// Forces focus if the user clicks anywhere on the canvas
function mousePressed() {
  let canvasElement = document.querySelector('canvas');
  if (canvasElement) {
    canvasElement.focus();
  }
}

// 3. REMOVE RESIZE LOGIC: Don't change internal pixels when the screen shifts
function windowResized() {
  // We leave this empty because CSS handles scaling automatically now!
}
function draw() {
  background(255);

  stroke(90); 
  strokeWeight(1);
  for (let x = 0; x < width; x += scl) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += scl) {
    line(0, y, width, y);
  }
  
  if (snake.eat(food)) {
    food.pickLocation();
  }

  snake.update();
  food.show();  
  snake.show();
  snake.death();
}

function keyPressed() {
  if (keyCode === UP_ARROW) snake.direction(0, -1);
  else if (keyCode === DOWN_ARROW) snake.direction(0, 1);
  else if (keyCode === RIGHT_ARROW) snake.direction(1, 0);
  else if (keyCode === LEFT_ARROW) snake.direction(-1, 0);
  else if (keyCode === 32) resetGame();
}

function touchStarted() {
  touchStartX = mouseX;
  touchStartY = mouseY;
  if (!gameIsPlaying) resetGame();
  
  // Only block default action if it's a real mobile touch event
  if (touches.length > 0) {
    return false; 
  }
}

function touchEnded() {
  let deltaX = mouseX - touchStartX;
  let deltaY = mouseY - touchStartY;
  let threshold = 30; 

  if (abs(deltaX) > abs(deltaY)) {
    if (abs(deltaX) > threshold) {
      if (deltaX > 0) snake.direction(1, 0);
      else snake.direction(-1, 0);
    }
  } else {
    if (abs(deltaY) > threshold) {
      if (deltaY > 0) snake.direction(0, 1);
      else snake.direction(0, -1);
    }
  }
  
  if (touches.length > 0) {
    return false;
  }
}

function resetGame() {
  snake.total = 0;
  snake.tail = [];
  snake.x = 0;
  snake.y = 0;
  snake.xspeed = 1;
  snake.yspeed = 0;
  food.pickLocation();
  gameIsPlaying = true;
  loop();
}

class Food {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  pickLocation() {
    let cols = floor(width / scl);
    let rows = floor(height / scl);
    this.x = floor(random(cols)) * scl;
    this.y = floor(random(rows)) * scl;
  }
  show() {
    fill(231, 76, 60); 
    noStroke();
    rect(this.x, this.y, scl, scl);
  }
}
