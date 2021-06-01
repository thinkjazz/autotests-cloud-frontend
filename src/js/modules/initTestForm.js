import { Testcase } from "./Testcase";

const objectiveForm = document.querySelector("#objective");
const scenarioFormControl = document.querySelector(".form-control--scenario");
const scenarioButton = document.querySelector("#scenario_btn");

const testCount = 1;
let scenarioCount = 1;

const initTestForm = () => {
  function submitForm(event) {
    event.preventDefault();

    if (!validateForm()) {
      const formData = new FormData(objectiveForm);
      const values = Object.fromEntries(formData.entries());

      console.log(values);
      clearForm();
    }
  }

  function validateForm() {
    const allInputs = objectiveForm.querySelectorAll("input");
    const allTextareas = objectiveForm.querySelectorAll("textarea");

    let validateFlag = [];

    allInputs.forEach((input) => {
      if (!!input.value === false) {
        validateFlag.push(false);
        input.classList.add("border-red-500");

        setTimeout(() => {
          input.classList.remove("border-red-500");
        }, 2000);
      } else {
        validateFlag.push(true);
      }
    });

    allTextareas.forEach((textarea) => {
      if (!!textarea.value === false) {
        validateFlag.push(false);
        textarea.classList.add("border-red-500");

        setTimeout(() => {
          textarea.classList.remove("border-red-500");
        }, 2000);
      } else {
        validateFlag.push(true);
      }
    });

    return validateFlag.includes(false);
  }

  function clearForm() {
    const allAddedTests = document.querySelectorAll(".testcase--added");
    allAddedTests.forEach((element) => {
      element.remove();
    });
    objectiveForm.reset();
    scenarioCount = 1;
  }

  function addNewScenario(event) {
    event.preventDefault();

    scenarioCount++;
    const newTestcase = new Testcase(scenarioCount);
    scenarioButton.before(newTestcase.getElement());
  }

  objectiveForm.addEventListener("submit", submitForm);
  scenarioButton.addEventListener("click", addNewScenario);
};

export { initTestForm };
