import { create_UUID } from "./StringUtils.js"; // Утилита для создание уникального UUID

const body = document.querySelector("body.tests-app"); // Выбираем корневой селектор класса tests-app
const appBlock = document.querySelector("#app"); // Выбираем div#app который оборачивает from#objective, что ниже
const mainForm = document.querySelector("#objective"); // Выбираем основную форму form#objective
const mainBtn = document.querySelector("button.main"); // Основная кнопка сгенерировать

const modalForm = document.querySelector("#modal_form"); // Модальная форма, которая вызывается для  добавления ручных тестов
const modalBtn = document.querySelector("button.modal"); // Кнопка для small modal для вызова мольного окна
const modalBtnClose = document.querySelector("button.modal-close"); // Кнопка для закрытия модального окна
const optionsBtn = document.querySelector("button.options"); // Кнопка показать \ скрыть опции

const tcTitle = document.querySelector("#tc_title"); // Input ввода в открытом модальном окне
const tcSteps = document.querySelector("#text_case"); // Textarea в открытом модальном окне для теста
const tcList = document.querySelector(".added-tc"); // Родительский список <ul> || let testTasksHolder = document.getElementById("tc-list");

const addTestCase = document.querySelector("#add_test_case"); // Большая кнопка добавить в модальном окне
const addNew = document.querySelector("#add_new"); // Кнопка добавить еще один тест

const formAdd = document.querySelector("#modal_form .input-block"); // Div который оборачивает input & textarea в модальном окне, который лежит в форме

const titleTextarea = document.querySelector("#input-title"); // Главный Input c https://
const mainTextarea = document.querySelector("#textarea-main"); // null непонятный селектор

const consoleContainer = document.querySelector(".console-container"); // Консоль которая выводится при получении данных с бекэнда
const consoleContainerContent = consoleContainer.querySelector(".content"); // Блок с классом контейнер в консоле

const codeBlock = document.querySelector(".mockup-code"); // null
const consoleWindow = document.querySelector("#console"); // null
const iframeBlock = document.querySelector(".iframe-block"); // div info iframe-block
const infoBlock = document.querySelector(".info"); // выбирает тот же самый блок div info iframe-block
const telegramBlock = document.querySelector(".telegram-block"); // Блок отрисовки телеграма

const telegramTestBtn = document.querySelector(".logo"); // Логотип

let stompClient = null; // stompClient создан, но ничего нет в нём
let uuid = create_UUID(); // Создаем уникальный идентификатор
let scenarioCount = 0; // Глобальный счётчик scenarioCount от него идёт инкрименты всех сценаривев и элементов списка .added-tc-item + scenarioCount

