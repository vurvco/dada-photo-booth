/*
based on:
pixel_sampling - Jerome Martinez, 2016
Simple Image Glitching Processing - datamoshing.com, 2016
*/

PImage img;
String imgFileName = "vera";
String fileType = "jpg";

int[][] values;
int currentFrame;
int frameSample = 500;
boolean saveFrames = false;

void setup() {
  /*img = loadImage("vurv4.png");*/
  img = loadImage(imgFileName + "." + fileType);
  
  //use only numbers (not variables) for the size() commmand, Processing 3
  size(1, 1);
  
  //allows viewport to resize and update canvas to image file dimensions
  surface.setResizable(true);
  surface.setSize(img.width, img.height);
  
  //load image into canvas
  image(img, 0, 0);
  
  values = new int[width][height];
  img.loadPixels();
  noStroke();
  
  frameRate(1000);
}

void draw() {
  
  /*image(img, 0, 0);*/
    
  int randx = int(random(0, width));
  int randy = int(random(0, height));
  color randc = img.get(randx, randy);
  
  int randx_offset = int(random(0,8));
  int randy_offset = int(random(0,8));
  
  /*float randh = random(5,7) + random(3,7);
  float randw = randh * random(4,8);
  float rands = random(2,5);*/
  
  float randh = random(2,6) + random(2,7);
  float randw = randh * random(2,5);
  float rands = random(2,6);
  fill(randc);
  rect(randx+randx_offset, randy+randy_offset, randw, rands);
 
  
  /*filter(POSTERIZE, random(19,21));
  filter(INVERT);*/
  
  if (saveFrames && frameCount-currentFrame < frameSample) {
    //saveFrame("f###.gif");
  }
}

void mousePressed() {
  saveFrames = true;
  currentFrame = frameCount;
}
  