import SockJS from "../sockets/sockjs.min";
import { Stomp } from "../sockets/stomp.min";

const mainForm = document.querySelector("#objective");
const buttonSubmitForm = mainForm.querySelector(".btn");
const buttonTelegram = mainForm.querySelector(".btn--telegram");
const headerTextarea = document.querySelector(".textarea-header");
const titleTextarea = document.querySelector("#input-title");
const mainTextarea = document.querySelector("#textarea-main");
const loadingBlock = document.querySelector("#loading-block");
const alert = document.querySelector(".alert");
const telegramFrame = document.querySelector("#telegram-frame");

const codeBlock = document.querySelector(".mockup-code");
const iframeBlock = document.querySelector(".iframe-block");

let stompClient = null;

function connect() {
  const socket = new SockJS("http://localhost:8080/gs-guide-websocket"); // add exception
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/greetings", function (greeting) {
      // add exception
      showGreeting(JSON.parse(greeting.body).content);
    });
  });
}

function showGreeting(message) {
  document
    .querySelector("#greetings")
    .append("<tr><td>" + message + "</td></tr>");
}

function hide(element) {
  element.style.opacity = "0";
  element.style.display = "none";
}

buttonSubmitForm.addEventListener("click", (event) => {
  // event.preventDefault();
});

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

      let a = stompClient.send("/1app/hello", {}, JSON.stringify(values));
      console.log(a);
      // const response = sendData(url, JSON.stringify(values));
      headerTextarea.innerHTML = "In progress..."; // add exception
      codeBlock.classList.remove("hidden");
      mainForm.classList.add("hidden");
      iframeBlock.classList.remove("hidden");
      // response.then((resp) => {
      hide(mainTextarea);
      hide(titleTextarea);
      hide(buttonSubmitForm);
      hide(loadingBlock);

      mainForm.reset();
      headerTextarea.innerHTML =
        "Telegram discussion, Github repository, Jenkins job & Jira issue created!";

      iframeBlock.innerHTML = `<iframe id="telegram-post-autotests_cloud-17" class="telegram-iframe w-full h-full h-80"
          src="https://t.me/autotests_cloud_chat/596?embed=1&dark=1" frameborder="0" scrolling="yes"></iframe>`;
      // src="https://t.me/autotests_cloud/${resp}?embed=1&dark=1" frameborder="0" scrolling="yes"></iframe>`;

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
