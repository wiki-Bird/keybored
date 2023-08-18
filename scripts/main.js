// on page load
var pageLines = {};

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

        var screenShake = sessionStorage.getItem("screenShake");
        if (screenShake == "off") {
            document.getElementById("shakeOff").checked = true;
        }
        else {
            document.getElementById("shakeOn").checked = true;
        }
    }
    else {
        if (document.fonts) {
            document.fonts.ready.then(function() {
                pageLines = getLines();
                console.log(pageLines);
            });
        }
        else {
            setTimeout(function() {
                pageLines = getLines();
                console.log(pageLines);
            }, 500);
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

        let resizing = false;
        window.addEventListener("resize", function() {
            console.log("resizing");
            if (!resizing) {
                resizing = true;
                setTimeout(function() {
                    pageLines = getLines();
                    resizing = false;
                }, 500);
            }
        });

        // click into text box on page load
        document.querySelector(".hiddenInput").focus();
    }
});


