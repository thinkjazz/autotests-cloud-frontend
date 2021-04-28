import SockJS from "../sockets/sockjs.min";
import { Stomp } from "../sockets/stomp.min";

const mainForm = document.querySelector("#objective");
const buttonSubmitForm = mainForm.querySelector(".btn");
const headerTextarea = document.querySelector(".textarea-header");
const titleTextarea = document.querySelector("#input-title");
const mainTextarea = document.querySelector("#textarea-main");
const alert = document.querySelector(".alert");

const codeBlock = document.querySelector(".mockup-code");
const iframeBlock = document.querySelector(".iframe-block");

let stompClient = null;

function connect() {
  const socket = new SockJS("http://localhost:8080/ws"); // todo add exception
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (status) {
    console.log("Connected: " + status);
    stompClient.subscribe("/topic/greetings", function (message) {
      console.log("Message: " + message);
      // todo add exception
      addSocketEvent(JSON.parse(message.body));
    });
  });
}

function addSocketEvent(message) {
  let pre = document.createElement("pre");
  pre.innerHTML = `<code>${message.content}</code>`;

  switch (message.contentType) {
    case "started":
      pre.className = "flex";
      pre.setAttribute("data-prefix", "$");
      pre.innerHTML = `<code>${message.content}</code>`;
      break;
    case "generated":
      pre.className = "text-success flex";
      pre.setAttribute("data-prefix", ">");
      pre.innerHTML = `<code>${message.content}</code></pre><pre><a class="questions" href="${message.url}">${message.url}</a></code>`;
      break;
    case "in progress":
      pre.className = "text-warning flex";
      pre.setAttribute("data-prefix", ">");
      pre.innerHTML = `<code>${message.content} <a class="questions" href="${message.url}">${message.url}</a></code>`;
      break;
    case "notification":
      pre.className = "text-info flex";
      pre.setAttribute("data-prefix", ">");
      pre.innerHTML = `<code>${message.content} <a class="questions" href="${message.url}">${message.url}</a></code>`;
      displayNotification(message.url);
      break;
    case "error":
      pre.className = "text-error flex";
      pre.setAttribute("data-prefix", "x");
      pre.innerHTML = `<code>${message.content}</code>`;
      break;
  }
  document.querySelector("#console").append(pre);
}

function displayNotification(url) {
  iframeBlock.innerHTML = `<iframe id="telegram-post-autotests_cloud-17" class="telegram-iframe w-full h-full h-80"
          src=${url}&dark=1&embed=1"></iframe>`;
  // src="https://t.me/autotests_cloud/${resp}?embed=1&dark=1" frameborder="0" scrolling="yes"></iframe>`;
}

function hide(element) {
  element.style.opacity = "0";
  element.style.display = "none";
}

// buttonSubmitForm.addEventListener("click", (event) => {
//   // event.preventDefault();
// });

const initForm = () => {
  // mainTextarea.addEventListener("focus", () => {
  //   textareaTitle.style.opacity = "0";
  //   mainTextarea.style.paddingTop = "1rem";
  // });
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

      let a = stompClient.send("/app/hello", {}, JSON.stringify(values));
      console.log(a);
      // const response = sendData(url, JSON.stringify(values));
      headerTextarea.innerHTML = "In progress..."; // todo add exception
      codeBlock.classList.remove("hidden");
      mainForm.classList.add("hidden");
      iframeBlock.classList.remove("hidden");
      // response.then((resp) => {
      hide(mainTextarea);
      hide(titleTextarea);
      hide(buttonSubmitForm);
      hide(headerTextarea);

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
