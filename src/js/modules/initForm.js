import { sendData } from "../utils/sendData";

// const url = "https://jsonplaceholder.typicode.com/posts";
const url = "https://api.autotests.cloud/orders";

const mainForm = document.querySelector("#objective");
const mainTextarea = document.querySelector("#main-textarea");
const textareaTitle = document.querySelector(".textarea-title");
const alert = document.querySelector(".alert");
const telegramFrame = document.querySelector("#telegram_frame");

const initForm = () => {
  mainTextarea.addEventListener("focus", () => {
    // textareaTitle.style.opacity = "0";
    // mainTextarea.style.paddingTop = "1rem";
  });

  function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(mainForm);
    const values = Object.fromEntries(formData.entries());

    if (!!values.content) {
      values.price = "free";
      values.email = "admin@qa.guru";
      console.log(values);x

      const response = sendData(url, JSON.stringify(values));

      telegramFrame.innerHTML = '<iframe id="telegram-post-autotests_cloud-17" src="https://t.me/autotests_cloud/' + response + '?embed=1" width="100%" frameborder="0" scrolling="no" style="overflow: hidden; border: none; min-width: 320px; height: 159px;"></iframe>';

      // textareaTitle.style.opacity = "1";
      // mainTextarea.style.paddingTop = "3rem";
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
