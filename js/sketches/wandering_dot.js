var xoff1 = 0.0;
var xoff2 = 1000.0;
var xoff3 = 2000.0;
var h = 0;

function setup() {
  // var myCanvas = createCanvas(1500, 750);
  // var myCanvas = createCanvas(400, 400);
  var myCanvas = createCanvas(windowWidth*1/2, 400);
  myCanvas.parent("wandering-dot-div");
  // createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 255);
}

function draw() {
  background(0);
  

  x = map(noise(xoff1),0,1,0,width);
  y = map(noise(xoff2),0,1,0,height);
  // xoff1 += 0.01;
  // xoff2 += 0.01;

  // xoff1 += random(0.03);
  // xoff2 += random(0.03);

  // var maxVal = map(mouseX,0,width,0,0.05);
  // z = map(noise(xoff3),0,1,0,maxVal);

  z = map(noise(xoff3),0,1,0,0.02);
  xoff1 += z;
  xoff2 += z;
  xoff3 += 0.01;

  h += 1;
  h %= 256;

  // textSize(32);
  // text('hue: '+h, 10, 30);

  // fill(255);
  noStroke();
  fill(h, 255, 180);
  ellipse(x,y,10,10);
}



// var capture;

// function setup() {
//   createCanvas(390, 240);
//   capture = createCapture(VIDEO);
//   capture.size(320, 240);
//   //capture.hide();
// }

// function draw() {
//   background(255);
//   image(capture, 0, 0, 320, 240);
//   filter('INVERT');
// }



// function setup(){
//   createCanvas(710, 400, WEBGL);
// }

// function draw(){
//   background(250);
//   rotateY(frameCount * 0.01);

//   for(var j = 0; j < 5; j++){
//     push();
//     for(var i = 0; i < 80; i++){
//       translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
//       rotateZ(frameCount * 0.002);
//       push();
//       sphere(8, 6, 4);
//       pop();
//     }
//     pop();
//   }
// }