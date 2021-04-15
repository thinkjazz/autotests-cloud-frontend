import { sendData } from "../utils/sendData";
// import { iFrameResize } from "iframe-resizer";

// const url = "https://jsonplaceholder.typicode.com/posts";
const url = "https://api.autotests.cloud/orders";

const mainForm = document.querySelector("#objective");
const button = mainForm.querySelector(".btn");
const mainTextarea = document.querySelector("#main-textarea");
const textareaTitle = document.querySelector(".textarea-title");
const alert = document.querySelector(".alert");
const telegramFrame = document.querySelector("#telegram_frame");

setTimeout(() => {
  // const ifc = telegramFrame.querySelector("iframe");
  // const base = ifc.querySelector(".widget_frame_base");
  // console.log(telegramFrame);
  // console.log(base);
  // ifc.addEventListener("onload", () => {
  //   ifc.style.height = ifc.contentWindow.document.body.scrollHeight + "px";
  // });
}, 1500);

function resizeIframe(obj) {
  obj.style.height = obj.contentWindow.document.body.scrollHeight + "px";
}
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
      // console.log(values);

      const response = sendData(url, JSON.stringify(values));

      button.classList.add("loading");
      mainTextarea.style.opacity = "0";
      response.then((resp) => {
        if (window.screen.width < 768) {
          telegramFrame.style.minHeight = "260px";
        }

        mainTextarea.style.opacity = "0";
        mainTextarea.style.display = "none";
        telegramFrame.style.display = "block";

        mainForm.reset();

        telegramFrame.innerHTML = `</iframe><iframe id="telegram-post-autotests_cloud-17" class="telegram-iframe w-full h-full"
          src="https://t.me/autotests_cloud/${resp}?embed=1" frameborder="0" scrolling="yes"></iframe>`;

        button.classList.remove("loading");

        // let ifc = telegramFrame.querySelector("iframe");
        // // let base = document.querySelector(".widget_frame_base");
        // let base = ifc.contentWindow.document.querySelector(
        //   ".widget_frame_base"
        // );

        // // iFrameResize({ log: true }, "ifc");
        // console.log(ifc);
        // console.log(base);

        // ifc.addEventListener("onload", () => {
        //   ifc.style.height =
        //     ifc.contentWindow.document.body.scrollHeight + "px";
        // });
      });

      // textareaTitle.style.opacity = "1";
      // mainTextarea.style.paddingTop = "3rem";
      alert.style.opacity = "1";

      setTimeout(() => {
        alert.style.opacity = "0";
      }, 2000);
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
