Parse.initialize("diakk76G5jwfsXucNjRvR2aY3QzssM2fB23kYt6n", "roUhfgLuwVo6GljjAYuajInYxlSrMLXG9s440HD8");

//Canvas variables
var canvas = document.getElementById("function");
var funWidth = canvas.width;
var funHeight = canvas.height;
var ctx = canvas.getContext("2d");

var maze = document.getElementById("maze");
var ctx2 = maze.getContext("2d");

var scoreboard = document.getElementById("scoreboard");
var ctx3 = scoreboard.getContext("2d");

var WIDTH = 600;			//width of the maze canvas
var HEIGHT = 600;			//height of the maze canvas

var maze_type;			//Variable to determine what maze was picked
var src, last_src= "_";
var xImg = new Image();	//Variable to hold the red x image
xImg.crossOrigin = "anonymous";
xImg.src = "http://i.imgur.com/hfofwvm.png";
var checkImg = new Image();	//Variable to hold the green check mark image
checkImg.crossOrigin = "anonymous";
checkImg.src = "http://i.imgur.com/GAVvh4K.png"; 
var img = new Image();
img.crossOrigin = "anonymous";
var possibleMazes = ["http://i.imgur.com/iNDtyRa.png","http://i.imgur.com/f8vwqPf.png","http://i.imgur.com/vjpv5sd.png","http://i.imgur.com/98TMoVb.png",
					 "http://i.imgur.com/wt0UVkW.png","http://i.imgur.com/LvZ6cfM.png","http://i.imgur.com/qz3LqKu.png","http://i.imgur.com/OQjHiFZ.png",
					 "http://i.imgur.com/JPiXtck.png","http://i.imgur.com/LTcPoOH.png","http://i.imgur.com/vjOfQR7.png","http://i.imgur.com/Scvy9lk.png",
					 "http://i.imgur.com/rD2ke5C.png","http://i.imgur.com/asX1KwO.png","http://i.imgur.com/jmvYGAb.png","http://i.imgur.com/Z33bcKc.png",
					 "http://i.imgur.com/DG8FsKD.png","http://i.imgur.com/EeFX5kz.png","http://i.imgur.com/AbUVgpq.png","http://i.imgur.com/FlvlAiM.png"];


var dx = 50;			//Change in the x postion when an arrow key is pressed
var dy = 50;			//Change in the y postion when an arrow key is pressed
var player_x = 0;		//Players x coordinate
var player_y = 0;		//Players y coordinate
var player_score = 0;   //Players score
var playerColor = "#6b2bab";
var player_Name;

var animationXCoord = 0, animationYCoord = 0; 			//Change in the x, y coordinate for animation when collecting wrong/right answers

var XanswerCoords = [];
var YanswerCoords = [];
var answer1status = 0;
var answer2status = 0;
var answer3status = 0;
var answer4status = 0;

var collision = 0;
var hit_Miss = [0, 0];					//Variable to store the number of times hitting the correct answer and how many times missing the answer
var answer;								//Correct answer to the equation


var possibleAnswers = [1,2,3,4];		//Array to store values generated that could be possible answers to the question
var possAnswer1, possAnswer2, possAnswer3, possAnswer4;			//Variables to store an index for the possible answer array

var difficulty = 0;
var questionDiff; 

//Game variables
var lastQuestionType = -1;
var algebraQuestion = [0, '', '', 0, '=', 0]; //Array that stores the equation.          Note: takes the form Ax +(-) b = c
var wrongAnswer = false;
var rightAnswer = false;
var wrongCount = 0; //Used for penalty when obtaining the wrong answer
var questionCounter = 0; //Used to count how many questions have been answered
var paused = false; //Variable to determine whether the game is paused or not

//Timer variables
var start_time;
var start_time_ms;
var current_time;
var current_time_ms;
var seconds = 0;
var minutes = 0;
var hours = 0;
var previousTimer = 0; //Variable to store the previous value passed to the function scoreboarddisplay

//Variables to maintain fps when using requestAnimationFrame
var fps = 70;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

//Sound variables
var wrongAnswer_Sound = new Audio("../Sounds/WrongAnswer.mp3");
var rightAnswer_Sound = new Audio("../Sounds/RightAnswer.mp3");

//Visualization API declaration
var visHitMiss = new test();


/*
mainMenu(color)
	-fucntion called when a color is chosen from the color choice screen.
	-Makes all the div's needed visible.
	-Color for the player is set based on the code passed in (color 1-12).
	-HitMiss visualization is created and init() is called
*/
function play(color){
	ga('send','event', 'Math Maze', 'colorChoice', color);
	switch(color){
		case 1:
			playerColor = "red";
			break;
		case 2:
			playerColor = "orange";
			break;
		case 3:
			playerColor = "yellow";
			break;
		case 4:
			playerColor = "green";
			break;
		case 5:
			playerColor = "blue";
			break;
		case 6:
			playerColor = "indigo";
			break;
		case 7:
			playerColor = "violet";
			break;
		case 8:
			playerColor = "cyan";
			break;
		case 9:
			playerColor = "chartreuse";
			break;
		case 10:
			playerColor = "magenta";
			break;
		case 11:
			playerColor ="navy";
			break;
		case 12:
			playerColor = "chocolate";
			break;
	}
	var temp = document.getElementById("menuLogo");
	document.getElementById("colorMenu").style.display = "none";
	document.getElementById("MathMazeBackgroundMenu").style.display = "none";
	document.getElementById("MathMazeDiv").style.display = "inline";
	document.getElementById("mazeDiv").style.display = "inline";
	document.getElementById("functionDiv").style.display = "inline";
	document.getElementById("hit_missDiv").style.display = "inline";
	document.getElementById("scoreboardDiv").style.display = "inline";
	document.getElementById("textDiv").style.display = "inline";
	// difficulty = diff;

 	
	visHitMiss.structure("array")
		.location("#hit_missDiv")
		.data(hit_Miss)
		.visualize();
	init();
}
//bookmark

