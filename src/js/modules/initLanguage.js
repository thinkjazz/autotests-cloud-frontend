import LocalLang from "./LocalLang";

const initLanguage = () => {
  document.addEventListener("DOMContentLoaded", changeLanguage);

  const languageButtons = document.querySelectorAll(".translate");
  const blocksForTranslate = document.querySelectorAll(".lang");

  languageButtons.forEach((button) => {
    button.addEventListener("click", changeLanguage);
  });

  function changeLanguage() {
    const blocksForTranslate = document.querySelectorAll(".lang");
    const lang =
      this.tagName === undefined
        ? LocalLang.getLocalLang()
        : this.getAttribute("id");

    blocksForTranslate.forEach((block) => {
      const currentBlock = block.getAttribute("key");

      if (block.tagName !== "TEXTAREA") {
        block.innerHTML = LocalLang.getDictionary()[lang][currentBlock];
      }

      if (block.getAttribute("placeholder") !== null) {
        block.setAttribute(
          "placeholder",
          LocalLang.getDictionary()[lang][currentBlock]
        );
      }
    });

    LocalLang.saveLocalLang(lang);

    languageButtons.forEach((button) => {
      button.classList.remove("translate--active");

      if (button.id === LocalLang.getLocalLang()) {
        button.classList.add("translate--active");
      }
    });

    if (this.id === LocalLang.getLocalLang()) {
      this.classList.add("translate--active");
    }

    // console.log(LocalLang.getDictionary()[LocalLang.getLocalLang()]);
  }
};

export { initLanguage };
