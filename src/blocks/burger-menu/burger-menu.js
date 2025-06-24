const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");
const closeBurger = document.getElementById("close");

burger.addEventListener("click", () => {
  // Переключаем классы активности
  burger.classList.toggle("active");
  menu.classList.toggle("active");
  overlay.classList.toggle("active");

  //   // Блокируем/разблокируем скролл страницы
  //   document.body.classList.toggle("no-scroll");
});

// Закрытие меню при клике на оверлей
overlay.addEventListener("click", () => {
  burger.classList.remove("active");
  menu.classList.remove("active");
  overlay.classList.remove("active");
  //   document.body.classList.remove("no-scroll");
});

closeBurger.addEventListener("click", () => {
  burger.classList.remove("active");
  menu.classList.remove("active");
  overlay.classList.remove("active");
  //   document.body.classList.remove("no-scroll");
});
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1120) {
    burger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
  }
  //   document.body.classList.remove("no-scroll");
});
// window.innerWidth <= mediaSize ? initSlider() : destroySlider()