/*
colorChoice(diff)
	-Difficulty is set based on the player's choice (diff).
	-The color choice menu is made visible while the main menu is hidden.
*/
function colorChoice(diff){
	ga('send','event', 'Math Maze', 'diffChoice', diff);
	difficulty = diff;
	document.getElementById("menu").style.display = "none";
	document.getElementById("colorMenu").style.display = "inline";
}
/*
init()
	-Initializes variables
	-Generates an equation for the player to solve
	-Ronadomly chooses a maze to output
	-Requests an animation frame
*/		
function init(){
	questionDiff = 0;
	answer1status = 0;
	answer2status = 0;
	answer3status = 0;
	answer4status = 0;
	XanswerCoords = [];
	YanswerCoords = [];
	
	window.addEventListener('keydown',doKeyDown,true);		//Event listener for key press.
	
	chooseMaze();					//Function to pick a maze
	
	last_src = src;					//Store the last maze (used in chooseMaze)
	img.src = src;
	visHitMiss.attr("index-color", "#484848");
	visHitMiss.attr("text-color", "white");
	visHitMiss.update(hit_Miss);	
		
	draw();
	//requestAnimationFrame(draw);	//Draw the game
}

/*
rect(x,y,w,h)
	-Draws a rectangle based on the passed in variables
	-x & y are the coordinates for the rectangle to be drawn at
	-w & h are the width and heigth of the rectangle desired
*/
function rect(x,y,w,h) {
	ctx2.beginPath();
	ctx2.rect(x,y,w,h);
	ctx2.closePath();
	ctx2.fill();
	ctx2.lineWidth="2";
	ctx2.strokeStyle="white";
	ctx2.rect(x,y,w,h);
	ctx2.stroke();	
}

/*
clear()
	-Clears the a rectangle that is the size of the maze canvas.
	-Draws an image that is the maze at (0,0)
*/
function clear() {
	ctx2.clearRect(0, 0, WIDTH, HEIGHT);
	ctx2.drawImage(img, 0, 0);
}

/*
chooseMaze()
	-Generates a random number between 1 and the number of mazes
	-(currently 20 mazes)
	-The player starts in the middle of each maze.
	-There is a check to make sure no maze happens twice in a row. 
	-The mazes are hosted on imgur.com
	-Mazes were obtained using: 
		-Maze Maker by John Lauro 
		-http://hereandabove.com/maze/mazeorig.form.html
		-About: http://hereandabove.com/maze/maze.about.html
*/
function chooseMaze(){
	var temp = Math.floor(Math.random() * 20) + 1;
	player_x = 260;
	player_y = 210;
	src = possibleMazes[temp];
	maze_type = temp;

	//src = "http://i.imgur.com/iNDtyRa.png"
	while(true){

		src = possibleMazes[temp-1];
		maze_type = temp;
		
		if(src == last_src){		//The new maze is the same as the old maze
			temp = Math.floor(Math.random() * 20) + 1;
		}
		
		else{ break;}				//The same maze wasn't used two times in a row
	}	
}

/*
drawEasyEquation()
	-Draws the generated function to the screen one character at a time.
	-The equation is in its own canvas
	
	NOTE: Not all input variables will be used in every drawing scenario. These were added to allow a single function to draw all questions,
	      regardless of how many things needed drawn to the screen for that specific type of question
*/
function drawEasyEquation(t, t2, questionNum, extraInput1, t3, extraInput2, extraInput3, extraInput4){
	//Clear previous question
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	//Variables used in switch statements below
	var op, op2;
	var start = 0;
	var questNum = questionCounter + 1; //add one to the question counter index which starts at 0.
									
	
	ctx.fillStyle = "white";
	switch(questionNum){
		//Addition, subtraction, multiplication, division
		case 1:
		case 2:
		case 3:
		case 5:
				start = funWidth * 0.25;
				ctx.font = "28px CabinBold";
				op;
				if(questionNum == 1){op = " + " ;}
				else if(questionNum == 2){op = " - " ;}
				else if(questionNum == 3){op = " * " ;}
				else if(questionNum == 5){op = " / ";}
																   
				ctx.fillText(questNum + ".)   " + t + op + t2 + " = " + random_character(), start, 30);
				break;
		//Exponents		
		case 4:	
				//tem = ctx.measureText(questNum.toString()+". "+t.toString());

				start = funWidth * 0.30;
				//First type of exponent question
				if(extraInput1){
					ctx.font = "28px CabinBold";
					ctx.fillText(questNum + ".)   "  + t, start, 30);
					var temp = ctx.measureText(questNum + ".)   "  + t);
					ctx.font = "22px CabinBold";
					ctx.fillText(t2, start + temp.width, 20);
					var temp2 = ctx.measureText(t2);
					ctx.font = "28px CabinBold";
					ctx.fillText(" = " + random_character(), start + temp2.width + temp.width, 30);
				}
				
				else{
					ctx.font = "28px CabinBold";
					ctx.fillText(questNum + ".)   " + t, start, 30);
					var temp = ctx.measureText(questNum + ".)   "  + t);
					ctx.font = "22px CabinBold";
					var temp2 = random_character();
					ctx.fillText(temp2, start + temp.width, 20);
					temp2 = ctx.measureText(temp2);
					ctx.font = "28px CabinBold";
					ctx.fillText(" = " + t2, start + temp2.width+temp.width, 30);
				}
		
				break;
		//Least common multiple		
		case 6: 
				start = funWidth * 0.025;
				ctx.font = "22px CabinBold";				
				ctx.fillText(questNum + ".) " + "Find the least common multiple of " + t + " and " + t2, start, 30);
				break;
		//Simple two step equation
		case 7: 
				start = funWidth * 0.30;
				ctx.font = "28px CabinBold";
				
				
				if(extraInput2 == 1){
					ctx.fillText(questNum + ".)   " + t + random_character() + " + " + t2 + " = " + t3, start, 30);
				}
				else{
					ctx.fillText(questNum + ".)   " + t + random_character() + " - " + t2 + " = " + t3, start, 30);
				}
				break;		
		//Greatest common divisor/factor
		case 8:	
				start = funWidth * 0.015;
				ctx.font = "22px CabinBold";
				ctx.fillText(questNum + ".) " + "Find the greatest common factor of " + t + " and " + t2, start, 30);
				break;
		//Variables on both sides of equation
		case 9:	
				start = funWidth * 0.25;
				ctx.font = "28px CabinBold";

				if(extraInput1 == 1) op = " + "; 
				else op = " - ";
				if(extraInput3 == 1) op2 = " + ";
				else op2 = " - ";
				
				ctx.fillText(questNum + ".)   " + t + t2 + op + t3 + " = " + extraInput2 + op2 + extraInput4 + t2, start, 30);
				break;
	}	
}

