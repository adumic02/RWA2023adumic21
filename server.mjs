import express from "express";
import Konfiguracija from "./konfiguracija.js";
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

	server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		let poruka = { opis: "Nema resursa" };
		odgovor.json(poruka);
	});

	server.listen(port, () => {
		console.log(`Server pokrenut na portu: ${port}`);
	});
}
