var bannerSketch = function( p ) { // p could be any variable name
  var x = 0.0, y = 0.0;
  var vx = 1.0, vy = 2.0;

  p.setup = function() {
    var windowSize = p.min(p.windowWidth, p.windowHeight);
    var scaling = 0.2;
    p.createCanvas(p.windowWidth-15, windowSize*scaling);
  };

  p.draw = function() {
    // draw background
    // p.background(0, 0, 0);

    // draw circle
    p.noStroke();
    p.fill(85, 168, 224);
    p.ellipse(x,y,10,10);

    // make it move
    x += vx;
    y += vy;

    // make it bounce
    if(x < 0) {
      x = 0;
      vx = -vx;
    }
    else if(x > p.width) {
      x = p.width;
      vx = -vx;
    }
    if(y < 0) {
      y = 0;
      vy = -vy;
    }
    else if(y > p.height) {
      y = p.height;
      vy = -vy;
    }
  };
};
var myp5 = new p5(bannerSketch, 'banner-div');
