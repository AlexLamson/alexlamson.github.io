var bannerSketch = function( p ) { // p could be any variable name
  var x = 0.0, y = 0.0;
  var vx = 1.0, vy = 2.0;
  var r = 10;

  p.setup = function() {
    var windowSize = p.min(p.windowWidth, p.windowHeight);
    var scaling = 0.2;
    p.createCanvas(p.windowWidth-1*(15), windowSize*scaling);
  };

  p.draw = function() {
    // draw background
    // p.background(0, 0, 0);
    // p.background(233, 234, 237, 20);

    // draw circle
    p.noStroke();
    // p.fill(85, 168, 224, 255);
    p.fill(85, 168, 224, 40);
    p.ellipse(x,y,r,r);

    // make it move
    x += vx;
    y += vy;

    // make it bounce
    if(x < 0) {
      x = 0;
      vx = -vx;
    }
    else if(x > p.width-r) {
      x = p.width-r;
      vx = -vx;
    }
    if(y < 0) {
      y = 0;
      vy = -vy;
    }
    else if(y > p.height-r) {
      y = p.height-r;
      vy = -vy;
    }
  };
};
var myp5 = new p5(bannerSketch, 'banner-div');