/*
drawAnswers()
	-Converts all the possible answers into strings to be printed.
	-If any of the answers have already been collected 
*/
function drawAnswers(){		
	//Set the font/size
	ctx2.font = "bold 12px Lucida Console";
	ctx2.fillStyle = "white";
	var temp1 = possibleAnswers[0].toString(),
		temp2 = possibleAnswers[1].toString(),
		temp3 = possibleAnswers[2].toString(),
		temp4 = possibleAnswers[3].toString();
	var tempX = 0;
	var tempY = 0;
	if(answer1status == 1){
		ctx2.fillText(temp1, 600, 600);			//If the answer has been collected and is incorrect the answer will be printed off screen					
	}
	else{										//Determines the length then set the coordinates(tempX, tempY) accordingly
		if(temp1.length == 1){
			tempX = XanswerCoords[possAnswer1-1] + 23;
			tempY = YanswerCoords[possAnswer1-1] + 30;
			ctx2.fillText(temp1, tempX, tempY);
		}
		else if(temp1.length == 2){
			tempX = XanswerCoords[possAnswer1-1] + 15;
			tempY = YanswerCoords[possAnswer1-1] + 30;
			ctx2.fillText(temp1, tempX, tempY);
		}
		else{
			tempX = XanswerCoords[possAnswer1-1] + 10;
			tempY = YanswerCoords[possAnswer1-1] + 30;
			ctx2.fillText(temp1, tempX, tempY);
		}
	}

	if(answer2status == 1){
		ctx2.fillText(temp2, 600, 600);			//If the answer has been collected and is incorrect the answer will be printed off screen
	}
	else{										//Determines the length then set the coordinates(tempX, tempY) accordingly
		if(temp2.length == 1){
			tempX = XanswerCoords[possAnswer2-1] + 23;
			tempY = YanswerCoords[possAnswer2-1] + 30;
			ctx2.fillText(temp2, tempX, tempY);
		}
		else if(temp2.length == 2){
			tempX = XanswerCoords[possAnswer2-1] + 15;
			tempY = YanswerCoords[possAnswer2-1] + 30;
			ctx2.fillText(temp2, tempX, tempY);
		}
		else{
			tempX = XanswerCoords[possAnswer2-1] + 10;
			tempY = YanswerCoords[possAnswer2-1] + 30;
			ctx2.fillText(temp2, tempX, tempY);
		}
	}

	if(answer3status == 1){
		ctx2.fillText(temp3, 600, 600);			//If the answer has been collected and is incorrect the answer will be printed off screen
	}
	else{										//Determines the length then set the coordinates(tempX, tempY) accordingly
		if(temp3.length == 1){
			tempX = XanswerCoords[possAnswer3-1] + 23;
			tempY = YanswerCoords[possAnswer3-1] + 30;
			ctx2.fillText(temp3, tempX, tempY);
		}
		else if(temp3.length == 2){
			tempX = XanswerCoords[possAnswer3-1] + 15;
			tempY = YanswerCoords[possAnswer3-1] + 30;
			ctx2.fillText(temp3, tempX, tempY);
		}
		else{
			tempX = XanswerCoords[possAnswer3-1] + 10;
			tempY = YanswerCoords[possAnswer3-1] + 30;
			ctx2.fillText(temp3, tempX, tempY);
		}
	}

	if(answer4status == 1){
		ctx2.fillText(temp4, 600, 600);			//If the answer has been collected and is incorrect the answer will be printed off screen
	}
	else{										//Determines the length then set the coordinates(tempX, tempY) accordingly
		if(temp4.length == 1){
			tempX = XanswerCoords[possAnswer4-1] + 23;
			tempY = YanswerCoords[possAnswer4-1] + 30;
			ctx2.fillText(temp4, tempX, tempY);
		}
		else if(temp4.length == 2){
			tempX = XanswerCoords[possAnswer4-1] + 15;
			tempY = YanswerCoords[possAnswer4-1] + 30;
			ctx2.fillText(temp4, tempX, tempY);
		}
		else{
			tempX = XanswerCoords[possAnswer4-1] + 10;
			tempY = YanswerCoords[possAnswer4-1] + 30;
			ctx2.fillText(temp4, tempX, tempY);
		}
	}
}

function drawCheckOrX(Img, x, y){
	ctx2.beginPath();
	ctx2.drawImage(Img, x, y, 20, 20);
	ctx2.closePath();
}

/*
draw()
	-When the maze image loads, a function is called that finds all the possible answer spots in the maze.
	-Then a function is called to get 4 random spots from the array that was created.
	-Then draws the player square and the answers on the maze.
	-Also the visualization of the Hit and Miss counter is created.
*/
function draw(){
	     
    now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
				
        then = now - (delta % interval);
         
        ctx3.clearRect(0,0,scoreboard.width, scoreboard.height);
		current_time = new Date();
		current_time_ms = current_time.getTime();
		img.onload = function(){
			var x = 0;
			var y = 0;
			var count = 0;
			wrongCount = 0;
			start_time = new Date();
			start_time_ms = start_time.getTime();

			seconds = 0;
			minutes = 0;
			hours = 0;
			ctx2.drawImage(img, 0 , 0);
			for(y =0; y <= 504; y += 50){
				for(x = 0; x <= 504; x += 50){
					if(x !== 250 && y !== 200){
						var imgData = ctx2.getImageData(x, y, 55, 55);
						
						for (var i = 0; n = imgData.data.length, i < n; i += 4) {
							if (imgData.data[i] == 255) {
								// console.log(i, imgData.data[i]);
								// console.log(count);
								count++;
							}	
					    }

					    if(count >= 775){
					    	XanswerCoords.push(x);
					    	YanswerCoords.push(y);
						}
						count =0;
					}
				}
			}
			generateQuestion();				//Function to generate the algebraic question/find the solution using the library algebra.js
			find_Possible_Answers_Coordinates();
		};

		//Makes sure the clock/score aren't updated when the game is "paused"
		if(!paused){
			scoreboarddisplay(current_time - start_time);
		}
		
		else{
			//previousTimer holds the value of the parameter from the last time scoreboarddisplay was called
			scoreboarddisplay(previousTimer);
		}

		clear();
		ctx2.fillStyle = playerColor;
		rect(player_x, player_y, 35,35);	
		//Create a new equation if the user has answered

		ctx2.fillStyle = "black";
		drawAnswers();
		
		//Wrong answer was picked -> run animation
		if(wrongAnswer){
			drawCheckOrX(xImg, animationXCoord, animationYCoord);
			animationYCoord -= 1;
		}
		
		//Right answer was picked -> run animation
		if(rightAnswer){
			drawCheckOrX(checkImg, animationXCoord, animationYCoord);
			animationYCoord -= 1;
		}
    }
	
	requestAnimationFrame(draw);
}

