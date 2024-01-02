window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	dajZahtjeve();
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

function prikaziZahtjeve(zahtjevi) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>ID</th><th>ID glumca</th><th>ID korisnika</th><th>Statusni kod</th></tr>";
	for (let z of zahtjevi) {
		tablica += "<tr>";
		tablica += "<td>" + z.id + "</td>";
		tablica += "<td>" + z.id_glumca + "</td>";
		tablica += "<td>" + z.korisnik_id + "</td>";
		tablica += "<td>" + z.statusni_kod + "</td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	glavna.innerHTML = tablica;
}
