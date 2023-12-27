window.addEventListener("load", async () => {
	let inicijalno = document.getElementById("reset");
	let slika = document.getElementById("era");

	inicijalno.addEventListener("click", (event) => {
		slika.width = 750;
	});

	slika.addEventListener("click", (event) => {
		povecajSliku(slika);
	});
});

function spavaj() {
	return new Promise((uspjeh, greska) => {
		setTimeout(uspjeh);
	});
}

async function povecajSliku(slika) {
	let sirina = slika.width;
	for (let i = 1; i < sirina; i++) {
		slika.width++;
		spavaj();
	}
}
