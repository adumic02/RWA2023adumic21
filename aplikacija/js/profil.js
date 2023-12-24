window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	dajKorisnika();
});

port = 10000;
const url = `http://localhost:${port}/prikaziProfil`;

async function dajKorisnika() {
	let odgovor = await fetch(url);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		prikaziPodatke(podaci);
	} else {
		poruka.innerHTML = "Greška u dohvatu podataka!";
	}
}

function prikaziPodatke(korisnik) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>Ime</th><th>Prezime</th><th>Korisničko ime</th><th>Email</th><th>Uloga korisnika</th></tr>";
	tablica += "<tr>";
	tablica += "<td>" + korisnik.ime + "</td>";
	tablica += "<td>" + korisnik.prezime + "</td>";
	tablica += "<td>" + korisnik.korime + "</td>";
	tablica += "<td>" + korisnik.email + "</td>";
	tablica += "<td>" + korisnik.uloga_id + "</td>";
	tablica += "</tr>";
	tablica += "</table>";

	glavna.innerHTML = tablica;
}
