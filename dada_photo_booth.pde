/*
based on:
 Simple Image Glitching Processing - datamoshing.com | 2016
 + a pixel sorting sketch from Jerome Martinez
 */

// output needs to be 1066 x 800

PImage img;
String imgFileName = "cropped";
String fileType = "jpg";

int[][] values;

void setup() {
  img = loadImage(imgFileName + "." + fileType);

  // use only numbers (not variables) for the size() command, Processing 3
  size(1, 1);

  // allows the viewer to resize and update surface to image file dimensions
  surface.setResizable(true);
  surface.setSize(img.width, img.height);

  // load image onto surface
  image(img, 0, 0);

  values = new int[width][height];
  img.loadPixels();
  noStroke();

  frameRate(3000);
}

void draw() {
  int randx = int(random(0,width));
  int randy = int(random(0, height));
  color randc = img.get(randx, randy);

  int randx_offset = int(random(0,8));
  int randy_offset = int(random(0,8));

  /*float randh = random(5,7) + random(3,7);
  float randw = randh * random(4,8);
  float rands = random(2,5);*/

  float randh = random(2,3) + random(2,6);
  float randw = randh * random(2,7);
  float rands = random(2,6);

  fill(randc);
  rect(randx+randx_offset, randy+randy_offset, randw, rands);

  filter(POSTERIZE, 6);

  println(frameCount);

  if (frameCount > 1500 && frameCount < 3500) {
    saveFrame("/Users/IceKing/Code/art/dadageek/processing-class/exhibit_00/artifacts/f#####.gif");
  }

  if (frameCount == 3500) {
    exit();
  }
}
