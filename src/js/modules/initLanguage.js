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

    blocksForTranslate.forEach((block, index) => {
      const currentBlock = block.getAttribute("key");
      // console.log(currentBlock);
      // console.log(block.getAttribute("placeholder"));
      // console.log(block.tagName === "TEXTAREA");
      // console.log(languages[lang][currentBlock]);

      if (block.tagName !== "TEXTAREA") {
        block.innerHTML = LocalLang.getDictionary()[lang][currentBlock];
      }

      if (block.tagName === "TEXTAREA") {
        const newTextArea = document.createElement("textarea");
        //   const newTextArea = `<textarea class="lang textarea notes textarea textarea-bordered pt-4 mb-2" id="textarea-main"
        //     name="steps" key="textarea"
        //     placeholder="Open 'https://github.com/login' &#10;Set username 'Alex' &#10;Set password '12%#5f' &#10;Verify successful authorization as 'Alex'"></textarea>`;
        //   block.innerHTML = languages[lang][currentBlock];
      }
      block.setAttribute(
        "placeholder",
        LocalLang.getDictionary()[lang][currentBlock]
      );
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
