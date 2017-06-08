var wordList = ["laura", "donna", "james", "maddy", "shelly", "leo", "leland", "sarah", "bobby", "mike", "audrey", "dale", "ben", "jerry", "norma", "lucy", "andy", "nadine", "pete", "catherine", "hank", "albert", "gordon", "josie", "garland", "ed", "annie", "ronette"]

// var for randomly selected word from array
var chosenWord = "";
// letter in chosen word index
var letterInChosenWord = [];
// number blank variable
var numBlanks = 0;
var blanksAndSuccesses = [];
// tracker for wrong guesses
var wrongGuesses = [];
// tracker for player wins
var winCounter = 0;
// tracker for player losses
var lossCounter = 1;
// player starts off with 10 guesses
var numGuesses = 10;
// function to start the game
function startGame(){
// tying the index of the wrong guesses
wrongGuesses = [];
console.log("wrong guesses in startGame", wrongGuesses);
// player gets 10 misses before game is over
numGuesses = 10;
// blank and success stat
blanksAndSuccesses = [];
// assigns the field for the selected word to the random word selected by computer
chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
// split the letters from the computers chosenword string
lettersInChosenWord = chosenWord.split("");
//assigning the numBlanks to the length of chosenWord
numBlanks = lettersInChosenWord.length;
// console logging the chosenWord
console.log(chosenWord);
// console logging the numBlanks
console.log(numBlanks)
// push "_" in place of the letters.
for(var i = 0; i < numBlanks; i++){
    blanksAndSuccesses.push("_");
}
// console logging the blanksAndSucesses for game
console.log(blanksAndSuccesses);
// retuns the blanksAndSuccesses element from html
document.getElementById('word-blank').innerHTML = blanksAndSuccesses.join(" ");
// returns the guesses-left element from the html
document.getElementById('guesses-left').innerHTML = numGuesses;

}

function checkLetters(letter){

    var letterInWord = false;
    for(var i = 0; i < numBlanks; i++){
        if(chosenWord[i] === letter){
            letterInWord = true;

        }
    }
    
    if(letterInWord){
        for(i = 0; i < numBlanks; i++){
            if(chosenWord[i] === letter){
                blanksAndSuccesses[i] = letter;
        }

    }
    
    }else{
        numGuesses --;
        wrongGuesses.push(letter)
    }

  }


function roundComplete(){
    // pulling the html element word-blank by labeled id and joining the blanksAndSuccesses var
    document.getElementById('word-blank').innerHTML = blanksAndSuccesses.join(" ");
    // pulling the html element guesses-left by id and joining the numGuesses var
    document.getElementById('guesses-left').innerHTML = numGuesses;
    // pulling the html element wrong-guesses by id and joining the wrongGuesses var
    document.getElementById('wrong-guesses').innerHTML = wrongGuesses.join(" ");

    // assign the letters in the chosen word var to the console log
    console.log(lettersInChosenWord);
    // assign the blanksAndSuccesses var to the console log
    console.log(blanksAndSuccesses);
    // assigning condition that if the letters in the chosen word join the space the selection is joined with the blanksAndSuccesses
    if(lettersInChosenWord.join(" ") === blanksAndSuccesses.join(" ")){
        // increase winCounter
        winCounter++;
        alert("You win! A damn fine game of hangman!");
        // pulling the html element win-counter to equal the winCounter var
        document.getElementById('win-counter').innerHTML = winCounter;
        startGame();
        // if there are no more guesses left
    }else if(numGuesses === 0){
        // increase the loss counter
        document.getElementById('loss-counter').innerHTML  = lossCounter ++;
        document.getElementById('wrong-guesses').innerHTML = "";
        //display a taunt
        alert("You lose! Fire walk with me...");  
        startGame();
        var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "Assets/tp.wav"); 
    }


}
// run game
startGame();
// run function of keys being pressed event
document.onkeyup = function(event){
    // assign var for the keys being pressed and make lowercase
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    // send the letter typed to the console and assign as letterGuessed
    console.log("Letter typed", letterGuessed)
    checkLetters(letterGuessed)
    roundComplete();


}