import general from "daisyui/dist/resets/general";
import { initForm } from "./js/modules/initForm";
import { initTestForm } from "./js/modules/initTestForm";
import { initLanguage } from "./js/modules/initLanguage";
import { initDisco } from "./js/modules/initDisco";

import "SimpleBar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";

import "./styles.css";
import "./styles.scss";

initForm();
initTestForm();
initLanguage();
initDisco();
