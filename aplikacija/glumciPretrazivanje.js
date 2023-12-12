const portRest = 10000;
const url = "http://localhost:" + portRest + "/rest";
const TMDBklijent = require("../servis/klijentTMDB.js");
class GlumciPretrazivanje {
	constructor(api_kljuc) {
		this.tmdbKlijent = new TMDBklijent(api_kljuc);
		console.log(api_kljuc);
	}
	async dohvatiGlumce(stranica, kljucnaRijec = "") {
		if (stranica == null || kljucnaRijec == null) {
			return { greska: "neocekivani podaci" };
		}

		let podaci = await this.tmdbKlijent.pretraziGlumcePoNazivu(
			kljucnaRijec,
			stranica
		);

		return JSON.parse(podaci);
	}
}

module.exports = GlumciPretrazivanje;
