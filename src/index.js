import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { initForm } from "./js/modules/initForm";
import { removeSlash } from "./js/utils/removeSlash";

import "./styles.css";
import "./styles.scss";

const allTabs = document.querySelectorAll(".tab");

initForm();

// const autoHeight = () => {
//   let allTextareas = document.querySelectorAll("textarea[data-expandable]");

//   allTextareas.forEach((textarea) => {
//     textarea.style.removeProperty("height");
//     textarea.style.height = textarea.scrollHeight + 2 + "px";
//   });
// };

// autoHeight();

// mainTextarea.addEventListener("change", autoHeight);

// let openmodal = document.querySelectorAll(".modal-open");
// for (let i = 0; i < openmodal.length; i++) {
//   openmodal[i].addEventListener("click", function (event) {
//     event.preventDefault();

//     toggleModal(i);
//   });
// }

// const allOverlays = document.querySelectorAll(".modal-overlay");

// allOverlays.forEach((overlay) => {
//   overlay.addEventListener("click", () => {
//     toggleModal(currentModal);
//   });
// });

// let closemodal = document.querySelectorAll(".modal-close");
// for (let i = 0; i < closemodal.length; i++) {
//   closemodal[i].addEventListener("click", () => {
//     toggleModal(currentModal);
//   });
// }

let currentModal;

// document.onkeydown = function (evt) {
//   evt = evt || window.event;
//   let isEscape = false;
//   if ("key" in evt) {
//     isEscape = evt.key === "Escape" || evt.key === "Esc";
//   } else {
//     isEscape = evt.keyCode === 27;
//   }
//   if (isEscape && document.body.classList.contains("modal-active")) {
//     toggleModal(currentModal);
//   }
// };

function toggleModal(index) {
  const body = document.querySelector("body");
  const modal = document.querySelector(`.modal-${index}`);

  currentModal = index;

  const modalBody = document.querySelector(".modal-container");

  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  body.classList.toggle("modal-active");

  //Pass the element to the argument and disable scrolling on the page

  if (body.classList.contains("modal-active")) {
    disablePageScroll(modal);
  } else {
    enablePageScroll(modal);
  }
}

const modal = document.querySelector(".modal-w");

// disablePageScroll(modal);

removeSlash();
