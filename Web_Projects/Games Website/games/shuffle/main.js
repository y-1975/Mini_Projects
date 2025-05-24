const words = ["apple", "banana", "cherry", "orange", "grape"];
let chosenWord = "";
let shuffledWord = "";
let attempts = 0;
const maxAttempts = 5;

// Function to shuffle the word
function shuffleWord(word) {
  const shuffled = word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  return shuffled;
}

// Start a new game
function startGame() {
  // Randomly select a word from the list
  chosenWord = words[Math.floor(Math.random() * words.length)];
  shuffledWord = shuffleWord(chosenWord);

  // Display the shuffled word
  document.getElementById(
    "shuffledWord"
  ).textContent = `Shuffled Word: ${shuffledWord}`;
  document.getElementById("message").textContent = "";
  document.getElementById(
    "attempts"
  ).textContent = `Attempts remaining: ${maxAttempts}`;
  attempts = 0; // Reset attempts
}

// Check the user's answer
function checkAnswer() {
  const userInput = document
    .getElementById("userInput")
    .value.toLowerCase()
    .trim();

  // Validate the input
  if (userInput === chosenWord) {
    attempts++;
    document.getElementById(
      "message"
    ).textContent = `Congratulations! You guessed the word in ${attempts} tries.`;
    document.getElementById("attempts").textContent = "";
  } else {
    attempts++;
    if (attempts >= maxAttempts) {
      document.getElementById(
        "message"
      ).textContent = `Nice try! The word was "${chosenWord}".`;
      document.getElementById("attempts").textContent = "";
    } else {
      document.getElementById("message").textContent = "Try again!";
      document.getElementById("attempts").textContent = `Attempts remaining: ${
        maxAttempts - attempts
      }`;
    }
  }
}

window.onload = startGame;
