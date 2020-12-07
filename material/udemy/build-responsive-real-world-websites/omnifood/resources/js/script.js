const featureSection = document.getElementById("section-features");

new Waypoint({
  element: featureSection,
  handler: function (direction) {
    const nav = document.getElementsByTagName("nav")[0];
    if (direction === "down") {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  },
  offset: "60px",
});

const plansButton = document.getElementById("scroll-to-plans");
const startButton = document.getElementById("scroll-to-start");

plansButton.addEventListener("click", function () {
  window.scrollTo({
    top: document.getElementById("section-plans").offsetTop,
    behavior: "smooth",
  });
});

startButton.addEventListener("click", function () {
  window.scrollTo({
    top: featureSection.offsetTop,
    behavior: "smooth",
  });
});

// animation at scroll
const wp1 = document.getElementById("wp-1");
new Waypoint({
  element: wp1,
  handler: function (direction) {
    wp1.classList.add("animate__animated", "animate__fadeIn", "animate__slow");
  },
  offset: "80%",
});

const wp2 = document.getElementById("wp-2");
new Waypoint({
  element: wp2,
  handler: function (direction) {
    wp2.classList.add("animate__animated", "animate__fadeInUp");
  },
  offset: "80%",
});

const wp3 = document.getElementById("wp-3");
new Waypoint({
  element: wp3,
  handler: function (direction) {
    wp3.classList.add("animate__animated", "animate__fadeInUp");
  },
  offset: "80%",
});

const wp4 = document.getElementById("wp-4");
new Waypoint({
  element: wp4,
  handler: function (direction) {
    wp4.classList.add("animate__animated", "animate__pulse");
  },
  offset: "80%",
});

// mobile nav
const navIcon = document.getElementById("nav-icon");
const navIconImage = document.getElementById("nav-icon-image");
navIcon.addEventListener("click", function () {
  const mainNav = document.getElementById("main-nav");
  const { display } = getComputedStyle(mainNav);
  mainNav.style.display = display === "none" ? "block" : "none";
  navIconImage.setAttribute(
    "name",
    navIconImage.getAttribute("name") === "menu-outline"
      ? "close-outline"
      : "menu-outline"
  );
});
