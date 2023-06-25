var inputSaved = "";

document.addEventListener("DOMContentLoaded", function() {
    const hiddenInput = document.querySelector(".hiddenInput");
    var valueCur = hiddenInput.value;
    var words = document.querySelector(".words").innerHTML;
    var wordsStart = words;

    hiddenInput.value = ""; // reset textbox on page reload

    hiddenInput.addEventListener("input", function(event) { 
        hideExtra();
        // get length of input
        valueCur = hiddenInput.value;
        var inputLength = valueCur.length;
        // check length of valueCur against length of inputSaved
        if (event.inputType != "deleteContentBackward") {       
            for (let i = inputLength-1; i >= inputSaved.length; i--) {
                console.log(valueCur[i], i, wordsStart[i])
                // if words[i] == valueCur[i] then make words[i] green. words[i] is a charecter in a string, so it can be made green by wrapping it in a span tag with a class of green
                if (wordsStart[i] == valueCur[i]) {
                    console.log("same")
                    document.querySelector(".words").innerHTML = addSpanToString(words, (24*i), "y");
                }
                // else make words[i] red
                else {
                    console.log("different")
                    document.querySelector(".words").innerHTML = addSpanToString(words, (24*i), "n");
                }
                words = document.querySelector(".words").innerHTML;
            }
        }
        else {
            // remove the last span tag from words
            document.querySelector(".words").innerHTML = removeSpanFromString(words, (24*(inputLength+1)));
            words = document.querySelector(".words").innerHTML;
        }

        inputSaved = valueCur;
    });
});

function addSpanToString(string, index, spanClass) {
    const start = string.slice(0, index);
    const middle = `<span class="${spanClass}">${string[index]}</span>`;
    const end = string.slice(index + 1);
    return start + middle + end;
}

function removeSpanFromString(string, index) {
    const start = string.slice(0, index-24);
    console.log(string[index-7], string[index-8])
    const letter = string[index-8];
    const end = string.slice(index);
    return start + letter + end;
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
    }, 2000);

}