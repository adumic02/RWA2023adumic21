let poruka = document.getElementById("poruka");

window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	dajGlumce(1);
	document.getElementById("filter").addEventListener("keyup", (event) => {
		dajGlumce(1);
	});
});

async function dajGlumce(str) {
	const filterVelicina = dajFilter();
	if (filterVelicina.length >= 3) {
		let parametri = { method: "POST" };
		let odgovor = await fetch(
			"/rest/glumci?str=" + str + "&filter=" + dajFilter(),
			parametri
		);
		if (odgovor.status == 200) {
			let podaci = await odgovor.text();
			podaci = JSON.parse(podaci);
			prikaziGlumce(podaci.results);
			prikaziStranicenje(podaci.page, podaci.total_pages, "dajGlumce");
		} else {
			poruka.innerHTML = "Greška u dohvatu glumaca!";
		}
	}
}

function prikaziGlumce(glumci) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica += "<tr><th>Slika</th><th>Ime i prezime</th></tr>";
	for (let g of glumci) {
		tablica += "<tr>";
		tablica +=
			"<td><img src=' https://image.tmdb.org/t/p/original/" +
			g.profile_path +
			"' width='100' alt='slika_'/></td>";
		tablica += "<td><a href=''>" + g.original_name + "</a></td>";
		tablica +=
			"<td><button onClick='dodajUbazu(" +
			g.id +
			")'>Dodaj u bazu</button></td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	sessionStorage.dohvaceniGlumci = JSON.stringify(glumci);

	glavna.innerHTML = tablica;
}

async function dodajUbazu(idGlumca) {
	let glumci = JSON.parse(sessionStorage.dohvaceniGlumci);
	for (let glumac of glumci) {
		if (idGlumca == glumac.id) {
			let parametri = { method: "POST", body: JSON.stringify(glumac) };
			let odgovor = await fetch("/dodajGlumca", parametri);
			if (odgovor.status == 200) {
				let podaci = await odgovor.text();
				console.log(podaci);
				poruka.innerHTML = "Glumac dodan u bazu!";
			} else {
				poruka.innerHTML = "Greška prilikom dodavanja glumca!";
			}
			break;
		}
	}
}

function dajFilter() {
	return document.getElementById("filter").value;
}
