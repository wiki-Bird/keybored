const inputBox = document.querySelector(".hiddenInput");
var tabbed = false;
var start = false;
var timerCount = 0;

let wordsWritten = 0;
let incorrectWords = 0;
let lineWords = 0;
let typingCheck = false;
let timerInterval;


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
            timerInterval = setInterval(increaseTimer, 1000);
        }
        hideExtra(); // hide header and footer
        typingCur();


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
                    // moveCursorRight(letterBefore, false);
                    moveCursorLeft(letterBefore, false);
                }
                else {
                    // if there is a previous word
                    moveCursorLeft(letterBefore, activeWord);
                    if (activeWord.previousSibling) {
                        // if the previous word has the "wordIncorrect" class
                        if (activeWord.previousSibling.classList.contains("wordIncorrect")) {
                            activeWord.classList.remove("wordIncorrect");
                            activeWord.previousSibling.classList.add("active");
                            activeWord.classList.remove("active");
                            wordsWritten--;
                            lineWords--;
                            incorrectWords--;
                        }
                        else{
                            // screen shake
                        }
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
                moveCursorLeft(lastLetter, false);
            }
        }
        else if (newestChar == " " || newestChar == "Enter" || event.inputType == "insertLineBreak" || event.inputType == "insertParagraph") {
            linesCheck();
            wordsWritten++;
            if (nextLetter != false) {
                for (let i = 0; i < activeWord.childNodes.length; i++) {
                    let letter = activeWord.childNodes[i];
                    if (!letter.classList.contains("correct") && !letter.classList.contains("incorrect")) {
                        letter.classList.add("incorrect");
                    }
                }
            }
            // if there is a next word
            let incorrectLetters = activeWord.querySelectorAll(".incorrect");
            if (activeWord.nextSibling) {
                // if there are any incorrect letters in the active word
                if (incorrectLetters.length > 0) {
                    // add the "wordIncorrect" class to the active word
                    activeWord.classList.add("wordIncorrect");
                    incorrectWords++;
                }
                else {
                    // remove wordIncorrect class
                    activeWord.classList.remove("wordIncorrect");
                }
                lineWords++;
                moveCursorRight(nextLetter, activeWord.nextSibling);
                activeWord.nextSibling.classList.add("active");
            }
            else {
                // if there are any incorrect letters in the active word
                if (incorrectLetters.length > 0) {
                    incorrectWords++;
                    activeWord.classList.add("wordIncorrect");
                }
                endRound();
            }
            activeWord.classList.remove("active");
        }
        else {
            // if nextLetter exists check if it's the same as newestChar
            moveCursorRight(nextLetter, false);
            if (nextLetter != false) {
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

let typingTimeout;
function typingCur() {
    typingCheck = true;
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    typingTimeout = setTimeout(function() {
        typingCheck = false;
    }, 500);
}

setInterval(cursorBlink, 500);
const cursor = document.querySelector('.cursorLine');
function cursorBlink() {
    if (tabbed == true && typingCheck == false){
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

function moveCursorRight(nextLetter, activeWord) {
    let XPos, YPos;
    let cursor = document.querySelector(".cursorLine");
    
    // Assuming cursor's parent has position relative
    let parentPosition = cursor.parentElement.getBoundingClientRect();
    
    // Custom offset value to adjust vertical position
    let verticalOffset = 40;
    
    if (activeWord != false) {
        // move cursor to the X start position of ActiveWord
        let activeWordRect = activeWord.getBoundingClientRect();
        XPos = activeWordRect.left;
        YPos = activeWordRect.bottom - 2;
    }
    else {
        // move cursor to the X start position of nextLetter
        let nextLetterRect = nextLetter.getBoundingClientRect();
        XPos = nextLetterRect.right;
        YPos = nextLetterRect.bottom;
    }
    
    // Adjust XPos and YPos relative to the parent element
    let adjustedXPos = XPos - parentPosition.left;
    let adjustedYPos = YPos - parentPosition.top - verticalOffset; // Subtracting the offset

    cursor.style.left = adjustedXPos + "px";
    cursor.style.top = adjustedYPos + "px";
}

function moveCursorLeft(curLetter, curWord) {
    let XPos, YPos;
    let cursor = document.querySelector(".cursorLine");
    let parentPosition = cursor.parentElement.getBoundingClientRect();
    let verticalOffset = 40;

    let activeWord = curWord.previousSibling;
    let nextLetter = curLetter;

    if (curWord != false) {
        let activeWordRect = activeWord.getBoundingClientRect();
        XPos = activeWordRect.right - 11;
        YPos = activeWordRect.bottom - 2;
    }
    else {
        let nextLetterRect = nextLetter.getBoundingClientRect();
        XPos = nextLetterRect.left;
        YPos = nextLetterRect.bottom;
    }

    let adjustedXPos = XPos - parentPosition.left;
    let adjustedYPos = YPos - parentPosition.top - verticalOffset;

    cursor.style.left = adjustedXPos + "px";
    cursor.style.top = adjustedYPos + "px";
}

function endRound() {
    clearInterval(timerInterval);
    
    // make .endStats visible
    
    document.querySelector(".contained").style.opacity = "0.2";
    document.querySelector(".endStats").style.display = "block";
    // wait 1 second
    setTimeout(function() {
        document.querySelector(".contained").style.display = "none";
        document.querySelector(".endStats").style.opacity = "1";
    }, 300);
    let bottomStats = document.querySelector(".bottomStats");
    // add a div to the bottomStats for each stat
    let wpm = Math.round(wordsWritten / (timerCount / 60))|| "0";
    let accuracy = Math.round((wordsWritten / (wordsWritten + incorrectWords)) * 100) || 0;
    let errors = incorrectWords || 0;
    // pb from local storage or 0
    let pb = localStorage.getItem("pb") || 0;
    if (wpm > pb && wpm < 500 && wpm != "Infinity" && accuracy < 70) {
        pb = wpm;
        localStorage.setItem("pb", pb);
    }

    let stats = {"accuracy":accuracy + "%", "words":wordsWritten, "errors":errors, "time taken":timerCount + "s", "pb":pb};
    for (let stat in stats) {
        let statDiv = document.createElement("div");
        statDiv.classList.add("stat");
        let statNum = document.createElement("div"); // Fix: Use document.createElement
        statNum.classList.add("statNum", "highlight");
        statNum.innerHTML = stats[stat];
        let statLabel = document.createElement("div"); // Fix: Use document.createElement
        statLabel.classList.add("statLabel");
        statLabel.innerHTML = stat;
        statDiv.appendChild(statNum);
        statDiv.appendChild(statLabel);
        bottomStats.appendChild(statDiv);
    }
    
    // if not infinity
    if (wpm == "Infinity") {
        wpm = "0";
    }
    document.querySelector(".bigNum").innerHTML = wpm;
    let percent = "0%";

    console.log(wpm)
    // convert to number
    let wpm2 = Number(wpm);
    


    if (wpm2 <= 24) {
        percent = "<5%";
    } else if (wpm2 < 27) {
        percent = "5%";
    } else if (wpm2 < 30) {
        percent = "10%";
    } else if (wpm2 < 32) {
        percent = "15%";
    } else if (wpm2 < 35) {
        percent = "20%";
    } else if (wpm2 < 37) {
        percent = "25%";
    } else if (wpm2 < 39) {
        percent = "30%";
    } else if (wpm2 < 41) {
        percent = "35%";
    } else if (wpm2 < 44) {
        percent = "40%";
    } else if (wpm2 < 46) {
        percent = "45%";
    } else if (wpm2 < 48) {
        percent = "50%";
    } else if (wpm2 < 51) {
        percent = "55%";
    } else if (wpm2 < 54) {
        percent = "60%";
    } else if (wpm2 < 57) {
        percent = "65%";
    } else if (wpm2 < 61) {
        percent = "70%";
    } else if (wpm2 < 65) {
        percent = "75%";
    } else if (wpm2 < 71) {
        percent = "80%";
    } else if (wpm2 < 77) {
        percent = "85%";
    } else if (wpm2 < 81) {
        percent = "90%";
    } else if (wpm2 < 89) {
        percent = "93%";
    } else if (wpm2 < 94) {
        percent = "96%";
    } else if (wpm2 < 100) {
        percent = "97%";
    } else if (wpm2 < 105) {
        percent = "98%";
    } else if (wpm2 < 107) {
        percent = "99%";
    } else if (wpm2 < 112) {
        percent = "99.2%";
    } else if (wpm2 < 115) {
        percent = "99.4%";
    } else if (wpm2 < 119) {
        percent = "99.6%";
    } else if (wpm2 < 123) {
        percent = "99.7%";
    } else if (wpm2 < 127) {
        percent = "99.8%";
    } else if (wpm2 >= 127) {
        percent = "99.9%";
    }

    document.querySelector(".percent").innerHTML = percent;
    



}