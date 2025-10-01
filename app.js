function dark_mode() {
    document.body.classList.toggle('dark');
    var isDarkModeEnabled = document.body.classList.contains('dark');
    localStorage.setItem('darkModeEnabled', isDarkModeEnabled);
}

function applyDarkModePreference() {
    var isDarkModeStored = localStorage.getItem('darkModeEnabled');
    if (isDarkModeStored && isDarkModeStored === 'true') {
        document.body.classList.add('dark');
    }
}

function main() {
    applyDarkModePreference();
}