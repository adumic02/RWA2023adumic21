const GlumciPretrazivanje = require("./glumciPretrazivanje.js");

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

	dodajGlumca = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		if (!zahtjev.session.korime) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup!" });
		} else if (zahtjev.session.uloga_id != 1) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup! Nedovoljno prava!" });
		} else {
			// TODO - LOGIKA DODAVANJA GLUMACA U BAZU PODATAKA
			odgovor.status(200);
			odgovor.json({ ok: "OK" });
		}
	};
}
module.exports = FetchUpravitelj;
