window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	dajKorisnike();
});

port = 10000;
const url = "http://localhost:" + port + "/rest/korisnici";

async function dajKorisnike() {
	let odgovor = await fetch(url);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		prikaziKorisnike(podaci);
	} else {
		poruka.innerHTML = "Greška u dohvatu korisnika!";
	}
}

function prikaziKorisnike(korisnici) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>Ime</th><th>Prezime</th><th>Korisničko ime</th><th>Email</th><th>Uloga korisnika</th></tr>";
	for (let k of korisnici) {
		tablica += "<tr>";
		tablica += "<td>" + k.ime + "</td>";
		tablica += "<td>" + k.prezime + "</td>";
		tablica += "<td>" + k.korime + "</td>";
		tablica += "<td>" + k.email + "</td>";
		tablica += "<td>" + k.uloga_id + "</td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	glavna.innerHTML = tablica;
}