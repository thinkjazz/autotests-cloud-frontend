import general from "daisyui/dist/resets/general";
import { initForm } from "./js/modules/initForm";
import { initTestForm } from "./js/modules/initTestForm";
import { initLanguage } from "./js/modules/initLanguage";
import { initDisco } from "./js/modules/initDisco";

import "SimpleBar";
import "simplebar/dist/simplebar.css";
import "./js/libs/OverlayScrollbars";

import "./styles.css";
import "./styles.scss";

initForm();
initTestForm();
initLanguage();
initDisco();
