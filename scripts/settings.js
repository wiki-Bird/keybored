// function saveSettings() {
    
// }

function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      } 
    //   else {
    //     return 'no-preference';
    //   }
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
