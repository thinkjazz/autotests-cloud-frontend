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
        description: `Describe your manual test step by step`,
        test_title: "Test title",
        textarea: `Open 'https://github.com/login' 

Set username 'Alex' 
Set password '12%#5f'
Submit form 

Verify successful authorization as 'Alex'`,
        checkout_button: "Automate it! (free now)",
        // copyright: `<a target="_blank" class="green-link" href="https://qa.guru">qa.guru</a>
        //     copyright`,
      },
      ru_lang: {
        // title: "Тест аутомейшн эс а сервис",
        // alert_success: "Аутомэйшн хэс стартед!",
        description: `
            Распишите ручной тест шаг за шагом`,
        test_title: "Название теста",
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
