var gamePattern = [];
var userPattern=[];
var level=0;

var buttonColors = ["red" , "blue", "green" , "yellow"];
var started;

$(document).on("keydown",function(){
    if (!started){
        nextSequence();
        started=true;
        
    }
});


function nextSequence(){
    userPattern=[];
  $("h1").text("Level "+(gamePattern.length+1));
  var randomNumber = Math.round((Math.random()*3));
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $(".btn."+randomChosenColor).fadeOut(100).fadeIn(100);
  

  playSound(randomChosenColor)

  level++;
  $("h1").text("Level "+level);

}

$(".btn").on("click",function(event){
        var color=event.target.id;
        userPattern.push(color);
        $(".btn."+color).fadeOut(100).fadeIn(100);
        playSound(color);

        checkAnswer(userPattern.length-1);

})

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userPattern[currentLevel]){
        console.log("success");
        if (userPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);}
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200);
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").text("Oyun bitti, yeniden baslamak icin bir tusa bas!");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


