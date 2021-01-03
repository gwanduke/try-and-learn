"use strict"
const quantnodes = 555; //reduce the number of nodes to speed up work
const surfWidth = 900;
const surfHeight = 600;
const radiusLimit = 14;
const nodesDistance = surfHeight/Math.sqrt(quantnodes/(surfWidth/surfHeight));
const quantColumn =  Math.floor( surfWidth / nodesDistance );  
const quantRow  =  Math.floor( surfHeight / nodesDistance );
const ScrDiag = Math.sqrt(Math.pow(surfWidth, 2) + Math.pow(surfHeight, 2));

let globalCounter = 0;
let ctrArr = [];  //array of coordinates of the centers of circles
let i = 0;
let outerCircle, innerCircle;  // animation objects [surface nodes]
let L;  //distance between cursor and circle center
let density = 267;    // 1 coefficient responsible for the type of surface
let typeFig = 0.915;  // 2 coefficient responsible for the type of surface
let r = 103, g = 10, b = 5;
let hue = 0;

function Circle(id, positionX, positionY, radius, fill, stroke, stroke_width) {
  // svg circle constructor function
  this.id = id;
  this.positionX = positionX;
  this.positionY = positionY;
  this.radius = radius;
  this.fill = fill;
  this.stroke = stroke;
  this.stroke_width = stroke_width;
  this.draw = function() {                       
    JS_content_creation.innerHTML += 
     `<circle id="${this.id}" cx="${this.positionX}" cy="${this.positionY}" 
      r="${this.radius}" fill="${this.fill}" 
      stroke="${this.stroke}" stroke-width="${this.stroke_width}"/>`;
  }
}

function randColor() {
  //random color generator [rgb]
  let r1 = Math.floor(Math.random() * (256)),
      g1 = Math.floor(Math.random() * (256)),
      b1 = Math.floor(Math.random() * (256));
  return '#' + r1.toString(16) + g1.toString(16) + b1.toString(16);
}

function surfaceBuilding() { 
  let outerCircleArray = [];
  let innerCircleArray = [];
  for (let j = 1; j < quantRow; j++) {
    for (let k = 1; k < quantColumn; k++) { 
      i++;
      outerCircleArray[i] = new Circle(i, k * nodesDistance, 
                            j * nodesDistance, 10, "black", randColor(), 2);
      outerCircleArray[i].draw();

      innerCircleArray[i] = new Circle("k" + i, k * nodesDistance, 
                            j*nodesDistance, 1, "yellow", randColor(), 1);
      innerCircleArray[i].draw();
      ctrArr.push([k * nodesDistance, j * nodesDistance]);
    }
  }
}
 
surfaceBuilding();

window.addEventListener('mousemove', function(e) {
  let radius, dx, dy;
  i = 0;
  for (let j = 1; j < quantRow; j++) {
    for (let k = 1; k < quantColumn; k++) {
      i++;
      let cx = ctrArr[i-1][0], cy = ctrArr[i-1][1];

      outerCircle = document.getElementById(i);
      innerCircle = document.getElementById("k" + i);

      L = Math.sqrt(Math.pow((e.pageX - cx), 2) + Math.pow((e.pageY - cy), 2));

      dx = (e.pageX - cx) * density / (Math.pow(L, typeFig));
      dy = (e.pageY - cy) * density / (Math.pow(L, typeFig));

      outerCircle.setAttribute("cx", cx + dx);
      outerCircle.setAttribute("cy", cy + dy);

      innerCircle.setAttribute("cx", cx + dx);
      innerCircle.setAttribute("cy", cy + dy);

      outerCircle.setAttribute("stroke", paintColor());
      outerCircle.setAttribute("fill", paintColor());

      radius = ScrDiag / L;
      if (radius > radiusLimit) {radius = radiusLimit} ;
      outerCircle.setAttribute("r", radius);
      innerCircle.setAttribute("r", radius / 3);
      //console.log("typeFig: ", typeFig, "density: ", density);
    }
  }
}, false);

document.onkeydown = function(e) {
  if (e.keyCode === 38) { typeFig += 0.01 }
  if (e.keyCode === 40) { typeFig -= 0.01 }
  if (e.keyCode === 37) { density += 10 }
  if (e.keyCode === 39) { density -= 10 }

//With the keys 2, 3, 4, 5, you can set the surface types shown at the end of the lesson
  if (e.keyCode === 50) { typeFig = 0.815; density = -90 }
  if (e.keyCode === 51) { typeFig = 3.015; density = -1249777 }
  if (e.keyCode === 52) { typeFig = 0.585; density = 55 }
  if (e.keyCode === 53) { typeFig = 1.922; density = 79674 }
}

function rainbowColor() {
  //rainbow color generator [hsla]
  globalCounter += 1;
  if ((globalCounter % 32) == 0) {
    if (hue < 360) {hue += 0.1;}
      else {hue = 0;}
  }
  return ("hsla(" + hue + ", 100%, 50%, 1.0)");
}

function paintColor() { 
  //backlight generator [rgb]
  function colorGenerator() {
    if (b < 256) {b += 1}
      else {
        b = 0;
        if (g < 10) {g += 1}
          else {
            g = 0;
            if (r <16) {r += 1}
              else {r = 4;}
          }
      }
  }
  globalCounter += 1;
  if ((globalCounter % 4) == 0) { colorGenerator(); } 
  return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}






