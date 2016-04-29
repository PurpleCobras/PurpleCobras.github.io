//V parse.com initialization of storage V

Parse.initialize("AfffIqRQX8tPjgqj7lO935JbzMsISdKgJQNNfFtw", "VsEBibf30t1iYMvCqlZjF9bQaDwKtRvR4skPZ9AJ");
//
//Canvas Variables
//
var previousFrameTime = 0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth*.352;
ctx.canvas.height = window.innerHeight*.825;

var canvas2 = document.getElementById("fpsCanvas");
var ctx2 = canvas2.getContext("2d");

var player_Name;

var start_time = 0;
var end_time = 0;

ctx2.strokeStyle = "red";
ctx2.lineWidth = 5;
ctx2.lineCap = "butt";

//Used in how to play animation
var howToX = 115, howToY = -50; //Variables for the "How To Play" animation coordinates
var pic = document.getElementById("AND11x"); //Gate to use in "How To Play" animation
var howToCanvas; //Variable to hold the new canvas
var ctx3;
var gdiv = document.getElementById("gameDiv"); //Div where the new canvas will go
var howToPlayClicked = false;
var timeout1, timeout2, timeout3, timeout4, timeout5, timeout6, timeout7, intrval;

var fpsX;
var fpsY;
var fpsTarget = 1;
var fpsCurrent = 1;

//
//Game Variables
//
var match = false;
var paused = false; //denotes whether the game is currently running
var animationx = 0; //Animation coordinates for scoring animation
var animationy = 0;
var level = 0;

var onMainMenu = false; //possibly used to change visualization when quitting the game
//
//Button Variables
//
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
var leftkey = 37;
var rightkey = 39;
//
//Ball Variables
//
// var ballRadius=10;
// var ballX = canvas.width/2;
// var ballY = canvas.height-30;

//
//Gate Types
//- Each gate will have 8 possible combination.
//- Currently we have AND, OR, NOR, NAND, XOR, & XNOR gates.
//- Gate image file name represents the formate of the gate:
//  GATETYPE then 3 digits 1,0, or x(blank):
//  -first = output
//  -second = left input
//  -third = right input
//  -AND00x means its an AND gate with the output=0, left input=0, and right input blank
//  -OR1x0 means its an OR gate with the output=1, left input is blank, and right input = 0
//  -AND11x means its an and gate with the output=1, left input=1, and right input blank
//  -etc.

var gateType = [];
    gateType[0]=document.getElementById("AND00x");
    gateType[1]=document.getElementById("AND0x0");
    gateType[2]=document.getElementById("AND0x1");
    gateType[3]=document.getElementById("AND01x");
    gateType[4]=document.getElementById("AND1x0");
    gateType[5]=document.getElementById("AND1x1");
    gateType[6]=document.getElementById("AND10x");
    gateType[7]=document.getElementById("AND11x");

    gateType[8]=document.getElementById("OR00x");
    gateType[9]=document.getElementById("OR0x0");
    gateType[10]=document.getElementById("OR0x1");
    gateType[11]=document.getElementById("OR01x");
    gateType[12]=document.getElementById("OR1x0");
    gateType[13]=document.getElementById("OR1x1");
    gateType[14]=document.getElementById("OR10x");
    gateType[15]=document.getElementById("OR11x");

    gateType[16]=document.getElementById("NAND00x");
    gateType[17]=document.getElementById("NAND0x0");
    gateType[18]=document.getElementById("NAND0x1");
    gateType[19]=document.getElementById("NAND01x");
    gateType[20]=document.getElementById("NAND1x0");
    gateType[21]=document.getElementById("NAND1x1");
    gateType[22]=document.getElementById("NAND10x");
    gateType[23]=document.getElementById("NAND11x");

    gateType[24]=document.getElementById("NOR00x");
    gateType[25]=document.getElementById("NOR0x0");
    gateType[26]=document.getElementById("NOR0x1");
    gateType[27]=document.getElementById("NOR01x");
    gateType[28]=document.getElementById("NOR1x0");
    gateType[29]=document.getElementById("NOR1x1");
    gateType[30]=document.getElementById("NOR10x");
    gateType[31]=document.getElementById("NOR11x");

    gateType[32]=document.getElementById("XOR00x");
    gateType[33]=document.getElementById("XOR0x0");
    gateType[34]=document.getElementById("XOR0x1");
    gateType[35]=document.getElementById("XOR01x");
    gateType[36]=document.getElementById("XOR1x0");
    gateType[37]=document.getElementById("XOR1x1");
    gateType[38]=document.getElementById("XOR10x");
    gateType[39]=document.getElementById("XOR11x");

    gateType[40]=document.getElementById("XNOR00x");
    gateType[41]=document.getElementById("XNOR0x0");
    gateType[42]=document.getElementById("XNOR0x1");
    gateType[43]=document.getElementById("XNOR01x");
    gateType[44]=document.getElementById("XNOR1x0");
    gateType[45]=document.getElementById("XNOR1x1");
    gateType[46]=document.getElementById("XNOR10x");
    gateType[47]=document.getElementById("XNOR11x");


//corresponding value to satisfy each gate.
var gateValue = [];
    //AND 
    gateValue[0]=2;
    gateValue[1]=2;
    gateValue[2]=0;
    gateValue[3]=0;
    gateValue[4]=3;
    gateValue[5]=1;
    gateValue[6]=3;
    gateValue[7]=1;

    //OR 
    gateValue[8]=0;
    gateValue[9]=0;
    gateValue[10]=3;
    gateValue[11]=3;
    gateValue[12]=1;
    gateValue[13]=2;
    gateValue[14]=1;
    gateValue[15]=2;

    //NAND 
    gateValue[16]=3;
    gateValue[17]=3;
    gateValue[18]=1;
    gateValue[19]=1;
    gateValue[20]=2;
    gateValue[21]=0;
    gateValue[22]=2;
    gateValue[23]=0;

    //NOR 
    gateValue[24]=1;
    gateValue[25]=1;
    gateValue[26]=2;
    gateValue[27]=2;
    gateValue[28]=0;
    gateValue[29]=3;
    gateValue[30]=0;
    gateValue[31]=3;

    //XOR 
    gateValue[32]=0;
    gateValue[33]=0;
    gateValue[34]=1;
    gateValue[35]=1;
    gateValue[36]=1;
    gateValue[37]=0;
    gateValue[38]=1;
    gateValue[39]=0;

    //XNOR 
    gateValue[40]=1;
    gateValue[41]=1;
    gateValue[42]=0;
    gateValue[43]=0;
    gateValue[44]=0;
    gateValue[45]=1;
    gateValue[46]=0;
    gateValue[47]=1;
//
//Ball Object
// -radius
// -Coords - x and y
//
var ball = { radius: (canvas.width *.05), x: (canvas.width/2), y: (canvas.height-(canvas.height *.1))};

//
//Player Object
// -lives
// -score
// -value - 0 or 1
//
var player = { lives:['L','L','L','L','L','L','L','L','L','L'], score:0, value:1};


//
//Gate Objects
// -needed - players can enter 0 or 1
// -Coords - x and y
// -gate type - 0 or 1 for now
//
var gate1 = { need: 0, x:(canvas.width/4), y:-200, type:3, rate: Math.floor((Math.random() * 4) +1)};
var gate2 = { need: 1, x:(2*(canvas.width/4)), y:-200, type:14, rate: Math.floor((Math.random() * 4) +1)};
var gate3 = { need: 0, x:(3*(canvas.width/4)), y:-200, type:9, rate: Math.floor((Math.random() * 4) +1)};

