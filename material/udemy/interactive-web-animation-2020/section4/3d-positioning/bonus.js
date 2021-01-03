"use strict";

let rotateX = 0, rotateY = 0;
let cursorPosX = 0, cursorPosY = 0;

window.addEventListener('mousemove', function(e) {	
	if (cursorPosX < (e.pageX-2)) { rotateY += 2 } 
		else if (cursorPosX > (e.pageX+2)) { rotateY -= 2 };
	if (cursorPosY < (e.pageY-2)) { rotateX += 2 } 
		else if (cursorPosY > (e.pageY+2)){ rotateX -= 2 };			
	cursorPosX = e.pageX; 
	cursorPosY = e.pageY; 

	document.querySelector('.rubiksCube').style.transform = 
		'rotateX(' + rotateX + 'deg)'+'rotateY(' + rotateY + 'deg)';
}, false);


//positioning
let green  = document.querySelector(".face1green");
let blue   = document.querySelector(".face2blue");
let yellow = document.querySelector(".face3yellow");
let red    = document.querySelector(".face4red");
let white  = document.querySelector(".face5white");
let orange = document.querySelector(".face6orange");
let zG = 200, zB = -200, zY = 200, zR = 200, zW = 200, zO = 200;
let dY = 0, dR = 0, dW = 0, dO = 0;

document.onkeydown = function(e) {
	//movement unit "W" "S", "E" "D", "R" "F", "T" "G", "Y" "H", "U" "J"
	if     (e.keyCode === 87) zG-=10 
	else if(e.keyCode === 83) zG+=10 

	else if(e.keyCode === 69) zB-=10 
	else if(e.keyCode === 68) zB+=10 

	else if(e.keyCode === 82) zY-=10 
	else if(e.keyCode === 70) zY+=10 

	else if(e.keyCode === 84) zR-=10 
	else if(e.keyCode === 71) zR+=10 

	else if(e.keyCode === 89) zW-=10 
	else if(e.keyCode === 72) zW+=10

	else if(e.keyCode === 85) zO-=10 
	else if(e.keyCode === 74) zO+=10

	//rotation unit "4" "V", "5" "B", "6" "N", "7" "M"
	else if(e.keyCode === 52) dY+=5
	else if(e.keyCode === 86) dY-=5

	else if(e.keyCode === 53) dR+=5
	else if(e.keyCode === 66) dR-=5

	else if(e.keyCode === 54) dW+=5
	else if(e.keyCode === 78) dW-=5

	else if(e.keyCode === 55) dO+=5
	else if(e.keyCode === 77) dO-=5

	green.style.cssText  += 'transform: translate3d(0,0,'+zG+'px)';
	blue.style.cssText   += 'transform: translate3d(0,0,'+zB+'px)';
	yellow.style.cssText += 'transform: translate3d(0,0,'+zY+'px)  rotate3d(0,1,0,'+dY+'deg)';
	red.style.cssText    += 'transform: translate3d(0,0,'+zR+'px)  rotate3d(1,0,0,'+dR+'deg)';
	white.style.cssText  += 'transform: translate3d(0,0,'+zW+'px)  rotate3d(0,1,0,'+dW+'deg)';
	orange.style.cssText += 'transform: translate3d(0,0,'+zO+'px)  rotate3d(1,0,0,'+dO+'deg)';

}


