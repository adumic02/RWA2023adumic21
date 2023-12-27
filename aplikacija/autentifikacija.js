const kodovi = require("./moduli/kodovi.js");
const portRest = 10000;
const totp = require("./moduli/totp.js");
class Autentifikacija {
	async dodajKorisnika(korisnik) {
		let tijelo = {
			ime: korisnik.ime,
			prezime: korisnik.prezime,
			lozinka: kodovi.kreirajSHA256(korisnik.lozinka, "sol"),
			email: korisnik.email,
			korime: korisnik.korime,
			totp: korisnik.totp,
		};

		let tajniTOTPkljuc = totp.kreirajTajniKljuc(korisnik.korime);
		tijelo["totp"] = tajniTOTPkljuc;

		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
		if (
			tijelo["lozinka"].length > 0 &&
			tijelo["korime"].length > 0 &&
			tijelo["email"].length > 0
		) {
			let odgovor = await fetch(
				`http://localhost:${portRest}/rest/korisnici`,
				parametri
			);
			if (odgovor.status == 200) {
				console.log("Korisnik kreiran!");
				return tijelo.totp;
			} else {
				console.log(odgovor.status);
				console.log(await odgovor.text());
				return false;
			}
		}
	}

	async prijaviKorisnika(korime, lozinka) {
		lozinka = kodovi.kreirajSHA256(lozinka, "sol");
		let tijelo = {
			lozinka: lozinka,
		};
		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
		let odgovor = await fetch(
			`http://localhost:${portRest}/rest/korisnici/${korime}/prijava`,
			parametri
		);

		if (odgovor.status == 200) {
			return await odgovor.text();
		} else {
			return false;
		}
	}

	async azurirajKorisnika(ime, prezime, korime) {
		let podaci = {
			ime: ime,
			prezime: prezime,
		};

		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "PUT",
			body: JSON.stringify(podaci),
			headers: zaglavlje,
		};
		let odgovor = await fetch(
			`http://localhost:${portRest}/rest/korisnici/${korime}`,
			parametri
		);

		if (odgovor.status == 200) {
			console.log("Korisnik ažuriran!");
			return true;
		} else {
			console.log(odgovor.status);
			console.log(await odgovor.text());
			return false;
		}
	}
}

module.exports = Autentifikacija;
