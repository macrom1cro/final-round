import Swiper from "swiper/bundle";
// Объявляем переменную swiper в глобальной области видимости
const swipers = {};
let sliderInit = false;
const mediaSize = 767;

function initSlider(container) {
  if (swipers[container.id]) return;

  swipers[container.id] = new Swiper(container, {
    breakpoints: {
      768: {
        enabled: false,
        pagination: false,
      },
    },
    slidesPerView: "auto",
    slidesOffsetBefore: 16,
    slidesOffsetAfter: 16,
    centeredSlides: false,
    spaceBetween: 16,
    pagination: { el: ".swiper-pagination", clickable: true },
  });

  sliderInit = true;
}
function destroySlider(container) {
  if (!swipers[container.id]) return;

  swipers[container.id].destroy();
  delete swipers[container.id];
}

// Проверяем состояние всех слайдеров
function checkSliders() {
  document.querySelectorAll(".swiper").forEach(container => {
    if (window.innerWidth <= mediaSize) {
      initSlider(container);
    } else {
      destroySlider(container);
    }
  });
}

// Оптимизация ресайза
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(checkSliders, 100);
}

// Инициализация
window.addEventListener("load", () => {
  // Добавляем уникальные ID если их нет
  document.querySelectorAll(".swiper").forEach((container, i) => {
    if (!container.id) container.id = `swiper-${i}`;
  });
  checkSliders();
});

window.addEventListener("resize", handleResize);

// Обработчики для кнопок "Показать все" (без изменений)
document.querySelectorAll(".show-all__text").forEach(btn =>
  btn.addEventListener("click", e => {
    btn.textContent = e.target.previousElementSibling.classList.toggle("active")
      ? "Скрыть"
      : "Показать все";
    e.target
      .closest(".show-all")
      .previousElementSibling.classList.toggle("active");
  })
);

