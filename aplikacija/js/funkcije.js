function prikaziStranicenje(str, ukupno, funkcijaZaDohvat) {
	let prikaz = document.getElementById("stranicenje");
	html = "";
	str = parseInt(str);
	if (str > 1) {
		html = '<button onClick="' + funkcijaZaDohvat + '(1)"><<</button>';
		html +=
			'<button onClick="' +
			funkcijaZaDohvat +
			"(" +
			(str - 1) +
			')"><</button>';
	}
	html +=
		'<button onClick="' +
		funkcijaZaDohvat +
		"(" +
		str +
		')">' +
		str +
		"/" +
		ukupno +
		"</button>";
	if (str < ukupno) {
		html +=
			'<button onClick="' +
			funkcijaZaDohvat +
			"(" +
			(str + 1) +
			')">></button>';
		html +=
			'<button onClick="' + funkcijaZaDohvat + "(" + ukupno + ')">>></button>';
	}
	prikaz.innerHTML = html;
}
