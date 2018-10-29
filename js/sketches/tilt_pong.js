var sketch_div = 'tilt-pong-div';
var my_sketch = function( p ) { 
  var canvas;

  var paddle_x; //center of paddle
  var ball_x, ball_y; //position of top-left side of ball
  var ball_vx, ball_vy;
  var ball_size = 10;
  var paddle_size = 60;
  var paddle_height = 10;

  var attempts = 0;
  var streak = 0;
  var best_streak = 0;

  p.reset = function() {
    ball_x = p.random(p.width);
    ball_y = 10;
    ball_vx = p.random(-2, 2);
    ball_vy = p.height/100;
    attempts += 1;
    best_streak = p.max(best_streak, streak);
    streak = 0;
  }

  p.setup = function() {
    var windowSize = p.min(p.windowWidth, p.windowHeight);
    var canvasDiv = document.getElementById(sketch_div);
    var sketchCanvas = p.createCanvas(canvasDiv.clientWidth-40, windowSize*0.5);

    paddle_x = p.width/2;
    p.reset();
  };

  p.windowResized = function(){
    var windowSize = p.min(p.windowWidth, p.windowHeight);
    var canvasDiv = document.getElementById(sketch_div);
    p.resizeCanvas(canvasDiv.clientWidth-40, windowSize*0.5);
  }

  p.draw = function() {
    p.background(0);

    var font_size = p.height/3/5;
    p.textSize(font_size);
    p.text("Round: "+attempts, 10, font_size);
    p.text("Bounces: "+streak, 10, 2*font_size);
    p.text("High score: "+best_streak, 10, 3*font_size);

    // move the paddle
    if(p.rotationY === null) {
      paddle_x = p.constrain(p.mouseX, paddle_size/2, p.width-paddle_size/2);
      p.noCursor();

      if (p.keyIsDown(p.LEFT_ARROW)) {
        console.log("left!");
        paddle_x -= 10;
      }
      else if (p.keyIsDown(p.RIGHT_ARROW)) {
        console.log("right!");
        paddle_x += 10;
      }
    }
    else {
      paddle_x = p.map(p.constrain(p.rotationY, -45, 45), -45, 45, 0, p.width);
    }

    // draw the paddle
    p.noStroke();
    p.fill(255, 255, 0);
    p.rect(paddle_x-paddle_size/2, p.height, paddle_size, -paddle_height);

    // move the ball
    ball_x += ball_vx;
    ball_y += ball_vy;

    if(ball_x-ball_size < 0) {
      ball_vx *= -1;
      ball_x = ball_size;
    }
    if(ball_x > p.width) {
      ball_vx *= -1;
      ball_x = p.width;
    }
    if(ball_y-ball_size < 0) {
      ball_vy *= -1;
      ball_y = 0+ball_size;
    }
    if(ball_y > p.height-paddle_height) {

      // if(ball_x+ball_size/2 <= paddle_x+paddle_size/2 && ball_x+ball_size/2 >= paddle_x-paddle_size/2) {
      if(ball_x >= paddle_x-paddle_size/2 && ball_x-ball_size <= paddle_x+paddle_size/2) {
        // bounce the ball, we did hit the paddle!
        ball_y = p.height-paddle_height;
        // ball_vy *= -1;

        var mag = p.createVector(ball_vx, ball_vy).mag();
        var hit_pos = p.map(ball_x, paddle_x-paddle_size/2, paddle_x+paddle_size/2+ball_size, -1, 1);
        var angle = p.acos(hit_pos);
        // console.log("hit_pos: "+hit_pos);
        angle = p.map(angle, 0, p.PI, 45, 135);
        angle = p.constrain(angle, 45, 135);
        // console.log("angle: "+angle);
        var ball_v = p5.Vector.fromAngle(p.radians(angle), mag * 1.05); // speed up ball
        ball_vx = ball_v.x;
        ball_vy = -ball_v.y;
        ball_vy = p.min(-1, ball_vy);

        // update number of bounces
        streak += 1;
      }
      else {
        // you missed the ball! update the score and reset the game!
        p.reset();
      }
    }

    // draw the ball
    p.noStroke();
    p.fill(255, 255, 255);
    p.ellipse(ball_x-ball_size/2, ball_y-ball_size/2, ball_size, ball_size);
  };
};
var myp5 = new p5(my_sketch, sketch_div);
