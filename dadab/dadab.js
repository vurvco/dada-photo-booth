/*
based on:
 - Simple Image Glitching Processing - datamoshing.com | 2016
 - a pixel sorting sketch from Jerome Martinez | 2017
 */
 
// output needs to be 1066 x 800
 
var img;
var imgFileName = "vera";
var fileType = "jpg";

function preload() {
  // load an image from our library to set the canvas createCanvas
  img = loadImage(imgFileName + "." + fileType);
}


function setup() {
  
  // use only numbers (not variables) for the createCanvas() command, Processing 3
  var canvas = createCanvas(img.width, img.height);
  canvas.parent("p5canvas");

  // allows the viewer to recreateCanvas and update surface to image file dimensions
  // surface.setResizable(true);
  // surface.setSize(img.width, img.height);
  
  // load image onto surface
  image(img, 0, 0);

  img.loadPixels();
  noStroke();
 
   //set the speed at which rectangles are created; 1 frame = 1 rectangle
  frameRate(30000);
}

function draw() {
  // ellipse(100, 100, 100,100);
  //
  var randx = random(0,width);
  var randy = random(0, height);
  var randc = img.get(randx, randy);
  
  var randx_offset = random(0,8);
  var randy_offset = random(0,8);
  
  /*var randh = random(5,7) + random(3,7);
  var randw = randh * random(4,8);
  var rands = random(2,5);*/
  
  //
  var randh = random(2,3) + random(2,6);
  var randw = randh * random(2,7);
  var rands = random(2,6);
  
  //
  fill(randc);
  rect(randx+randx_offset, randy+randy_offset, randw, rands);
  
  //apply a posterized filter effect to the colors being randomly generated
  filter(POSTERIZE, 6);
  /*filter(POSTERIZE, random(19,21));
  filter(INVERT);*/
  
  console.log(frameCount);

  // save frame 1500 - 3500 to a local folder 
  // if (frameCount > 1500 && frameCount < 1800) {
  //   saveFrames("/Users/dezein/Desktop/dadab-images/f#####.gif");
  // }

  //after 3500 frames stop the sketch from running
  // if (frameCount == 3500) {
  //   exit();
  // }
}

