const call = document.getElementById("call_header");
const callHeader = document.getElementById("call");
const modalWindowChat = document.getElementById("modal-window_chat");
const modalWindowCall = document.getElementById("modal-window_call");
const chat = document.getElementById("chat");
const chatHeader = document.getElementById("chat_header");
const closeCall = document.getElementById("close_call");
const closeChat = document.getElementById("close_chat");
const overlayCall = document.getElementById("overlay_modal-call");
const overlayChat = document.getElementById("overlay_modal-chat");

callHeader.addEventListener("click", () => {
  call.classList.toggle("active");
  modalWindowCall.classList.toggle("active");
  overlayCall.classList.toggle("active");
});

call.addEventListener("click", () => {
  call.classList.toggle("active");
  modalWindowCall.classList.toggle("active");
  overlayCall.classList.toggle("active");
});

overlayCall.addEventListener("click", () => {
  call.classList.remove("active");
  modalWindowCall.classList.remove("active");
  overlayCall.classList.remove("active");
});

closeCall.addEventListener("click", () => {
  call.classList.remove("active");
  modalWindowCall.classList.remove("active");
  overlayCall.classList.remove("active");
});

chatHeader.addEventListener("click", () => {
  chat.classList.toggle("active");
  modalWindowChat.classList.toggle("active");
  overlayChat.classList.toggle("active");
});

chat.addEventListener("click", () => {
  chat.classList.toggle("active");
  modalWindowChat.classList.toggle("active");
  overlayChat.classList.toggle("active");
});

overlayChat.addEventListener("click", () => {
  chat.classList.remove("active");
  modalWindowChat.classList.remove("active");
  overlayChat.classList.remove("active");
});

closeChat.addEventListener("click", () => {
  chat.classList.remove("active");
  modalWindowChat.classList.remove("active");
  overlayChat.classList.remove("active");
});
