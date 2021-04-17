import { sendData } from "../utils/sendData";

// const url = "https://jsonplaceholder.typicode.com/posts";
const url = "https://api.autotests.cloud/orders";

const mainForm = document.querySelector("#objective");
const button = mainForm.querySelector(".btn");
const buttonTelegram = mainForm.querySelector(".btn--telegram");
const titleTextarea = document.querySelector("#title-textarea");
const mainTextarea = document.querySelector("#main-textarea");
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

function hide(element) {
  element.style.opacity = "0";
  element.style.display = "none";
}

button.addEventListener("click", (event) => {
  // event.preventDefault();
});

const initForm = () => {
  // mainTextarea.addEventListener("focus", () => {
  //   textareaTitle.style.opacity = "0";
  //   mainTextarea.style.paddingTop = "1rem";
  // });

  function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(mainForm);
    const values = Object.fromEntries(formData.entries());

    if (!!values.steps && values.title) {
      values.price = "free";
      values.email = "admin@qa.guru";

      const response = sendData(url, JSON.stringify(values));

      button.classList.add("loading");

      mainTextarea.style.opacity = "0";
      titleTextarea.style.opacity = "0";
      button.style.opacity = "0";

      response.then((resp) => {
        // if (window.screen.width < 768) {
        //   telegramFrame.style.minHeight = "260px";
        // }
        hide(mainTextarea);
        hide(titleTextarea);
        hide(button);

        buttonTelegram.classList.remove("hidden");

        telegramFrame.style.display = "block";

        mainForm.reset();

        telegramFrame.innerHTML = `<iframe id="telegram-post-autotests_cloud-17" class="telegram-iframe w-full h-full h-80"
          src="https://t.me/autotests_cloud/${resp}?embed=1" frameborder="0" scrolling="yes"></iframe>`;

        button.classList.remove("loading");

        buttonTelegram.href = `https://t.me/autotests_cloud/${resp}`;

        let iframe = document.querySelector(
          "#telegram-post-autotests_cloud-17"
        );

        iframe.addEventListener("load", function () {
          // setInterval(function() {
          //   iframe.style.height = iframe.contentDocument.body.scrollHeight + 'px';
          //   iframe.style.width = iframe.contentDocument.body.scrollWidth + 'px';
          // }, 500);
          // iframe.style.height =
          //   iframe.contentDocument.body.scrollHeight + "px";
          // iframe.style.width = iframe.contentDocument.body.scrollWidth + "px";
          // console.log("ЗАГРУЗИЛСЯ");
          // console.log(iframe);
          // console.log(iframe.contentDocument);
        });

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
      if (!mainTextarea.value) {
        mainTextarea.classList.add("border-red-500");
      }

      if (!titleTextarea.value) {
        titleTextarea.classList.add("border-red-500");
      }

      setTimeout(() => {
        mainTextarea.classList.remove("border-red-500");
        titleTextarea.classList.remove("border-red-500");
      }, 2000);
    }
  }

  mainForm.addEventListener("submit", submitForm);
};

export { initForm };