/*
doKeyDown(evt)
	-evt is passed in when the event listener calls this function.
	-evt is a number that represents the key code of the key that was pressed.
	-If the key code is 37-40 the players move is analyzed.
	-checkcollision and checkForAnswer are called in this function.
*/
function doKeyDown(evt){
	switch (evt.keyCode) {
		case 37:  /* Left arrow was pressed */
			checkcollision(1);
			clear();
			if (collision == 1){
				collision = 0;
			}
			else{
				player_x -= dx;
				checkForAnswer();
			}
		break;
		case 38:  /* Up arrow was pressed */
			clear();
			checkcollision(2);
			if (collision == 1){
				collision = 0;
			}
			else{
				player_y -= dy;
				checkForAnswer();
			}
		break;
		case 39:  /* Right arrow was pressed */
			clear();
			checkcollision(3);
			if (collision == 1){
				collision = 0;
			}
			else{
				player_x += dx;
				checkForAnswer();
			}
		break;
		case 40:  /* Down arrow was pressed */
			clear();
			checkcollision(4);
			if (collision == 1){
				collision = 0;
			}
			else{
				player_y += dy;
				checkForAnswer();
			}
		break;
	}
}

/*
checkcollision()
	-direction is an number 1-4 that represents the directiion that the player has chosen to move.
	-1=left
	-2=up
	-3=right
	-4=down
	-The image data of a single pixel is returned based on the direction.
	-The player's coordinates are used to give the coordinates for the getImageData function.
	-The color value of the single pixel is either black(0,0,0) or white(255,255,255).
	-The red value is used to determine color.
	-If the pixel is black there is a collision with the wall and 'collision' is set to 1.

*/
function checkcollision(direction) {
	var imgData;
	var tempX = 0;
	var tempY = 0;

	if(direction == 1){
		tempX = player_x - 7;
		tempY = player_y;
		imgData = ctx2.getImageData(tempX, tempY, 1, 1);
	}
	else if(direction == 2){
		tempX = player_x;
		tempY = player_y-7;
		imgData = ctx2.getImageData(tempX, tempY, 1, 1);
	}
	else if(direction == 3){
		tempX = player_x + 42;
		tempY = player_y;
		imgData = ctx2.getImageData(tempX, tempY, 1, 1);
	}
	else if(direction == 4){
		tempX = player_x;
		tempY = player_y + 42;
		imgData = ctx2.getImageData(tempX, tempY, 1, 1);
	}

	if(imgData.data[0] == 255){
		collision = 1;
	}
}

/*
checkForAnswer()
	-This function determines if the player is in a position that an answer is. 
	-First checks if the answer has been retrieved or not.
	-Then compares the player's coordinates with each of the answer's coordinates.
	-Checks to see if the answer is correct.
	-player_score, hit_Miss[], and answerStatus are updated for each answer based on the outcome.
*/
function checkForAnswer(){
	var temp1 = possibleAnswers[0].toString(),
		temp2 = possibleAnswers[1].toString(),
		temp3 = possibleAnswers[2].toString(),
		temp4 = possibleAnswers[3].toString();				
	
	//Set the coordinates for the animation to start at
	//Checking !wrongAnswer prevents the animation moving with player on a wrong answer
	if(!wrongAnswer){
		animationYCoord = player_y;
		animationXCoord = player_x;
	}

	if(answer1status == 0){
		if(player_x == (XanswerCoords[possAnswer1-1] + 10) && player_y == (YanswerCoords[possAnswer1-1] + 10)){
			if(answer == temp1){
				questionCounter++;
				correctAns(1);
			}
			else{
				wrongAns(1);
			}
		}
	}

	if(answer2status == 0){
		if(player_x == (XanswerCoords[possAnswer2-1] + 10) && player_y == (YanswerCoords[possAnswer2-1] + 10 )){
			if(answer == temp2){
				questionCounter++;
				correctAns(2);
			}
			else{
				wrongAns(2);
			}
		}
	}

	if(answer3status == 0){
		if(player_x == (XanswerCoords[possAnswer3-1] +10) && player_y == (YanswerCoords[possAnswer3-1] + 10)){
			if(answer == temp3){
				questionCounter++;
				correctAns(3);
			}
			else{
				wrongAns(3);
			}
		}
	}

	if(answer4status == 0){
		if(player_x == (XanswerCoords[possAnswer4-1] + 10) && player_y == (YanswerCoords[possAnswer4-1] + 10)){
			if(answer == temp4){
				questionCounter++;
				correctAns(4);
			}
			else{
				wrongAns(4);
			}
		}
	}
	visHitMiss.update(hit_Miss);
}

