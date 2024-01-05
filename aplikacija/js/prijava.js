document.addEventListener("DOMContentLoaded", function () {
	const trenutnaStranica = window.location.pathname;
	const stranice = document.querySelectorAll("nav ul li a");

	stranice.forEach((stranica) => {
		if (stranica.getAttribute("href") == trenutnaStranica) {
			stranica.classList.add("aktivno");
		}
	});
});
