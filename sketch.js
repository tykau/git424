canvasW = 1500
canvasH = 400
paddleW = 20
paddleH = 100

ballD = 40
colors = ['green', 'navy', 'red', 'black', 'violet']
let p1, p2

class Paddle {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = random(colors)
    this.speed = 2
    this.score = 0
  }
  draw() {
    fill(this.color)
    noStroke()
    rect(this.x, this.y, this.w, this.h)
  }

  update() {
    this.y += this.speed;
    this.y = constrain(this.y, 0, canvasH - this.h);
  }

  move(direction) {
    this.speed = direction * 8;
  }
  upScore() {
    this.score += 1
  }
}

class Ball {
  constructor(x, y, d) {
    this.x = x
    this.y = y
    this.d = d
    this.color = random(colors)
    this.speedX = 0
    this.speedY = 0
  }

  draw() {
    fill(this.color)
    noStroke()
    ellipse(this.x, this.y, this.d)
  }

  start() {
    this.speedX = random([-5, 5])
    this.speedY = random([-5, 5])
  }

  rematch() {
    this.x = canvasW / 2
    this.y = canvasH / 2
    this.speedX = 0
    this.speedY = 0
  }

  reflect(xdir, ydir) {
    this.speedX = this.speedX * xdir
    this.speedY = this.speedY * ydir
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // wall reflection routine
    if (this.y - this.d / 2 < 0) {
      this.reflect(1, -1)
    }
    if (this.y + this.d / 2 > canvasH) {
      this.reflect(1, -1)
    }

    // paddle reflection routine
    // left paddle
    if (this.x - this.d / 2 < 0) {
      // check for paddle reflection
      if (this.y > p1.y && this.y < p1.y + p1.h) {
        this.reflect(-1, 1)

      }
      else {
        this.rematch()
        p2.upScore()
      }
    }
    // right paddle
    if (this.x + this.d / 2 > canvasW) {
      // check for  paddle reflection
      if (this.y > p2.y && this.y < p2.y + p2.h) {
        this.reflect(-1, 1)

      }
      else {
        this.rematch()
        p1.upScore()
      }
    }


    // game over cases

  }
}

function setup() {
  createCanvas(canvasW, canvasH)
  // Создаем ракетки
  p1 = new Paddle(0, 100, paddleW, paddleH) // a,z
  p2 = new Paddle(canvasW - paddleW, 100, paddleW, paddleH) // o,l
  p1.move(0)
  p2.move(0)
  // создаем мяч 

  gameBall = new Ball(canvasW / 2, canvasH / 2, ballD)
  // gameBall.start()


}

function draw() {

  background(255)



  noStroke()
  fill(128)
  rect(0, 0, canvasW / 2, canvasH)

  textSize(48);
  fill(p1.color);
  stroke(0);
  strokeWeight(4);
  text(p1.score, canvasW / 2 - 80, 50);
  fill(p2.color);
  text(p2.score, canvasW / 2 + 50, 50);

  fill(0)
  text(':', canvasW / 2 - 8, 50)

  gameBall.draw()
  gameBall.update()

  p1.draw()
  p2.draw()
  p1.update()
  p2.update()

}



function keyPressed() {
  if (key === 'a') {
    p1.move(-1);
  } else if (key === 'z') {
    p1.move(1);
  }

  if (key === 'o') {
    p2.move(-1);
  } else if (key === 'l') {
    p2.move(1);
  }
  if (keyCode == 32) {
    gameBall.start()
  }

}

function keyReleased() {
  if (key === 'a' || key === 'z') {
    p1.move(0);
  }

  if (key === 'o' || key === 'l') {
    p2.move(0);
  }
}
