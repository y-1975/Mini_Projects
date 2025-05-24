setScoreToZero();
let time = 5;
setTimer();
let words = [
  "apple",
  "banana",
  "cherry",
  "dog",
  "elephant",
  "forest",
  "grape",
  "house",
  "island",
  "jacket",
  "kite",
  "lemon",
  "mountain",
  "notebook",
  "ocean",
  "pencil",
  "queen",
  "river",
  "sun",
  "tree",
  "umbrella",
  "village",
  "window",
  "xylophone",
  "yogurt",
  "zebra",
  "airplane",
  "balloon",
  "camera",
  "desk",
  "engine",
  "flower",
  "garden",
  "honey",
  "ice",
  "jungle",
  "kangaroo",
  "lamp",
  "mirror",
  "nest",
  "orange",
  "pillow",
  "quilt",
  "rain",
  "sand",
  "table",
  "unicorn",
  "violin",
  "whale",
  "xray",
  "yard",
];
words = shuffleWords(words);
fillWordsHtmlWith(words);
addCurrentWord();
let textInput = document.getElementById("userWords");
textInput.addEventListener("keyup", function () {
  let userValue = textInput.value;
  let currentWord = document.getElementById("currentWord").innerText;
  if (userValue.length == currentWord.length) {
    if (userValue == currentWord) {
      addCurrentWord();
      IncrementScore();
      time = 5;
      textInput.value = "";
    } else {
      gameOver();
    }
  }
});
function shuffleWords(words) {
  let size = words.length;
  while (size != 0) {
    let index = Math.floor(Math.random() * size);
    let temp = words[words.length - 1];
    words[words.length - 1] = words[index];
    words[index] = temp;
    size--;
  }
  return words;
}
function fillWordsHtmlWith(words) {
  let wordsDiv = document.getElementById("words");
  for (let i = 0; i < words.length; i++) {
    let word = makeSpanStructure(words[i]);
    wordsDiv.append(word);
  }
}
function makeSpanStructure(word) {
  let span = document.createElement("span");
  span.className = "word";
  span.innerText = word;
  return span;
}
function addCurrentWord() {
  let wordsDiv = document.getElementById("words");
  let currentWordNode = wordsDiv.children[0];
  let currentWordText = currentWordNode.innerText;
  currentWordNode.remove();
  document.getElementById("currentWord").innerText = currentWordText;
}
function setScoreToZero() {
  let score = document.getElementById("scoreValue");
  score.innerText = 0;
}
function IncrementScore() {
  let score = document.getElementById("scoreValue");
  score.innerText = Number(score.innerHTML) + 1;
}
function setTimer() {
  let timeSpan = document.getElementById("timeValue");
  timeSpan.innerText = String(time) + "S";
  const timer = setInterval(function () {
    time--;
    if (time == 0) {
      clearInterval(timer);
      gameOver();
    }
    timeSpan.innerText = String(time) + "S";
  }, 1000);
}
function gameOver() {
  createOverlay();
  createGameOverDiv();
}
function createOverlay() {
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  let bodyElement = document.querySelector("body");
  bodyElement.append(overlay);
}
function createGameOverDiv() {
  let gameOver = document.createElement("div");
  gameOver.classList = "game-over";
  let p = document.createElement("p");
  p.innerText = "game over";
  gameOver.append(p);
  let scoreSpan = document.createElement("span");
  scoreSpan = `Your score is ${document.getElementById("scoreValue").innerText}`;
  gameOver.append(scoreSpan);
  let button = buttonPlayAgain();
  gameOver.append(button);
  let bodyElement = document.querySelector("body");
  bodyElement.append(gameOver);
}
function buttonPlayAgain() {
  let button = document.createElement("button");
  button.innerText = "paly again";
  button.addEventListener('click', function () {
    window.location.reload();
  })
  return button;
}
