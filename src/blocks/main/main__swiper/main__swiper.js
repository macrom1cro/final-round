import Swiper from "swiper/bundle";
// Объявляем переменную swiper в глобальной области видимости
let swiper;
let sliderInit = false;
const mediaSize = 767;

function initSlider() {
  if (sliderInit) return;

  swiper = new Swiper(".swiper", {
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

function destroySlider() {
  if (!sliderInit || !swiper) return;

  swiper.destroy(true, true); // Полное уничтожение с очисткой всех событий
  swiper = null;
  sliderInit = false;
}

function checkWidth() {
  window.innerWidth <= mediaSize ? initSlider() : destroySlider();
}

// Добавляем троттлинг для оптимизации
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(checkWidth, 30);
}

window.addEventListener("load", checkWidth);
window.addEventListener("resize", handleResize);

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
