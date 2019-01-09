var sketch_div = 'michelle-div';
var my_sketch = function( p ) { 
  var canvasWidth = 582;
  var canvasHeight = 436;
  // var x;
  // var y;
  var img;

  p.reset = function() {
    // x = 200;
    // y = 200;
  }

  p.preload = function() {
    var path = "img/us.jpg";
    img = p.loadImage(path);
  }

  p.setup = function() {
    p.frameRate(10);
    p.createCanvas(canvasWidth, canvasHeight);
    p.reset();
    p.image(img, 0, 0);
    // p.loadPixels();
    p.background(255);
  };

  p.windowResized = function(){
    p.resizeCanvas(canvasWidth, canvasHeight);
  }

  function get_letter() {
    // var chars = "BREKKIE".split('');
    var chars = ["FRISBEE","PHYSICS","MATH","ART","BREKKIE","TEA","SPACE","LOVE",":D"];
    // var chars = ['L', 'O', 'V', 'E'];
    var rand = chars[Math.floor(Math.random() * chars.length)];
    return rand;
  }

  p.draw = function() {
    // p.background(255);


    p.textAlign(p.CENTER);
    p.textSize(16);
    // p.fill(img.get(50, 50));

    // var thing = p.get(50, 50);
    // console.log(thing);


    var fontsize = p.map(p.mouseY, 0, p.height, 48, 5);
    // var num_letters = p.map(p.mouseY, 0, p.height, 0, 1000);
    var num_letters = 4000/(fontsize-4);
    p.textSize(fontsize);
    for(var i = 0; i < num_letters; i++) {
      var imgX = p.random(0, img.width);
      var imgY = p.random(0, img.height);
      
      var x = p.map(imgX, 0, img.width, 0, p.width);
      var y = p.map(imgY, 0, img.height, 0, p.width+2);
      
      var c = img.get(imgX, imgY);

      var a = p.map(p.mouseX, 0, p.width, 0, 256);

      // p.fill(p.red(c), p.green(c), p.blue(c), 32);
      p.fill(p.red(c), p.green(c), p.blue(c), a);
      // p.fill(c);

      // p.text("LOVE", x, y);
      // p.text("THIS IS SOMETHING THAT IS SUPER LONG", x, y);
      p.text(get_letter(), x, y);

      // p.fill(0);
      // p.ellipse(x, y, 10, 10)
    }

    // x += 1;
    // y += 3;
  };
};
var myp5 = new p5(my_sketch, sketch_div);
