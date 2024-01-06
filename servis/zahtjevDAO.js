const Baza = require("./baza.js");

class ZahtjevDAO {
	constructor() {
		this.baza = new Baza("RWA2023adumic21.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM zahtjevi;";
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	};

	daj = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM zahtjevi WHERE id=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if (podaci.length == 1) return podaci[0];
		else return null;
	};

	dodaj = async function (zahtjev) {
		try {
			let sql = `INSERT INTO zahtjevi (id_glumca,ime_prezime_glumca,statusni_kod,korisnik_korime,korisnik_id) VALUES (?,?,?,?,?)`;
			let podaci = [
				zahtjev.id_glumca,
				zahtjev.ime_prezime_glumca,
				zahtjev.statusni_kod,
				zahtjev.korisnik_korime,
				zahtjev.korisnik_id,
			];
			await this.baza.izvrsiUpit(sql, podaci);
			return { izvrseno: "OK!" };
		} catch (greska) {
			if (greska.code == "SQLITE_CONSTRAINT") {
				return { pogreska: "Zahtjev već postoji!" };
			} else {
				throw greska;
			}
		}
	};

	azuriraj = async function (id, zahtjev) {
		let sql = `UPDATE zahtjevi SET statusni_kod=? WHERE id=?`;
		let podaci = [zahtjev.statusni_kod, id];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};

	obrisi = async function (id) {
		let sql = "DELETE FROM zahtjevi WHERE id=?";
		await this.baza.izvrsiUpit(sql, [id]);
		return true;
	};
}

module.exports = ZahtjevDAO;
