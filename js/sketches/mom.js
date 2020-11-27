var sketch_div = 'mom-div';
var my_sketch = function( p ) {
  var numSamples = 10000;

  function setPetalColor() {
    var h = p.random(0, 18);
    if (p.random(100) < 50) {
      h = p.random(47, 100);
    }
    var s = 25 + p.random(70);
    var v = 85 + p.random(10);

    if (h > 60 && h < 74) {
      let gain = 20;
      let blueness = 1 - Math.abs(360 * h / 100 - 240) / 25;
      let change = Math.floor(gain * blueness);
      v += change;
      s -= change;
    }

    p.fill(h, s, v);
  }

  function drawFlower(x, y, s) {
    var scale = p.map(s, 0, 100, 0, 0.4);
    var petalLength = 100 * scale;
    var numPetals = Math.floor(p.random(4, 8));

    p.noStroke();
    p.colorMode(p.HSB, 100);
    setPetalColor();
    for (var i = 0; i < numPetals; i++) {
      p.resetMatrix();
      p.translate(x, y);
      p.rotate(2 * p.PI * (numPetals - i - 1) / numPetals);
      p.translate(0, petalLength / 2);
      p.ellipse(0, 0, 55 * scale, petalLength);
    }

    p.colorMode(p.RGB, 255);
    p.noStroke();
    p.fill(255, 255, 0);
    p.resetMatrix();
    p.ellipse(x, y, 45 * scale, 45 * scale);
  }

  function isText(x, y) {
    var c = p.get(x, y);
    return (p.red(c) < 230);
  }

  function sample() {
    var x = p.random(p.width);
    var y = p.random(p.height);

    var sizeSamples = 30;
    let stepSize = 1;

    if (isText(x, y)) {
      var minX = x,
      maxX = x,
      minY = y,
      maxY = y;

      for (var ix = 0; ix < sizeSamples; ix++) {
        var px = x + stepSize * (ix - sizeSamples / 2);
        if (isText(px, y)) {
          minX = p.min(px, minX);
          maxX = p.max(px, maxX);
        }
      }
      for (var iy = 0; iy < sizeSamples; iy++) {
        var py = y + stepSize * (iy - sizeSamples / 2);
        if (isText(x, py)) {
          minY = p.min(py, minY);
          maxY = p.max(py, maxY);
        }
      }
      var s = p.min((maxY-minY), (maxX-minX));
      drawFlower(x, y, s);
    }

  }

  p.setup = function setup() {
    p.frameRate(1);
  }

  p.draw = function draw() {
    p.createCanvas(800, 550);
    p.background(255);

    p.textAlign(p.CENTER);
    var fontsize = 150;
    p.textSize(fontsize);
    p.fill(207, 255, 219);
    p.textStyle(p.BOLD);
    p.text("Happy\nBirthday\nMom!", p.width / 2, fontsize);

    for (var i = 0; i < numSamples; i++) {
      sample();
    }
  }
};
var myp5 = new p5(my_sketch, sketch_div);
