let line1Len;
let line2Len;
let line3Len;

function loadwords(num, type) {
    let wordArea = document.querySelector(".words");
    wordArea.innerHTML = "";

    if (type == "words") {
        let words = getWords(num);

        for (let word of words) {
            let wordDiv = document.createElement("div");
            wordDiv.classList.add("word");
            for (let letter of word) {
                let letterDiv = document.createElement("letter");
                letterDiv.innerHTML = letter;
                wordDiv.appendChild(letterDiv);
            }
            wordArea.appendChild(wordDiv);
        }
    }
    else if (type == "alphabet") {
        let alphabet = "abcdefghijklmnopqrstuvwxyz";

        let alphabetDiv = document.createElement("div");
        alphabetDiv.classList.add("word");
        for (let letter of alphabet) {
            let letterDiv = document.createElement("letter");
            letterDiv.innerHTML = letter;
            alphabetDiv.appendChild(letterDiv);
        }
        wordArea.appendChild(alphabetDiv);
    }
}

function getWords(num) {
    if (text["Words"]) {
        let words = text["Words"].split(" ");
        let wordlist = [];
        for (let i = 0; i < num; i++) {
            wordlist.push(words[Math.floor(Math.random() * words.length)]);
        }
        return wordlist;
    }
}

function getLines() {
    let words = document.querySelector(".words");
    let divs = words.children;
    // lines as an object where the key is the line number and the value is an array of divs
    let lines = {};
    let currentRow = 0;
    let rightmostPosition = 0;

    for (let i = 0; i < divs.length; i++) {
        let div = divs[i];
        let divRect = div.getBoundingClientRect();
        let divRightPosition = divRect.right;

        if (i === 0) { // first row
            lines[currentRow] = [div];
            rightmostPosition = divRightPosition;
        }
        else if (divRightPosition >= rightmostPosition) { // same row
            lines[currentRow].push(div);
            rightmostPosition = divRightPosition; // update the rightmost position
        }
        else { // new row
            currentRow++;
            lines[currentRow] = [div];
            rightmostPosition = divRightPosition; // update the rightmost position for the new row
        } 
    }
    line1Len = lines[0].length;
    // if there is a second line
    if (lines[1]) {
        line2Len = lines[1].length;
    }
    else {
        line2Len = 0;
    }
    // if there is a third line
    if (lines[2]) {
        line3Len = lines[2].length;
    }
    else {
        line3Len = 0;
    }
    return lines;
}



