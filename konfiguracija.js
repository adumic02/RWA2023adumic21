const ds = require("fs/promises");

class Konfiguracija {
	constructor() {
		this.konf = {};
		this.potrebniPodaci = [
			"tajniKljucSesija",
			"appStranicenje",
			"tmdbApiKeyV3",
			"tmdbApiKeyV4",
		];
	}
	dajkonf() {
		return this.konf;
	}
	async ucitajKonfiguraciju() {
		console.log(this.konf);
		let podaci = await ds.readFile(process.argv[2], "utf-8");
		this.konf = pretvoriJSONKonfig(podaci);
		console.log(this.konf);
	}
}

function pretvoriJSONKonfig(podaci) {
	console.log(podaci);
	let konf = {};
	var nizPodataka = podaci.split("\n");
	for (let podatak of nizPodataka) {
		var podatakNiz = podatak.split(":");
		var naziv = podatakNiz[0];
		var vrijednost = podatakNiz[1];
		konf[naziv] = vrijednost;
	}
	return konf;
}

module.exports = Konfiguracija;