while(gate2.rate == gate1.rate){
    gate2.rate = Math.floor((Math.random() * 4) +1);
}
while(gate3.rate == gate2.rate || gate3.rate == gate1.rate){
    gate3.rate = Math.floor((Math.random() * 4) +1);
}


var rate = {rate1 :0, rate2 :0, rate3 : 0};

var speedVis = new test();
speedVis.structure("speed")
    .location("#speedDiv")
    .data(rate)
    .visualize();

rate = {rate1 : gate1.rate, rate2 : gate2.rate, rate3 : gate3.rate};


//
//Event Listeners
// -key pressed
// -key released
//
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


/*Key Handlers

 keyDownhandler()
 -If one of the specified keys is pressed down, dectected by the key code, the value for that key is set to true.
 keyUpHandler()
 -If one of the specified keys is released, dectected by the key code, the value for that key is set to false.

 Keys Detected(key code):
 -Right Arrow(39)
 -Left Arrow(37)
 -Up Arrow(38)
 -Down Arrow(40)
 -Space Bar (32)


 */


//Sound objects

var collection = new Audio("../Sounds/Collection.mp3");
var miss = new Audio("../Sounds/Miss.mp3");
var music = new Audio('../Sounds/Music.mp3');
var mute = false;
var bgm = document.getElementById("bgm");
var sfx = document.getElementById("sfx");

var playing = false;

/*Combo muliplier variables*/
var streak = 0; //used to keep track of gate streak
var isStreak = false;
var streak_time;



function keyDownHandler(e) {
    if(e.keyCode == rightkey) {
        rightPressed = true;
    }
    if(e.keyCode == leftkey) {
        leftPressed = true;
    }
    if(e.keyCode == 32){
        changePlayerValue();
        spacePressed = true;
    }
    if(e.keyCode == 77){
        if(mute == false){
            mute = true;
            music.pause();
            music.currentTime = 0;
        }
        else if(mute == true){
            mute = false;
            music.play();
        }
    }
    if(e.keyCode == 80 && playing == true){
        pause();
    }
}

function keyUpHandler(e) {
    if(e.keyCode == rightkey) {
        rightPressed = false;
    }
    if(e.keyCode == leftkey) {
        leftPressed = false;
    }
    if(e.keyCode == 32){
        spacePressed = false;

    }
}

//
//  drawBall()
//  Creates ball at the bottom of the screen that the player uses to match their value to the gates falling.
//

//bookmark
function drawBall(){

	if(player.value == 1){
		ctx.beginPath();
		ctx.drawImage(playerIcon1, ball.x-(canvas.width *.04) , ball.y - (canvas.height *.05), canvas.width *.08, canvas.height *.1);
		ctx.closePath();
	}
	else{
		ctx.beginPath();
		ctx.drawImage(playerIcon0, ball.x-(canvas.width *.04) , ball.y - (canvas.height *.05), canvas.width *.08, canvas.height *.1);
		ctx.closePath();
	}

}


//power up variables
//2x
var doublepts = { radius:canvas.width *.05, x:(Math.random() * canvas.width), y:-100, alpha:1}; //variable for double points
var doubleptstimer = Math.floor(((Math.random()*60)+30)*1000); //random time interval to spawn between 30 to 90 sec
var ref_time2x = new Date();
var ref_time2x_ms = ref_time2x.getTime();
var spawn2x = false;
var collected2x = false;
var collected2x_time;
var collected2x_time_ms;
var collected2x_limit;
var doublepts_sound = new Audio('../Sounds/Doublepts.ogg');
function draw2x() {

    ctx.beginPath();
    ctx.arc(doublepts.x, doublepts.y, doublepts.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 0, 0," + doublepts.alpha + ")";
    ctx.fill();
    ctx.closePath();
}


//extra life
var extralife ={radius:canvas.width *.05,x:(Math.random()* canvas.width), y:-100, alpha:1 };//variable for extra life
var extralifetimer = Math.floor((Math.random()+1)*60000);//random spawn between 1 to 2 min
var ref_timelife = new Date();
var ref_timelife_ms = ref_timelife.getTime();
var spawnlife = false;
var extralife_sound = new Audio("../Sounds/One_up.ogg");
function drawextralife(){
    ctx.beginPath();
    ctx.arc(extralife.x, extralife.y, extralife.radius, 0, Math.PI * 2);
    ctx.fillStyle ="rgba(0, 150, 0," + extralife.alpha +")";
    ctx.fill();
    ctx.closePath();
}

/* levelGates(current_level)
spawns gates depending on threshold
 */
function levelGates(current_level){
    var gateNum;
    switch(current_level){
        case 1:
            gateNum = Math.floor((Math.random()* 8));
            while(gateNum == 4 || gateNum == 6){
                gateNum = Math.floor((Math.random()* 8));
            }
            break;
        case 2:
            gateNum = Math.floor((Math.random() * 8));
            break;
        case 3:
            gateNum = Math.floor((Math.random()*8))+8;
            while(gateNum == 10 || gateNum == 11){
                gateNum = Math.floor((Math.random()* 8))+8;
            }
            break;
        case 4:
            gateNum = Math.floor((Math.random()*8))+8;
            break;
        case 5:
            gateNum = Math.floor((Math.random()*16));
            break;
        case 6:
            gateNum = Math.floor((Math.random()*8))+16;
            while(gateNum ==  16 || gateNum == 17){
                 gateNum = Math.floor((Math.random()*8))+16;
            }
            break;
        case 7:
            gateNum = Math.floor((Math.random()*8))+16;
            break;
        case 8:
            gateNum = Math.floor((Math.random()*8))+24;
            while(gateNum ==  29 || gateNum == 31){
                 gateNum = Math.floor((Math.random()*8))+24;
            }
            break;
        case 9:
            gateNum = Math.floor((Math.random()*8))+24;
            break;
        case 10:
            gateNum = Math.floor((Math.random()*16))+16;
            break;
        case 11:
            gateNum = Math.floor((Math.random()*32));
            break;
        case 12:
            gateNum = Math.floor((Math.random()*8))+32;
            break;
        case 13:
            gateNum = Math.floor((Math.random()*8))+40;
            break;
        case 14:
            gateNum = Math.floor((Math.random()*16))+32;
            break;
        case 15:
            gateNum = Math.floor((Math.random()*48));
            break;
        
    }
    return gateNum;
}
/*checkLevel()
    Checks the players score and changes levels if needed
*/
function checkLevel(){
    if(player.score < 1000){
        level=1;
    }
    else if(player.score >= 1000 && player.score < 2000){
        level=2;
    }
    else if(player.score >= 2000 && player.score < 3000){
        level=3;
    }
    else if(player.score >= 3000 && player.score < 4000){
        level=4;
    }
    else if(player.score >= 4000 && player.score < 5000){
        level=5;
    }
    else if(player.score >= 5000 && player.score < 6000){
        level=6;
    }
    else if(player.score >= 6000 && player.score < 7000){
        level=7;
    }
    else if(player.score >= 7000 && player.score < 8000){
        level=8;
    }
    else if(player.score >= 8000 && player.score < 9000){
        level=9;
    }
    else if(player.score >= 9000 && player.score < 10000){
        level=10;
    }
    else if(player.score >= 10000 && player.score < 11000){
        level=11;
    }
    else if(player.score >= 11000 && player.score < 12000){
        level=12;
    }
    else if(player.score >= 12000 && player.score < 13000){
        level=13;
    }
    else if(player.score >= 13000 && player.score < 14000){
        level=14;
    }
    else if(player.score >= 14000){
        level=15;
    }

}

