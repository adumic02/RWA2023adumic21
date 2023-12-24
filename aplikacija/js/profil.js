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
	let forma = "<form action='/profil' method='POST'>";
	forma += "<label for='ime'>Ime: </label>";
	forma +=
		"<input type='text' name='ime' id='ime' value='" +
		korisnik.ime +
		"' /><br>";
	forma += "<label for='prezime'>Prezime: </label>";
	forma +=
		"<input type='text' name='prezime' id='prezime' value='" +
		korisnik.prezime +
		"' /><br>";
	forma += "<label for='korime'>Korisničko ime: </label>";
	forma +=
		"<input type='text' name='korime' id='korime' placeholder='" +
		korisnik.korime +
		"' readonly /><br>";
	forma += "<label for='email'>E-mail: </label>";
	forma +=
		"<input type='text' name='email' id='email' placeholder='" +
		korisnik.email +
		"' readonly /><br>";
	forma += "<label for='uloga'>Uloga: </label>";
	forma +=
		"<input type='text' name='uloga' id='uloga' placeholder='" +
		korisnik.uloga_id +
		"' readonly /><br><br>";
	forma += "<input type='submit' value='Ažuriraj' />";
	forma += "</form>";
	glavna.innerHTML = forma;
}
