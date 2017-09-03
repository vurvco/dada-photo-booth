import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class server extends PApplet {

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

public void setup() {
  img = loadImage(imgFileName + "." + fileType);

  // use only numbers (not variables) for the size() command, Processing 3
  

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

public void draw() {
  int randx = PApplet.parseInt(random(0,width));
  int randy = PApplet.parseInt(random(0, height));
  int randc = img.get(randx, randy);

  int randx_offset = PApplet.parseInt(random(0,8));
  int randy_offset = PApplet.parseInt(random(0,8));

  float randh = random(2,3) + random(2,6);
  float randw = randh * random(2,7);
  float rands = random(2,6);

  fill(randc);
  rect(randx+randx_offset, randy+randy_offset, randw, rands);

  filter(POSTERIZE, 6);

  println(frameCount);

  if (frameCount > 1500 && frameCount < 3500) {
    saveFrame("/Users/IceKing/Code/art/dada-photo-booth/server/artifacts/f#####.gif");
  }

  if (frameCount == 3500) {
    exit();
  }
}
  public void settings() {  size(1, 1); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "server" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
