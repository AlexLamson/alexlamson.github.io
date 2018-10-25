// Sketch Two
var wanderingDotSketch = function( p ) { 
  var xoff1 = 0.0;
  var xoff2 = 1000.0;
  var xoff3 = 2000.0;
  var h = 0;

  p.setup = function() {
    var windowSize = p.min(p.windowWidth, p.windowHeight);
    var scaling = 0.5;
    p.createCanvas(windowSize*scaling, windowSize*scaling);
    p.colorMode(p.HSL, 255);
  };

  p.draw = function() {
    p.background(0);
    

    x = p.map(p.noise(xoff1),0,1,0,p.width);
    y = p.map(p.noise(xoff2),0,1,0,p.height);
    // xoff1 += 0.01;
    // xoff2 += 0.01;

    // xoff1 += p.random(0.03);
    // xoff2 += p.random(0.03);

    // var maxVal = p.map(p.mouseX,0,width,0,0.05);
    // z = p.map(p.noise(xoff3),0,1,0,maxVal);

    z = p.map(p.noise(xoff3),0,1,0,0.02);
    xoff1 += z;
    xoff2 += z;
    xoff3 += 0.01;

    h += 1;
    h %= 256;

    // p.textSize(32);
    // p.text('hue: '+h, 10, 30);

    // p.fill(255);
    p.noStroke();
    p.fill(h, 255, 180);
    p.ellipse(x,y,10,10);

  };
};
var myp5 = new p5(wanderingDotSketch, 'wandering-dot-div');
