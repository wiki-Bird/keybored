
function loadwords(num, type) {
    let words = getWords(num);
    let wordArea = document.querySelector(".words");
    wordArea.innerHTML = "";
    // make every word <div class="word"><letter>a</letter><letter>b</letter></div> where a, b, etc. are the letters of the word
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
    // let contentDiv = document.querySelector(".words");
    // let cloneDiv = document.querySelector(".words2");

    // let words = contentDiv.innerHTML.split(" ");
    // let lines = [];
    // let line = "";

    // for (let word of words) {

    // }

}


