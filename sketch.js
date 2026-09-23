var scl = 20;

var food;

function setup() {
  createCanvas(500, 500);
  snake = new Snake();
  food = new Food();

  frameRate(10);
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
    this.total = 0;
    this.tail = [];
    setup();
    loop();
  }
}
