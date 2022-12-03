let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let gameIsOver = false;

let isStarted = false;
$(document).keypress(function () {
    if (isStarted == false) {
        nextSequence();
        isStarted = true;
    }
});
$(document).click(function () {
    if (isStarted == false) {
        nextSequence();
        isStarted = true;
    }
});



function nextSequence() {

    userClickedPattern = [];    //very imp step

    let randomNumber = Math.floor(((Math.random() * 4)));

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);
    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
}



$(".btn").click(function () {

    if (isStarted === true) {
        let userChosenColour = $(this).attr("id");
    
        userClickedPattern.push(userChosenColour);
    
        playSound(userChosenColour);
        animatePress(userChosenColour);
    
        checkAnswer(userClickedPattern.length - 1);

    }
});





function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}



function animatePress(name) {

    $("." + name).addClass("pressed");
    setTimeout(function () {
        $("." + name).removeClass("pressed");
    }, 150);
}



function checkAnswer(currentLevel) {

    if(gameIsOver === false) {

        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
            if(gamePattern.length === userClickedPattern.length) {
    
                setTimeout(() => {
                    nextSequence();
                }, 1000);
    
            }
    
        }
    
        else {
            gameOver();
        }


    }

}




function gameOver() {

    // gameOver = true;
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, press any key to Restart!");

    gameIsOver = true;
    
}


$(document).click(function() {
    if(gameIsOver === true) {

        restart();

    }
});


function restart() {

    level = 0;
    gameIsOver = false;
    isStarted = false;
    gamePattern = [];
    userClickedPattern = [];
}







//for responsive viewing
let width = window.innerWidth;

if(width<1200) {
    $("#level-title").text("Tap to Start");
}
