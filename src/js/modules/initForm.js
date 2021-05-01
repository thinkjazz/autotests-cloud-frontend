import SockJS from "../sockets/sockjs.min";
import { Stomp } from "../sockets/stomp.min";
import { create_UUID } from "../utils/StringUtils";

const mainForm = document.querySelector("#objective");
const titleTextarea = document.querySelector("#input-title");
const mainTextarea = document.querySelector("#textarea-main");
const alert = document.querySelector(".alert");
const codeBlock = document.querySelector(".mockup-code");
const iframeBlock = document.querySelector(".iframe-block");

let stompClient = null;
let uuid = create_UUID();

function connect() {
  const socket = new SockJS("http://localhost:8080/ws"); // todo add exception
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
  let pre = document.createElement("pre");

  switch (message.contentType) {
    case "started":
      pre.className = "flex";
      pre.setAttribute("data-prefix", "$");
      pre.innerHTML = `<code>${message.content}</code>`;
      break;
    case "info":
      pre.className = "flex";
      pre.setAttribute("data-prefix", ">");
      pre.innerHTML = `<code>${message.content}</code>`;
      break;
    case "generated":
      pre.className = "text-warning flex";
      pre.setAttribute("data-prefix", ">");
      pre.innerHTML = `<code>${message.content} <br/></code>`;
      break;
    case "green-link":
      pre.className = "flex";
      pre.setAttribute("data-prefix", ">");
      pre.innerHTML = `<code><a target="_blank" class="text-success" href="${message.url}">${message.url}</a></code>`;
      break;
    case "blue-link":
      pre.className = "flex";
      pre.setAttribute("data-prefix", ">");
      pre.innerHTML = `<code><a target="_blank" class="text-info" href="${message.url}">${message.url}</a> 👈</code>`;
      break;
    case "in progress":
      pre.className = "text-warning flex";
      pre.setAttribute("data-prefix", ">");
      pre.innerHTML = `<code>${message.content} </code>`;
      break;
    case "telegram-notification":
      displayNotification(message.content);
      break;
    case "empty":
      pre.className = "flex";
      pre.innerHTML = `<code> </code>`;
      break;
    case "error":
      pre.className = "text-error flex";
      pre.setAttribute("data-prefix", "x");
      pre.innerHTML = `<code>${message.content}</code>`;
      break;
  }
  document.querySelector("#console").append(pre);
}

function displayNotification(messagePath) {
  iframeBlock.innerHTML = `<iframe id="telegram-post-autotests_cloud-17" class="telegram-iframe w-full h-full h-80"
          src="https://t.me/${messagePath}?embed=1&discussion=1&comments_limit=5&dark=1"></iframe>`;
}

function hide(element) {
  element.style.opacity = "0";
  element.style.display = "none";
}

const initForm = () => {
  connect();

  function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(mainForm);
    const values = Object.fromEntries(formData.entries());

    console.log(values);

    if (!!values.steps && values.title) {
      values.price = "free";
      values.email = "admin@qa.guru";
      console.log(values);

      stompClient.send(`/app/orders/${uuid}`, {}, JSON.stringify(values));

      codeBlock.classList.remove("hidden");
      mainForm.classList.add("hidden");
      iframeBlock.classList.remove("hidden");

      mainForm.reset();
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
