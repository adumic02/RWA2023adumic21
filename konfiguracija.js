const ds = require("fs/promises");

class Konfiguracija {
	constructor() {
		this.konf = {};
		this.obvezniPodaci = [
			"tajniKljucSesija",
			"appStranicenje",
			"tmdbApiKeyV3",
			"tmdbApiKeyV4",
		];
	}

	dajKonf() {
		return this.konf;
	}

	async ucitajKonfiguraciju() {
		try {
			if (!process.argv[2]) {
				throw new Error("Nije definirana datoteka konfiguracijskih podatka!");
			} else {
				let podaci = await ds.readFile(process.argv[2], "utf-8");
				this.konf = pretvoriJSONKonfig(podaci);
				this.provjeriObveznePodatke();
				this.validirajVrijednosti();
			}
		} catch (greska) {
			if (greska.code == "ENOENT") {
				throw new Error(
					"Konfiguracijska datoteka ne postoji! Unos: " + greska.path
				);
			} else {
				throw greska;
			}
		}
	}

	provjeriObveznePodatke() {
		const nedostajeciPodaci = this.obvezniPodaci.filter(
			(podatak) => !(podatak in this.konf)
		);

		if (nedostajeciPodaci.length > 0) {
			throw new Error(
				`Nedostaju obavezni podaci u konfiguraciji: ${nedostajeciPodaci.join(
					", "
				)}. Unesite podatke u konfiguracijsku datoteku!`
			);
		}
	}

	validirajVrijednosti() {
		if (
			this.konf.tajniKljucSesija.length < 50 ||
			this.konf.tajniKljucSesija.length > 100
		) {
			throw new Error(
				`Vrijednost za tajniKljucSesija nije podržana! Podržana vrijednost: Veličina 50-100 znakova. Trenutna veličina: ${this.konf.tajniKljucSesija.length} znakova.`
			);
		}

		const appStranicenjeVrijednost = parseInt(this.konf.appStranicenje);
		if (isNaN(appStranicenjeVrijednost)) {
			throw new Error(
				"Vrijednost podatka appStranicenje može biti isključivo brojčana!"
			);
		} else if (appStranicenjeVrijednost < 5 || appStranicenjeVrijednost > 100) {
			throw new Error(
				`Vrijednost za appStranicenje nije podržana! Podržana vrijednost: Broj od 5-100. Trenutna vrijednost: ${appStranicenjeVrijednost}`
			);
		}
	}
}

function pretvoriJSONKonfig(podaci) {
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
