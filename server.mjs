import express from "express";
import Konfiguracija from "./konfiguracija.js";
// import restKorisnik from "./servis/restKorisnik.js";
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

	// pripremiPutanjeRestKorisnik(server);
	pripremiPutanjePretrazivanjeGlumaca(server);

	server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		let poruka = { opis: "Nema resursa" };
		odgovor.json(poruka);
	});

	server.listen(port, () => {
		console.log(`Server pokrenut na portu: ${port}`);
	});
}

function pripremiPutanjePretrazivanjeGlumaca(server) {
	let htmlUpravitelj = new HtmlUpravitelj();
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf()["tmdbApiKeyV3"]);
	server.get("/", htmlUpravitelj.pocetna.bind(htmlUpravitelj));
	server.post(
		"/glumci",
		fetchUpravitelj.glumciPretrazivanje.bind(fetchUpravitelj)
	);
}

// function pripremiPutanjeRestKorisnik(server) {
// 	server.get("/rest/korisnici", restKorisnik.getKorisnici);
// 	server.post("/rest/korisnici", restKorisnik.postKorisnici);
// 	server.delete("/rest/korisnici", restKorisnik.deleteKorisnici);
// 	server.put("/rest/korisnici", restKorisnik.putKorisnici);

// 	server.get("/rest/korisnici/:korime", restKorisnik.getKorisnik);
// 	server.post("/rest/korisnici/:korime", restKorisnik.postKorisnik);
// 	server.delete("/rest/korisnici/:korime", restKorisnik.deleteKorisnik);
// 	server.put("/rest/korisnici/:korime", restKorisnik.putKorisnik);

// 	server.get(
// 		"/rest/korisnici/:korime/prijava",
// 		restKorisnik.getKorisnikPrijava
// 	);
// 	server.post(
// 		"/rest/korisnici/:korime/prijava",
// 		restKorisnik.postKorisnikPrijava
// 	);
// 	server.put(
// 		"/rest/korisnici/:korime/prijava",
// 		restKorisnik.putKorisnikPrijava
// 	);
// 	server.delete(
// 		"/rest/korisnici/:korime/prijava",
// 		restKorisnik.deleteKorisnikPrijava
// 	);
// }
