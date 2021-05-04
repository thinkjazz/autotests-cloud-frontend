const initDisco = () => {
  const mainContainer = document.querySelector("#app");
  const consoleContainer = document.querySelector(".console-container");
  const console = document.querySelector("#console");
  const mainForm = document.querySelector("#objective");
  const mainTitle = document.querySelector("h1");
  const discoBtn = document.querySelector(".tools__item--disco");
  const catParty = document.querySelector("#party");

  const discoElementBanana = document.querySelectorAll(
    ".disco-element--banana"
  );
  const discoElementWoman = document.querySelectorAll(".disco-element--woman");
  const dancers = document.querySelectorAll(".disco-element");

  let mainTitleText;
  let danceInterval;
  let colorInterval;
  let danceFlag = true;

  discoBtn.addEventListener("click", () => {
    if (danceFlag) {
      startDisco();
    } else {
      stopDisco();
    }
  });

  function startDisco() {
    mainTitleText = mainTitle.innerHTML;
    mainTitle.innerHTML = `Test automation as a <span class="disco__word disco__word--1">D</span><span class="disco__word disco__word--2">i</span><span class="disco__word disco__word--3">s</span><span class="disco__word disco__word--4">c</span><span class="disco__word disco__word--5">o</span>`;

    const rand = (multi) => {
      return parseInt(multi * Math.random(), 10);
    };

    let ww = window.innerWidth / 2;
    let wh = window.innerHeight;

    let constraint = Math.min(ww, wh);

    function move() {
      dancers.forEach((dancer) => {
        let w = rand(constraint);

        let x = rand(ww - w);
        let y = rand(wh - w);

        dancer.style.height = w / 3 + "px";
        dancer.style.top = y + "px";
        dancer.style.left = x + ww / 4 + "px";

        dancer.style.transition = rand(100) + 2000 + "ms";
      });
    }

    move();

    catParty.classList.remove("hidden");
    consoleContainer.classList.add("hidden");
    mainForm.classList.add("hidden");

    discoElementBanana.forEach((element) => {
      element.classList.remove("hidden");
    });
    discoElementWoman.forEach((element) => {
      element.classList.remove("hidden");
    });

    colorInterval = window.setInterval(changeColors, 500);
    danceInterval = window.setInterval(move, 1500);
    danceFlag = false;
  }

  function stopDisco() {
    let iframe = document.querySelector("iframe");

    mainTitle.innerHTML = mainTitleText;

    discoElementBanana.forEach((element) => {
      element.classList.add("hidden");
    });

    discoElementWoman.forEach((element) => {
      element.classList.add("hidden");
    });

    if (iframe) {
      consoleContainer.classList.remove("hidden");
    } else {
      mainForm.classList.remove("hidden");
    }

    catParty.classList.add("hidden");

    danceFlag = true;

    clearInterval(danceInterval);
    clearInterval(colorInterval);
  }

  function randColor(elem) {
    let code_color = document.querySelector(".code_color"),
      r = Math.floor(Math.random() * 256),
      g = Math.floor(Math.random() * 256),
      b = Math.floor(Math.random() * 256),
      color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    elem.style.color = color;
  }

  function changeColors() {
    let allDiscoLetters = document.querySelectorAll(".disco__word");
    allDiscoLetters.forEach((element) => {
      randColor(element);
    });
  }
};

export { initDisco };
