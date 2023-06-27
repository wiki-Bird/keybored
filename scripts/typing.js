const inputBox = document.querySelector(".hiddenInput");
var tabbed = false;
var start = false;
var timerCount = 0;

let wordsWritten = 0;
let wordsCorrect = 0;
let lineWords = 0;


inputBox.addEventListener("focus", function() {
    tabbed = true;
});
inputBox.addEventListener("blur", function() {
    tabbed = false;
});


document.addEventListener("DOMContentLoaded", function() {
    const hiddenInput = document.querySelector(".hiddenInput");
    var words = document.querySelector(".words");
    var valueCur = hiddenInput.value;
    var wordsStart = words.innerHTML;

    hiddenInput.value = ""; // reset textbox on page reload
    var firstWord = words.childNodes[0]; // get first child div of words
    firstWord.classList.add("active"); // give firstword the "active" class


    hiddenInput.addEventListener("input", function(event) { 
        linesCheck();
        if (start == false) { // start timer
            start = true;
            setInterval(increaseTimer, 1000);
        }
        hideExtra(); // hide header and footer


        let activeWord = document.querySelector(".active"); // get the active word
        let newestChar = hiddenInput.value[hiddenInput.value.length - 1]; // get the newest character typed in the textbox
        let nextLetter = checkWord(activeWord.childNodes); // first letter of active word to not have either the "correct" or "incorrect" class
        if (event.inputType == "deleteContentBackward") {
            console.log("Backspace");
            if (nextLetter != false) {
                // remove the "correct"/"incorrect" class from the letter before nextLetter
                let letterBefore = nextLetter.previousSibling;
                // if there is a letter before nextLetter
                if (letterBefore) {
                    console.log("letterBefore exists");
                    if (letterBefore.classList.contains("correct") || letterBefore.classList.contains("incorrect")) {
                        letterBefore.classList.remove("correct");
                        letterBefore.classList.remove("incorrect");
                    }
                }
                else {
                    // if there is a previous word
                    if (activeWord.previousSibling) {
                        // move the active class to the previous word
                        activeWord.classList.remove("wordIncorrect");
                        activeWord.previousSibling.classList.add("active");
                        activeWord.classList.remove("active");
                        wordsWritten--;
                        lineWords--;
                    }
                }
            }
            else {
                // remove the "correct"/"incorrect" class from the last letter
                let lastLetter = activeWord.childNodes[activeWord.childNodes.length - 1];
                if (lastLetter.classList.contains("correct") || lastLetter.classList.contains("incorrect")) {
                    lastLetter.classList.remove("correct");
                    lastLetter.classList.remove("incorrect");
                }
            }
        }
        else if (newestChar == " " || newestChar == "Enter" || event.inputType == "insertLineBreak" || event.inputType == "insertParagraph") {
            linesCheck();
            if (nextLetter != false) {
                for (let i = 0; i < activeWord.childNodes.length; i++) {
                    let letter = activeWord.childNodes[i];
                    if (!letter.classList.contains("correct") && !letter.classList.contains("incorrect")) {
                        letter.classList.add("incorrect");
                    }
                }
            }
            // if there is a next word
            if (activeWord.nextSibling) {
                // if there are any incorrect letters in the active word
                let incorrectLetters = activeWord.querySelectorAll(".incorrect");
                if (incorrectLetters.length > 0) {
                    // add the "wordIncorrect" class to the active word
                    activeWord.classList.add("wordIncorrect");
                }
                else {
                    // remove wordIncorrect class
                    activeWord.classList.remove("wordIncorrect");
                }
                wordsWritten++;
                lineWords++;
                activeWord.nextSibling.classList.add("active");
            }
            activeWord.classList.remove("active");
        }
        else {
            // if nextLetter exists, get the letter after it and check if it's the same as newestChar
            if (nextLetter != false) {
                let nextLetterAfter = nextLetter.nextSibling;
                if (nextLetter && nextLetter.innerHTML == newestChar) {
                    nextLetter.classList.add("correct");
                }
                else if (nextLetter) {
                    nextLetter.classList.add("incorrect");
                }
                else {
                    // log error and info
                    console.log("Error: nextLetter is false");
                }
            }            
            else {
                // screen shake
            }
        }
    });
});

function checkWord(word) {
    // if there are any letters without "correct"/"incorrect" classes, return the last one
    // otherwise return false
    let lastLetter = false;
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];
        if (!letter.classList.contains("correct") && !letter.classList.contains("incorrect")) {
            return letter;
        }
    }
    return lastLetter; 
}

function addSpanToString(val, colour) {
    const middle = `<span class="${colour}">${val}</span>`;
    return middle;
}
    

let timeout;
function hideExtra() {
    // for the next 2 seconds:
    if (timeout) {
        clearTimeout(timeout);
    }
    // make the opacity of the header and footer fade to 0.5
    document.querySelector(".header").style.opacity = "0.2";
    document.querySelector("footer").style.opacity = "0.2";

    timeout = setTimeout(function() {
        // after 2 seconds, make the opacity of the header and footer 1
        document.querySelector(".header").style.opacity = "1";
        document.querySelector("footer").style.opacity = "1";
    }, 1000);

}

// setInterval(cursorBlink, 500);
function cursorBlink() {
    const cursor = document.querySelector('.cursor');
    if (tabbed == true){
        cursor.style.opacity = (cursor.style.opacity === '1') ? '0' : '1';
    }
    else {
        cursor.style.opacity = '1';
    }
}

const timer = document.querySelector(".timer");
function increaseTimer() {
    timerCount += 1;
    timer.innerHTML = timerCount;
}

function linesCheck() {
    console.log(lineWords, line1Len, line2Len)
    // if lineWords is on line 3, delete the first line and move the cursor to the start of the second line
    if (line1Len && lineWords >= (line1Len + line2Len)) {
        let wordsAll = document.querySelector(".words");
        let originlen = line1Len;
        for (let i = 0; i < originlen; i++) {
            wordsAll.removeChild(wordsAll.childNodes[0]);
        }
        pageLines = getLines();
        lineWords = line1Len;
    }
}