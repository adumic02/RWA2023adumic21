let poruka = document.getElementById("poruka");

window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	const params = new URLSearchParams(window.location.search);
	const glumacId = params.get("id");
	dajGlumca(glumacId);
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
const url = `http://localhost:${port}/rest/glumci`;

async function dajGlumca(idGlumca) {
	let odgovor = await fetch(`${url}/${idGlumca}`);
	if (odgovor.status == 200) {
		let podaci = await odgovor.json();
		if (podaci == null) {
			poruka.innerHTML = `<br> Podataka nema! <br> Pritiskom na gumb <b>Zatraži dodavanje</b> možete zatražiti zahtjev za dodavanje glumca u bazu podataka! <br><br> <td><button id='gumb' onClick='posaljiZahtjev(${idGlumca})'>Zatraži dodavanje</button></td>`;
		} else {
			prikaziDetaljeGlumca(podaci);
		}
	} else {
		poruka.innerHTML = "Greška u dohvatu podataka!";
	}
}

function prikaziDetaljeGlumca(glumac) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table id='detalji'>";
	tablica +=
		"<tr><th>Ime i prezime</th><th>Slika</th><th>Biografija</th><th>Popis alternativna imena</th><th>Vrsta</th><th>Popularnost</th><th>Datum rođenja</th><th>Mjesto rođenja</th><th>Datum smrti</th><th>Vanjska stranica</th><th>Popis poznatih naslova</th></tr>";
	tablica += "<tr>";
	tablica += `<td>${glumac.ime_prezime}</td>`;
	tablica += `<td><img src='https://image.tmdb.org/t/p/original/${glumac.slika}' width='100' alt='slika_'/></td>`;
	tablica += `<td>${glumac.biografija}</td>`;
	tablica += `<td>${glumac.alternativna_imena}</td>`;
	tablica += `<td>${glumac.vrsta}</td>`;
	tablica += `<td>${glumac.popularnost}</td>`;
	tablica += `<td>${glumac.datum_rodenja}</td>`;
	tablica += `<td>${glumac.mjesto_rodenja}</td>`;
	tablica += `<td>${glumac.datum_smrti}</td>`;
	tablica += `<td><a href='${glumac.vanjska_stranica}' target='_blank'>${glumac.vanjska_stranica}</a></td>`;
	tablica += `<td>${glumac.naslovi}</td>`;
	tablica += "</tr>";

	tablica += "</table>";

	glavna.innerHTML = tablica;
}

async function posaljiZahtjev(idGlumca) {
	let parametri = {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify({ idGlumca: idGlumca }),
	};
	let odgovor = await fetch("/posaljiZahtjev", parametri);
	if (odgovor.status == 200) {
		poruka.innerHTML = "Zahtjev je uspješno poslan!";
	} else if (odgovor.status == 400) {
		poruka.innerHTML =
			"Zahtjev za ovog glumca već postoji te je u procesu dodavanja!";
	} else {
		poruka.innerHTML = "Greška prilikom slanja zahtjeva!";
	}
}
