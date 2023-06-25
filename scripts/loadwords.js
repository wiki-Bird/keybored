
function loadwords(num, type) {
    let words = getWords(num);
    let wordArea = document.querySelector(".words");
    wordArea.innerHTML = "";
    for (let i = 0; i < words.length; i++) {
        wordArea.innerHTML += `${words[i]} `;
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