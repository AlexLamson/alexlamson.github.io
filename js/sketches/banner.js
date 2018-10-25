var x = 0.0, y = 0.0;
var vx = 1.0, vy = 2.0;

function setup() {
  var windowSize = min(windowWidth, windowHeight);
  var scaling = 0.2;
  var myCanvas = createCanvas(windowSize*scaling, windowSize*scaling);
  var myCanvas = createCanvas(windowWidth-15, windowSize*scaling);
  myCanvas.parent("banner-div");

  // createCanvas(300, 300);
  // createCanvas(windowWidth, windowHeight);
  
  // colorMode(HSL, 255);
}

function draw() {
  background(0, 0, 0, 0);

  noStroke();
  fill(85, 168, 224);
  ellipse(x,y,10,10);

  // make it move
  x += vx;
  y += vy;

  // make it bounce
  if(x < 0) {
    x = 0;
    vx = -vx;
  }
  else if(x > width) {
    x = width;
    vx = -vx;
  }
  if(y < 0) {
    y = 0;
    vy = -vy;
  }
  else if(y > height) {
    y = height;
    vy = -vy;
  }
}
