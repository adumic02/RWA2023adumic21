const Baza = require("./baza.js");

class GlumacDAO {
	constructor() {
		this.baza = new Baza("RWA2023adumic21.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM glumci;";
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	};

	daj = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM glumci WHERE id=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if (podaci.length == 1) return podaci[0];
		else return null;
	};

	dodaj = async function (glumac) {
		console.log(glumac);
		let sql = `INSERT INTO glumci (id,ime,prezime,biografija,spol,datum_rodenja,mjesto_rodenja,slika) VALUES (?,?,?,?,?,?,?,?)`;
		let podaci = [
			glumac.id,
			glumac.ime,
			glumac.prezime,
			glumac.biografija,
			glumac.spol,
			glumac.datum_rodenja,
			glumac.mjesto_rodenja,
			glumac.slika,
		];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};

	azuriraj = async function (id, glumac) {
		let sql = `UPDATE glumci SET id=?, ime=?, prezime=?, biografija=?, spol=?, datum_rodenja=?, mjesto_rodenja=?, slika=? WHERE id=?`;
		let podaci = [
			glumac.ime,
			glumac.prezime,
			glumac.biografija,
			glumac.spol,
			glumac.datum_rodenja,
			glumac.mjesto_rodenja,
			glumac.slika,
			id,
		];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};
}

module.exports = GlumacDAO;
