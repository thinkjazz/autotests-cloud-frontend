const removeSlash = async (url, data) => {
  let srcNodeList = document.querySelectorAll("[src],[href]");
  for (let i = 0; i < srcNodeList.length; ++i) {
    let item = srcNodeList[i];
    if (item.getAttribute("src") !== null) {
      if (item.getAttribute("src").charAt(0) === "/") {
        item.setAttribute("src", item.getAttribute("src").slice(1));
      }
    }
    if (item.getAttribute("href") !== null) {
      if (item.getAttribute("href").charAt(0) === "/") {
        item.setAttribute("href", item.getAttribute("href").slice(1));
      }
    }
  }
};

export { removeSlash };
