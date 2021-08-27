import { create_UUID } from "./StringUtils.js"; // Утилита для создание уникального UUID

const body = document.querySelector("body.tests-app"); // Выбираем корневой селектор класса tests-app
const appBlock = document.querySelector("#app"); // Выбираем div#app который оборачивает from#objective, что ниже
const mainForm = document.querySelector("#objective"); // Выбираем основную форму form#objective
const mainBtn = document.querySelector("button.main"); // Основная кнопка сгенерировать

const modalBtn = document.querySelector("button.modal"); // Кнопка для small modal для вызова мольного окна
const modalBtnClose = document.querySelector("button.modal-close"); // Кнопка для закрытия модального окна
const optionsBtn = document.querySelector("button.options"); // Кнопка показать \ скрыть опции

const tcTitle = document.querySelector("#tc_title"); // Input ввода в открытом модальном окне
const tcSteps = document.querySelector("#text_case"); // Textarea в открытом модальном окне для теста
const tcList = document.querySelector(".added-tc"); // Родительский список <ul> || let testTasksHolder = document.getElementById("tc-list");

const addTestCase = document.querySelector("#add_test_case"); // Большая кнопка добавить в модальном окне
const addNew = document.querySelector("#add_new"); // Кнопка добавить еще один тест

const titleTextarea = document.querySelector("#input-title"); // Главный Input c https://

const consoleContainer = document.querySelector(".console-container"); // Консоль которая выводится при получении данных с бекэнда
const consoleContainerContent = consoleContainer.querySelector(".content"); // Блок с классом контейнер в консоле

const iframeBlock = document.querySelector(".iframe-block"); // div info iframe-block
const infoBlock = document.querySelector(".info"); // выбирает тот же самый блок div info iframe-block
const telegramBlock = document.querySelector(".telegram-block"); // Блок отрисовки телеграма

const telegramTestBtn = document.querySelector(".logo"); // Логотип


let stompClient = null; // stompClient создан, но ничего нет в нём
let uuid = create_UUID(); // Создаем уникальный идентификатор
let scenarioCount = 0; // Глобальный счётчик scenarioCount от него идёт инкрименты всех сценаривев и элементов списка .added-tc-item + scenarioCount

let checkAllGithub = document.getElementById("option1"); //Родительский чекбокс гитхаба
let checkBoxesGithub = document.querySelectorAll("input.github"); //Дочерний чекбокс

let checkAllJenkins = document.getElementById("option3"); //Родительский чекбокс Jenkins
let checkBoxesJenkins = document.querySelectorAll("input.jenkins"); //Дочерний чекбокс

function selectingAllNestedCheckboxes(parents, childs, className) {
  for (let i = 0; i < childs.length; i++) {
    childs[i].onclick = function () {
      let checkedCount = document.querySelectorAll(
        `input.${className}:checked`
      ).length;

      parents.checked = checkedCount > 0;
      parents.indeterminate = checkedCount > 0 && checkedCount < childs.length;
    };
  }

  parents.onclick = function () {
    for (let i = 0; i < childs.length; i++) {
      childs[i].checked = this.checked;
    }
  };
}

selectingAllNestedCheckboxes(checkAllGithub, checkBoxesGithub, "github"); // перебор  дерева гитхаба
selectingAllNestedCheckboxes(checkAllJenkins, checkBoxesJenkins, "jenkins"); // перебор  дерева jenkins

// Функция connect() создаёт экземпляр new SockJS с адресом сокета и подключается к серверу
// Подключение к серверу и отправака сокетов в spring
// После создания клиента STOMP он должен вызвать свой stompClient.connect() метод для эффективного подключения и аутентификации на сервере STOMP.
// Метод принимает два обязательных аргумента, login и passcode соответствующие учетные данные пользователя и какой-то client-id.

