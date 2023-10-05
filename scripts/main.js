import Dialog from "./dialog.js";

window.applyDarkTheme = () => {
	document.body.setAttribute("data-theme", "dark");
	theme_btn.children[0].setAttribute("file", "light");
}
window.applyLightTheme = () => {
	document.body.setAttribute("data-theme", "light");
	theme_btn.children[0].setAttribute("file", "dark");
}
window.toggleTheme = () => {
	document.body.getAttribute("data-theme") == "dark" ? applyLightTheme() : applyDarkTheme();
}

const infoDialog = new Dialog(info_dialog);
infoDialog.cancellable = true;

window.showInfo = () => {
	infoDialog.open();
	if (info_dialog.dataset.loaded) return;
	fetch("info.html")
		.then(response => response.text())
		.then(text => {
			info_dialog.children[0].remove();
			info_dialog.innerHTML = text;
		});
}
window.hideInfo = () => infoDialog.close();
infoDialog.onOpen = pauseMeasure;
infoDialog.onClose = startMeasure;

var preferred_theme = localStorage.getItem("compass-theme");
preferred_theme === "dark" ? applyDarkTheme() : applyLightTheme();

window.addEventListener("beforeunload", () => {
	let current_theme = document.body.getAttribute("data-theme");
	if (current_theme !== preferred_theme) localStorage.setItem("compass-theme", current_theme);
});
