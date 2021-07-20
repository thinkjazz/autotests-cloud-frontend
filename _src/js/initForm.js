import { create_UUID } from "./StringUtils.js";

const body = document.querySelector("body.tests-app");
const mainForm = document.querySelector("#objective");
const appBlock = document.querySelector("#app");
const mainBtn = document.querySelector("button.main");

const modalForm = document.querySelector("#modal_form");
const modalBtn = document.querySelector("button.modal");
const modalBtnClose = document.querySelector("button.modal-close");

const optionsBtn = document.querySelector("button.options");

const tcTitle = document.querySelector("#tc_title");
const tcText = document.querySelector("#text_case");
const tcList = document.querySelector(".added-tc");

const addTestCase = document.querySelector("#add_test_case");

const addNew = document.querySelector("#add_new");
const formAdd = document.querySelector("#modal_form .input-block");

const titleTextarea = document.querySelector("#input-title");
const mainTextarea = document.querySelector("#textarea-main");

const consoleContainer = document.querySelector(".console-container");



const codeBlock = document.querySelector(".mockup-code");
const consoleWindow = document.querySelector("#console");
const iframeBlock = document.querySelector(".iframe-block");
const infoBlock = document.querySelector(".info");
const telegramBlock = document.querySelector(".telegram-block");

let stompClient = null;
let uuid = create_UUID();
let scroll;
let scenarioCount = 0;
// localStorage.clear();

function connect() {
	console.log('connect +');
	// const socket = new SockJS("https://api.autotests.cloud/ws"); // todo add exception
	const socket = new SockJS("http://localhost:8080/ws"); // todo add exception
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(status) {
		console.log("Connected: " + status);
		stompClient.subscribe(`/topic/${uuid}`, function(message) {
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
		// alert(document.getElementById('input-title').value);
			consoleContainer.classList.remove("hidden");
			appBlock.classList.add("hidden");
			telegramBlock.classList.remove("hidden");
			infoBlock.classList.add("hidden");



		const formData = new FormData(mainForm);
		const values = Object.fromEntries(formData.entries());

		console.log(values);

		if (values.title) {
			values.price = "free";
			values.email = "admin@qa.guru";
      			values.steps = allStorage(); //Вызываем функцию которая возвращает массив объектов
			// values.captcha = values["g-recaptcha-response"];
			delete values["g-recaptcha-response"];

			console.log(values);

			stompClient.send(`/app/orders/${uuid}`, {}, JSON.stringify(values));

			// consoleContainer.classList.remove("hidden");
			mainForm.classList.add("hidden");
			iframeBlock.classList.remove("hidden");
			infoBlock.classList.add("hidden");
			telegramBlock.classList.remove("hidden");

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


function modalOpen() {
	body.classList.add("modal");
}

function modalClose() {
	body.classList.remove("modal");
}

function optionsToggle() {
	body.classList.toggle("options-open");
}



function createTestCase() {
	if (!tcTitle.value) {
		tcTitle.classList.add("border-red-500");
	}
	setTimeout(() => {
		tcTitle.classList.remove("border-red-500");
	}, 2000);
	if (tcTitle.value) {
		scenarioCount++;
		tcList.insertAdjacentHTML("beforeend", `<li class="added-tc-item" id="item_` + scenarioCount + `">` + tcTitle.value + `<span>` + tcText.value + `</span></li>`);
                setItemToLocalStorage(); //Записываем в localStorage при отправки формы
		modalForm.reset();
		body.classList.remove("modal");
	}
}


function addNewField() {
	if (!tcTitle.value) {
		tcTitle.classList.add("border-red-500");
	}
	setTimeout(() => {
		tcTitle.classList.remove("border-red-500");
	}, 2000);

	if (tcTitle.value) {
		scenarioCount++;
		tcList.insertAdjacentHTML("beforeend", `<li class="added-tc-item" id="item_` + scenarioCount + `">` + tcTitle.value + `<span>` + tcText.value + `</span></li>`);
    		setItemToLocalStorage(); // Записываем в localStorage
 		modalForm.reset();
	}
}


function setItemToLocalStorage() {
  //Эта функция setItemToLocalStorage записывает в объект steps наши шаги и потом серилизует и передаёт в localStorage
  //Записываем  tcTitle.value, tcText.value в отдельный объект
  const steps = {
    title: tcTitle.value,
    text: tcText.value, 
  };
  //Кладём все это в ключ step предварительно объект серилизуем и прибавляем итерацию scenarioCount
  localStorage.setItem('step' + scenarioCount,  JSON.stringify(steps));
 
}

function allStorage() {
  //Эта функция возвращает массив объектов с добавлеными полями из разобраной строки из localStorage

  let archive = []; // Массив выходных данных
  let keys = Object.keys(localStorage); //Возвращаем массив из собственных перечисляемых свойств переданного объекта, в том же порядке, в котором они бы обходились циклом for... in - это быстрее
  let i = 0;
  let key;
  // Проходим циклом и добавляем в массив объекты из localStorage
    for (; key = keys[i]; i++) {
        archive.push(JSON.parse(localStorage.getItem(key)));
    }

    return archive;
}

modalBtn.addEventListener("click", modalOpen);
modalBtnClose.addEventListener("click", modalClose);
optionsBtn.addEventListener("click", optionsToggle);
addNew.addEventListener("click", addNewField);
addTestCase.addEventListener("click", createTestCase);
