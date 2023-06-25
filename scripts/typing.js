const inputBox = document.querySelector(".hiddenInput");
var tabbed = false;
inputBox.addEventListener("focus", function() {
    tabbed = true;
});
inputBox.addEventListener("blur", function() {
    tabbed = false;
});



document.addEventListener("DOMContentLoaded", function() {
    const hiddenInput = document.querySelector(".hiddenInput");
    var words2 = document.querySelector(".words2");
    var valueCur = hiddenInput.value;
    var words = document.querySelector(".words").innerHTML;
    var wordsStart = words;

    hiddenInput.value = ""; // reset textbox on page reload


    hiddenInput.addEventListener("input", function(event) { 
        hideExtra();
        valueCur = hiddenInput.value;
        var inputLength = valueCur.length;

        // delete the cursor
        words2.innerHTML = words2.innerHTML.slice(0, -24);

        if (event.inputType == "deleteContentBackward") {  
            words2.innerHTML = words2.innerHTML.slice(0, -24);
        }
        else {
            console.log(valueCur.slice(-1), wordsStart[inputLength-1])
            if (valueCur.slice(-1) == wordsStart[inputLength-1]){
                console.log("correct");
                words2.innerHTML += addSpanToString(wordsStart[inputLength-1], "y");
            }
            else {
                console.log("incorrect");
                words2.innerHTML += addSpanToString(wordsStart[inputLength-1], "n");
            }
        }
        // readd cursor
        words2.innerHTML += `<span class="cursor">︳</span>`;
    });
});

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

setInterval(cursorBlink, 500);
function cursorBlink() {
    if (tabbed == true){
        const cursor = document.querySelector('.cursor');
        cursor.style.opacity = (cursor.style.opacity === '1') ? '0' : '1';
    }
}