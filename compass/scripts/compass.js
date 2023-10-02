const direction_labels = [
	['txt-n', 'txt-ne', 'txt-e', 'txt-se', 'txt-s', 'txt-sw', 'txt-w', 'txt-nw'],
	["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
];

function createMarks() {
	for (let angle = 0; angle < 360; angle += 3) {
		let mark;
		if (angle % 15 == 0) {
			mark = major_mark_template.cloneNode();
			major_marks_group.appendChild(mark);
			var text = angle_text_template.cloneNode();
			text.setAttribute("data-degree", angle);
			text.removeAttribute("id");
			text.appendChild(document.createTextNode(angle));
			text.style.transform = `rotate(${angle}deg)`;
			angle_texts_group.appendChild(text);
		} else {
			mark = minor_mark_template.cloneNode();
			minor_marks_group.appendChild(mark);
		}
		mark.removeAttribute("id");
		mark.setAttribute("data-degree", angle);
		mark.style.transform = `rotate(${angle}deg)`;
	}
}
function createDirections() {
	for (let angle = 0; angle < 360; angle += 45) {
		var text = direction_text_template.cloneNode();
		var arr_index = angle / 45;
		text.id = direction_labels[0][arr_index];
		text.appendChild(document.createTextNode(direction_labels[1][arr_index]));
		text.setAttribute("data-degree", angle);
		text.style.transform = `rotate(${angle}deg)`;
		direction_texts_group.appendChild(text);
	}
}

function rotateDial(angle) {
	dial.style.transform = `rotate(${angle}deg)`;
}

function checkSupport(e) {
	if (e.alpha != null && e.alpha != undefined) {
		console.log("Hello")
		//Sensor present
		createMarks();
		createDirections();
		overlay.style.display = "none";
		compass.style.display = "initial";
		startMeasure();
		window.removeEventListener("deviceorientationabsolute", checkSupport);
	} else overlay.innerHTML = "Your device does not have a magnetometer sensor!";
}
function measure(e) {
	var angle = e.alpha ?? 0;
	rotateDial(angle);
	angle_text.innerHTML = `${360 - Math.round(angle)}&deg;`;
	let half_angle = 382.5 - angle;
	direction_text.innerHTML = direction_labels[1][parseInt(half_angle > 360 ? 0 : half_angle / 45)];
}
function pauseMeasure() {
	window.removeEventListener("deviceorientationabsolute", measure);
}
function startMeasure() {
	window.addEventListener("deviceorientationabsolute", measure);
}
window.addEventListener("deviceorientationabsolute", checkSupport);