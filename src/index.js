import general from "daisyui/dist/resets/general";
import { initForm } from "./js/modules/initForm";
import { initTestForm } from "./js/modules/initTestForm";
import { initLanguage } from "./js/modules/initLanguage";
import { initDisco } from "./js/modules/initDisco";

import "SimpleBar";
import "simplebar/dist/simplebar.css";

import "./styles.css";
import "./styles.scss";

initForm();
initTestForm();
initLanguage();
initDisco();

// document.addEventListener("DOMContentLoaded", function () {
//   //The first argument are the elements to which the plugin shall be initialized
//   //The second argument has to be at least a empty object or a object with your desired options
//   OverlayScrollbars(document.querySelectorAll("body"), {});
// });