/*
correctAnswer(ans)
	-Updates the answer status variables
	-Starts the animation for a correct answer
	-Updates the players score based on the time it took to complete
	-Starts and stops the hit_Miss visualization
*/
function correctAns(ans){
	var time = current_time_ms - start_time_ms;
	ga('send','event', 'Math Maze', 'mazeCompleteTime', time, questionCounter);
	switch(ans){
		case 1:
			answer1status = 1;
			break;
		case 2:
			answer2status = 1;
			break;
		case 3:
			answer3status = 1;
			break;
		case 4:
			answer4status = 1;
			break;
	}

	//Setting this starts the animation (done in draw())
	rightAnswer = true;
	rightAnswer_Sound.pause();
	rightAnswer_Sound.currentTime = 0;
	rightAnswer_Sound.play();
	wrongAnswer = false; //to stop the wrong answer animation if it is still in progress

	//Update Score and hit_Miss
	ctx3.clearRect(0,0,scoreboard.width,scoreboard.height);
	player_score += points(start_time, current_time_ms);
	hit_Miss[0] += 1;
	visHitMiss.attr("index-color", "green", 0);

	//Disables the players movement
	window.removeEventListener('keydown',doKeyDown,true);

	//Stops visualization
	setTimeout(function() {
		rightAnswer = false;
		visHitMiss.attr("index-color", "#484848", 0);
		visHitMiss.update(hit_Miss);
		//Player has reached the end of the game
		if(questionCounter == 15){
			time = Date.now();
			time = time - start_time_ms;
			ga('send','event', 'Math Maze', 'gameCompleteTime', time);
			paused = true;
			refreshHighScores();
			checkHighScore();
			//loadEndMenu();
		}
		
		if(!paused){ 
			init();
		}
		/*
		else
			clearScreen();
		*/
	}, 1000);
}
/*
wrongAnswer(ans)
	-Updates the answer status variables
	-Starts the animation for a wrong answer
	-Starts and stops the hit_Miss visualization
*/
function wrongAns(ans){
	switch(ans){
		case 1:
			answer1status = 1;
			break;
		case 2:
			answer2status = 1;
			break;
		case 3:
			answer3status = 1;
			break;
		case 4:
			answer4status = 1;
			break;
	}

	//Update hit_Miss visualization
	hit_Miss[1] +=1;
	visHitMiss.attr("index-color", "red", 1);

	//Setting this starts the animation (done in draw())
	wrongAnswer = true;
	wrongAnswer_Sound.pause();
	wrongAnswer_Sound.currentTime = 0;
	wrongAnswer_Sound.play();
	wrongCount += 1;
	//Ends visualization
	setTimeout(function(){
		visHitMiss.attr("index-color", "#484848", 1);
		visHitMiss.update(hit_Miss);
		wrongAnswer = false;		//"end" the animation
	}, 1500);
}

/*
find_Possible_Answers_coordinates()
	-This function generates a random number based on the number of possible answer locations.
	-It will continue to generate random numbers until there are 4 different answer locations.
*/
function find_Possible_Answers_Coordinates(){
	possAnswer1 = Math.floor(Math.random() * XanswerCoords.length) + 1;
	possAnswer2 = Math.floor(Math.random() * XanswerCoords.length) + 1;
	possAnswer3 = Math.floor(Math.random() * XanswerCoords.length) + 1;
	possAnswer4 = Math.floor(Math.random() * XanswerCoords.length) + 1;
	
	//While loops will run until all four indices are different
	while(possAnswer2 == possAnswer1){
		possAnswer2 = Math.floor(Math.random() * XanswerCoords.length) + 1;
	}

	while(possAnswer3 == possAnswer1 || possAnswer3 == possAnswer2){
		possAnswer3 = Math.floor(Math.random() * XanswerCoords.length) + 1;
	}

	while(possAnswer4 == possAnswer1 || possAnswer4 == possAnswer2 || possAnswer4 == possAnswer3){
		possAnswer4 = Math.floor(Math.random() * XanswerCoords.length) + 1;
	}
}

/*
solve()
	-This function solves the math question based on the generated content.
*/
function solve(coeff, op, const2, const3){
	var tempAns = 0;
	//Subtraction must occur because operator == '+'
	if(op == 1){
		tempAns = const3 - const2;
		tempAns = tempAns / coeff;
		return tempAns;
	}
	
	tempAns = const3 + const2;
	tempAns = tempAns / coeff;
	return tempAns;
}

