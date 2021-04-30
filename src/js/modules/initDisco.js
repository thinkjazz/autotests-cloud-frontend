const initDisco = () => {
  const mainContainer = document.querySelector("#app");
  const mainTitle = document.querySelector("h1");
  const discoBtn = document.querySelector(".tools__item--disco");

  const discoElementBanana = document.querySelectorAll(
    ".disco-element--banana"
  );
  const discoElementWoman = document.querySelectorAll(".disco-element--woman");
  const dancers = document.querySelectorAll(".disco-element");

  let mainTitleText;
  let danceInterval;

  discoBtn.addEventListener("mouseenter", startDisco);
  discoBtn.addEventListener("mouseout", stopDisco);

  function startDisco() {
    mainTitleText = mainTitle.innerHTML;
    mainTitle.innerHTML = "Test automation as a Discoteka";

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

        dancer.style.height = w / 2 + "px";
        dancer.style.top = y + "px";
        dancer.style.left = x + ww / 4 + "px";

        dancer.style.transition = rand(100) + 2000 + "ms";
      });
    }

    move();

    discoElementBanana.forEach((element) => {
      element.classList.remove("hidden");
    });
    discoElementWoman.forEach((element) => {
      element.classList.remove("hidden");
    });

    danceInterval = window.setInterval(move, 1500);
  }

  function stopDisco() {
    mainTitle.innerHTML = mainTitleText;

    discoElementBanana.forEach((element) => {
      element.classList.add("hidden");
    });

    discoElementWoman.forEach((element) => {
      element.classList.add("hidden");
    });

    clearInterval(danceInterval);
  }
};

export { initDisco };
