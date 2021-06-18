var start=document.getElementById("start");
var restart=document.getElementById("restart");
var container=document.getElementById("game-container");
var selector=document.getElementById("selector");
var turn=document.getElementById("turn");
var level=document.getElementById("level");
var score=document.getElementById("score");
var color=document.getElementsByClassName("color");
var computerTurn=[];
var userTurn=[];
var possibilities=["red","yellow","blue","green"];
var currentScore=0;
var position=0;
var levelPlayed=0;
restart.style.visibility="hidden";
turn.style.visibility="hidden";
// var sounds=["./sounds/red.mp3","./sounds/yellow.mp3","./sounds/blue.mp3","./sounds/green.mp3"];


// function to start the game
start.addEventListener("click",function(){
    start.style.visibility="hidden";
    selector.style.visibility="hidden";
    start.style.visibility="hidden";
    restart.style.visibility="visible";
    turn.style.visibility="visible";
    setTimeout(computer,100);
});

// function to restart the game
restart.addEventListener("click",function(){
    container.style.opacity="1";
    levelPlayed=0;
    currentScore=0;
    level.innerHTML="0";
    score.innerHTML="0";
    computerTurn=[];
    userTurn=[];
    start.style.visibility="visible";
    selector.style.visibility="visible";
    start.style.visibility="visible";
    turn.style.visibility="hidden";
    restart.style.visibility="hidden";
});

// function to generate the random block to be animated
function nextTurn()
{
    var random=Math.trunc(Math.random()*4);
    return random;
}

// function to animate()
function animate(element)
{
   document.getElementById(element).classList.add("animate");
   var audio=document.getElementsByClassName(element); 
   audio[0].play();
   setTimeout(()=>{
      document.getElementById(element).classList.remove("animate");
   },300);
}

// function to animate all the blocks that are a part of the current level's sequence
function playSequence(computerTurn)
{
    computerTurn.forEach((color,index)=>{
        setTimeout(() => {
            animate(color);
        }, (index+1)*600);
    });
}

// function to handle computer"s turn in each round
 function computer()
 {
     levelPlayed++;
     currentScore++;
     score.innerHTML=currentScore;
     userTurn=[];
     container.style.pointerEvents="none";
     turn.innerHTML="COMPUTER'S TURN";
     level.innerHTML=levelPlayed;
     position=nextTurn();
     computerTurn.push(possibilities[position]);
     playSequence(computerTurn); 
    //  calling the user function after all the tiles corresponding to user's turn have been animated.
    // number of blocks to animate=current level.
    // each block animates for 600 ms so total animation time=level*600
    // we have added an additional delay of 1000 ms.
     setTimeout(user,levelPlayed*900);
     
 }


// function to handle user's turn
function user()
{
    container.style.pointerEvents="visible";
    setTimeout(()=>{
        turn.innerHTML="YOUR TURN";
    },500);
}

for(var i=0;i<color.length;i++)
    {
        color[i].addEventListener("click",function(e)
        {
            userTurn.push(e.target.id);
            document.getElementById(e.target.id).classList.add("animate");
            setTimeout(()=>{
                document.getElementById(e.target.id).classList.remove("animate");
            },100);
            var audio=document.getElementsByClassName(e.target.id);
            audio[0].play();
            checkWin();
        });
    }

// function to check the winning condition after each time user presses a block
function checkWin()
{
    if(userTurn[userTurn.length-1]===computerTurn[userTurn.length-1])
    {
        if(userTurn.length===computerTurn.length)
        {
            turn.innerHTML="LEVEL PASSED";
            currentScore++;
            setTimeout(computer,1500);
        }
    }
    else{
        gameOver();
    }
}

// function to end the game when player looses
function gameOver()
{
    container.style.pointerEvents="none";
    var wrong=document.getElementById("wrongAudio");
    wrong.play();
    container.style.opacity="0.5";
    turn.innerHTML="Game over! You lose";
    setTimeout(()=>{
        turn.innerHTML="Press Restart";
    },1000);
}
var leftVal=36;
window.addEventListener("resize",function(){
    leftVal--;
    selector.style.lef=leftVal;
});

