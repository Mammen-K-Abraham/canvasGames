import React from 'react'

    let canva;
	let canvasContext;
	let ballX=50;
	let ballY=50;
	let ballXSpeed=10;
	let ballYSpeed=5;
	let p1Score=0;
	let p2Score=0;
	let paddle1Y=250;
	let paddle2Y=250;
	let winScreen=false;
	let win=0; // 0- Ai wins....1- player wins
	const Paddle_Height=100;
	const Paddle_Size=10;
	const Winner=5;

    function calculateMousePos(evt){
		let rect=canva.getBoundingClientRect();
		let root=document.documentElement;
		let mouseX=evt.clientX - rect.left -root.scrollLeft;
		let mouseY=evt.clientY - rect.top -root.scrollTop;
		return{
			x:mouseX,
			y:mouseY
		};
	}
	
	function handleMouseClick(){
		if(winScreen){
			p1Score=0;
			p2Score=0;
			win=0;
			winScreen=false;
		}
	}
	
	window.onload=function(){
		
		canva=document.getElementById('tennisCanvas');
		canvasContext= canva.getContext('2d');
		let framesPerSecond=30;
		setInterval(function(){
		moveAll();
		drawAll();
	}, 1000/framesPerSecond);
	
	canva.addEventListener('mousedown',handleMouseClick);
	
	canva.addEventListener('mousemove',
		function(evt){
			let mousePos=calculateMousePos(evt);
			paddle1Y=mousePos.y-(Paddle_Height/2);
	});
		
	}
	
	function aIAlayer(){
	
		let paddle2YCenter=paddle2Y+(Paddle_Height/2);
		
		if(paddle2YCenter < ballY-35){
			paddle2Y +=6;
		}else if(paddle2YCenter > ballY+35){
			paddle2Y -=6;
		}
	}
	
	
	function resetBall(){
	
		if(p1Score >= Winner || p2Score >= Winner){
			winScreen=true;
			if(p1Score===Winner)
				win=1;	
			p1Score=0;
			p2Score=0;
		}
		
		ballXSpeed=-ballXSpeed;
		ballX=canva.width/2;
		ballY=canva.height/2;
	}
	
	
	function moveAll(){
	
		if(winScreen){
			return;
		}
	
		aIAlayer();
		
		ballX+=ballXSpeed;
		ballY+=ballYSpeed;
		
		if(ballX<0){
			if(ballY > paddle1Y && 
				ballY < paddle1Y+Paddle_Height){
				ballXSpeed=-ballXSpeed;
				
				var deltaY= ballY -(paddle1Y+Paddle_Height/2);
				ballYSpeed=deltaY * 0.35;
				
			}else{
				p2Score++;
				resetBall();
			}
		}
		
		if(ballX>canva.width){
			if(ballY > paddle2Y && 
				ballY < paddle2Y+Paddle_Height){
				ballXSpeed=-ballXSpeed;
				
				var deltaY= ballY -(paddle2Y+Paddle_Height/2);
				ballYSpeed=deltaY * 0.35;
			}else{
				p1Score++;
				resetBall();
			}
		}
		
		if(ballY<0){
			ballYSpeed =- ballYSpeed;
		}
		
		if(ballY>canva.height){
			ballYSpeed = -ballYSpeed;
		}
		
	}
	
	function drawAll(){
		
		//Background
		colorRect(0,0,canva.width,canva.height,'black');
		
		if(winScreen){
			canvasContext.fillStyle='white';
			canvasContext.fillText("Click to continue : ",400,500);
			if(win === 1){
				canvasContext.fillText("Player wins!!!",400,200);
			}else{canvasContext.fillText("AI Winner",400,200);}
			return;
		}
		
		drawNet();
		//left player paddle
		colorRect(0,paddle1Y,Paddle_Size,Paddle_Height,'white');
		
		//right player paddle
		colorRect(canva.width-Paddle_Size,paddle2Y,Paddle_Size,Paddle_Height,'white');
		
		//Ball
		colorCircle(ballX,ballY,10,'white');
		
		//score
		canvasContext.fillText("score : "+p1Score,100,100);
		canvasContext.fillText("score : "+p2Score,canva.width-100,100);
		
		
	}
	
	function drawNet(){
		for(var i =0;i<canva.height;i+=40){
			colorRect(canva.width/2-1,i,2,20,'white');
		}
	}
	
	function colorCircle(centerX,centerY,radius,drawColor){
		canvasContext.fillStyle=drawColor;
		canvasContext.beginPath();
		canvasContext.arc(centerX,centerY,radius,0,Math.PI*2, true);
		canvasContext.fill();
	}
	
	function colorRect(leftX,topY,width,height,drawColor){
		canvasContext.fillStyle=drawColor;
		canvasContext.fillRect(leftX,topY,width,height);
	}
	

const Tennis = () => {
  return (
    <div className='container'>
        <canvas id="tennisCanvas" width="900" height="700"></canvas>
    </div>
  )
}

export default Tennis