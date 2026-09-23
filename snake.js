class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = []; 
  }

  eat(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);

    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }    
  }

  direction(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  
  gameOver() {
    noLoop();
    fill('black');
    textFont('Franklin Gothic', 90);
    text("Game Over", 35, 250);
    textFont('Franklin Gothic', 25);
    text("(Press the space key to begin)", 90, 290);
  }  

  death() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);

      if (d < 1) {
        this.gameOver();
      }
    }
  }

  update() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  show() {
    fill('orange');

    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }

    rect(this.x, this.y, scl, scl);
  }
}

class Food {
  constructor() {
    this.pickLocation();
  }

  pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);

    this.x = floor(random(cols)) * scl;
    this.y = floor(random(rows)) * scl;
  }

  show() {
    fill('gray');
    rect(this.x, this.y, scl, scl);
  }
}
