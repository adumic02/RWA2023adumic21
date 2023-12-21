const TMDBklijent = require("../servis/klijentTMDB.js");
class GlumciPretrazivanje {
	constructor(api_kljuc, appStranicenje) {
		this.tmdbKlijent = new TMDBklijent(api_kljuc);
		this.appStranicenje = appStranicenje;
		console.log(api_kljuc);
	}

	async dohvatiGlumca(id) {
		if (id == null) {
			return { pogreska: "Neocekivani podaci" };
		} else {
			let podaci = await this.tmdbKlijent.pretraziGlumcaPoID(id);
			return JSON.parse(podaci);
		}
	}

	async dohvatiGlumce(stranica, kljucnaRijec = "") {
		if (stranica == null || kljucnaRijec == null) {
			return { pogreska: "Neocekivani podaci" };
		} else {
			let podaci = await this.tmdbKlijent.pretraziGlumcePoNazivu(
				kljucnaRijec,
				stranica
			);

			const parsiraniPodaci = JSON.parse(podaci);
			const limitGlumaca = parsiraniPodaci.results.slice(
				0,
				this.appStranicenje
			);

			return {
				results: limitGlumaca,
				total_pages: parsiraniPodaci.total_pages,
				page: parsiraniPodaci.page,
			};
		}
	}
}

module.exports = GlumciPretrazivanje;
