let poruka = document.getElementById("poruka");

window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	dajGlumce(1);
	document.getElementById("filter").addEventListener("keyup", (event) => {
		dajGlumce(1);
	});
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
	tablica += "<tr><th>Slika</th><th>Ime i prezime</th>";
	if (admin == true) {
		tablica += "<th></th>";
	}
	tablica += "</tr>";
	for (let g of glumci) {
		tablica += "<tr>";
		tablica += `<td><img src='https://image.tmdb.org/t/p/original/${g.profile_path}' width='200px' alt='slika_'/></td>`;
		tablica += `<td><a href='/detalji?id=${g.id}'>${g.original_name}</a></td>`;
		if (admin == true) {
			tablica += `<td><button id='gumb' onClick='dodajUbazu(${g.id})'>Spremi</button></td>`;
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
			return false;
		}
	} catch (greska) {
		console.log("Pogreška: ", greska);
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
				if (odgovor.status == 200) {
					let podaci = await odgovor.json();
					poruka.innerHTML = "Glumac dodan u bazu! <br><br>";
				} else if (odgovor.status == 400) {
					poruka.innerHTML = "Glumac već postoji u bazi podataka! <br><br>";
				} else {
					poruka.innerHTML = "Greška prilikom dodavanja glumca! <br><br>";
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
