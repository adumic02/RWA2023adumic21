let poruka = document.getElementById("poruka");

window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	dajZahtjeve();
});

document.addEventListener("DOMContentLoaded", function () {
	const trenutnaStranica = window.location.pathname;
	const stranice = document.querySelectorAll("nav ul li a");

	stranice.forEach((stranica) => {
		if (stranica.getAttribute("href") == trenutnaStranica) {
			stranica.classList.add("aktivno");
		}
	});
});

port = 10000;
const url = `http://localhost:${port}/rest/zahtjevi`;

async function dajZahtjeve() {
	let odgovor = await fetch(url);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		prikaziZahtjeve(podaci);
	} else {
		poruka.innerHTML = "Greška u dohvatu zahtjeva!";
	}
}

async function prikaziZahtjeve(zahtjevi) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>Zahtjev zatražio</th><th>Ime i prezime glumca</th><th></th></tr>";
	for (let z of zahtjevi) {
		if (z.statusni_kod == 0) {
			tablica += "<tr>";
			tablica += `<td>${z.korisnik_korime}</td>`;
			tablica += `<td>${z.ime_prezime_glumca}</td>`;
			tablica += `<td><button id='gumb' onClick='dodajUbazu(${z.id}, ${z.id_glumca}, "${z.ime_prezime_glumca}")'>Spremi</button></td>`;
			tablica += "</tr>";
		}
	}
	tablica += "</table>";

	glavna.innerHTML = tablica;
}

async function dodajUbazu(idZahtjeva, idGlumca, imePrezimeGlumca) {
	let tijelo = {
		id_glumca: idGlumca,
		ime_prezime_glumca: imePrezimeGlumca,
	};
	let parametri = {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(tijelo),
	};
	let odgovor = await fetch("/izvrsiZahtjev", parametri);
	if (odgovor.status == 200) {
		await azurirajStatus(1, idZahtjeva);
		poruka.innerHTML = "Dodavanje glumca u bazu podataka ... <br><br>";
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	} else if (odgovor.status == 400) {
		await azurirajStatus(1, idZahtjeva);
		poruka.innerHTML = "Glumac već postoji u bazi podataka <br><br>";
	} else {
		poruka.innerHTML = "Greška prilikom dodavanja glumca! <br><br>";
	}
}

async function azurirajStatus(status, id) {
	let zaglavlje = new Headers();
	zaglavlje.set("Content-Type", "application/json");

	let parametri = {
		method: "PUT",
		body: JSON.stringify({ statusni_kod: status }),
		headers: zaglavlje,
	};
	let odgovor = await fetch(
		`http://localhost:${port}/rest/zahtjevi/${id}`,
		parametri
	);

	if (odgovor.status == 200) {
		return true;
	} else {
		return false;
	}
}