/*newLevel(lvl)
    creates new level screen 
*/
function newLevel(lvl){
    switch(lvl){
        case 1:
            document.getElementById("levelNum").innerHTML = "LEVEL          1";
            document.getElementById("description").innerHTML = "Use the mouse or arrows to move<br />Left click or hit the space bar to change value";
            document.getElementById("gateType").innerHTML = "Gates: AND"
            break;
        case 2:
            document.getElementById("levelNum").innerHTML = "LEVEL         2";
            document.getElementById("description").innerHTML = "Be careful, now there are AND gates with no possible solution.";
            document.getElementById("gateType").innerHTML = "Gates: AND"
            break;
        case 3:
            document.getElementById("levelNum").innerHTML = "LEVEL          3";
            document.getElementById("description").innerHTML = "Good job!<br />Now that you understand AND gates, let's try OR gates";
            document.getElementById("gateType").innerHTML = "Gates: OR";
            break;
        case 4:
            document.getElementById("levelNum").innerHTML = "LEVEL         4";
            document.getElementById("description").innerHTML = "Be careful, now there are OR gates with no possible solution.";
            document.getElementById("gateType").innerHTML = "Gates: OR"
            break;
        case 5:
            document.getElementById("levelNum").innerHTML = "LEVEL          5";
            document.getElementById("description").innerHTML = "Let's see if you can handle both AND & OR gates at the same time.";
            document.getElementById("gateType").innerHTML = "Gates: AND & OR";
            break;
        case 6:
            document.getElementById("levelNum").innerHTML = "LEVEL          6";
            document.getElementById("description").innerHTML = "Now we're going to try NAND Gates.";
            document.getElementById("gateType").innerHTML = "Gates: NAND<br />Need help with NAND gates? Take a look at the lesson page.";
            break;
        case 7:
            document.getElementById("levelNum").innerHTML = "LEVEL          7";
            document.getElementById("description").innerHTML = "Let's see if you can handle those tricky gates again.";
            document.getElementById("gateType").innerHTML = "Gates: NAND";
            break;
        case 8:
            document.getElementById("levelNum").innerHTML = "LEVEL          8";
            document.getElementById("description").innerHTML = "Let's move onto NOR gates now. These are inverted OR gates.";
            document.getElementById("gateType").innerHTML = "Gates: NOR";
            break;
        case 9:
            document.getElementById("levelNum").innerHTML = "LEVEL          9";
            document.getElementById("description").innerHTML = "Now it is possible to have unsolvable NOR gates.";
            document.getElementById("gateType").innerHTML = "Gates: NOR";
            break;
        case 10:
            document.getElementById("levelNum").innerHTML = "LEVEL          10";
            document.getElementById("description").innerHTML = "Let's test out how well you know the new gates just introduced.";
            document.getElementById("gateType").innerHTML = "Gates: NAND & NOR";
            break;
        case 11:
            document.getElementById("levelNum").innerHTML = "LEVEL          11";
            document.getElementById("description").innerHTML = "You've now seen four types of logic gates. Can you handle all of them at once?";
            document.getElementById("gateType").innerHTML = "Gates: AND, OR, NAND & NOR<br />You may want to refresh on what you've learned.";
            break;
        case 12:
            document.getElementById("levelNum").innerHTML = "LEVEL          12";
            document.getElementById("description").innerHTML = "This level introduces the XOR gate. This is a new gate.";
            document.getElementById("gateType").innerHTML = "Gates: XOR<br />You may want to take a look at the lesson page.";
            break;
        case 13:
            document.getElementById("levelNum").innerHTML = "LEVEL          13";
            document.getElementById("description").innerHTML = "This level consists of only XNOR gates. This is very similar to XOR gates.";
            document.getElementById("gateType").innerHTML = "Gates: XNOR.";
            break;
        case 14:
            document.getElementById("levelNum").innerHTML = "LEVEL          14";
            document.getElementById("description").innerHTML = "This level will have both XOR and XNOR gates, be careful!";
            document.getElementById("gateType").innerHTML = "Gates: XOR & XNOR";
            break;
        case 15:
            document.getElementById("levelNum").innerHTML = "LEVEL          15";
            document.getElementById("description").innerHTML = "This level will truely test you boolean logic knowledge. All the gates you have learned!";
            document.getElementById("gateType").innerHTML = "Gates: AND, OR, NAND, NOR, XOR & XNOR<br /> Good Luck!!";
            break;

    }
    paused = true;
    
    document.getElementById("continue").style.display = "inline";
    document.getElementById("help").style.display = "inline";
    document.getElementById("newLevel").style.display = "inline";
    document.getElementById("level").innerHTML = "Level: " + lvl;
}

function continueToNextLevel(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resetGates(1);
    resetGates(2);
    resetGates(3);
    paused = false;
    requestAnimationFrame(draw);

}

function openLesson(){
    window.open("http://purplecobras.github.io/Resources/HTML/LogicGateLesson.html");
}

/*  drawGate()
 Creates a gate, given the x and y coordinates and an integer value represtening which gate type to draw.
 Gate Types:
 8 gates for each type
 -AND
 -OR
 -NAND
 -NOR
 -XOR
 -XNOR
 */
function drawGate(x, y, gate){
    ctx.beginPath();
    ctx.drawImage(gateType[gate],x-(canvas.width *.0625),y-(canvas.height *.1) , canvas.width *.1875, canvas.height *.293);
    ctx.closePath();
}

/*  changeGate()
 Function called to change the gates that are output. Each gate has a value that will satisfy the logic. The value is randomly slected between 0 or 1. For now the number that determines the gate, that is the value that satisfies that "gate".

 */
function changeGate(gate){
    //V Change value of the first gate V
    if(gate == 1){
        temp = levelGates(level);

        gate1.type = temp;
        gate1.need = gateValue[temp];
    }

    //V change the value of the second gate V
    if(gate == 2){
        temp = levelGates(level);

        gate2.type = temp;
        gate2.need = gateValue[temp];
    }

    //V change the value of the third gate V
    if(gate == 3){
        temp = levelGates(level);

        gate3.type = temp;
        gate3.need = gateValue[temp];
    }

}
/*  Multiplier
 Gives a multiplier dependent on streak of gates
Called in the checkMatch function
*/


function multiplier(){
    if(streak >= 10)
        return 2;
    else if(streak < 10 && streak >= 4)
        return 1.5;
    else
        return 1;

}


/*  checkMatch()
 Function called to check whether the player's value matches the gate the player grabbed.
 If the needed value equals 2 then that means either a player vlaue of 0 or 1 would satisfy the gate.

 */
