import { sendData } from "../utils/sendData";

// const url = "https://jsonplaceholder.typicode.com/posts";
const url = "https://api.autotests.cloud/order";

const mainForm = document.querySelector("#objective");
const mainTextarea = document.querySelector("#main-textarea");
const textareaTitle = document.querySelector(".textarea-title");
const alert = document.querySelector(".alert");

const initForm = () => {
  mainTextarea.addEventListener("focus", () => {
    textareaTitle.style.opacity = "0";
    mainTextarea.style.paddingTop = "1rem";
  });

  function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(mainForm);
    const values = Object.fromEntries(formData.entries());

    if (!!values.objectives) {
      sendData(url, JSON.stringify(values));

      console.log(values);

      textareaTitle.style.opacity = "1";
      mainTextarea.style.paddingTop = "3rem";
      alert.style.opacity = "1";

      setTimeout(() => {
        alert.style.opacity = "0";
      }, 2000);

      mainForm.reset();
    } else {
      mainTextarea.classList.add("border-red-500");

      setTimeout(() => {
        mainTextarea.classList.remove("border-red-500");
      }, 2000);
    }
  }

  mainForm.addEventListener("submit", submitForm);
};

export { initForm };
