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
		"<tr><th>Ime</th><td>" +
		korisnik.ime +
		"</td><td><button onClick='azurirajPodatak(" +
		korisnik.ime +
		")'>Ažuriraj</button></td></tr>";
	tablica +=
		"<tr><th>Prezime</th><td>" +
		korisnik.prezime +
		"</td><td><button onClick='azurirajPodatak(" +
		korisnik.prezime +
		")'>Ažuriraj</button></td></tr>";
	tablica +=
		"<tr><th>Korisničko ime</th><td>" +
		korisnik.korime +
		"</td><td>Nije moguće ažurirati</td></tr>";
	tablica +=
		"<tr><th>Email</th><td>" +
		korisnik.email +
		"</td><td>Nije moguće ažurirati</td></tr>";
	tablica +=
		"<tr><th>Uloga</th><td>" +
		korisnik.uloga_id +
		"</td><td>Nije moguće ažurirati</td></tr>";
	tablica += "</table>";

	glavna.innerHTML = tablica;
}
