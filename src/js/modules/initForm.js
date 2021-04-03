import { sendData } from "../utils/sendData";

// const url = "https://jsonplaceholder.typicode.com/posts";
const url = "https://api.autotests.cloud/order";

const mainForm = document.querySelector("#objective");
const mainTextarea = document.querySelector("#main-textarea");

const initForm = () => {
  function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(mainForm);
    const values = Object.fromEntries(formData.entries());

    if (!!values.objectives) {
      sendData(url, JSON.stringify(values));
    }

    // console.log(`>>`, values);
  }

  mainForm.addEventListener("submit", submitForm);
};

export { initForm };
