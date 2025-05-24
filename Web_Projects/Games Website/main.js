makeTopScore();
makeDarkLightMode();

//* ========== function section ============
//@get top score and append it to span score
function makeTopScore() {
  let gamesNames = getNamesOfGames();
  let topScoreSpan = document.querySelectorAll(
    ".container .holder .box > span"
  );
  let size = gamesNames.length;

  for (let i = 0; i < size; i++) {
    getScoreAndAppendItTo(topScoreSpan[i], gamesNames[i]);
  }
  // return localStorageScore;
}
function getNamesOfGames() {
  let gameNodeA = document.querySelectorAll(".container .holder .box a");
  let gameNames = [];
  for (let i = 0; i < gameNodeA.length; i++) {
    let href = gameNodeA[i].getAttribute("href");
    gameNames.push(href.slice(6, href.lastIndexOf("/")));
  }
  return gameNames;
}
function getScoreAndAppendItTo(span, name) {
  let localStorageScore = window.localStorage;
  let score = localStorageScore.getItem(name);
  if (score !== null) {
    span.textContent += score;
  } else {
    span.textContent += "not played yet";
  }
}
//@light dark mode
function makeDarkLightMode() {
  setStyleInLocalStorage();
  appendStyleToBody();
  let button = makeTheButton();
  button.addEventListener("click", (ele) => {
    switchTheThemeInLocalStorage();
    appendStyleToBody();
    removeOldChildFrom(button);
    let themeIcon = choseIconForButton();
    button.append(themeIcon);
    button.style = buttonCSSStyle();
  });
  document.documentElement.append(button)
}
function appendStyleToBody() {
  document.querySelector('body').style = `
  background-color: ${getTheSameStyleInLocalStorage()};
  color: ${getInvertStyleOfTheLocalStorage()}
  `;
}
function setStyleInLocalStorage() {
  let localStorage = window.localStorage;
  if (localStorage.getItem("style") == null)
    localStorage.setItem("style", "white");
}
function getTheSameStyleInLocalStorage() {
  return window.localStorage.getItem("style");
}
function getInvertStyleOfTheLocalStorage() {
  let style = getTheSameStyleInLocalStorage();
  if (style === "white") return "#1d1c1c";
  else return "white";
}
function makeTheButton() {
  let buttonMode = document.createElement("button");
  let themeIcon = choseIconForButton();
  buttonMode.append(themeIcon);
  buttonMode.style = buttonCSSStyle();
  return buttonMode;
}
function choseIconForButton() {
  let style = getTheSameStyleInLocalStorage();
  let themeIcon = document.createElement("i");
  if (style === "white") themeIcon.setAttribute("class", "fa-solid fa-sun");
  else themeIcon.setAttribute("class", "fa-solid fa-cloud-moon");
  themeIcon.setAttribute("id", "LightDarkMode")
  return themeIcon;
}
function buttonCSSStyle() {
  return `
      display: flex 
      justify-content: center;
      align-items: center;
      color: ${getTheSameStyleInLocalStorage()};
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: ${getInvertStyleOfTheLocalStorage()};
      position: absolute;
      top: 30px;
      left: 30px;
      cursor: pointer;
    `;
}
function switchTheThemeInLocalStorage() {
  let localStorage = window.localStorage;
  if (getTheSameStyleInLocalStorage() == 'white')
    localStorage.setItem("style", "#1d1c1c");
  else localStorage.setItem("style", "white");
}
function removeOldChildFrom(button) {
  let icon = document.getElementById("LightDarkMode");
  button.removeChild(icon);
}