/*
generateQuestion()
	-Generates a mathematical question to solve.
	-The question generated is based on the difficulty level chosen by the player.
	-difficulty = 0 all questions are possible.(easy, moderate, and hard)
	-difficulty = 1 easy questions only (addition, subtration, and gcf)
	-difficulty = 2 moderate questions only (multiplication, division, and solving for a variable)
	-difficulty = 3 hard questions only (lcm, exponents, and two sided equations)
	-each difficulty has an array (possQuestions[])
		-stores the questionNum for the corresponding difficulty
*/
function generateQuestion(){
	//Nine different types of questions
		var questionNum = getRandomInt(1,9);
		if(difficulty == 0){
			while(questionNum == lastQuestionType){
				questionNum = getRandomInt(1,9);
			}
		}
		else if(difficulty == 1){
			var possQuestions = [1,2,8];
			var temp = getRandomInt(0,2);
			questionNum = possQuestions[temp];

		}
		else if(difficulty == 2){
			var possQuestions = [3,5,7];
			var temp = getRandomInt(0,2);
			questionNum = possQuestions[temp];
		}
		else if(difficulty == 3){
			var possQuestions = [4,6,9];
			var temp = getRandomInt(0,2);
			questionNum = possQuestions[temp];
		}
		
		lastQuestionType = questionNum;
		
		//Variables used below in switch statements
		var t, t2, t3, expoType, easyQuestionAns, coeff, const2, variable, operator, operator2, rightHandCoeff, rightHandSide;
		switch(questionNum){			
			//Addition
			case 1:	
					t = Math.floor(Math.random() * 500) + 1;
					t2 = Math.floor(Math.random() * 500) + 1;
					answer = t + t2;
					//Draw the question
					drawEasyEquation(t, t2, questionNum);
					break;
			//Subtraction
			case 2:	
					t = Math.floor(Math.random() * 500) + 1;
					t2 = Math.floor(Math.random() * 500) + 1;			
					if(t >= t2){ answer = t - t2; 
						drawEasyEquation(t, t2, questionNum);
					}
					else{ answer = t2 - t; 
						drawEasyEquation(t2, t, questionNum);
					}
					break;
			//Multiplication
			case 3: 
					t = Math.floor(Math.random() * 19) + 1;
					t2 = Math.floor(Math.random() * 52) + 1;
					answer = t * t2; 
					//Draw the question
					drawEasyEquation(t, t2, questionNum);
					break;
			//Exponents
			case 4: 
					expoType = getRandomInt(0,1);
					//Find the answer
					if(expoType == 1){
						t = getRandomInt(2, 9);	//Base number
						t2 = Math.floor(Math.random() * 4) + 1; //Exponent
						answer = 1;
						for(var i = 0; i < t2; ++i){
							answer = answer * t;
						}
					//Draw the question
					drawEasyEquation(t, t2, questionNum, 1);
					}
					//Find the exponent variable that solves the problem
					else{
						t = getRandomInt(2,9);	//Base number
						t2 = Math.floor(Math.random() * 4) + 1; //Exponent
						answer = t2;
						easyQuestionAns = 1;
						for(var i = 0; i < t2; ++i){
							easyQuestionAns = easyQuestionAns * t;
						}
					drawEasyEquation(t, easyQuestionAns, questionNum, 0);
					}
					break;
			//Division
			case 5: 
					t = Math.floor(Math.random() * 500) + 1;
					t2 = Math.floor(Math.random() * 500) + 1;
					while(t%t2 != 0 || t==t2 || t2 == 1){
						t = Math.floor(Math.random() * 500) + 1;
						t2 = Math.floor(Math.random() * 500) + 1;
					}
					answer = t / t2;					
					drawEasyEquation(t, t2, questionNum);
					break;
			//Find the least common multiple
			case 6: 
					t = getRandomInt(1,25);
					t2 = getRandomInt(1,25);
					//Find the LCM
					answer = lcm(t, t2);
					drawEasyEquation(t, t2, questionNum);
					break;
			//Simple two step equation
			case 7: 
					coeff = Math.floor(Math.random() * 9) + 1;
					variable = random_character();
					const2 = getRandomInt(1,20);
					operator = getRandomInt(0,1);
				    rightHandSide = getRandomInt(1,25);
					//If operator == 1 => addition
					if(operator == 1){
						while((rightHandSide - const2) % coeff != 0){
							const2 = getRandomInt(1,20);
							rightHandSide = getRandomInt(1,25);
						}
					}
					//Operator == 0 => subtraction
					else{
						while((rightHandSide + const2) % coeff != 0){
							rightHandSide = getRandomInt(1,25);
							const2 = getRandomInt(1,20);
						}
					}
					
					answer = solve(coeff, operator, const2, rightHandSide);
					
					drawEasyEquation(coeff, const2, questionNum, 1,rightHandSide, operator);
					break;
			//Find the greatest common divisor/factor of two integers
			case 8: 
					answer=1;
					while(answer == 1){
						t = getRandomInt(1,250);
						t2 = getRandomInt(1,250);
						answer = gcd(t,t2);
					}
					drawEasyEquation(t, t2, questionNum);
					break;
			//Algebraic question with variables on both sides
			case 9: 
					coeff = getRandomInt(2,15);
					variable = random_character();
					const2 = getRandomInt(1,50);
					operator = getRandomInt(0,1); //Operator on left hand side
					operator2 = getRandomInt(0,1); //Operator on right hand side
				    rightHandSide = getRandomInt(1,50);
					rightHandCoeff = getRandomInt(1,15);
					//operator2 = operator = 1;
					//Right hand side has '+' operator
					if(operator2 == 1){
						//Left hand side has '+' operator
						if(operator == 1){
							while(rightHandCoeff >= coeff){
								rightHandCoeff = getRandomInt(1,15);
							}
							
							while((rightHandSide - const2) % (coeff - rightHandCoeff) != 0){
								const2 = getRandomInt(1,50);
								rightHandSide = getRandomInt(1,50);
							}
							answer = solve(coeff-rightHandCoeff, operator, const2, rightHandSide);
						}
						//Left hand side has '-' operator
						else{
							while(rightHandCoeff >= coeff){
								rightHandCoeff = getRandomInt(1,15);
							}
							
							while((rightHandSide + const2) % (coeff - rightHandCoeff) != 0){
								const2 = getRandomInt(1,50);
								rightHandSide = getRandomInt(1,50);
							}	
							answer = solve(coeff-rightHandCoeff, operator, const2, rightHandSide);
						}	
					}	
					//Right hand side has '-' operator
					else{
						//Left hand side has '+' operator
						if(operator == 1){
							while((rightHandSide - const2) % (coeff + rightHandCoeff) != 0){
								const2 = getRandomInt(1,50);
								rightHandSide = getRandomInt(1,50);
							}
							
							answer = solve(coeff+rightHandCoeff, operator, const2, rightHandSide);							
						}
						
						//Left hand side has '-' operator
						else{
							while((rightHandSide + const2) % (coeff + rightHandCoeff) != 0){
								const2 = getRandomInt(1,50);
								rightHandSide = getRandomInt(1,50);
							}
							answer = solve(coeff+rightHandCoeff, operator, const2, rightHandSide);
						}
					}
					
	drawEasyEquation(coeff, variable, questionNum, operator, const2, rightHandSide, operator2, rightHandCoeff);
	}
	possibleAnswers[0] = answer;
	fillWrongAnswers();								//This function will fill the possibleAnswers array with random numbers
}

function lcm(a, b){
	return (!a || !b) ? 0 : Math.abs((a * b) / gcd(a,b));
}

function gcd(a, b){
	a = Math.abs(a);
	b = Math.abs(b);
	while(b){
		var temp = b;
		b = a % b;
		a = temp;
	}
	return a;
}

