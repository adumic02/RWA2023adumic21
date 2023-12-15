const GlumciPretrazivanje = require("./glumciPretrazivanje.js");
const Korisnici = require("./korisniciPrikaz.js");

class FetchUpravitelj {
	constructor(api_kljuc, appStranicenje) {
		this.gp = new GlumciPretrazivanje(api_kljuc, appStranicenje);
	}

	glumciPretrazivanje = async function (zahtjev, odgovor) {
		let str = zahtjev.query.str;
		let filter = zahtjev.query.filter;
		console.log(zahtjev.query);
		odgovor.json(await this.gp.dohvatiGlumce(str, filter));
	};
}
module.exports = FetchUpravitelj;