function checkMatch(gate){
    if(gate == "gate1"){
        if(gate1.need == player.value || gate1.need == 2){
            correctAns();
        }
        else {
            wrongAns();
        }
    }
    else if(gate == "gate2"){
        if(gate2.need == player.value || gate2.need == 2){
            correctAns();
        }
        else {
            wrongAns();
        }
    }
    else if(gate =="gate3"){
        if(gate3.need == player.value || gate3.need == 2){
            correctAns();
        }
        else{
            wrongAns();
        }
    }
    else{
        player.lives.pop();
    }

}
/*correctAns()
    fucntion called when a correct value is provided to a corresponding gate

*/
function correctAns(){
    scored = true;
    animationx = ball.x;
    animationy = ball.y;
    if(collected2x == true) player.score+= 100 * multiplier() * 2;
    else
    player.score += 100 * multiplier();

    isStreak = true;
    streak += 1;
    streak_time = new Date().getTime()+5000;
    collection.pause();
    collection.currentTime = 0;
    collection.play();
}
/*correctAns()
    fucntion called when a incorrect value is provided to a corresponding gate

*/
function wrongAns(){
    document.getElementById("streak").innerHTML = "Streak: 0";
    document.getElementById("bonus").innerHTML = "Bonus: 0";
    player.lives.pop();
    isStreak = false;
    streak = 0;
    miss.pause();
    miss.currentTime = 0;
    miss.play();
}

//resets all of the y gate coordinates and set a new random fall rate to each gate.
function resetGates(gate){

    if(gate == 1){
        changeGate(1);
        if(level == 1 || level == 2 || level == 3){
            gate1.rate = Math.floor((Math.random() * 2) + 1);
        }
        else if(level == 4){
            gate1.rate = Math.floor((Math.random() * 3) + 2);
        }
        
        while(gate1.rate == gate2.rate || gate1.rate == gate3.rate){
            gate1.rate = Math.floor((Math.random() * 4) +1);
        }
        gate1.y = -200;
    }
    else if(gate == 2){
        changeGate(2);
        gate2.rate = Math.floor((Math.random() * 4) +1);
        while(gate2.rate == gate1.rate || gate2.rate == gate3.rate){
            gate2.rate = Math.floor((Math.random() * 4) +1);
        }
        gate2.y = -200;
    }
    else if(gate == 3){
        changeGate(3);
        gate3.rate = Math.floor((Math.random() * 4) +1);
        while(gate3.rate == gate1.rate || gate3.rate == gate2.rate){
            gate3.rate = Math.floor((Math.random() * 4) +1);
        }
        gate3.y = -200;
    }

}

/*  checkCollision()
 This function is called everytime the screen is drawn. It checks whether the gates have either hit the bottom of the window or have hit the ball. This is done by checking the the x and y coordinates of the ball and the gates. If the gates hit the bottom of the window, they are reset and the player loses a life. If the gates come in contact with the ball, the player's vlaue and the gates needed value are checked. If they match, the score is increased by 100. If the values don't match, the player loses a life.

 */
//bookmark
function checkCollision(){

    if((gate1.y-canvas.height *.2) >= canvas.height){
        resetGates(1);
    }
    if((gate2.y-canvas.height *.2) >= canvas.height){
        resetGates(2);
    }
    if((gate3.y-canvas.height *.2) >= canvas.height){
        resetGates(3);
    }
    if(ball.x+ball.radius >=(canvas.width/4)-(canvas.width *.025) && ball.x-ball.radius <= ((canvas.width/4)+(canvas.width *.025)) && (gate1.y+(canvas.height *.1)) >= (ball.y - ball.radius) && gate1.y <= ball.radius + ball.y){
        checkMatch("gate1");
        resetGates(1);
    }
    if(ball.x+ball.radius >=(2*canvas.width/4)-(canvas.width *.025) && ball.x-ball.radius <= ((2*canvas.width/4)+(canvas.width *.025)) && (gate2.y+(canvas.height *.1)) >= (ball.y - ball.radius) && gate2.y <= ball.radius + ball.y){
        checkMatch("gate2");
        resetGates(2);
    }
    if(ball.x+ball.radius >=(3*canvas.width/4)-(canvas.width *.025) && ball.x-ball.radius <= ((3*canvas.width/4)+(canvas.width *.025)) && (gate3.y+(canvas.height *.1)) >= (ball.y - ball.radius) && gate3.y <= ball.radius + ball.y){
        checkMatch("gate3");
        resetGates(3);
    }

    if(doublepts.y - doublepts.radius >= canvas.height){
        doublepts.x = Math.random() * canvas.width;
        doublepts.y = -100;
        doubleptstimer = Math.floor((Math.random() +1)*60000);
        ref_time2x = new Date();
        ref_time2x_ms = ref_time2x.getTime();
        spawn2x = false;

    }

    if((ball.x+ball.radius >= doublepts.x-doublepts.radius) &&
        (ball.x-ball.radius <= doublepts.x+doublepts.radius) &&
        (ball.y-ball.radius <= doublepts.y+doublepts.radius) &&
        (ball.y+ ball.radius >=doublepts.y-doublepts.radius)) {
        collected2x = true;
        collected2x_time = new Date();
        collected2x_time_ms = collected2x_time.getTime();
        collected2x_limit = collected2x_time_ms + 15000;
        doublepts_sound.play();
        spawn2x = false;
        doublepts.y = -100;
    }

    if(extralife.y - extralife.radius >= canvas.height){
        extralife.x = Math.random() * canvas.width;
        extralife.y = -100;
        extralifetimer = Math.floor((Math.random() +2)*60000);
        spawnlife = false;
    }

    if((ball.x+ball.radius >= extralife.x-extralife.radius) &&
        (ball.x-ball.radius <= extralife.x+20) &&
        (ball.y-ball.radius <= extralife.y+extralife.radius) &&
        (ball.y+ball.radius >=extralife.y-extralife.radius)){
        extralife.y = -100;
        extralife_sound.play();
        if(player.lives.length == 10) player.score += 300;
        else player.lives.push('L');
        spawnlife = false;

    }

}

//setUpScreen()
//This function takes care of all the items that need to be put on the screen.
//
function setUpScreen(time){
    var FPS = Math.floor(1000 / (time - previousFrameTime));
    document.getElementById("newLevel").style.display = "none";
	displayFramesPerSecond(FPS);
    previousFrameTime = time;
    ctx.font = "12px Verdana";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	document.getElementById("score").innerHTML = "Score: " + player.score;
	displayLives();
}

//displayFramesPerSecond(rate)
//Draws the needle on the spedometer. 150 and 147 are used because they are always the x and y start of the needle
//(the part on the grey circle at the bottom). The spedometer goes up to 120, so the percentage of the spedometer that should be 
//filled is calculated first. Then That percentage is taken and multiplied by 180 to get how many degrees up from 0 the needle
//should be. Then the ending points are calculated using cartesian coordinates (https://en.wikipedia.org/wiki/Circle#Equations)
//lastly, because canvases use the top left corner as (0,0), I have to pull some trickery and "reverse" the 
//coordinates, for lack of a better term.
// 
function displayFramesPerSecond(rate){
	var percentage = rate/120;
	var angleindegrees = Math.round(percentage * 180);
	if(fpsTarget != angleindegrees){
		fpsTarget = angleindegrees;
	}
	
}

