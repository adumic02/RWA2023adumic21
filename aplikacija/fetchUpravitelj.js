const GlumciPretrazivanje = require("./glumciPretrazivanje.js");

class FetchUpravitelj {
	constructor(api_kljuc) {
		this.gp = new GlumciPretrazivanje(api_kljuc);
	}

	glumciPretrazivanje = async function (zahtjev, odgovor) {
		let str = zahtjev.query.str;
		let filter = zahtjev.query.filter;
		console.log(zahtjev.query);
		odgovor.json(await this.gp.dohvatiGlumce(str, filter));
	};
}
module.exports = FetchUpravitelj;
