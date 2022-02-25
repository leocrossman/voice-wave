let xspacing = 2; // distance between each horizontal location
let w; // width of entire wave
let theta = 0.0; // angle starts at 0
let period = 500.0; // length of wave
let dx; // val for incrementing x
let yvalues; // array of circle heights

// sound
let mic, level, waveHeight;

function setup() {
  createCanvas(800, 800);
  background(0);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.05;

  level = mic.getLevel();
  waveHeight = map(level, 0, 1, 0, 800);

  // For every x value, calculate a y value with sine function
  // aka give each point a height
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * waveHeight;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}
