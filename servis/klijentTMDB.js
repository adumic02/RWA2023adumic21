class TMDBklijent {
	bazicniURL = "https://api.themoviedb.org/3";

	constructor(apiKljuc) {
		this.apiKljuc = apiKljuc;
	}

	async pretraziGlumcaPoID(id) {
		let resurs = "/person/" + id;
		let parametri = {
			language: "en-US",
		};
		let odgovor = await this.obaviZahtjev(resurs, parametri);
		return odgovor;
	}

	async pretraziGlumcePoNazivu(trazi, stranica) {
		let resurs = "/search/person";
		let parametri = {
			language: "en-US",
			include_adult: false,
			page: stranica,
			query: trazi,
		};

		let odgovor = await this.obaviZahtjev(resurs, parametri);
		return odgovor;
	}

	async obaviZahtjev(resurs, parametri = "") {
		let zahtjev = this.bazicniURL + resurs + "?api_key=" + this.apiKljuc;
		for (let p in parametri) {
			zahtjev += "&" + p + "=" + parametri[p];
		}
		console.log(zahtjev);
		let odgovor = await fetch(zahtjev);
		let rezultat = await odgovor.text();
		return rezultat;
	}
}

module.exports = TMDBklijent;
