const KorisnikDAO = require("./korisnikDAO.js");

exports.getKorisnici = function (zahtjev, odgovor) {
	if (zahtjev.session.uloga_id != 1) {
		odgovor.status(403);
		odgovor.json({ pogreska: "Zabranjen pristup! Nedovoljno prava!" });
	} else {
		odgovor.type("application/json");
		let kdao = new KorisnikDAO();
		kdao.dajSve().then((korisnici) => {
			odgovor.status(200);
			odgovor.send(JSON.stringify(korisnici));
		});
	}
};

exports.postKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	kdao
		.dodaj(podaci)
		.then((poruka) => {
			if (poruka.pogreska) {
				odgovor.status(400);
			} else {
				odgovor.status(200);
			}
			odgovor.send(JSON.stringify(poruka));
		})
		.catch((greska) => {
			throw greska;
		});
};

exports.deleteKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		odgovor.status(200);
		odgovor.send(JSON.stringify(korisnik));
	});
};

exports.postKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let korime = zahtjev.params.korime;
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	kdao.azuriraj(korime, podaci).then((poruka) => {
		odgovor.status(200);
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.deleteKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.postKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		if (korisnik != null && korisnik.lozinka == zahtjev.body.lozinka)
			odgovor.send(JSON.stringify(korisnik));
		else {
			odgovor.status(401);
			odgovor.send(
				JSON.stringify({ pogreska: "Unijeli ste pogrešne podatke!" })
			);
		}
	});
};

exports.putKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};
