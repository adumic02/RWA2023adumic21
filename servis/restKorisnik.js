const KorisnikDAO = require("./korisnikDAO.js");

exports.getKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	kdao.dajSve().then((korisnici) => {
		console.log(korisnici);
		odgovor.send(JSON.stringify(korisnici));
	});
};

exports.postKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	kdao.dodaj(podaci).then((poruka) => {
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.deleteKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		console.log(korisnik);
		odgovor.send(JSON.stringify(korisnik));
	});
};

exports.postKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let korime = zahtjev.params.korime;
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	kdao.azuriraj(korime, podaci).then((poruka) => {
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.deleteKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.postKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		console.log(korisnik);
		console.log(zahtjev.body);
		if (korisnik != null && korisnik.lozinka == zahtjev.body.lozinka)
			odgovor.send(JSON.stringify(korisnik));
		else {
			odgovor.status(401);
			odgovor.send(JSON.stringify({ greska: "Krivi podaci!" }));
		}
	});
};

exports.putKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};