function drawneedlesmoothly(){
	if(fpsTarget + 1 > fpsCurrent){
		
			var newx = 150 + (127 * (Math.cos((Math.PI/180)* fpsCurrent)));
			var newy = 147 + (127 * (Math.sin((Math.PI/180)* fpsCurrent)));
			var xcorrect = newx - 150;
			var ycorrect = newy - 147;
			newx = 150 - xcorrect;
			newy = 147 - ycorrect;
			ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
			ctx2.beginPath();
			ctx2.moveTo(150, 147);
			ctx2.lineTo(newx, newy);
			ctx2.stroke();
			fpsCurrent+=1;
			
		
	}
	else if(fpsTarget + 1 < fpsCurrent){
			var newx = 150 + (127 * (Math.cos((Math.PI/180)* fpsCurrent)));
			var newy = 147 + (127 * (Math.sin((Math.PI/180)* fpsCurrent)));
			var xcorrect = newx - 150;
			var ycorrect = newy - 147;
			newx = 150 - xcorrect;
			newy = 147 - ycorrect;
			ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
			ctx2.beginPath();
			ctx2.moveTo(150, 147);
			ctx2.lineTo(newx, newy);
			ctx2.stroke();
			fpsCurrent-=1;
			
		
	}
}

//displayLives()
//displays the correct image for the lives meter
//
function displayLives(){
	var temp = document.getElementsByClassName("livesMeter");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
	
	if(player.lives.length > 0){
		var temp2 = player.lives.length + "lives";
		var temp3 = document.getElementById(temp2);
		temp3.style.display = "inline";
	}
}

//changePlayerValue()
//This function is called when the mouse has been clicked. It will  change playerValue from a 1 to a 0 or a 0 to a 1.
//
function changePlayerValue(){
    ga('send', 'event', 'Gate Grabber', 'click', 'changed value');
    if(player.value == 0){
        player.value = 1;
    }
    else{
        player.value = 0;
    }
}

//V on mouse move function V
//this function is called anytime the mouse moves on the screen and updates the ballx variable
//the coordinates are returned relative to the top left of the screen so we need to use the canvas bounds to adjust them.
//lastly, this function checks to make sure the position is inside the canvas. it will not change the coordinates if it is not

$(document).on("mousemove", function (event) {
    var rect = canvas.getBoundingClientRect();
    if((event.clientX - rect.left) - ball.radius > 0 && (event.clientX - rect.left) + ball.radius < canvas.width && (event.clientY - rect.top) > 0 && (event.clientY - rect.top) < canvas.height){
        ball.x = event.clientX - rect.left;
    }
});

/*
 This loops the music file by playing the music file again whenever it ends. Music file is choppy on the loop as better editing sofware is needed.
 */
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

bgm.addEventListener("change", function(){
    music.volume =bgm.value / 100;
});

sfx.addEventListener("change", function(){
    collection.volume = sfx.value/100;
    miss.volume = sfx.value/100;
});
music.play();

//   pause() -> this function changes the value of the variable playing (causing the game to pause)


function pause(){
    if (paused == false){
        paused = !paused;
    }
    else{
        paused = !paused;
        requestAnimationFrame(draw);
    }
}



/*  draw()
 This is the main function that draws the screen which includes the three gates, ball, score, lives, and FPS. The rate that the screen is drawn at varries.This is what frames per second(FPS) is in the top corner of the screen.

 IF the left or right arrows are pressed  the x coordinate of the ball is chnaged; right arrow= +4, left arrow -4.
 The Y coordinate of the gates is increased, creating the animation of the gates falling.
 If the space bar is pressed the player's value  will change from 0 to 1 or vice versa. (kinda glitchy)

 */
var scored = false;

