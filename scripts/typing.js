const inputBox = document.querySelector(".hiddenInput");
var tabbed = false;
var start = false;

let wordsWritten = 0;
let incorrectWords = 0;
let lineWords = 0;
let typingCheck = false;
let timerInterval;
const timer = document.querySelector(".timer");
const timerStart = timer.innerHTML;
let countDown = false; 
var timerCount = parseInt(timerStart);


inputBox.addEventListener("focus", function() {
    tabbed = true;
    // remove "typeBlur" from typeArea
    document.querySelector(".words").classList.remove("typeBlur");
    document.querySelector(".cursorLine").classList.remove("typeBlur");
    // remove blurText from typeArea
    document.querySelector(".blurText").remove();
});
inputBox.addEventListener("blur", function() {
    tabbed = false;
    // add "typeBlur" to typeArea
    document.querySelector(".words").classList.add("typeBlur");
    document.querySelector(".cursorLine").classList.add("typeBlur");
    // add a new div to typearea with class blurText
    let blurText = document.createElement("div");
    blurText.classList.add("blurText");
    blurText.innerHTML = `<i class="fa-solid fa-arrow-pointer"></i> Click here to focus`;
    document.querySelector(".typeArea").appendChild(blurText);
});


document.addEventListener("DOMContentLoaded", function() {
    const hiddenInput = document.querySelector(".hiddenInput");
    var words = document.querySelector(".words");
    var valueCur = hiddenInput.value;
    var wordsStart = words.innerHTML;

    hiddenInput.value = ""; // reset textbox on page reload
    var firstWord = words.childNodes[0]; // get first child div of words
    firstWord.classList.add("active"); // give firstword the "active" class

    let screenshakeStorage = sessionStorage.getItem("screenShake");


    hiddenInput.addEventListener("keydown", function(event) { 
        linesCheck();
        if (start == false) { // start timer
            start = true;
            if (timerCount > 0 || timerCount != "0") {
                countDown = true;
            }
            timerInterval = setInterval(increaseTimer, 1000);
        }
        hideExtra(); // hide header and footer
        typingCur();


        let activeWord = document.querySelector(".active"); // get the active word
        // let newestChar = hiddenInput.value[hiddenInput.value.length - 1]; // get the newest character typed in the textbox
        let newestChar = event.key; // get the newest character typed in the textbox
        let nextLetter = checkWord(activeWord.childNodes); // first letter of active word to not have either the "correct" or "incorrect" class
        if (event.key === "Backspace") {
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
                    if (activeWord.previousSibling) {
                        // if the previous word has the "wordIncorrect" class
                        if (activeWord.previousSibling.classList.contains("wordIncorrect")) {
                            moveCursorLeft(letterBefore, activeWord);
                            activeWord.classList.remove("wordIncorrect");
                            activeWord.previousSibling.classList.add("active");
                            activeWord.classList.remove("active");
                            wordsWritten--;
                            lineWords--;
                            incorrectWords--;
                        }
                        else{
                            screenShake(screenshakeStorage);
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
            back = false;
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
            
            if (nextLetter != false) {
                moveCursorRight(nextLetter, false);
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
                screenShake(screenshakeStorage);
                console.log(screenshakeStorage);
            }
        }
        // if there is no next word or next letter, we're at the end of the text and the round is over
        if (activeWord.nextSibling == null && nextLetter.nextSibling == null) {
            endRound();
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


function increaseTimer() {
    if (countDown == true) {
        timerCount -= 1;
    }
    else {
        timerCount += 1;
    }
    timer.innerHTML = timerCount;
    if (timerCount <= 0) {
        endRound();
    }
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

let wpm;
let accuracy;
let errors;
let pb = localStorage.getItem("pb") || 0;
function endRound() {
    clearInterval(timerInterval);
    
    // make .endStats visible
    document.querySelector(".contained").style.opacity = "0.1";
    document.querySelector(".endStats").style.display = "block";
    // wait 1 second
    setTimeout(function() {
        document.querySelector(".contained").style.display = "none";
        document.querySelector(".endStats").style.opacity = "1";
    }, 300);
    let bottomStats = document.querySelector(".bottomStats");
    bottomStats.innerHTML = "";
    // add a div to the bottomStats for each stat
    wpm = Math.round(wordsWritten / ((timerCount + parseInt(timerStart)) / 60))|| "0";
    accuracy = Math.round(((wordsWritten - incorrectWords) / wordsWritten) * 100) || 0;
    errors = incorrectWords || 0;

    let stats;
    if (!document.querySelector(".timeStat")) {
        if (wpm > pb && wpm < 500 && wpm != "Infinity" && accuracy < 70) {
            pb = wpm;
            localStorage.setItem("pb", pb);
        }

        stats = {"accuracy":accuracy + "%", "words":wordsWritten, "errors":errors, "time taken":(timerCount + parseInt(timerStart)) + "s", "pb":pb};
    }
    else {

        let allWords = document.querySelectorAll(".word");
        let lettersWritten = 0;
        let letterErrors = 0;
        for (let word of allWords) {
            console.log(word);
            let letters = word.querySelectorAll("letter");
            for (let letter of letters) {
                lettersWritten++;
                if (letter.classList.contains("incorrect")) letterErrors++;
            }
        }

        let timePb = localStorage.getItem("timePb") || 9999;
        let curTime = timerCount + parseInt(timerStart);

        if (curTime < timePb && curTime > 0 && accuracy < 70) {
            timePb = curTime;
            localStorage.setItem("timePb", timePb);
        }

        let accuracyLetters = Math.round(((lettersWritten - letterErrors) / lettersWritten) * 100) || 0;
        stats = {"accuracy":accuracyLetters + "%", "errors":letterErrors, "pb":timePb + "s"};
    }
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
    
    if (!document.querySelector(".timeStat")) {
        // if not infinity
        if (wpm == "Infinity") wpm = "0";
        document.querySelector(".bigNum").innerHTML = wpm;
        
        let percent = "0%";
        console.log(wpm)
        // convert to number
        let wpm2 = Number(wpm);

        const thresholds = [
            { limit: 24, value: "<5%" },
            { limit: 27, value: "5%" },
            { limit: 30, value: "10%" },
            { limit: 32, value: "15%" },
            { limit: 35, value: "20%" },
            { limit: 37, value: "25%" },
            { limit: 39, value: "30%" },
            { limit: 41, value: "35%" },
            { limit: 44, value: "40%" },
            { limit: 46, value: "45%" },
            { limit: 48, value: "50%" },
            { limit: 51, value: "55%" },
            { limit: 54, value: "60%" },
            { limit: 57, value: "65%" },
            { limit: 61, value: "70%" },
            { limit: 65, value: "75%" },
            { limit: 71, value: "80%" },
            { limit: 77, value: "85%" },
            { limit: 81, value: "90%" },
            { limit: 89, value: "93%" },
            { limit: 94, value: "96%" },
            { limit: 100, value: "97%" },
            { limit: 105, value: "98%" },
            { limit: 107, value: "99%" },
            { limit: 112, value: "99.2%" },
            { limit: 115, value: "99.4%" },
            { limit: 119, value: "99.6%" },
            { limit: 123, value: "99.7%" },
            { limit: 127, value: "99.8%" },
            { limit: Infinity, value: "99.9%" }
        ];
        
        for (let threshold of thresholds) {
            if (wpm2 < threshold.limit) {
                percent = threshold.value;
                break;
            }
        }
    } else {
        document.querySelector(".bigNum").innerHTML = (timerCount + parseInt(timerStart));
        if (timerCount + parseInt(timerStart) < 3) {
            percent = "Amazing work! That's really fast.";
        } else if (timerCount + parseInt(timerStart) < 7) {
            percent = "Good work! That's pretty fast.";
        } else {
            percent = "Nice work. Want to try again?";
        }
    }

    document.querySelector(".percent").innerHTML = percent;
}

function share() {
    document.querySelector("footer").style.display = "none";
    document.querySelector(".nav").style.display = "none";
    document.querySelector(".right").style.display = "none";
    html2canvas(document.body).then(function(canvas) {
        var img = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.href = img;
        link.download = 'keyboredShare.png';
        link.click();
    });
    document.querySelector("footer").style.display = "block";
    document.querySelector(".nav").style.display = "block";
    document.querySelector(".right").style.display = "block";
}

function retry() {
    // reload page
    location.reload();
}

function screenShake(screenshake) {
    if (screenshake != "off") {
        // give .page-wrap the "shaking" class for 0.5 seconds
        document.querySelector(".typeArea").classList.add("shaking");
        setTimeout(function() {
            document.querySelector(".typeArea").classList.remove("shaking");
        }, 500);
    }
}