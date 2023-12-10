import express from "express";
import Konfiguracija from "./konfiguracija.js";
import sesija from "express-session";
const port = 12000;

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

	server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		let poruka = { opis: "Nema resursa" };
		odgovor.json(poruka);
	});

	server.listen(port, () => {
		console.log(`Server pokrenut na portu: ${port}`);
	});
}
