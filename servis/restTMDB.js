const TMDBklijent = require("./klijentTMDB.js");

class RestTMDB {
	constructor(api_kljuc) {
		this.tmdbKlijent = new TMDBklijent(api_kljuc);
		console.log(api_kljuc);
	}

	getGlumci(zahtjev, odgovor) {
		console.log(this);
		odgovor.type("application/json");
		let stranica = zahtjev.query.stranica;
		let trazi = zahtjev.query.trazi;

		if (stranica == null || trazi == null) {
			odgovor.status("417");
			odgovor.send({ greska: "Neocekivani podaci!" });
			return;
		}

		this.tmdbKlijent
			.pretraziGlumcePoNazivu(trazi, stranica)
			.then((glumci) => {
				//console.log(glumci);
				odgovor.send(glumci);
			})
			.catch((greska) => {
				odgovor.json(greska);
			});
	}
}

module.exports = RestTMDB;