function draw(time) {
    updateSizes();
    setUpScreen(time);

    currentLevel = level;
    checkLevel();
    if(currentLevel != level){
        newLevel(level);
    }

    checkCollision();
    var spawn2xCount = 0;
    var spawnLifeCount = 0;

    drawGate((canvas.width / 4), gate1.y, gate1.type);
    drawGate(2 * (canvas.width / 4), gate2.y, gate2.type);
    drawGate(3 * (canvas.width / 4), gate3.y, gate3.type);

    drawBall();
    ctx.fillStyle = "#FF0000";
    //ctx.fillText(player.value, ball.x - 4, ball.y + 3);

    var current_time = new Date();
    var current_time_ms = current_time.getTime();
    if (ref_time2x_ms + doubleptstimer - current_time_ms <= 1000 && ref_time2x_ms + doubleptstimer - current_time_ms >= 0 && spawn2x == false) {
        spawn2x = true;
        spawn2xCount += 1;
    }

    if (ref_timelife_ms + extralifetimer - current_time_ms <= 1000 && ref_timelife_ms + extralifetimer - current_time_ms >= 0 && spawnlife == false) {
        spawnlife = true;
        spawnLifeCount += 1;
    }

    if (isStreak == true && current_time_ms < streak_time) {
        // ctx.font = "18px Retroville";
        // ctx.fillText("X" + streak, 10, canvas.height - 55);
        document.getElementById("streak").innerHTML = "Streak: " + streak;
        if ((multiplier() - 1) * 100 > 0){
            // ctx.fillText("+" + ((multiplier() - 1) * 100) + "% Bonus", 10, canvas.height - 40);
            document.getElementById("bonus").innerHTML = "Bonus: " + ((multiplier() - 1) * 100) + "%";
        }
    }
    //You get 5 seconds before streak resets
    if (current_time_ms >= streak_time) {
        document.getElementById("streak").innerHTML = "Streak: 0";
        document.getElementById("bonus").innerHTML = "Bonus: 0";
        isStreak = false;
        streak = 0;

    }

    if (spawn2x == true) {
        if (spawn2xCount == 1) {
            ga('send', 'event', 'Gate Grabber', 'spawn', 'Double Points');
        }
        draw2x();
        doublepts.alpha = doublepts.alpha - .005;
        if (doublepts.alpha <= 0) doublepts.alpha = 1;

        doublepts.y = doublepts.y + 2;

        ctx.fillStyle = "#FFFF00";
        ctx.font = "20px Retroville";
        ctx.fillText("2x", doublepts.x - 16, doublepts.y + 6);
        ctx.fillStyle = "#FF0000";
        ctx.font = "12px Retroville"
    }


    if (spawnlife == true) {
        if (spawnLifeCount == 1) {
            ga('send', 'event', 'Gate Grabber', 'spawn', 'Extra Life');
        }
        drawextralife();
        extralife.alpha = extralife.alpha - .01;
        if (extralife.alpha <= 0) extralife.alpha = 1;

        extralife.y = extralife.y + 2;

        ctx.fillStyle = "#1D7CF2";
        ctx.font = "16px Retroville";
        ctx.fillText("1UP", extralife.x - 18, extralife.y + 6);
        ctx.fillStyle = "#FF0000";
        ctx.font = "12px Retroville";
    }


    if (collected2x == true) {
 /*       ctx.font = "16px Retroville";
        ctx.fillText("2x: " + Math.floor((collected2x_limit - current_time_ms) / 1000) + " Sec", 0, canvas.height / 2);
*/
        if (current_time_ms >= collected2x_limit) {
            doublepts.x = Math.random() * canvas.width;
            doublepts.y = -100;
            doubleptstimer = Math.floor((Math.random() + 1) * 60000);
            ref_time2x = new Date();
            ref_time2x_ms = ref_time2x.getTime();
            collected2x = false;

        }
    }

    gate1.y = gate1.y + gate1.rate;
    gate2.y = gate2.y + gate2.rate;
    gate3.y = gate3.y + gate3.rate;


    var speed = {
        rate1: gate1.rate, rate2: gate2.rate, rate3: gate3.rate,
        gate1: gateType[gate1.type].src, gate2: gateType[gate2.type].src, gate3: gateType[gate3.type].src,
        gate1y: gate1.y, gate2y: gate2.y, gate3y: gate3.y
    };

    speedVis.update(speed);

    if (rightPressed && ball.x + ball.radius < canvas.width) {
        ball.x += 4;
        ball.y = (canvas.height - (canvas.height * .1))
    }
    if (leftPressed && ball.x - ball.radius > 0) {
        ball.x -= 4;
        ball.y = (canvas.height - (canvas.height * .1))
    }
    if ((rightPressed && ball.x + ball.radius > canvas.width)) {
        ball.x = canvas.width - ball.radius;
        ball.y = (canvas.height - (canvas.height * .1));
    }
    if (leftPressed && ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.y = (canvas.height - (canvas.height * .1));
    }
    canvas.onclick = changePlayerValue;


    if (player.lives == 0) {
        end_time = Date.now();
        var time = end_time - start_time;
        ga('send', 'event', 'Gate Grabber', 'completeTime', time);
        scored = false;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		fpsTarget = 1;
		document.getElementById("gameOverScore").innerHTML = "You scored " + player.score + " points!";
		checkHighScore();
		pause();
        playing = false;
        ctx.textAlign="start";
    }




    if (!paused){
        requestAnimationFrame(draw);
    }
    else if(paused == true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		fpsTarget = 1;
        if (playing == true) {
            ctx.font = "30px Retroville";
            ctx.fillText("PAUSED", canvas.width / 2 - 75, canvas.height / 2);
        }
        scored = false;
    }

//Animation runs when a player scores. Working on improving this animation later on
    if(scored == true && paused == false){
        ctx.font = "14px Retroville";
        if(collected2x == true) ctx.fillText("+"+ (100 * multiplier() * 2),animationx - 25, animationy);
        else ctx.fillText("+"+ (100 * multiplier()),animationx - 25, animationy);
        animationy -= 3;
        if(animationy <= ball.y - 300) scored = false;
    }
}
/*
******High Score Functions*********
*/
function checkHighScore(){
    var Score = Parse.Object.extend("Score");
    var query = new Parse.Query(Score);
    query.lessThan("score", player.score);
    query.count({
      success: function(count) {
    	if(count > 0){
            ga('send', 'event', 'Gate Grabber', 'highScore', 'achieved');
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
    ga('send', 'event', 'Gate Grabber', 'highScore', 'submitted');
	player_Name = document.getElementById("nameInput").value;
	deleteLowScore();
	pushNewHighScore();
	refreshHighScores();
	loadEndMenu();
}

function deleteLowScore(){
	var Score = Parse.Object.extend("Score");
    var query = new Parse.Query(Score);
	query.ascending("score");
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
	var Score = Parse.Object.extend("Score");
	var score = new Score();

	score.set("score", player.score);
	score.set("playerName", player_Name);

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
    var Score = Parse.Object.extend("Score");
    var query = new Parse.Query(Score);
    query.descending("score");
    query.find({
      success: function(results) {


        for (var i = 0; i < results.length && i < 10; i++) {
          var object = results[i];
    	  if(i==9){
    		 document.getElementById("highScore" + (i+1)).innerHTML = (i+1) + ". " + object.get('playerName') + " - " + object.get('score') + "pts"; 
    	  }
    	  else{
    		 document.getElementById("highScore" + (i+1)).innerHTML = (i+1) + ".   " + object.get('playerName') + " - " + object.get('score') + "pts"; 
    	  }
          
        }
    	
    	for (var i = 0; i < results.length && i < 10; i++) {
          var object = results[i];
    	  if(i==9){
    		 document.getElementById("highScoreEnd" + (i+1)).innerHTML = (i+1) + ". " + object.get('playerName') + " - " + object.get('score') + "pts"; 
    	  }
    	  else{
    		 document.getElementById("highScoreEnd" + (i+1)).innerHTML = (i+1) + ".   " + object.get('playerName') + " - " + object.get('score') + "pts"; 
    	  }
          
        }
    	
      },
      error: function(error) {

        alert("Error retrieving high scores");
      }
    });			
}

function loadConfiguration() {
    ga('send','event', 'Gate Grabber', 'choice', 'buttonConfig');
    //clear all user interface elements
    var temp = document.getElementsByClassName("ui");
    for (i = 0; i < temp.length; ++i) {
        temp[i].style.display = "none";
    }
    //receive new keystrokes
    ctx.font = "20px Retroville";
    ctx.fillStyle ="#1ff400";
    ctx.textAlign="center";
    ctx.fillText("Input left movement key", canvas.width / 2, canvas.height / 2);
    document.addEventListener("keydown", assignleft, false);

}

function assignleft(key){
    leftkey = key.keyCode;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText("Input right movement key", canvas.width/2, canvas.height/2);
    document.addEventListener("keydown", assignright,false);
    document.removeEventListener("keydown",assignleft,false);
    ctx.textAlign="start";
}

function assignright(key){
    rightkey = key.keyCode;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadoptions();
    document.removeEventListener("keydown", assignright, false);
}

function loadControls(){
    ga('send','event', 'Gate Grabber', 'choice', 'Controls');
    //clear all user interface elements
	$(".ui").fadeOut(600);
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("controls");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	$(".controls").hide();
	$(".controls").fadeIn(600);
	volumeIconSelector();
}

function drawHowToGate(){
	ctx3.beginPath();
	ctx3.drawImage(pic, howToX, howToY, 70, 90);
	ctx3.closePath();
}

function clearCanvas(){
	ctx3.clearRect(0,0, howToCanvas.width, howToCanvas.height);
}

function drawHowTo(){
	clearCanvas();
	drawHowToGate();
	ctx3.drawImage(playerIcon0, howToX+25, 100, 30, 40);
	if(howToY < 5){
		howToY += 2;
		requestAnimationFrame(drawHowTo);
	}
	
	else{
		timeout1 = setTimeout(function(){
			ctx3.lineWidth = 3;
			ctx3.strokeStyle="#FF0000";
			//Red circle around gate output
			ctx3.beginPath();
			ctx3.arc(howToX+35,howToY+13,15,0,2*Math.PI);
			ctx3.stroke();
			ctx3.fillStyle = "#FF0000";
			ctx3.font = 'bold 15px Arial';
			ctx3.fillText("Gate Output", howToX+55, howToY+8);
		}, 750);
		
		timeout2 = setTimeout(function(){
			ctx3.strokeStyle="#1FF400";
			//Green circles around user's input fields
			ctx3.beginPath();
			ctx3.arc(164,80,15,0,2*Math.PI);
			ctx3.stroke();
			ctx3.beginPath();
			ctx3.arc(155,125,16,0,2*Math.PI);
			ctx3.stroke();
			ctx3.fillStyle = "#1FF400";
			ctx3.fillText("Your input", 185, 115);
		}, 2000);
		
		timeout3 = setTimeout(function(){
			clearCanvas();
			drawHowToGate();
			ctx3.drawImage(playerIcon0, howToX+25, 100, 30, 40);
			ctx3.strokeStyle="#FF0000";
			//Red circle around gate output
			ctx3.beginPath();
			ctx3.arc(howToX+35,howToY+13,15,0,2*Math.PI);
			ctx3.stroke();
			//White circle around player icon
			ctx3.strokeStyle="white";
			ctx3.beginPath();
			ctx3.arc(155,125,16,0,2*Math.PI);
			ctx3.stroke();
			//White circle around pre-defined input value
			ctx3.beginPath();
			ctx3.arc(135,82,15,0,2*Math.PI);
			ctx3.stroke();
			
			ctx3.fillStyle = "#FF0000";
			ctx3.font = 'bold 15px Arial';
			ctx3.fillText("Gate Output", howToX+55, howToY+8);
			ctx3.fillStyle = "white";
			ctx3.font = '12px Arial';
			ctx3.fillText("Notice that the two",10,30);
			ctx3.fillText("values of input",10,43);
			ctx3.fillText("currently will not", 10, 56);
			ctx3.fillText("generate the given", 10, 69);
			ctx3.fillStyle = "#FF0000";
			ctx3.font = 'bold 13px Arial';
			ctx3.fillText("gate output", 10, 82);
		}, 3750);
		
		
		timeout4 = setTimeout(function(){
			ctx3.strokeStyle="#1FF400";
			ctx3.beginPath();
			ctx3.arc(155,125,16,0,2*Math.PI);
			ctx3.stroke();
			ctx3.fillStyle = "white";
			ctx3.font = '12px Arial';
			ctx3.fillText("Solve this by left", 190, 50);
		    ctx3.fillText("clicking the mouse", 190, 63);
			ctx3.fillText("to change your", 190, 76);
			ctx3.fillStyle = "#1FF400";
			ctx3.fillText("input value", 190, 89);
		}, 6500);
		
		timeout5 = setTimeout(function(){
			clearCanvas();
			drawHowToGate();
			ctx3.drawImage(playerIcon1, howToX+25, 100, 30, 40);
			ctx3.strokeStyle="#1FF400";
			ctx3.beginPath();
			ctx3.arc(155,125,16,0,2*Math.PI);
			ctx3.stroke();
			ctx3.fillStyle = "white";
			ctx3.fillText("Now you're ready",10,43);
			ctx3.fillText("to collect the gate!",10, 56);
		}, 9000);
		
		timeout6 = setTimeout(function(){	
			finishHowToAnimation();
		}, 11000);
	}
}

function finishHowToAnimation(){
	clearCanvas();
	ctx3.fillText("Now you're ready",10,43);
	ctx3.fillText("to collect the gate!",10, 56);
	drawHowToGate();
	ctx3.drawImage(playerIcon1, howToX+25, 100, 30, 40);
	
	if(howToY+90 < 125){
		howToY += 2;
		requestAnimationFrame(finishHowToAnimation);
	}
	
	else{
		clearCanvas();
		ctx3.drawImage(playerIcon1, howToX+25, 100, 30, 40);
		var yvalue = 100;
		ctx3.font = "14px Retroville";
		ctx3.fillStyle = "red";
		intrval = setInterval(function(){
					clearCanvas();
					ctx3.drawImage(playerIcon1, howToX+25, 100, 30, 40);
					ctx3.fillText("+"+ 100, howToX+25, yvalue);
					yvalue -= 4;
				  }, 250);
				  
		timeout7 = setTimeout(function(){
			clearInterval(intrval);
			clearCanvas();
			ctx3.font = "bold 14px Arial";
			ctx3.fillStyle = "white";
			ctx3.fillText("If you still have questions,",53, 43); 
			ctx3.fillText("feel free to check out the ",55,58);
			ctx3.fillText("Gate Grabber information page.",53, 73);
		}, 2500);
	}
}

function loadHowToPlay(){
    ga('send','event', 'Gate Grabber', 'choice', 'HowTo');
    //clear all user interface elements
	$(".ui").fadeOut(600);
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("howToPlay");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	$(".howToPlay").hide();
	$(".howToPlay").fadeIn(600);
	volumeIconSelector();
	
	howToX = 115, howToY = -50; //y to 120?	
	
	//Create a new to run the animation on canvas
	howToCanvas = document.createElement("canvas");
	howToCanvas.id = "howToCanvas";
		
	//Append it in the gameDiv
	gdiv.appendChild(howToCanvas);
	
	//Set it's properties
	document.getElementById("howToCanvas").style.width="32vw";
	document.getElementById("howToCanvas").style.height="43vh";
	document.getElementById("howToCanvas").style.bottom="19vh";
	document.getElementById("howToCanvas").style.left="1.5vw";
	document.getElementById("howToCanvas").style.position="absolute";
	ctx3 = howToCanvas.getContext("2d");
	
	howToPlayClicked = true;
	
	//Draw the animation
	drawHowTo();
}

function loadoptions(){
    ga('send','event', 'Gate Grabber', 'choice', 'Options');
    //clear all user interface elements
	$(".ui").fadeOut(600);
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("options");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	$(".options").hide();
	$(".options").fadeIn(600);
	volumeIconSelector();
}

function volumeIconSelector(){
	var temp;
	if(mute == false){
    	temp = document.getElementById("volumeMuted");
    	temp.style.display = "none";
    	temp = document.getElementById("volumePlaying");
    	temp.style.display = "inline";
	}
	else{
    	temp = document.getElementById("volumeMuted");
    	temp.style.display = "inline";
    	temp = document.getElementById("volumePlaying");
    	temp.style.display = "none";
	}
}

function toggleMusic(){
	if(mute == false){
        ga('send','event', 'Gate Grabber', 'Music', 'off');
		mute = true;
		music.pause();
		music.currentTime = 0;
		collection.volume = 0;
		miss.volume = 0;
	}
	else if(mute == true){
        ga('send','event', 'Gate Grabber', 'Music', 'on');
		mute = false;
		music.play();
		collection.volume = sfx.value/100;
		miss.volume = sfx.value/100;
	}
	
	volumeIconSelector();
}

function loadMainMenu(){
	if(howToPlayClicked){
		//Remove the howToPlayCanvas
		gdiv.removeChild(howToCanvas);
		ctx3 = null;
		howToPlayClicked = false;
		clearTimeout(timeout1);
		clearTimeout(timeout2);
		clearTimeout(timeout3);
		clearTimeout(timeout4);
		clearTimeout(timeout5);
		clearTimeout(timeout6);
		clearTimeout(timeout7);
		clearInterval(intrval);
	}

    document.getElementById("myCanvas").style.background = "url(../Background/circuit_background.jpg) ";
    document.getElementById("myCanvas").style.backgroundSize = "100%";
    document.getElementById("score").innerHTML = "Score: 0";
    document.getElementById("level").innerHTML = "Level: 0";
    document.getElementById("streak").innerHTML = "Streak: 0";
    document.getElementById("bonus").innerHTML = "Bonus: 0";
	refreshHighScores();
	$(".ui").fadeOut(600);
    //clear all user interface elements
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("mainMenu");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	
	//Reset the visualization
	var s = {rate1: gate1.rate, rate2: gate2.rate, rate3: gate3.rate, 
				 gate1: gateType[gate1.type].src, gate2: gateType[gate2.type].src, gate3: gateType[gate3.type].src,
				 gate1y:  -100, gate2y: -100, gate3y: -100
				};
	speedVis.update(s);
	
	$(".mainMenu").hide();
	$(".mainMenu").fadeIn(600);
	volumeIconSelector();
}

function loadMainMenuFirstTime(){
	refreshHighScores();
    //clear all user interface elements
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("mainMenu");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	
	volumeIconSelector();
	
	$("#play").hide();
	$("#howTo").hide();
	$("#controls_MainMenu").hide();
	$("#option").hide();
	$("#highScores_MainMenu").hide();
	
	
	$("#play").fadeIn(600);
	$("#howTo").fadeIn(600);
	$("#controls_MainMenu").fadeIn(600);
	$("#option").fadeIn(600);
	$("#highScores_MainMenu").fadeIn(600);	
}

//main menu animation

blinkTime = 0; //sets animation loop so cursor blinks for a few times before writing gate grabber

function firstFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame2").show();
	if(blinkTime < 1){
		setTimeout(secondFrame, 530)
		++blinkTime;
	}
	else{
		setTimeout(thirdFrame, 400)
	}
	
}

function secondFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame1").show();
	setTimeout(firstFrame, 530)
}

function thirdFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame3").show();
	setTimeout(fourthFrame, 200)	
}

function fourthFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame4").show();
	setTimeout(fifthFrame, 500)	
}
function fifthFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame5").show();
	setTimeout(sixthFrame, 200)	
}
function sixthFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame6").show();
	setTimeout(seventhFrame, 510)	
}
function seventhFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame7").show();
	setTimeout(eighthFrame, 530)	
}
function eighthFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame8").show();
	setTimeout(ninthFrame, 500)	
}
function ninthFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame9").show();
	setTimeout(tenthFrame, 150)	
}
function tenthFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame10").show();
	setTimeout(eleventhFrame, 200)	
}
function eleventhFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame11").show();
	setTimeout(twelthFrame, 300)	
}
function twelthFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame12").show();
	setTimeout(thirteenthFrame, 100)	
}
function thirteenthFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame13").show();
	setTimeout(fourteenthFrame, 250)	
}
function fourteenthFrame(){
	$(".mainMenuAnimation").hide();
	$("#frame14").show();
	setTimeout(fifteenthFrame, 200)	
}
function fifteenthFrame(){
	$(".mainMenuAnimation").hide();
	$("#menuLogo").show();
	setTimeout(loadMainMenuFirstTime, 500)	
}

