import SockJS from "../sockets/sockjs.min";
import { Stomp } from "../sockets/stomp.min";
import { create_UUID } from "../utils/StringUtils";
import SimpleBar from "simplebar";

const mainForm = document.querySelector("#main_url");
const titleInput = document.querySelector("#input-title");
const urlInput = document.querySelector("#input-url");
const mainTextarea = document.querySelector("#textarea-main");
const consoleContainer = document.querySelector(".console-container");
const codeBlock = document.querySelector(".mockup-code");
const consoleWindow = document.querySelector("#console");
const iframeBlock = document.querySelector(".iframe-block");
const infoBlock = document.querySelector(".info");
const objectivesBlock = document.querySelector(".objectives-block");

let stompClient = null;
let uuid = create_UUID();
let scroll;

function connect() {
  const socket = new SockJS("https://api.autotests.cloud/ws"); // todo add exception
  // const socket = new SockJS("http://localhost:8080/ws"); // todo add exception
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (status) {
    console.log("Connected: " + status);
    stompClient.subscribe(`/topic/${uuid}`, function (message) {
      console.log("Message: " + message);
      // todo add exception
      addSocketEvent(JSON.parse(message.body));
    });
  });
}

function addSocketEvent(message) {
  let scrollContent = document.querySelector(".simplebar-content");
  let pre = document.createElement("pre");
  pre.setAttribute("data-prefix", message.prefix);

  switch (message.contentType) {
    case "info":
      pre.className = "list-auto flex";
      pre.innerHTML = `<code>${message.content}</code>`;
      break;
    case "generated":
      pre.className = "text-warning flex";
      pre.innerHTML = `<code>${message.content}<a target="_blank" class="green-link" href="${message.url}">${message.urlText}</a></div></code>`;
      break;
    case "launched":
      pre.className = "text-warning flex";
      pre.innerHTML = `<code>${message.content}<a target="_blank" class="green-link" href="${message.url}">${message.urlText}</a> </code> <label class="loader"></label>`;
      break;
    case "finished":
      pre.className = "text-warning flex";
      pre.innerHTML = `<code>${message.content}<a target="_blank" class="green-link" href="${message.url}">${message.urlText}</a></div></code>`;
      document.querySelector(".loader").remove();
      break;
    case "in progress":
      pre.className = "text-warning flex";
      pre.innerHTML = `<code>${message.content} </code>`;
      break;
    case "can-automate":
      pre.className = "flex";
      pre.innerHTML = `<code>${message.content}</code>`;
      break;
    case "telegram-info":
      pre.className = "flex";
      pre.innerHTML = `<code>${message.content}<a target="_blank" class="blue-link" href="${message.url}">${message.urlText}</a> 👈</code>`;
      break;
    case "telegram-notification":
      pre.className = "flex";
      pre.innerHTML = `<code> </code>`;
      displayNotification(message.content);
      break;
    case "empty":
      pre.className = "list-auto flex";
      pre.innerHTML = `<code> </code>`;
      break;
    case "error":
      pre.className = "text-error flex";
      pre.innerHTML = `<code>${message.content}</code>`;
      break;
  }
  scrollContent.append(pre);
  scroll.getScrollElement().scrollTo({ top: 5000, behavior: "smooth" });
}

function displayNotification(messagePath) {
  iframeBlock.innerHTML = `<iframe id="telegram-post-autotests_cloud-17" class="telegram-iframe w-full h-full h-80"
          src="https://t.me/${messagePath}?embed=1&discussion=1&comments_limit=5&dark=1"></iframe>`;
}

const initForm = () => {
  connect();

  function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(mainForm);
    const values = Object.fromEntries(formData.entries());

    if (values.url && values["g-recaptcha-response"]) {
      // if (values.url) {
      values.price = "free";
      values.email = "admin@qa.guru";
      values.captcha = values["g-recaptcha-response"];
      delete values["g-recaptcha-response"];

      console.log(values);

      stompClient.send(`/app/orders/${uuid}`, {}, JSON.stringify(values));

      consoleContainer.classList.remove("hidden");
      mainForm.classList.add("hidden");
      infoBlock.classList.add("hidden");

      objectivesBlock.classList.remove("objectives-block--disabled");

      // document
      //   .querySelector("#telegram-post-autotests_cloud-17")
      //   .classList.remove("hidden");

      scroll = new SimpleBar(consoleWindow, { autoHide: false });

      function add() {
        let pre = document.createElement("pre");
        let scrollContent = document.querySelector(".simplebar-content");
        pre.setAttribute("data-prefix", "$");

        pre.innerHTML = `<code>npm i daisyui</code>`;

        scrollContent.append(pre);

        scroll.getScrollElement().scrollTo({ top: 5000, behavior: "smooth" });
        // scroll.getScrollElement().scrollTop = scroll.getScrollElement().scrollHeight;
      }

      // window.setInterval(add, 2500);

      mainForm.reset();
    } else {
      // if (!mainTextarea.value) {
      //   mainTextarea.classList.add("border-red-500");
      // }

      // if (!titleInput.value) {
      //   titleInput.classList.add("border-red-500");
      // }

      if (!urlInput.value) {
        urlInput.classList.add("border-red-500");
      }

      setTimeout(() => {
        // mainTextarea.classList.remove("border-red-500");
        // titleInput.classList.remove("border-red-500");
        urlInput.classList.remove("border-red-500");
      }, 2000);
    }
  }

  mainForm.addEventListener("submit", submitForm);
};

export { initForm };
