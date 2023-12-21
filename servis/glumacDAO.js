const Baza = require("./baza.js");

class GlumacDAO {
	constructor() {
		this.baza = new Baza("bazaPodataka.sqlite");
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
		let sql = `INSERT INTO glumci (id,ime_prezime,slika,biografija,alternativna_imena,vrsta,popularnost,datum_rodenja,mjesto_rodenja,datum_smrti,vanjska_stranica,naslovi) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
		let podaci = [
			glumac.id,
			glumac.ime_prezime,
			glumac.slika,
			glumac.biografija,
			glumac.alternativna_imena,
			glumac.vrsta,
			glumac.popularnost,
			glumac.datum_rodenja,
			glumac.mjesto_rodenja,
			glumac.datum_smrti,
			glumac.vanjska_stranica,
			glumac.naslovi,
		];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};

	azuriraj = async function (id, glumac) {
		let sql = `UPDATE glumci SET ime_prezime=?, slika=?, biografija=?, alternativna_imena=?, vrsta=?, popularnost=?, datum_rodenja=?, mjesto_rodenja=?, datum_smrti=?, vanjska_stranica=?, naslovi=? WHERE id=?`;
		let podaci = [
			glumac.ime_prezime,
			glumac.slika,
			glumac.biografija,
			glumac.alternativna_imena,
			glumac.vrsta,
			glumac.popularnost,
			glumac.datum_rodenja,
			glumac.mjesto_rodenja,
			glumac.datum_smrti,
			glumac.vanjska_stranica,
			glumac.naslovi,
			id,
		];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};
}

module.exports = GlumacDAO;
