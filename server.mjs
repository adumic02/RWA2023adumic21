import express from "express";
import Konfiguracija from "./konfiguracija.js";
import restKorisnik from "./servis/restKorisnik.js";
import restGlumac from "./servis/restGlumac.js";
import HtmlUpravitelj from "./aplikacija/htmlUpravitelj.js";
import FetchUpravitelj from "./aplikacija/fetchUpravitelj.js";
import sesija from "express-session";
const port = 10000;

let konf = new Konfiguracija();
konf
	.ucitajKonfiguraciju()
	.then(pokreniServer)
	.catch((greska) => {
		console.log(greska.message);
	});

function pokreniServer() {
	const server = express();
	server.use(express.urlencoded({ extended: true }));
	server.use(express.json());
	server.use(
		sesija({
			secret: konf.dajKonf().tajniKljucSesija,
			saveUninitialized: true,
			cookie: { maxAge: 1000 * 60 * 60 * 3 },
			resave: false,
		})
	);

	server.use("/js", express.static("./aplikacija/js"));
	server.use("/slike", express.static("./dokumentacija/slike"));

	pripremiPutanjePretrazivanjeGlumaca(server);
	pripremiPutanjeDetalji(server);
	pripremiPutanjeAutentifikacija(server);
	pripremiPutanjeRestKorisnik(server);
	pripremiPutanjeRestGlumac(server);
	pripremiPutanjePrikazKorisnika(server);
	pripremiPutanjePrikazZahtjeva(server);
	pripremiPutanjePrikazProfila(server);
	pripremiPutanjePrikazDokumentacije(server);

	server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		let poruka = { opis: "Nema resursa!" };
		odgovor.json(poruka);
	});

	server.listen(port, () => {
		console.log(`Server pokrenut na portu: ${port}`);
	});
}

function pripremiPutanjePretrazivanjeGlumaca(server) {
	let htmlUpravitelj = new HtmlUpravitelj();
	let fetchUpravitelj = new FetchUpravitelj(
		konf.dajKonf()["tmdbApiKeyV3"],
		konf.dajKonf()["appStranicenje"]
	);
	server.get("/", htmlUpravitelj.pocetna.bind(htmlUpravitelj));
	server.get(
		"/provjeriKorisnika",
		fetchUpravitelj.provjeriKorisnika.bind(fetchUpravitelj)
	);
	server.post(
		"/glumciPretrazivanje",
		fetchUpravitelj.glumciPretrazivanje.bind(fetchUpravitelj)
	);
	server.post(
		"/dodajGlumca",
		fetchUpravitelj.dodajGlumca.bind(fetchUpravitelj)
	);
	server.post("/dajGlumca", fetchUpravitelj.dajGlumca.bind(fetchUpravitelj));
}

function pripremiPutanjeDetalji(server) {
	let htmlUpravitelj = new HtmlUpravitelj();
	let fetchUpravitelj = new FetchUpravitelj(
		konf.dajKonf()["tmdbApiKeyV3"],
		konf.dajKonf()["appStranicenje"]
	);
	server.get("/detalji", htmlUpravitelj.detalji.bind(htmlUpravitelj));
	server.post("/dajGlumca", fetchUpravitelj.dajGlumca.bind(fetchUpravitelj));
}

function pripremiPutanjeAutentifikacija(server) {
	let htmlUpravitelj = new HtmlUpravitelj();
	server.get("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
	server.post(
		"/registracija",
		htmlUpravitelj.registracija.bind(htmlUpravitelj)
	);
	server.get("/odjava", htmlUpravitelj.odjava.bind(htmlUpravitelj));
	server.get("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
	server.post("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
}

function pripremiPutanjeRestKorisnik(server) {
	server.get("/rest/korisnici", restKorisnik.getKorisnici);
	server.post("/rest/korisnici", restKorisnik.postKorisnici);
	server.delete("/rest/korisnici", restKorisnik.deleteKorisnici);
	server.put("/rest/korisnici", restKorisnik.putKorisnici);

	server.get("/rest/korisnici/:korime", restKorisnik.getKorisnik);
	server.post("/rest/korisnici/:korime", restKorisnik.postKorisnik);
	server.delete("/rest/korisnici/:korime", restKorisnik.deleteKorisnik);
	server.put("/rest/korisnici/:korime", restKorisnik.putKorisnik);

	server.get(
		"/rest/korisnici/:korime/prijava",
		restKorisnik.getKorisnikPrijava
	);
	server.post(
		"/rest/korisnici/:korime/prijava",
		restKorisnik.postKorisnikPrijava
	);
	server.put(
		"/rest/korisnici/:korime/prijava",
		restKorisnik.putKorisnikPrijava
	);
	server.delete(
		"/rest/korisnici/:korime/prijava",
		restKorisnik.deleteKorisnikPrijava
	);
}

function pripremiPutanjeRestGlumac(server) {
	server.get("/rest/glumci", restGlumac.getGlumci);
	server.post("/rest/glumci", restGlumac.postGlumci);
	server.delete("/rest/glumci", restGlumac.deleteGlumci);
	server.put("/rest/glumci", restGlumac.putGlumci);

	server.get("/rest/glumci/:id", restGlumac.getGlumac);
	server.post("/rest/glumci/:id", restGlumac.postGlumac);
	server.delete("/rest/glumci/:id", restGlumac.deleteGlumac);
	server.put("/rest/glumci/:id", restGlumac.putGlumac);
}

function pripremiPutanjePrikazKorisnika(server) {
	let htmlUpravitelj = new HtmlUpravitelj();
	server.get("/korisnici", htmlUpravitelj.korisnici.bind(htmlUpravitelj));
}

function pripremiPutanjePrikazZahtjeva(server) {
	let htmlUpravitelj = new HtmlUpravitelj();
	server.get("/zahtjevi", htmlUpravitelj.zahtjevi.bind(htmlUpravitelj));
}

function pripremiPutanjePrikazProfila(server) {
	let htmlUpravitelj = new HtmlUpravitelj();
	let fetchUpravitelj = new FetchUpravitelj(
		konf.dajKonf()["tmdbApiKeyV3"],
		konf.dajKonf()["appStranicenje"]
	);
	server.get("/profil", htmlUpravitelj.profil.bind(htmlUpravitelj));
	server.post("/profil", htmlUpravitelj.profil.bind(htmlUpravitelj));
	server.get(
		"/dajKorisnika",
		fetchUpravitelj.dajKorisnika.bind(fetchUpravitelj)
	);
}

function pripremiPutanjePrikazDokumentacije(server) {
	let htmlUpravitelj = new HtmlUpravitelj();
	server.get(
		"/dokumentacija",
		htmlUpravitelj.dokumentacija.bind(htmlUpravitelj)
	);
}
