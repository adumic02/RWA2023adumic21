const GlumacDAO = require("./glumacDAO.js");

exports.getGlumci = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let gdao = new GlumacDAO();
	gdao.dajSve().then((glumci) => {
		console.log(glumci);
		odgovor.send(JSON.stringify(glumci));
	});
};

exports.postGlumci = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	let gdao = new GlumacDAO();
	gdao.dodaj(podaci).then((poruka) => {
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.deleteGlumci = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putGlumci = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.getGlumac = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let gdao = new GlumacDAO();
	let id = zahtjev.params.id;
	gdao.daj(id).then((glumac) => {
		console.log(glumac);
		odgovor.send(JSON.stringify(glumac));
	});
};

exports.postGlumac = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putGlumac = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let id = zahtjev.params.id;
	let podaci = zahtjev.body;
	let gdao = new GlumacDAO();
	gdao.azuriraj(id, podaci).then((poruka) => {
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.deleteGlumac = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { pogreska: "Zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};
