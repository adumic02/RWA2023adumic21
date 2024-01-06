let poruka = document.getElementById("poruka");

window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
});

document.addEventListener("DOMContentLoaded", function () {
	const trenutnaStranica = window.location.pathname;
	const stranice = document.querySelectorAll("nav ul li a");

	stranice.forEach((stranica) => {
		if (stranica.getAttribute("href") == trenutnaStranica) {
			stranica.classList.add("aktivno");
		}
	});
});
