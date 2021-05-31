import { Testcase } from "./Testcase";

const objectiveForm = document.querySelector("#objective");
const scenarioFormControl = document.querySelector(".form-control--scenario");
const scenarioButton = document.querySelector("#scenario_btn");

const testCount = 1;
let scenarioCount = 1;

const initTestForm = () => {
  console.log(objectiveForm);
  console.log(scenarioFormControl);

  function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(objectiveForm);
    const values = Object.fromEntries(formData.entries());

    console.log(values);
    objectiveForm.reset();
  }

  function addNewScenario(event) {
    event.preventDefault();

    scenarioCount++;
    const newTestcase = new Testcase(scenarioCount);
    scenarioButton.insertAdjacentHTML("beforebegin", newTestcase.getTemplate());
  }

  objectiveForm.addEventListener("submit", submitForm);
  scenarioButton.addEventListener("click", addNewScenario);
};

export { initTestForm };
