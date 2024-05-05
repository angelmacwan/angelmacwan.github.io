function dark_mode() {
	document.body.classList.toggle('dark');
	var isDarkModeEnabled = document.body.classList.contains('dark');
	sessionStorage.setItem('darkModeEnabled', isDarkModeEnabled);
}

function applyDarkModePreference() {
	var isDarkModeStored = sessionStorage.getItem('darkModeEnabled');
	if (isDarkModeStored && isDarkModeStored === 'true') {
		document.body.classList.add('dark');
	}
}
applyDarkModePreference();
