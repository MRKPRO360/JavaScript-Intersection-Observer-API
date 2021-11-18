const hamburger = document.querySelector(".hamburger");

const allLink = document.querySelectorAll(".nav__links-2 .nav__link");

hamburger.addEventListener("click", function () {
	this.classList.toggle("active");
	const nav = this.closest(".nav");

	// Toggling Color And Background Color For Logo And Hamburger Span Element
	nav.classList.toggle("toggle-color");
	this.querySelectorAll("span").forEach((span) =>
		span.classList.toggle("toggle-background")
	);
});

allLink.forEach((li) =>
	li.addEventListener("click", function () {
		const link2 = this.closest(".nav__links-2");
		const nav = this.closest(".nav");

		const hamburger = nav.querySelector(".hamburger");

		const allSpan = hamburger.querySelectorAll("span");

		// Going Back To Normal Behaviour For Logo And Hamburger Span
		nav.classList.remove("toggle-color");

		allSpan.forEach((span) => span.classList.remove("toggle-background"));

		// Deactivating the hamburger span element transition
		hamburger.classList.remove("active");

		// Togglin this class to open link as well as the nice animation !!!
		link2.classList.toggle("clip-path");
	})
);

// Page Indicator

const sections = document.querySelectorAll("section");
const bubble = document.querySelector(".bubble");
const gradients = [
	"linear-gradient(to right bottom,rgba(139, 103, 236, 0.9),rgba(206, 13, 245,0.8))",
	"linear-gradient(to right bottom,rgba(238, 111, 27, 0.9),rgba(243, 135, 11,0.8))",
	"linear-gradient(to right bottom,rgba(16, 212, 75, 0.9),rgba(16, 238, 116,0.8))",
	"linear-gradient(to right bottom,rgba(247, 56, 167, 0.9),rgba(231, 15, 87,0.8))",
];

const pageObserve = function (entries) {
	const [entry] = entries;

	// if the page is not intersecting to the 70% of the viewport then we immediately execute the fuction
	if (!entry.isIntersecting) return;

	// Get the id from the entry object
	const id = entry.target.id;

	// And also get the gradinet index
	const gradIndex = entry.target.dataset.grad;

	// Select Link
	const activeLink = document.querySelector(`[data-page = ${id}]`); // IF IT IS HOME then document.querySelector('[data-page = home]')

	// Get Selected Link Size
	const size = activeLink.getBoundingClientRect();

	// Set Bubble size from Selected Link
	bubble.style.setProperty("width", `${size.width}px`);
	bubble.style.setProperty("left", `${size.left}px`);
	bubble.style.setProperty("bottom", `${size.top}px`);

	bubble.style.height = "3px";
	bubble.style.background = gradients[gradIndex];
};

const options = {
	root: null,
	threshold: 0.7,
};

const pageObserver = new IntersectionObserver(pageObserve, options);

sections.forEach((sec) => pageObserver.observe(sec));

// Page Navigation

const navContainers = document.querySelectorAll(".nav__links-container");

navContainers.forEach((container) =>
	container.addEventListener("click", function (e) {
		// Must have
		e.preventDefault();
		const click = e.target.classList.contains("nav__link");

		// If there is no click then the function immediately executes
		if (!click) return;
		const id = e.target.getAttribute("href");

		document.querySelector(`${id}`).scrollIntoView({ behavior: "smooth" });
	})
);
