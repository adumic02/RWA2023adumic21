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
			`/glumciPretrazivanje?str=${str}&filter=${dajFilter()}`,
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

async function prikaziGlumce(glumci) {
	let admin = await jeAdmin();
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica += "<tr><th>Slika</th><th>Ime i prezime</th></tr>";
	for (let g of glumci) {
		tablica += "<tr>";
		tablica +=
			"<td><img src='https://image.tmdb.org/t/p/original/" +
			g.profile_path +
			"' width='100' alt='slika_'/></td>";
		tablica +=
			"<td><a href='/detalji?id=" + g.id + "'>" + g.original_name + "</a></td>";
		if (admin == true) {
			tablica +=
				"<td><button onClick='dodajUbazu(" +
				g.id +
				")'>Dodaj u bazu</button></td>";
		}
		tablica += "</tr>";
	}
	tablica += "</table>";

	sessionStorage.dohvaceniGlumci = JSON.stringify(glumci);

	glavna.innerHTML = tablica;
}

async function jeAdmin() {
	try {
		let odgovor = await fetch("/provjeriKorisnika");
		if (odgovor.status == 200) {
			let podaci = await odgovor.json();
			return podaci.admin;
		} else {
			console.log("Nije moguće provjeriti ovlasti!");
			return false;
		}
	} catch (error) {
		console.log("Pogreška: ", error);
		return false;
	}
}

async function dodajUbazu(idGlumca) {
	try {
		let glumci = JSON.parse(sessionStorage.dohvaceniGlumci);
		for (let glumac of glumci) {
			if (idGlumca == glumac.id) {
				let parametri = {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify(glumac),
				};
				let odgovor = await fetch("/dodajGlumca", parametri);
				console.log(odgovor);
				if (odgovor.status == 200) {
					let podaci = await odgovor.json();
					console.log(podaci);
					poruka.innerHTML = "Glumac dodan u bazu!";
				} else if (odgovor.status == 400) {
					poruka.innerHTML = "Glumac već postoji u bazi podataka";
				} else {
					poruka.innerHTML = "Greška prilikom dodavanja glumca!";
				}
				break;
			}
		}
	} catch (greska) {
		throw greska;
	}
}

function dajFilter() {
	return document.getElementById("filter").value;
}