function connect() {
  console.log("connect +");
  // const socket = new SockJS("https://api.autotests.cloud/ws"); // todo add exception
  const socket = new SockJS("http://localhost:8080/ws"); // todo add exception
  // Используйте Stomp.client(url)для использования нативных веб-сокетов или используйте, Stomp.over(ws) если вам требуется другой тип веб-сокетов.
  stompClient = Stomp.over(socket);

  //Подключам через SockJS через STOMP к  бэкэнду Spring
  stompClient.connect({}, function (status) {
    console.log("Connected: " + status);

    // Подписываемся на прослушку с бекэнда
    stompClient.subscribe(`/topic/${uuid}`, function (message) {
      console.log("Message: " + message);

      // Вызывем функцию addSocketEvent() и передаем туда в параметр JSON.parse(message.body) с результатами с бекэнда
      addSocketEvent(JSON.parse(message.body));
    });
  });
}

// Данная функция получает в параметр сообщения с бекэнда и создает элементы div.instruction -> span.command
// В зависимости от contentType switch \ case рендерит сообщения в зависимости от ответов с бекэнда
function addSocketEvent(message) {
  let lineCodeBlock = document.createElement("div");
  lineCodeBlock.className = "instruction";

  let lineCodeMessage = document.createElement("span");
  lineCodeMessage.className = "command";

  // pre.setAttribute("data-prefix", message.prefix);

  switch (message.contentType) {
    case "info":
      // pre.className = "list-auto flex";
      lineCodeMessage.innerHTML = `<code>${message.content}</code>`;
      break;
    case "generated":
      // pre.className = "text-warning flex";
      lineCodeMessage.innerHTML = `<code>${message.content}<a target="_blank" class="green-link" href="${message.url}">${message.urlText}</a></div></code>`;
      break;
    case "launched":
      // pre.className = "text-warning flex";
      lineCodeMessage.innerHTML = `<code>${message.content}<a target="_blank" class="green-link" href="${message.url}">${message.urlText}</a> </code> <label class="loader"></label>`;
      break;
    case "finished":
      // pre.className = "text-warning flex";
      lineCodeMessage.innerHTML = `<code>${message.content}<a target="_blank" class="green-link" href="${message.url}">${message.urlText}</a></div></code>`;
      document.querySelector(".loader").remove();
      break;
    case "in progress":
      // pre.className = "text-warning flex";
      lineCodeMessage.innerHTML = `<code>${message.content} </code>`;
      break;
    case "can-automate":
      // pre.className = "flex";
      lineCodeMessage.innerHTML = `<code>${message.content}</code>`;
      break;
    case "telegram-info":
      // pre.className = "flex";
      lineCodeMessage.innerHTML = `<code>${message.content}<a target="_blank" class="blue-link" href="${message.url}">${message.urlText}</a> 👈</code>`;
      break;
    case "telegram-notification":
      // pre.className = "flex";
      lineCodeMessage.innerHTML = `<code> </code>`;
      displayNotification(message.content);
      break;
    case "empty":
      // pre.className = "list-auto flex";
      lineCodeMessage.innerHTML = `<code> </code>`;
      break;
    case "error":
      // pre.className = "text-error flex";
      lineCodeMessage.innerHTML = `<code>${message.content}</code>`;
      break;
  }
  lineCodeBlock.append(lineCodeMessage);
  consoleContainerContent.append(lineCodeBlock);
  // scroll.getScrollElement().scrollTo({ top: 5000, behavior: "smooth" });
}

//Показывает уведомленяи с телеграмма
function displayNotification(messagePath) {
  telegramBlock.innerHTML = `<iframe id="telegram-post-autotests_cloud-17"
    class="telegram-iframe" src="https://t.me/${messagePath}?embed=1&discussion=1&comments_limit=5&light=1"></iframe>`;
  telegramBlock.classList.remove("hidden");
}

//Функция initForm инициализирует форму отправки тестов

