//const mail = require("./moduli/mail.js");
const kodovi = require("./moduli/kodovi.js");
const portRest = 10000;
//const totp = require("./moduli/totp.js");
class Autentifikacija {
	async dodajKorisnika(korisnik) {
		let tijelo = {
			ime: korisnik.ime,
			prezime: korisnik.prezime,
			lozinka: kodovi.kreirajSHA256(korisnik.lozinka, "sol"),
			email: korisnik.email,
			korime: korisnik.korime,
		};

		// let tajniTOTPkljuc = totp.kreirajTajniKljuc(korisnik.korime);
		// tijelo["TOTPkljuc"] = tajniTOTPkljuc;

		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
		let odgovor = await fetch(
			`http://localhost:${portRest}/rest/korisnici`,
			parametri
		);

		if (odgovor.status == 200) {
			console.log("Korisnik kreiran!");
			// let mailPoruka = " TOTP Kljuc: " + tajniTOTPkljuc;
			// let poruka = await mail.posaljiMail(
			// 	"rwa@foi.hr",
			// 	korisnik.email,
			// 	"TOTP Kljuc",
			// 	mailPoruka
			// );
			return true;
		} else {
			console.log(odgovor.status);
			console.log(await odgovor.text());
			return false;
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
}

module.exports = Autentifikacija;
