const ZahtjevDAO = require("./zahtjevDAO.js");

exports.getZahtjevi = function (zahtjev, odgovor) {
	if (zahtjev.session.uloga_id != 1) {
		odgovor.status(403);
		odgovor.json({ pogreska: "Zabranjen pristup! Nedovoljno prava!" });
	} else {
		odgovor.type("application/json");
		let zdao = new ZahtjevDAO();
		zdao.dajSve().then((zahtjevi) => {
			odgovor.send(JSON.stringify(zahtjevi));
		});
	}
};

exports.postZahtjevi = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	let zdao = new ZahtjevDAO();
	zdao
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

exports.deleteZahtjevi = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putZahtjevi = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.getZahtjev = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let zdao = new ZahtjevDAO();
	let id = zahtjev.params.id;
	zdao.daj(id).then((podaciZahtjeva) => {
		odgovor.send(JSON.stringify(podaciZahtjeva));
	});
};

exports.postZahtjev = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putZahtjev = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let id = zahtjev.params.id;
	let podaci = zahtjev.body;
	let zdao = new ZahtjevDAO();
	zdao.azuriraj(id, podaci).then((poruka) => {
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.deleteZahtjev = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let id = zahtjev.params.id;
	let zdao = new ZahtjevDAO();
	zdao.obrisi(id).then((poruka) => {
		odgovor.send(JSON.stringify(poruka));
	});
};
