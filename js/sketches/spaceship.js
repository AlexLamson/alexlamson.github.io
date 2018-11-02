var sketch_div = 'spaceship-div';
var my_sketch = function( p ) { 
  var canvas;

  var ship_pos;

  var pitch_angle = 90; //polar angle, theta (0 == up)
  var yaw_angle = 0; //azimuthal angle, phi (0 == out of the screen)
  var roll_angle = 0;

  function forward() {
    var dx = p.map(p.mouseX, 0, p.width, -180, 180);
    var dy = p.map(p.mouseY, 0, p.height, -180, 180);
    // return p5.Vector.fromAngles(p.radians(pitch_angle+dx), p.radians(yaw_angle+dy), 1);
    return p5.Vector.fromAngles(p.radians(pitch_angle), p.radians(yaw_angle+180), 1);
  }

  function up() {
    // var dy = p.map(p.mouseY, 0, p.height, -180, 180);
    return p5.Vector.fromAngles(p.radians(roll_angle), p.radians(yaw_angle+90), 1);
  }

  function right() {
    var thing = p5.Vector.cross(forward(), up()).normalize();
    return thing;
  }

  p.setup = function() {
    var windowSize = p.min(p.windowWidth, p.windowHeight);
    var canvasDiv = document.getElementById(sketch_div);
    p.createCanvas(canvasDiv.clientWidth-40, windowSize*0.5, p.WEBGL);
    
    cameraZ = (p.height/2)/p.tan(p.PI/6);
    p.perspective(p.PI/3.0, p.width/p.height, cameraZ/100.0, cameraZ*10.0)

    ship_pos = p.createVector(0, 0, cameraZ/2);

    p.ambientLight(150);
    p.pointLight(255, 0, 0, 50, 0, 0);
    p.pointLight(0, 255, 0, 0, 50, 0);
    p.pointLight(0, 0, 255, 0, 0, 50);
  };

  p.windowResized = function(){
    var windowSize = p.min(p.windowWidth, p.windowHeight);
    var canvasDiv = document.getElementById(sketch_div);
    p.resizeCanvas(canvasDiv.clientWidth-40, windowSize*0.5, p.WEBGL);

    cameraZ = (p.height/2)/p.tan(p.PI/6);
    p.perspective(p.PI/3.0, p.width/p.height, cameraZ/100.0, cameraZ*10.0)
  }

  p.draw = function() {
    var ship_forward = forward();
    var ship_up = up();
    var ship_right = right();
    // console.log(ship_forward);

    // console.log(ship_up);

    // p.camera(ship_pos.x, ship_pos.y, ship_pos.z, ship_pos.x+ship_forward.x, ship_pos.y+ship_forward.y, ship_pos.z+ship_forward.z, UP.x, UP.y, UP.z);
    p.camera(ship_pos.x, ship_pos.y, ship_pos.z, ship_pos.x+ship_forward.x, ship_pos.y+ship_forward.y, ship_pos.z+ship_forward.z, ship_up.x, ship_up.y, ship_up.z);




    p.background(100);

    p.push();
    p.rotateX(p.radians(90));
    p.plane(100, 200);
    p.pop();

    p.box(30);

    p.translate(100,100,-100);
    p.rotate(p.frameCount * 0.01 * p.PI/4, [1,1,0]);
    p.box(30);


    // debugging
    function rounded_vec(v) {
      return "[ "+p.round(v.x)+", "+p.round(v.y)+", "+p.round(v.z)+" ]";
    }
    if (p.keyIsPressed || p.key == 'g') { //a
      if(p.frameCount % 20 == 0) {
        console.log("====================================");
        // var dx = p.map(p.mouseX, 0, p.width, -180, 180);
        // var dy = p.map(p.mouseY, 0, p.height, -180, 180);
        // console.log("dx: "+p.round(dx));
        // console.log("dy: "+p.round(dy));

        console.log("ship_pos: "+rounded_vec(ship_pos));
        console.log("ship_forward: "+rounded_vec(ship_forward));
        // console.log("ship_forward: "+ship_forward);
        console.log("ship_right: "+rounded_vec(ship_right));
        console.log("ship_up: "+rounded_vec(ship_up));
        console.log("====================================");
      }
    }

    // increase speed
    var speed = 1;
    if (p.keyIsDown(p.SHIFT)) {
      speed = 2;
    }

    // translation
    if (p.keyIsDown(65)) { //a
      ship_pos.add(p5.Vector.mult(ship_right, -speed));
    }
    if (p.keyIsDown(68)) { //d
      ship_pos.add(p5.Vector.mult(ship_right, speed));
    }
    if (p.keyIsDown(87)) { //w
      ship_pos.add(p5.Vector.mult(ship_forward, speed));
    }
    if (p.keyIsDown(83)) { //s
      ship_pos.add(p5.Vector.mult(ship_forward, -speed));
    }

    if (p.keyIsDown(32)) { //space
      // go up
      ship_pos.add(p5.Vector.mult(ship_up, -speed));
    }
    if (p.keyIsDown(90) || p.keyIsDown(17) || p.keyIsDown(18)) { //z or ctrl or alt
      // go down
      ship_pos.add(p5.Vector.mult(ship_up, speed));
    }
    
    if (p.keyIsDown(69)) { //e
      // spin counter clockwise
      roll_angle += -speed;
    }
    if (p.keyIsDown(81)) { //q
      // spin counter clockwise
      roll_angle += speed;
    }
    
    // rotation
    if (p.keyIsDown(p.UP_ARROW)) {
      pitch_angle += speed;
    }
    if (p.keyIsDown(p.DOWN_ARROW)) {
      pitch_angle += -speed;
    }
    if (p.keyIsDown(p.LEFT_ARROW)) {
      yaw_angle += -speed;
    }
    if (p.keyIsDown(p.RIGHT_ARROW)) {
      yaw_angle += speed;
    }

  };
};
var myp5 = new p5(my_sketch, sketch_div);

// prevent the spacebar and arrow keys from scrolling the window
window.addEventListener("keydown", function(e) {
    // space, alt and arrow keys
    if([32, 18, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
