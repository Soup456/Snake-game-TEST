class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
  }

  direction(x, y) {
    if (x !== 0 && this.xspeed === -x) return;
    if (y !== 0 && this.yspeed === -y) return;
    this.xspeed = x;
    this.yspeed = y;
  }

  eat(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    }
    return false;
  }

  death() {
    if (this.x < 0 || this.x >= width || this.y < 0 || this.y >= height) {
      this.gameOver();
      return;
    }
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.gameOver();
      }
    }
  }

  gameOver() {
    gameIsPlaying = false; // Updates our custom state tracking variable
    noLoop();
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 20);
    textSize(16);
    fill(0);
    text("Press Spacebar or Tap Screen to Restart", width / 2, height / 2 + 20);
  }

  update() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;
  }

  show() {
    fill(46, 204, 113); 
    noStroke();
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    fill(39, 174, 96); 
    rect(this.x, this.y, scl, scl);
  }
}
