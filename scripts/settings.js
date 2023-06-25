// function saveSettings() {
    
// }

function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      } 
}

function changeTheme(colour) {
    var theme = document.getElementById("theme");
    var systemTheme;
    if (colour == "system") {
        systemTheme = getSystemTheme();
    }
    if (colour == "dark" || systemTheme == "dark") {
        theme.href = "styles/dark.css";
        sessionStorage.setItem("theme", "dark");
    }
    else if (colour == "light" || systemTheme == "light") {
        theme.href = "styles/light.css";
        sessionStorage.setItem("theme", "light");
    }
    if (colour == "system") {
        sessionStorage.setItem("theme", "system");
    }
}

function changeFont(font) {
    var book = document.getElementById("font");

    if (font == "sans") {
        book.href = "styles/sans.css";
        sessionStorage.setItem("font", "sans");
    }
    else if (font == "serif") {
        book.href = "styles/serif.css";
        sessionStorage.setItem("font", "serif");
    }
    else {
        book.href = "styles/mono.css";
        sessionStorage.setItem("font", "mono");
    }
}