// localStorage.clear();

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
    const values = Object.fromEntries(formData.entries());

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
      mainForm.classList.add("hidden");
      // Тут не понятно, показывыем iframeBlock
      iframeBlock.classList.remove("hidden");
      // И скрываем .info
      infoBlock.classList.add("hidden");
      // telegramBlock.classList.remove("hidden");

      // scroll = new SimpleBar(consoleWindow, { autoHide: false });

      // function add() {
      // 	let pre = document.createElement("pre");
      // 	// let scrollContent = document.querySelector(".simplebar-content");
      // 	pre.setAttribute("data-prefix", "$");
      // 	pre.innerHTML = `<code>npm i daisyui</code>`;
      // 	scrollContent.append(pre);
      // 	scroll.getScrollElement().scrollTo({ top: 5000, behavior: "smooth" });
      // 	// scroll.getScrollElement().scrollTop = scroll.getScrollElement().scrollHeight;
      // }

      // window.setInterval(add, 2500);

      mainForm.reset();
    } else {
      // if (!mainTextarea.value) {
      //   mainTextarea.classList.add("border-red-500");
      // }

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

// Эта функция создает новый элемент <li> списка задач c lable, span, input#edit,
// textarea#edit, button#edit, button#delete внутри и принимает два параметра
// @param inputTestCaseString строка из input
// @param textAreaTestCaseString строка из textarea
let createNewTestElement = (
  inputTestCaseString,
  textAreaTestCaseString,
  itemID
) => {
  // Создать элемент списка
  let listItem = document.createElement("li");
  listItem.id = itemID;
  // Cоздать span который будет потом скрыт
  let span = document.createElement("span");
  // Создать label
  let label = document.createElement("label");
  // Создать input (text)
  let editInput = document.createElement("input");
  // Создать textarea (text)
  let editTextArea = document.createElement("textarea");
  // Создать button.edit
  let editButton = document.createElement("button");
  // Создать button.delete
  let deleteButton = document.createElement("button");

  setItemToLocalStorage(itemID++, inputTestCaseString, textAreaTestCaseString); // Записываем в localStorage для дальнейшей отправки формы
  // Каждый элемент, требующий модификации
  editInput.type = "text";
  editTextArea.name = "text-area";
  editButton.innerHTML = `<img src="img/edit.svg" width="20" height="20"></img>`;
  editButton.className = "medium modal edit";
  deleteButton.innerHTML = `<img src="img/trash.svg" width="20" height="20"></img>`;
  deleteButton.className = "medium modal delete";
  // label и span присваиваем параметры которые пойдут из value с модального окна
  label.innerText = inputTestCaseString;
  label.className = "testItemText";
  span.innerText = textAreaTestCaseString;
  // Скрываем span
  span.setAttribute("hidden", "");
  // В listItem добавляем все дочерние элементы. т.е каждый элемент который нуждается в добавлении
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(span);
  listItem.appendChild(editTextArea);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// Добавить новый test case
let addTestCaseItem = function () {
  console.log("Add test case");
  // При нажатии кнопки
  // Создайте новый элемент списка с текстом из нового тест-задания
  let listItem = createNewTestElement(
    tcTitle.value,
    tcSteps.value,
    scenarioCount++
  );

  // Добавить listItem в tcList
  if (tcTitle.value.length > 0 && tcSteps.value.length > 0) {
    tcList.appendChild(listItem);
    bindTestCaseEvents(listItem);
    // tcTitle.value = "";
    // tcSteps.value = "";
  } else if (!tcTitle.value) {
    tcTitle.classList.add("border-red-500");
    console.warn("Ошибка добавления имени теста");
  }
  setTimeout(() => {
    tcTitle.classList.remove("border-red-500");
  }, 2000);
};

// Редактирование существующий test case
let editTestCase = function () {
  console.log("Edit test case");
  let listItem = this.parentNode;
  let editButton = this;
  let editInput = listItem.querySelector("input[type=text]");
  let editText = listItem.querySelector("textarea[name=text-area]");
  let label = listItem.querySelector("label");
  let spanText = listItem.querySelector("span");
  let containsClass = listItem.classList.contains("editMode");
  let listItemID = listItem.id;
  console.log(listItemID);

  // Если класс родителя - .editMode
  if (containsClass) {
    // Переключаем из .editMode
    // Label text c классом testItemText становится input's (text) value
    label.innerText = editInput.value;
    editButton.innerHTML = `<img src="img/edit.svg" width="20" height="20"></img>`;
    // Span text становится text-area's (text-area) value
    spanText.innerText = editText.value;
    setItemToLocalStorage(listItemID, editInput.value, editText.value);
  } else {
    // Переключаем в .editMode
    // input (text) value становится label's text
    editInput.value = label.innerText;
    editButton.innerHTML = `<img src="img/floppy-disk.svg" width="20" height="20"></img>`;

    // textarea (text-area) value становится span text
    editText.value = spanText.innerText;
  }
  // Toggle Переключиться на .editMode в li
  listItem.classList.toggle("editMode");
};

// Удалить существующый test case
let deleteTestCase = function () {
  console.log("Delete task");
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  // Удаляем <li> из ul
  ul.removeChild(listItem);
  let listItemID = listItem.id;
  console.log(listItemID);
  localStorage.removeItem(listItemID);
};

// Пометить test case как добавленый
let addedTestCase = function () {
  console.log("Test task done");
  // Добавьте test case  <li></li> в #test-tasks
  let listItem = this.parentNode;
  tcList.appendChild(listItem);
  bindTestCaseEvents(listItem);

};

let bindTestCaseEvents = function (taskListItem) {
  console.log("Bind list item events");
  // Выбираем дочерние элементы taskListItems
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");

  // привязать editTask к кнопке редактирования
  editButton.onclick = editTestCase;

  // привязать deleteTask к кнопке удаления
  deleteButton.onclick = deleteTestCase;
};
// Установите обработчик щелчка на функцию addTestCaseItem но поменять местами для обратного действия
addTestCase.addEventListener("click", addNewFields);
// Установите обработчик щелчка на функцию addNewFields
addNew.addEventListener("click", addTestCaseItem);


// перебор элементов списка родительского ul
for (let i = 0; i < tcList.children.length; i++) {
  // привязываем события к дочерним элементам списка
  bindTestCaseEvents(tcList.children[i]);
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
    if (key > 0 && key !== "_grecaptcha") {
      console.log("localStorage.getItem(key): " + localStorage.getItem(key));
      console.log(
        "JSON.parse(localStorage.getItem(key)): " +
          JSON.parse(localStorage.getItem(key))
      );
      archive.push(JSON.parse(localStorage.getItem(key)));
    } else if  (key !== "_grecaptcha") {
      localStorage.removeItem('_grecaptcha')
      continue; // пропустит и удалить ключи _grecaptcha
    }
  } 

  console.log("archive: " + JSON.stringify(archive));

  return archive;
}

// function getItemsFromStorage() {
//   let steps = loadingStateFromStorage();

// steps.forEach(el => {

//   console.log(el.title, el.steps, el.id);

// })
// }


function addNewFields() {
  addTestCaseItem();
  tcTitle.value = "";
  tcSteps.value = "";
  body.classList.remove("modal");
}

// Функция setItemToLocalStorage принимает в свои параметры id title steps которые вызываются из внутри setItemToLocalStorage внутри addTestCaseItem
// при формировании id title.value steps.value записывает в объект tests наши шаги и потом серилизует и передаёт в localStorage
function setItemToLocalStorage(id, titleValue, stepsValue) {
  // Записываем tcTitle.value, tcSteps.value в отдельный объект
  let tests = {
    id,
    title: titleValue,
    steps: stepsValue,
    timestamp: new Date().getTime(),
    // date: new Date().toLocaleString(),
  };

  // Кладём все это в ключ test предварительно объект серилизуем и прибавляем итерацию scenarioCount
  localStorage.setItem(id, JSON.stringify(tests));
}

// ТЕСТ ТЕЛЕГИ
function testTelegram() {
  telegramBlock.innerHTML = `<iframe id="telegram-post-autotests_cloud-17" class="telegram-iframe" src="https://t.me/11111?embed=1&discussion=1&comments_limit=5&light=1"></iframe>`;
  telegramBlock.classList.remove("hidden");
  infoBlock.classList.add("hidden");
}

telegramTestBtn.addEventListener("click", testTelegram);

 
modalBtn.addEventListener("click", modalOpen);
modalBtnClose.addEventListener("click", modalClose);
optionsBtn.addEventListener("click", optionsToggle);