/*
fillWrongAnswers()
	-Fills possibleAnswers[] with incorrect answers.
*/
function fillWrongAnswers(){
	//Local variable to contain the incorrect answers generated in this function
	var ans;
	do{
		//Case where the answer is negative
		if(possibleAnswers[0] < 0){
			
			//Generate the first wrong answer
			ans = getRandomInt(1, 20);
			possibleAnswers[1] = (ans + answer)*-1;
			
			//Generate second wrong answer
			var temp = possibleAnswers[0].toString();
			temp = temp.length;
					
			if(temp == 2){
				ans = getRandomInt(1, 10);
			}
		
			else if(temp == 3){
				ans = getRandomInt(10, 50);
			}
			
			ans *= -1;
				
			possibleAnswers[2] = ans;
			
			//Get third wrong answer
			ans = getRandomInt(1, 10);
			possibleAnswers[3] = (ans + answer) * -1;
			
		}
		
		//Answer is positive
		else{
			//This one is based on how many digits the real answer has
			var temp = possibleAnswers[0].toString();
			temp = temp.length;
		
			if(temp == 1){
				ans = getRandomInt(1,9);
				possibleAnswers[1] = ans;

				ans = getRandomInt(1,9);
				possibleAnswers[2] = ans;

				ans = getRandomInt(1, 9);
				possibleAnswers[3] = ans;
			}
		
			else if(temp == 2){
				ans = getRandomInt(1, 5);
				possibleAnswers[1] = (ans*10) + answer;

				ans = getRandomInt(10, 99);
				possibleAnswers[2] = ans;

				ans = getRandomInt(1, 25);
				possibleAnswers[3] = ans + answer;
			}
		
			else if(temp == 3){
				ans = getRandomInt(1, 5);
				possibleAnswers[1] = (ans*10) + answer;

				ans = getRandomInt(100, 500);
				possibleAnswers[2] = ans;

				ans = getRandomInt(1, 5);
				possibleAnswers[3] = (ans*10) + answer;
			}
		}
	}while(possibleAnswers[1] == possibleAnswers[0] || possibleAnswers[2] == possibleAnswers[0] || possibleAnswers[3] == possibleAnswers[0]
		 || possibleAnswers[1] == possibleAnswers[2] || possibleAnswers[1] == possibleAnswers[3] || possibleAnswers[2] == possibleAnswers[3]);
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
scoreboarddisplay(timer)
	-Outputs time in  y mins, z secs format as well as displays possible amount of points and difficulty

 */
function scoreboarddisplay(timer){
	previousTimer = timer;

	var sec = Math.floor(timer /1000);
	seconds = sec%60;
	minutes = Math.floor(sec/60);
	hours = Math.floor(sec/3600);
	var level;
	//bookmark
	if(lastQuestionType == 1 || lastQuestionType == 2 || lastQuestionType == 8){
		level = "Easy";
	}
	else if(lastQuestionType == 3 || lastQuestionType == 5 || lastQuestionType == 7){
		level = "Moderate";
	}
	else if(lastQuestionType == 4 || lastQuestionType == 6 || lastQuestionType == 9){
		level = "Hard";
	}
	ctx3.font="40px CabinBold";
	ctx3.fillStyle = "white";
	ctx3.fillText("Score: " + player_score ,0, 30);
	ctx3.fillText("Timer: " + minutes + " mins " + seconds +" secs	",0, 65);
	ctx3.fillText("Level: "+ level, 0, 100);
	ctx3.fillText("Max points: " + points(start_time_ms, current_time_ms), 0, 135);

}

/*
points(start, elapsed)
	-Function that returns the points you've earned depending on how fast you solved the equation and what difficulty it is
 */
function points(start, elapsed){
	var basepoints;
	if(lastQuestionType == 1 || lastQuestionType == 2 || lastQuestionType == 8) {
		basepoints = 100/(Math.pow(2,wrongCount));
		if (elapsed - start <= 30000) {
			return Math.floor(basepoints * 1.5);
		}
		else if (elapsed - start <= 60000) {
			return Math.floor(basepoints * 1.25);
		}
		else return Math.floor(basepoints);
	}
	else if(lastQuestionType == 3 || lastQuestionType == 5 || lastQuestionType == 7){
		basepoints = 200/(Math.pow(2,wrongCount));
		if (elapsed - start <= 30000) {
			return Math.floor(basepoints * 1.5);
		}
		else if (elapsed - start <= 60000) {
			return Math.floor(basepoints * 1.25);
		}
		else return Math.floor(basepoints);

	}
	else if(lastQuestionType == 4 || lastQuestionType == 6 || lastQuestionType == 9){
		basepoints = 300/(Math.pow(2,wrongCount));
		if (elapsed - start <= 30000) {
			return Math.floor(basepoints * 1.5);
		}
		else if (elapsed - start <= 60000) {
			return Math.floor(basepoints * 1.25);
		}
		else return Math.floor(basepoints);

	}
}

/*
random_character()
	-Function that will generate a random variable from the alphabet for the equation
*/
function random_character() {
    var chars = "abcdefghijkmnpqurstuvwxyzABCDEFGHJKLMNPURSTUVWXYZ";
    return chars.substr( Math.floor(Math.random() * 47), 1);
}

/*
 newGame()
	-Function to reset variables and restart the game
*/
function newGame(){
	//clear all user interface elements
	$(".mm").fadeOut(600);
	document.getElementById("MathMazeNameInput").style.display = "none";
	document.getElementById("MathMazeSubmitHighScore").style.display = "none";
	document.getElementById("EndGameScores").style.display = "none";
	document.getElementById("HighScoreTitle").style.display = "none";
	document.getElementById("NewScore").style.display = "none";
	document.getElementById("maze").style.display = "inline";
	document.getElementById("functionDiv").style.display = "inline";
	document.getElementById("scoreboardDiv").style.display = "inline";
	document.getElementById("hit_missDiv").style.display = "inline";

	document.getElementById("MathMazeNameInput").placeholder = "Enter Name";
	player_name = "";
    var temp = document.getElementsByClassName("mm");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
	
	//Reset the hit/miss array
    hit_Miss[0] = hit_Miss[1] = 0;
	
	//Reset the players score
	player_score = 0;
	
	//Reset question counter
	questionCounter = 0;
	
	//Unpause the game
	paused = false;
	
    //Start the game
    init();
}


/*
 loadEndMenu()
	-Function that will load the end of game menu to the screen
*/
function loadEndMenu(){
	document.getElementById("EndGameScores").style.display = "inline";
	document.getElementById("functionDiv").style.display = "none";
	document.getElementById("hit_missDiv").style.display = "none";
	document.getElementById("scoreboardDiv").style.display = "none";
	document.getElementById("maze").style.display = "none";
	document.getElementById("HighScoreTitle").style.display = "none";
	document.getElementById("MathMazeSubmitHighScore").style.display = "none";
	document.getElementById("MathMazeNameInput").style.display = "none";
	document.getElementById("NewScore").style.display = "none";


    //load all relevant user interface elements
    temp = document.getElementsByClassName("endGame");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	//setTimeout(refreshHighScores, 2500);
}
/* 
 loadNewHighScoreScreen()
*/
function loadNewHighScoreScreen(){
	document.getElementById("EndGameScores").style.display = "inline";
	document.getElementById("functionDiv").style.display = "none";
	document.getElementById("hit_missDiv").style.display = "none";
	document.getElementById("scoreboardDiv").style.display = "none";
	document.getElementById("maze").style.display = "none";

	document.getElementById("HighScoreTitle").style.display = "inline";
	document.getElementById("MathMazeSubmitHighScore").style.display = "inline";
	document.getElementById("MathMazeNameInput").style.display = "inline";

	document.getElementById("NewScore").style.display = "inline";
	document.getElementById("NewScore").innerHTML = player_score + "pts";
	//load all relevant user interface elements
    temp = document.getElementsByClassName("endGame");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
}
/*
refresh()
	-Function to reload the math maze HTML file
*/
function refresh(){
	window.location.href = "mathMaze.html";
}

/*
clearScreen()
	-Function to remove math question/maze when game has "ended"
	-Note: Maze is not removed as of now because draw continues to be called => maze keeps being redrawn
*/
function clearScreen(){
	ctx2.clearRect(0, 0, WIDTH, HEIGHT);
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

/*
******High Score Functions*********
*/
function checkHighScore(){
    // var Score = Parse.Object.extend("MMScore");
    var Score;
    var query; 

    switch(difficulty){
    	case 0:
    		Score = Parse.Object.extend("All");
    		query = new Parse.Query(Score);
			break;
    	case 1:
    		Score = Parse.Object.extend("Easy");
    		query = new Parse.Query(Score);	
    		break;
    	case 2:
    		Score = Parse.Object.extend("Moderate");
    		query = new Parse.Query(Score);
    		break;
    	case 3:
    		Score = Parse.Object.extend("Hard");
    		query = new Parse.Query(Score);	
    		break;
    }

    query.lessThan("Score", player_score);
    query.count({
      success: function(count) {
    	if(count > 0){
            ga('send', 'event', 'Math Maze', 'highScore', 'achieved');
    		loadNewHighScoreScreen();
    	}
    	else{
    		loadEndMenu();
    	}
      },
      error: function(error) {
        alert("Error retrieving high scores");
    	loadEndMenu();
      }
    });	
	
}


function addNewHighScore(){
    ga('send', 'event', 'Math Maze', 'highScore', 'submitted', difficulty);
	player_Name = document.getElementById("MathMazeNameInput").value;
	deleteLowScore();
	pushNewHighScore();
	refreshHighScores();
	loadEndMenu();
}

function deleteLowScore(){
	var Score;
    var query;

    switch(difficulty){
    	case 0:
    		Score = Parse.Object.extend("All");
    		query = new Parse.Query(Score);
    		break;
    	case 1:
    		Score = Parse.Object.extend("Easy");
    		query = new Parse.Query(Score);
    		break;
    	case 2:
    		Score = Parse.Object.extend("Moderate");
    		query = new Parse.Query(Score);
    		break;
    	case 3:
    		Score = Parse.Object.extend("Hard");
    		query = new Parse.Query(Score);
    		break;
    }

	query.ascending("Score");
	query.first({
		success: function(object) {
			object.destroy({
				success: function(myObject) {
					console.log('Object deleted from cloud');
				},
				error: function(myObject, error) {
					alert("object not deleted from cloud");
				}
			});	
		},
		error: function(error) {
			alert("Error retrieving high scores");
		}
	});
}

function pushNewHighScore(){
	var Score;
	var score;

	switch(difficulty){
    	case 0:
    		Score = Parse.Object.extend("All");
    		score = new Score();
    		break;
    	case 1:
    		Score = Parse.Object.extend("Easy");
    		score = new Score();
    		break;
    	case 2:
    		Score = Parse.Object.extend("Moderate");
    		score = new Score();
    		break;
    	case 3:
    		Score = Parse.Object.extend("Hard");
    		score = new Score();
    		break;
    }

	score.set("Score", player_score);
	score.set("Name", player_Name);

	score.save(null, {
		success: function(score) {


				console.log('new high score saved succesfully');
			},
			error: function(score, error) {



				
				alert('Failed to save high score');
				}
				});
}


function refreshHighScores(){
    var Score = Parse.Object.extend("MMScore");
    var query = new Parse.Query(Score);

    switch(difficulty){
    	case 0:
    		Score = Parse.Object.extend("All");
    		query = new Parse.Query(Score);
    		break;
    	case 1:
    		Score = Parse.Object.extend("Easy");
    		query = new Parse.Query(Score);
    		break;
    	case 2:
    		Score = Parse.Object.extend("Moderate");
    		query = new Parse.Query(Score);
    		break;
    	case 3:
    		Score = Parse.Object.extend("Hard");
    		query = new Parse.Query(Score);
    		break;
    }

    query.descending("Score");
    query.find({
      success: function(results) {


       //  for (var i = 0; i < results.length && i < 10; i++) {
       //    var object = results[i];
    	  // if(i==9){
    		 // document.getElementById("MMhighScore" + (i+1)).innerHTML = (i+1) + ". " +  object.get('score') + "pts 		- " + object.get('playerName'); 
    	  // }
    	  // else{
    		 // document.getElementById("MMhighScore" + (i+1)).innerHTML = (i+1) + ". " +  object.get('score') + "pts 		- " + object.get('playerName');
    	  // }
          
       //  }
    	
    	for (var i = 0; i < results.length && i < 10; i++) {
          var object = results[i];
    	  if(i==9){
    		 document.getElementById("MMhighScoreEnd" + (i+1)).innerHTML = (i+1) + ". " +  object.get('Score') + "pts 		- " + object.get('Name');
    	  }
    	  else{
    		 document.getElementById("MMhighScoreEnd" + (i+1)).innerHTML = (i+1) + ". " +  object.get('Score') + "pts 		- " + object.get('Name');
    	  }
          
        }
    	
      },
      error: function(error) {

        alert("Error retrieving high scores");
      }
    });			
}
