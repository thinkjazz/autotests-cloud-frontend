import LocalStorage from "./LocalStorage.js";

const storage = new LocalStorage();

const tasks = storage.tasks;

const container = document.querySelector(".tasks");
const template = document.querySelector("#task");

const createTestCaseForm = document.querySelector(".create-task");
const createTestCaseField = document.querySelector(".create-task__textarea");
const createStepField = document.querySelector(".create-steps__textarea");
const createTestCaseButton = document.querySelector(".create-task__submit");

tasks.forEach((data) => {
  onCreateTestCase({ data });
});

createTestCaseField.addEventListener("input", () => {
  createTestCaseButton.disabled = !createTestCaseField.value;
});

createStepField.addEventListener("input", () => {
  createTestCaseButton.disabled = !createStepField.value;
});

createTestCaseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = createTestCaseField.value;
  const steps = createStepField.value;

  if (title) {
    const data = {
      title,
      steps,
      timestamp: new Date().getTime(),
    };

    storage.create(data);

    onCreateTestCase({ data });

    createTestCaseForm.reset();
  }
});

function onCreateTestCase({ data }) {
  const clone = template.content.cloneNode(true);
  const testCase = clone.querySelector(".task");
  const title = clone.querySelector(".task__text");
  const step = clone.querySelector(".step__text");
  const remove = clone.querySelector(".task__delete");

  title.innerHTML = data.title;
  step.innerHTML = data.steps;

  title.addEventListener("input", () => {
    data.title = title.innerHTML;

    storage.update(data);
  });
  step.addEventListener("input", () => {
    data.steps = step.innerHTML;

    storage.update(data);
  });

  remove.addEventListener("click", () => {
    storage.delete(data);

    testCase.remove();
  });

  container.appendChild(clone);
}
