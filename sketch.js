var scl = 20;
var food;
var snake;

// Variables to track mobile swipe coordinates
let touchStartX = 0;
let touchStartY = 0;

function setup() {
  // Use 95% of the smallest screen side to keep it square on phones
  let canvasSize = min(windowWidth, windowHeight) * 0.95;
  
  // Round down to the nearest multiple of 'scl' so the grid fits perfectly
  canvasSize = floor(canvasSize / scl) * scl; 
  
  createCanvas(canvasSize, canvasSize);
  snake = new Snake();
  food = new Food();

  frameRate(10);
}

function windowResized() {
  // Automatically adjust the game size if the phone is rotated
  let canvasSize = min(windowWidth, windowHeight) * 0.95;
  canvasSize = floor(canvasSize / scl) * scl;
  resizeCanvas(canvasSize, canvasSize);
}

function draw() {
  background(255);

  stroke(100); // Faint line color
  strokeWeight(1);
  fill(0);
  
  for (let x = 0; x < width; x += scl) {
    line(x, 0, x, height); // Vertical lines
  }
  for (let y = 0; y < height; y += scl) {
    line(0, y, width, y); // Horizontal lines
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
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  } else if (keyCode == 32) {
    snake.total = 0;
    snake.tail = [];
    setup();
    loop();
  }
}

// MOBILE TOUCH CONTROLS
function touchStarted() {
  // Only process if it is a real mobile touch, not a laptop mouse click
  if (touches.length > 0) {
    touchStartX = touches[0].x;
    touchStartY = touches[0].y;
    return false; // Stops mobile browser scrolling/bouncing
  }
}

function touchEnded() {
  // Only process if tracking an actual touch event
  if (touchStartX !== 0 && touchStartY !== 0) {
    let dx = mouseX - touchStartX;
    let dy = mouseY - touchStartY;
    let threshold = 30; // Min swipe distance to trigger a turn

    if (abs(dx) > abs(dy)) {
      // Horizontal swiping
      if (abs(dx) > threshold) {
        if (dx > 0) {
          snake.direction(1, 0);  // Swipe Right
        } else {
          snake.direction(-1, 0); // Swipe Left
        }
      }
    } else {
      // Vertical swiping
      if (abs(dy) > threshold) {
        if (dy > 0) {
          snake.direction(0, 1);  // Swipe Down
        } else {
          snake.direction(0, -1); // Swipe Up
        }
      }
    }
    
    // Reset touch tracking variables
    touchStartX = 0;
    touchStartY = 0;
    return false; // Stops mobile browser scrolling/bouncing
  }
}