function gamestartanimation(){
	//clear all user interface elements
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
	//load all relevant user interface elements
    temp = document.getElementsByClassName("mainMenuAnimation");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	
	volumeIconSelector();
	
	$(".mainMenuAnimation").hide();
	$("#frame1").fadeIn(600, firstFrame());
}

function loadNewHighScoreScreen(){
    //clear all user interface elements
	$(".ui").fadeOut(600);
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("newHighScoreScreen");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	$(".newHighScoreScreen").hide();
	$(".newHighScoreScreen").fadeIn(600);	
}

function loadHighScores(){
    ga('send','event', 'Gate Grabber', 'choice', 'highScore');
	refreshHighScores();
	$(".ui").fadeOut(600);
    //clear all user interface elements
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("highScores");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	$(".highScores").hide();
	$(".highScores").fadeIn(600);
	
	
	volumeIconSelector();
    setTimeout(cleanup, 100);   
}



function loadEndMenu(){
	refreshHighScores();
    //clear all user interface elements
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("endGame");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	setTimeout(refreshHighScores, 2500);
    //WARNING!!!!!! Some of the words/phrases below are highly offensive. read at your own risk
    
    setTimeout(cleanup, 100);
    
    //WARNING!!!!!! Some of the words/phrases above are highly offensive. read at your own risk
}

