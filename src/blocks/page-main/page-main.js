document.querySelectorAll(".about__read-more").forEach(btn => {
  btn.addEventListener("click", e => {
    btn.lastElementChild.textContent = e.target.previousElementSibling.classList
    .toggle("active")
    ? "Свернуть"
    : "Читать далее";
    e.target.parentElement.parentElement.previousElementSibling.classList.toggle("active");
  });
});