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
        title: "Test automation as a service",
        alert_success: "Automation has started!",
        description: `<a target="_blank" class="green-link" href="https://qa.guru">QA.GURU</a>
            engineers will automate your tests. Describe step by step`,
        test_title: "Test title",
        textarea: `Open 'https://github.com/login'  Set username 'Alex'  Set password '12%#5f'  Verify successful authorization as 'Alex'`,
        checkout_button: "Checkout (free now)",
        copyright: `<a target="_blank" class="green-link" href="https://qa.guru">qa.guru</a>
            copyright`,
      },
      ru_lang: {
        title: "Тест аутомейшн эс а сервис",
        alert_success: "Аутомэйшн хэс стартед!",
        description: `
            Инженеры <a target="_blank" class="green-link" href="https://qa.guru">QA.GURU</a> вилл аутомейт ёр тестс. Дескрайб степ бай степ`,
        test_title: "Тест тайтл",
        textarea: `Опен 'https://github.com/login' <br>  Сет юзернейм 'Alex'  Сет пассворд '12%#5f'  Верифай саксессфул ауторизейшн эс 'Alex'`,
        checkout_button: "Чекаут (free now)",
        copyright: `<a target="_blank" class="green-link" href="https://qa.guru">qa.guru</a>
            копирайт`,
      },
    };
  }
}

export default LocalLang;
