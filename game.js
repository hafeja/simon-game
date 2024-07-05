var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

// workaround for https://developer.chrome.com/blog/autoplay/
$("#level-title").on("click", function(){
    $("#level-title").text("Level " + level);
    if (!started){
        started = true;
        nextSequence();
    }
})

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level, userClickedPattern.length -1);

    //console.log(userClickedPattern);
})

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);   
    $("#" + randomChosenColour).fadeIn(100).fadeOut(200).fadeIn(50);
    playSound(randomChosenColour);
}

function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){ $("#" + currentColour).removeClass("pressed") }, 100);
}

function checkAnswer(currentLevel, indexLastAnswer) {
    console.log(gamePattern);
    console.log(userClickedPattern);
    if (gamePattern[indexLastAnswer] === userClickedPattern[indexLastAnswer]){
        console.log("correct");
        if(currentLevel -1 === indexLastAnswer){
            setTimeout(function(){ nextSequence() }, 1000);
        }
    } else {
        console.log("Incorrect");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over! Click HERE to Restart.");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
