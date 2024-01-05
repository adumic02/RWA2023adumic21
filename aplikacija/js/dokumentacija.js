document.addEventListener("DOMContentLoaded", function () {
	const trenutnaStranica = window.location.pathname;
	console.log(trenutnaStranica);
	const stranice = document.querySelectorAll("nav ul li a");

	stranice.forEach((stranica) => {
		if (stranica.getAttribute("href") == trenutnaStranica) {
			stranica.classList.add("aktivno");
		}
	});
});

window.addEventListener("load", async () => {
	let inicijalno = document.getElementById("gumb");
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
