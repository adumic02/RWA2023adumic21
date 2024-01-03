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
		let port = 10000;
		let url = `http://localhost:${port}/rest/korisnici/`;
		if (zahtjev.method == "POST") {
			var korime = zahtjev.body.korime;
			var lozinka = zahtjev.body.lozinka;
			var korisnik = await this.auth.prijaviKorisnika(korime, lozinka);
			korisnik = JSON.parse(korisnik);
			if (korisnik) {
				let podaci = await fetch(url + korime);
				let parsiraniPodaci = await podaci.json();
				let totpKljuc = parsiraniPodaci.totp;
				let totpKod = zahtjev.body.totp;
				if (!totp.provjeriTOTP(totpKod, totpKljuc)) {
					greska = "TOTP nije dobar!";
				} else {
					console.log("Prijava uspješna!");
					console.log(korisnik);
					zahtjev.session.korisnikID = korisnik.id;
					zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
					zahtjev.session.korime = korisnik.korime;
					zahtjev.session.email = korisnik.email;
					zahtjev.session.uloga_id = korisnik.uloga_id;
					odgovor.redirect("/");
					return;
				}
			} else {
				greska = "Netocni podaci!";
			}
		}

		let prijava = await ucitajStranicu("prijava", greska);
		odgovor.send(prijava);
	};

	registracija = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		let poruka = "";
		if (zahtjev.method == "POST") {
			let uspjeh = await this.auth.dodajKorisnika(zahtjev.body);
			if (uspjeh.pogreska) {
				poruka =
					"Korisnik pod unesenim korisničkim imenom ili mailom već postoji! <br>";
			} else if (uspjeh) {
				poruka =
					"Vaš tajni TOTP ključ (molimo Vas da ga spremite prije nastavka): " +
					uspjeh;
				console.log(totp);
			} else {
				poruka = "Dodavanje nije uspjelo provjerite podatke!";
			}
		}

		let registracija = await ucitajStranicu("registracija", poruka);
		odgovor.send(registracija);
	};

	odjava = async function (zahtjev, odgovor) {
		console.log("Odjavili ste se!");
		zahtjev.session.korisnik = null;
		zahtjev.session.korime = null;
		zahtjev.session.email = null;
		zahtjev.session.uloga_id = null;
		odgovor.redirect("/");
	};

	korisnici = async function (zahtjev, odgovor) {
		if (!zahtjev.session.korime) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup!" });
		} else if (zahtjev.session.uloga_id != 1) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup! Nedovoljna prava!" });
		} else {
			let korisnici = await ucitajStranicu("korisnici");
			odgovor.send(korisnici);
		}
	};

	detalji = async function (zahtjev, odgovor) {
		if (!zahtjev.session.korime) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup!" });
		} else {
			let detalji = await ucitajStranicu("detalji");
			odgovor.send(detalji);
		}
	};

	zahtjevi = async function (zahtjev, odgovor) {
		if (!zahtjev.session.korime) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup!" });
		} else if (zahtjev.session.uloga_id != 1) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup! Nedovoljna prava!" });
		} else {
			let zahtjevi = await ucitajStranicu("zahtjevi");
			odgovor.send(zahtjevi);
		}
	};

	profil = async function (zahtjev, odgovor) {
		if (!zahtjev.session.korime) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup!" });
		} else {
			let greska = "";
			if (zahtjev.method == "POST") {
				var ime = zahtjev.body.ime;
				var prezime = zahtjev.body.prezime;
				var korime = zahtjev.session.korime;
				let uspjeh = await this.auth.azurirajKorisnika(ime, prezime, korime);
				if (uspjeh) {
					odgovor.redirect("/");
					return;
				} else {
					greska = "Ažuriranje nije uspjelo provjerite podatke!";
				}
			}

			let profil = await ucitajStranicu("profil");
			odgovor.send(profil);
		}
	};

	dokumentacija = async function (zahtjev, odgovor) {
		let dokumentacija = await ucitajDokumentaciju("dokumentacija");
		odgovor.send(dokumentacija);
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

async function ucitajDokumentaciju(nazivStranice, poruka = "") {
	let stranice = [
		ucitajHTMLdokumentacija(nazivStranice),
		ucitajHTML("navigacija"),
	];
	let [stranica, nav] = await Promise.all(stranice);
	stranica = stranica.replace("#navigacija#", nav);
	stranica = stranica.replace("#poruka#", poruka);
	return stranica;
}

function ucitajHTML(htmlStranica) {
	return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}

function ucitajHTMLdokumentacija(htmlStranica) {
	return ds.readFile(
		__dirname + "/../dokumentacija/" + htmlStranica + ".html",
		"UTF-8"
	);
}
