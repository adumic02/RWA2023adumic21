const ds = require("fs/promises");
const totp = require("./moduli/totp.js");
const Autentifikacija = require("./autentifikacija.js");

class HtmlUpravitelj {
	constructor() {
		this.auth = new Autentifikacija();
	}

	pocetna = async function (zahtjev, odgovor) {
		let pocetna = await ucitajStranicu("pocetna");
		odgovor.send(pocetna);
	};

	prijava = async function (zahtjev, odgovor) {
		let greska = "";
		if (zahtjev.method == "POST") {
			var korime = zahtjev.body.korime;
			var lozinka = zahtjev.body.lozinka;
			var korisnik = await this.auth.prijaviKorisnika(korime, lozinka);
			korisnik = JSON.parse(korisnik);
			if (korisnik) {
				console.log(korisnik);
				zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
				zahtjev.session.korime = korisnik.korime;
				odgovor.redirect("/");
				return;

				// let totpKljuc = "ABDC";
				// let totpKod = zahtjev.body.totp;
				// if (!totp.provjeriTOTP(totpKod, totpKljuc)) {
				// 	greska = "TOTP nije dobar!";
				// } else {
				// 	console.log(korisnik);
				// 	zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
				// 	zahtjev.session.korime = korisnik.korime;
				// 	odgovor.redirect("/");
				// 	return;
				// }
			} else {
				greska = "Netocni podaci!";
			}
		}

		let stranica = await ucitajStranicu("prijava", greska);
		odgovor.send(stranica);
	};

	registracija = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		let greska = "";
		if (zahtjev.method == "POST") {
			let uspjeh = await this.auth.dodajKorisnika(zahtjev.body);
			if (uspjeh) {
				odgovor.redirect("/prijava");
				return;
			} else {
				greska = "Dodavanje nije uspjelo provjerite podatke!";
			}
		}

		let stranica = await ucitajStranicu("registracija", greska);
		odgovor.send(stranica);
	};

	odjava = async function (zahtjev, odgovor) {
		zahtjev.session.korisnik = null;
		odgovor.redirect("/");
	};
}

module.exports = HtmlUpravitelj;

async function ucitajStranicu(nazivStranice, poruka = "") {
	let stranice = [ucitajHTML(nazivStranice), ucitajHTML("navigacija")];
	let [stranica, nav] = await Promise.all(stranice);
	stranica = stranica.replace("#navigacija#", nav);
	stranica = stranica.replace("#poruka#", poruka);
	return stranica;
}

function ucitajHTML(htmlStranica) {
	return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}
