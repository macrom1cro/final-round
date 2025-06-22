document.querySelectorAll(".read-more__text").forEach(btn => {
  btn.addEventListener("click", e => {
    btn.textContent = e.target.previousElementSibling.classList.toggle("active")
      ? "Свернуть"
      : "Читать далее";
    e.target
      .closest(".read-more")
      .previousElementSibling.classList.toggle("active");
  });
});
