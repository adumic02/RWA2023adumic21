window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	dajGlumca();
});

port = 10000;
const url = `http://localhost:${port}/prikaziGlumca`;

async function dajGlumca() {
	let odgovor = await fetch(url);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		prikaziDetaljeGlumca(podaci);
	} else {
		poruka.innerHTML = "Greška u dohvatu podataka!";
	}
}

function prikaziDetaljeGlumca(glumac) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica += "<tr><th>Ime i prezime</th><th>Biografija</th></tr>";
	tablica += "<tr>";
	tablica += "<td>" + glumac.ime_prezime + "</td>";
	tablica += "<td>" + glumac.biografija + "</td>";
	tablica += "</tr>";

	tablica += "</table>";

	glavna.innerHTML = tablica;
}
