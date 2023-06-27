// on page load
document.addEventListener("DOMContentLoaded", function() {
    var theme = sessionStorage.getItem("theme");
    if (theme) {
        changeTheme(theme);
    } else {
        changeTheme("system");
    }
    
    var fonts = sessionStorage.getItem("font");
    changeFont(fonts);

    if (document.querySelector(".toggle")) {
        var theme = sessionStorage.getItem("theme");
        if (theme == "dark") {
            document.getElementById("dark").checked = true;
        }
        else if (theme == "light") {
            document.getElementById("light").checked = true;
        }
        else {
            document.getElementById("system").checked = true;
        }

        var font = sessionStorage.getItem("font");
        if (font == "mono") {
            document.getElementById("mono").checked = true;
        }
        else if (font == "sans") {
            document.getElementById("sans").checked = true;
        }
        else {
            document.getElementById("serif").checked = true;
        }
    }
    else {
        loadwords(40, "words");
        // console.log(getLines(document.querySelector(".words").childNodes[0]));
        if (document.fonts) {
            document.fonts.ready.then(function() {
                const lines = getLines();
                console.log(lines);
            });
        }
        else {
            setTimeout(function() {
                const lines = getLines();
                console.log(lines);
            }, 1000);
        }

        // disable ctrl/cmd keys in divs with class "no-copy-paste"
        var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        vKey = 86,
        cKey = 67;

        document.onkeydown = function(e) {
            if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
        }
        document.onkeyup = function(e) {
            if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
        }

        document.querySelector(".no-copy-paste").onkeydown = function(e) {
            if (ctrlDown) return false;
        }
    }
});


