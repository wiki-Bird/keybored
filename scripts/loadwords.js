
function loadwords(num, type) {
    let words = getWords(num);
    let wordArea = document.querySelector(".words");
    wordArea.innerHTML = "";

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

        // console.log(div)
        // console.log("divRightPosition: " + divRightPosition)
        // console.log("rightmostPosition: " + rightmostPosition)

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
    return lines;
}



