// on page load
document.addEventListener("DOMContentLoaded", function() {
    var theme = sessionStorage.getItem("theme");
    if (theme) {
        changeTheme(theme);
    } else {
        changeTheme("system");
    }

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
    }
});