const initForm = () => {
  connect(); // Вызываем подключение сокетов

  // Функция отправки формы и передаем в параметры некие события
  function submitForm(event) {
    // НЕ перезагружаем страницу т.е отменяем стандартное поведение формы
    event.preventDefault();
    // alert(document.getElementById('input-title').value);
    // Показываем контейнер с консолью || удаляем consoleContainer класс hidden
    consoleContainer.classList.remove("hidden");
    // Блоку div#app добавляеем невидимости
    appBlock.classList.add("hidden");
    // div iframe info который справо скрываем  добавляя hidden telegramBlock.classList.remove("hidden");
    infoBlock.classList.add("hidden");

    // В переменую formData мы присваиваем конструктор FormData(mainForm), который создаёт новый объект FormData т.е
    // HTML-форму на основе mainForm главной формы form#objective.
    // Существующая HTML-форма, на основе которой будет создана новая. Если ничего не указано, будет создана пустая форма.
    const formData = new FormData(mainForm);
    // В переменую values которая является объектом присваиваем результаты работы метода Object.fromEntries() преобразующего список пар ключ-значение в объект из
    // метод FormData.entries() который в свою очередь возвращает [Symbol.iterator], позволяющему пройтись по всем ключам/значениям в этом объекте.
    // Ключ каждой пары - это объект USVString, значение - это USVString или Blob.
    let values = Object.fromEntries(formData.entries());

    console.log(values);
    console.log(values instanceof Object);

    if (values.url) {
      // Если values.url существует
      // values.price = "free";
      // values.email = "admin@qa.guru";
      values.tests = loadingStateFromStorage(); //В свойство tests объекта values присваиваем результаты работы вызова функции loadingStateFromStorage() которая возвращает массив объектов
      delete values["g-recaptcha-response"]; // Удаляем рекапчу
      // В переменую присваиваем строку JSON из объекта values заменяя on \ off на булиновы значения

      let stringValues = JSON.stringify(values)
      .replaceAll('"on"', true)
      .replaceAll('"off"', false);

      console.log("данные с заменой " + stringValues);

      // Передаем
      stompClient.send(`/app/orders/${uuid}`, {}, stringValues);

      // consoleContainer.classList.remove("hidden");
      // Убираем главную форму
      mainForm.classList.add("hidden"); // Показывыем iframeBlock
      iframeBlock.classList.remove("hidden"); // И скрываем .info
      infoBlock.classList.add("hidden"); // telegramBlock.classList.remove("hidden");

      mainForm.reset();
    } else {
      if (!titleTextarea.value) {
        titleTextarea.classList.add("border-red-500");
      }

      setTimeout(() => {
        // mainTextarea.classList.remove("border-red-500");
        titleTextarea.classList.remove("border-red-500");
      }, 2000);
    }
  }

  mainBtn.addEventListener("click", submitForm);
};

export { initForm };

initForm();

// Функция открытия модального окна
function modalOpen() {
  body.classList.add("modal");
}
// Закрытие модального окна
function modalClose() {
  body.classList.remove("modal");
}
// Функция тогл
function optionsToggle() {
  body.classList.toggle("options-open");
}


// Эта функция возвращает массив объектов с добавлеными полями из разобраной строки из localStorage
function loadingStateFromStorage() {
  let archive = []; // Массив выходных данных
  let keys = Object.keys(localStorage); //Возвращаем массив из собственных перечисляемых свойств переданного объекта, в том же порядке, в котором они бы обходились циклом for... in - это быстрее
  let i = 0;
  let key;
  // Проходим циклом и добавляем в массив объекты из localStorage
  console.log("localStorage: " + localStorage);
  console.log("keys Object.keys(localStorage): " + keys);
  for (; (key = keys[i]); i++) {
    console.log("i: " + i);
    console.log("key: " + key);

    if (key.includes("steps")) {
      console.log("localStorage.getItem(key): " + localStorage.getItem(key));
      console.log(
        "JSON.parse(localStorage.getItem(key)): " +
          JSON.parse(localStorage.getItem(key))
      );
      archive.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  console.log("archive: " + JSON.stringify(archive));

  return archive;
}

// ТЕСТ ТЕЛЕГИ
function testTelegram() {
  telegramBlock.innerHTML = `<iframe id="telegram-post-autotests_cloud-17" class="telegram-iframe" src="https://t.me/11111?embed=1&discussion=1&comments_limit=5&light=1"></iframe>`;
  telegramBlock.classList.remove("hidden");
  infoBlock.classList.add("hidden");
}

telegramTestBtn.addEventListener("click", testTelegram);

// modalBtn.addEventListener("click", modalOpen);
// modalBtnClose.addEventListener("click", modalClose);
optionsBtn.addEventListener("click", optionsToggle);
