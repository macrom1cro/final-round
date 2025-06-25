const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");
const closeBurger = document.getElementById("close");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  burger.classList.remove("active");
  menu.classList.remove("active");
  overlay.classList.remove("active");
});

closeBurger.addEventListener("click", () => {
  burger.classList.remove("active");
  menu.classList.remove("active");
  overlay.classList.remove("active");
});
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1120) {
    burger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
  }
});
