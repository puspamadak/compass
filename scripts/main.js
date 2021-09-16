var preferred_theme = localStorage.getItem("compass-theme");
if (preferred_theme === "dark") applyDarkTheme();

function applyDarkTheme() {
	document.body.setAttribute("data-theme", "dark");
	theme_btn.querySelector("use").setAttribute("href", "icons/light.svg#content");
}
function applyLightTheme() {
	document.body.setAttribute("data-theme", "light");
	theme_btn.querySelector("use").setAttribute("href", "icons/dark.svg#content");
}
function toggleTheme() {
	if (document.body.getAttribute("data-theme") == "dark") applyLightTheme();
	else applyDarkTheme();
}

function showInfo() {
	info.style.display = "flex";
	info.animate({ transform: ["translateY(-100vh)", "translateY(0)"] }, { duration: 500, fill: "forwards" });
	let loader = info_content.querySelector(".loader");
	if (loader !== null) {
		fetch("info.html").then(response => response.text()).then(text => {
			info_content.removeChild(loader);
			info_content.attachShadow({ mode: "open" });
			info_content.shadowRoot.innerHTML = text;
		});
	}
	pauseMeasure();
}

function hideInfo() {
	let anim = info.animate({ transform: ["translateY(0)", "translateY(-100vh)"] }, { duration: 500, fill: "forwards" });
	anim.onfinish = () => { info.style.display = "none"; };
	startMeasure();
}

window.onbeforeunload = () => {
	let current_theme = document.body.getAttribute("data-theme");
	if (current_theme !== preferred_theme) localStorage.setItem("compass-theme", current_theme);
};