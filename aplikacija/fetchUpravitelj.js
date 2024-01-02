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
		if (!zahtjev.session.korime) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup!" });
		} else if (zahtjev.session.uloga_id != 1) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup! Nedovoljno prava!" });
		} else {
			let port = 10000;
			let id = zahtjev.body.id;
			let glumac = await this.gp.dohvatiGlumca(id);
			let naslovi = await zahtjev.body.known_for.map((film) => film.title);

			let tijelo = {
				id: glumac.id,
				ime_prezime: glumac.name,
				slika: glumac.profile_path,
				biografija: glumac.biography,
				alternativna_imena: glumac.also_known_as.toString(),
				vrsta: glumac.known_for_department,
				popularnost: glumac.popularity,
				datum_rodenja: glumac.birthday,
				mjesto_rodenja: glumac.place_of_birth,
				datum_smrti: glumac.deathday,
				vanjska_stranica: glumac.homepage,
				naslovi: naslovi.toString(),
			};

			let zaglavlje = new Headers();
			zaglavlje.set("Content-Type", "application/json");

			let parametri = {
				method: "POST",
				body: JSON.stringify(tijelo),
				headers: zaglavlje,
			};

			let podaci = await fetch(
				`http://localhost:${port}/rest/glumci`,
				parametri
			);
			odgovor.status(200);
			odgovor.json({ izvrseno: "OK!" });
			return podaci;
		}
	};

	dajKorisnika = async function (zahtjev, odgovor) {
		if (!zahtjev.session.korime) {
			odgovor.status(403);
			odgovor.json({ pogreska: "Zabranjen pristup!" });
		} else {
			let port = 10000;
			let korime = zahtjev.session.korime;
			let url = `http://localhost:${port}/rest/korisnici/${korime}`;
			try {
				let podaciKorisnika = await fetch(url);
				let podaci = await podaciKorisnika.json();
				odgovor.status(200);
				odgovor.send(podaci);
			} catch (greska) {
				throw greska;
			}
		}
	};

	provjeriKorisnika = async function (zahtjev, odgovor) {
		if (zahtjev.session.uloga_id == 1) {
			odgovor.status(200);
			odgovor.json({ admin: true });
		} else {
			odgovor.status(200);
			odgovor.json({ admin: false });
		}
	};
}

module.exports = FetchUpravitelj;
