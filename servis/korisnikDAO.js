const Baza = require("./baza.js");

class KorisnikDAO {
	constructor() {
		this.baza = new Baza("RWA2023adumic21.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik;";
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	};

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE korime=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if (podaci.length == 1) return podaci[0];
		else return null;
	};

	dodaj = async function (korisnik) {
		try {
			let sql = `INSERT INTO korisnik (ime,prezime,korime,lozinka,email,totp,uloga_id) VALUES (?,?,?,?,?,?,?)`;
			let podaci = [
				korisnik.ime,
				korisnik.prezime,
				korisnik.korime,
				korisnik.lozinka,
				korisnik.email,
				korisnik.totp,
				2,
			];
			await this.baza.izvrsiUpit(sql, podaci);
			return { izvrseno: "OK!" };
		} catch (greska) {
			if (greska.code == "SQLITE_CONSTRAINT") {
				return { pogreska: "Korisnik već postoji!" };
			} else {
				throw greska;
			}
		}
	};

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET ime=?, prezime=? WHERE korime=?`;
		let podaci = [korisnik.ime, korisnik.prezime, korime];
		await this.baza.izvrsiUpit(sql, podaci);
		return { izvrseno: "OK!" };
	};
}

module.exports = KorisnikDAO;