function newGame(){

    $("#newLevel").fadeIn(600);
    document.getElementById("myCanvas").style.background = "linear-gradient(black, gray)";


    level = 1;
    ga('send','event', 'Gate Grabber', 'choice', 'Play');
    start_time = Date.now();
    //clear all user interface elements
	$(".ui").fadeOut(600);
    var temp = document.getElementsByClassName("ui");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "none";
    }
    //load all relevant user interface elements
    temp = document.getElementsByClassName("inGame");
    for(i=0; i<temp.length; ++i){
        temp[i].style.display = "inline";
    }
	$(".inGame").hide();
	$(".inGame").fadeIn(600);
    //reset game variables
    var tempvar1 = Math.floor((Math.random()* 8));
    var tempvar2 = Math.floor((Math.random()* 8));
    var tempvar3 = Math.floor((Math.random()* 8));
    player = { lives:['L','L','L','L','L','L','L','L','L','L'], score:0, value:1};
	gate1 = { need: gateValue[tempvar1], x:(canvas.width/4), y:-200, type:tempvar1, rate: Math.floor((Math.random() * 4) +1)};
	gate2 = { need: gateValue[tempvar2], x:(2*(canvas.width/4)), y:-200, type:tempvar2, rate: Math.floor((Math.random() * 4) +1)};
	gate3 = { need: gateValue[tempvar3], x:(3*(canvas.width/4)), y:-200, type:tempvar3, rate: Math.floor((Math.random() * 4) +1)};

	while(gate2.rate == gate1.rate){
		gate2.rate = Math.floor((Math.random() * 4) +1);
	}
	while(gate3.rate == gate2.rate || gate3.rate == gate1.rate){
		gate3.rate = Math.floor((Math.random() * 4) +1);
	}
    extralife ={radius:20,x:(Math.random()* canvas.width), y:-100, alpha:1 };//variable for extra life
    extralife.x = Math.random()*canvas.width;
    extralife.y = -100;
    ref_timelife = new Date();
    ref_timelife_ms = ref_timelife.getTime();
    spawnlife = false;

    doublepts.x = Math.random()*canvas.width;
    doublepts.y = -100;
    doubleptstimer = Math.floor((Math.random()+1)*60000); //random time interval to spawn between 1 minute to 2 minute
    ref_time2x = new Date();
    ref_time2x_ms = ref_time2x.getTime();
    spawn2x = false;
    collected2x = false;
    scored = false; //tells if player scores
    //start the game
    playing = true;
    paused = false;
    newLevel(level);
}

function quitGame(){
    ga('send','event', 'Gate Grabber', 'choice', 'Quit');
    document.getElementById("newLevel").style.display = "none";
	fpsTarget = 1;
	paused = true;
    playing = false;
    player.score = 0;
    streak = 0;
	requestAnimationFrame(clearscreen);
	fpsTarget = 1;
	loadMainMenu();
}

function clearscreen(){
    document.getElementById("newLevel").style.display = "none";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
		
// V Main Event Loop V   <- this is what runs "sequentially" after everything has been loaded; good starting point for trying to figure out whats going on
//loadMainMenu();
//wait for html to load before animating

gamestartanimation();
//loadMainMenuFirstTime();
var needleinterval = setInterval(drawneedlesmoothly, 11);

//updateSizes - updates sizes when screen size changes
//bookmark
function updateSizes(){
    ctx.canvas.width  = window.innerWidth*.352;
    ctx.canvas.height = window.innerHeight*.825;
    ball.radius = .1*canvas.width/2;
    ball.y = (canvas.height-(canvas.height *.1));

}