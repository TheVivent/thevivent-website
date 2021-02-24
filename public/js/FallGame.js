
//rysuje strefy zagroĹźenia u gĂłry i na dole
function drawCorners(){

	ctx.fillStyle="red"

	ctx.fillRect(0,0,width,height/hp);
	ctx.fillRect(0,height-height/hp,width,height/hp);

}

//przemieszcza kulkÄ
function drawBall(x,y,r){

	ctx.fillStyle="white";
	ctx.beginPath();
	ctx.arc(lastx,lasty,lastr+0.6,0,2*Math.PI,true);
	ctx.fill();
	ctx.closePath();
	
	ctx.fillStyle="blue";
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI,true);
	ctx.fill();
	ctx.closePath();
	
	lastx=x;
	lasty=y;
	lastr=r;
}

//oblicza fizykÄ piĹeczki w osiach X i Y
function gravity(){
	
	bally+=ballAcceleration;
	ballx+=ballXAcceleration;
	
	if(ballXAcceleration>0) ballXAcceleration-=0.048;
	if(ballXAcceleration<0) ballXAcceleration+=0.048;
	
	drawBall(ballx,bally,r);
	
	
}


//przemieszcza platformy i testuje czy na ktĂłrejĹÄ znajduje siÄ piĹeczka
function platformGravity(){
	
	ballGoDown=true

	platforms.forEach(function (arr, index, item){
		platforms[index].gravity();
		
		if (Math.abs(bally-platforms[index].getHeight())<r &&
			ballx<platforms[index].getX()+platforms[index].getWidth() &&
			ballx>platforms[index].getX()){
			
				!ballGoDown;
				if (ballAcceleration>-1*(platformAcceleration+ballAccelerator+0.1)){
					ballAcceleration=-1*(platformAcceleration+ballAccelerator+0.1);
					jumped=false;
				}
				
				points+=platforms[index].getPoints();
				
				return;
		}
	});
	
	if(ballGoDown){
		ballAcceleration+=ballAccelerator;
	}
}

//tworzy nowe platformy i decyduje kiedy gra jest przegrana
function play(){
	drawCorners();
	
	i++;
	if(i>platformFrequency){
		i=0;
		if (startup){
			platforms[platformNumber]= new platform(width/5*2, width/5, height/20*19);
			startup = false;
		}		
		else {
			quickwidth=Math.random()*100+100	
			platforms[platformNumber]= new platform(Math.random()*(width-quickwidth), quickwidth, height);
		}
		platforms[platformNumber].gravity();
		platformNumber++;
		
		/*platformAcceleration+=0.07
		platformFrequency=100/platformAcceleration;*/
		if(platformNumber>7) platformNumber=0;
	}
	
	if(bally>height-height/hp || bally<0+height/hp){
		
		clearInterval(playing);
		clearInterval(grav);
		clearInterval(platGrav);
		ctx.clearRect(0,0,width,height)
		ctx.fillStyle="red";
		ctx.font="100px Arial Black";
		ctx.fillText("GAME OVER", width/2-330, height/5*3-30);
		running=false;
		
		// document.getElementById("nickname").value=prompt("JeĹli chcesz zapisaÄ swĂłj wynik wpisz tu swĂłj nick :D");
		// if (document.getElementById("nickname").value) document.getElementById("nie_ma_mnie_tu").submit();
		
	}
	
	
}

//obiekt platformy
function platform(plx,plw,plh){
	this.x=plx;
	this.width=plw;
	this.h=plh;
	this.value=0;
	this.color="green"
	
	random=Math.random()*100
	if (random<10) this.value=100;
	else if (random<40) this.value=50;
	else this.value=10;
	
	this.gravity = function (){
		ctx.fillStyle="white";
		ctx.clearRect(this.x-0.5,this.h+1,this.width+1,20)
		
		this.h-=platformAcceleration;
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x,this.h,this.width,20)
		
		if (this.color!="black"){
			ctx.fillStyle="black";
			ctx.font="18px Arial Black"
			if (this.value==100) ctx.fillText(this.value, this.x+(this.width/2)-15, this.h+15)
			else ctx.fillText(this.value, this.x+(this.width/2)-10, this.h+15)
		}
	}
	this.getX = function (){
		return this.x;
	}
	this.getHeight = function () {
		return this.h;
	}
	this.getWidth = function (){
		return this.width;
	}
	this.getPoints = function (){
		if (this.color=="black") return 0;
		else{
			this.color="black";
			return this.value;
		}
	}
}



//Zaawansowany Listener dla wciskania przyciskĂłw
document.addEventListener('keydown', function(event) {
	pressed[event.which] = true;
	if (event.which==32 || event.which==38) event.preventDefault();
});
document.addEventListener('keyup', function(event){
	pressed[event.which] = false;
});


function keyHandler(){
	if(pressed[65] || pressed[37]){
		ballXAcceleration-=ballAccelerator;
		if(ballx<0) ballx=width;
	}
	if(pressed[68] || pressed[39]){
		ballXAcceleration+=ballAccelerator;
		if(ballx>width) ballx=0;
	}
	if(pressed[87] || pressed[38]){
		if (ballAcceleration<0 && !jumped){			
			ballAcceleration+=ballJump;
			jumped=true;
		}
		pressed[87] = false;
		pressed[38] = false;
	}
	if (pressed[32]){
		start();
	}
	
	
	
}

//poczÄtkowe ustawienia
ctx=document.getElementById("blank").getContext("2d");
width=document.getElementById("blank").width;
height=document.getElementById("blank").height;
hp=50;
wp=70;
ballx=width/2;
bally=5*height/hp
r=10;
i=201;
platforms=new Array();
platformNumber=0;
lastx=0;
lasty=0;
lastr=0;
ballAcceleration=0;
ballAccelerator=0.1;
ballXAcceleration=0;
ballXAccelerator=1;
platformAcceleration=1.7;
ballJump=-3;
platformFrequency=60;
pressed = new Array();
jumped=true;
startup=true;
running=false;
points=0;

function start(){

	if (!running){
	
		running=true;
		
		width=document.getElementById("blank").width;
		height=document.getElementById("blank").height;

		ballx=width/2;
		bally=5*height/hp
		platforms=new Array();
		pressed = new Array();
		ballAcceleration=0;
		ballXAcceleration=0;
		ballAccelerator=0.1;
		ballXAccelerator=1;
		platformAcceleration=1.7;
		ctx.clearRect(0,0,width,height);
		
		jumped=true;
		startup=true;
		points=0;
	
		grav=setInterval("gravity()", 10);
		platGrav=setInterval("platformGravity()", 10);
		playing=setInterval("play()", 10);
		
	}
	
}

function pointsWriter(){
	document.getElementById("pktout").innerText=points;
}


setInterval("keyHandler()", 10);
setInterval("pointsWriter()", 500);