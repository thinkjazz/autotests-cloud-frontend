class LocalLang {
  static saveLocalLang(language) {
    let langs;

    if (localStorage.getItem("langs") === null) {
      langs = [];
    } else {
      langs = JSON.parse(localStorage.getItem("langs"));
    }
    langs.push(language);
    localStorage.setItem("langs", JSON.stringify(langs));
  }

  static getLocalLang() {
    let langs;
    if (localStorage.getItem("langs") === null) {
      langs = [];
    } else {
      langs = JSON.parse(localStorage.getItem("langs"));
    }
    let lang = langs[langs.length - 1];
    return lang;
  }

  static getDictionary() {
    return {
      en_lang: {
        // title: "Test automation as a Service",
        // alert_success: "Automation has started!",
        description: `1. Generate FREE autotests for your site`,
        title_2: `2. Describe your tests`,
        test_title: "Test title",
        scenario_button: `Add new scenario <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        class="inline-block w-4 h-4 ml-1 stroke-current transform rotate-45">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12"></path>
    </svg>`,
        test_button: "Send test",
        // test_url: "Enter your sire URL",
        textarea: `Open 'https://github.com/login' 

Set username 'Alex' 
Set password '12%#5f'
Submit form 

Verify successful authorization as 'Alex'`,
        checkout_button: "Generate!",
        // copyright: `<a target="_blank" class="green-link" href="https://qa.guru">qa.guru</a>
        //     copyright`,
      },
      ru_lang: {
        // title: "Тест аутомейшн эс а сервис",
        // alert_success: "Аутомэйшн хэс стартед!",
        description: `1. Сгенерируйте бесплатные автотесты для вашего сайта`,
        title_2: `2. Опишите ваши тесты`,
        test_title: "Название теста",
        scenario_button: `Добавить сценарий <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        class="inline-block w-4 h-4 ml-1 stroke-current transform rotate-45">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12"></path>
    </svg>`,
        test_button: "Отправить тест",
        // test_url: "Введите URL вашего сайта",
        textarea: `Открыть 'https://github.com/login' 

Ввести логин 'Alex' 
Ввести пароль '12%#5f' 
Отправить форму 
Проверить успешную авторизацию под 'Alex'`,
        checkout_button: "Автоматизировать!",
        // copyright: `<a target="_blank" class="green-link" href="https://qa.guru">qa.guru</a>
        //     копирайт`,
      },
    };
  }
}

export default LocalLang;
