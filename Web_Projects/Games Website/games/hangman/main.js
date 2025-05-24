// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

//Get Array from Letters 
let lettersArray = Array.from(letters);

//Select Letters Container 
let lettersCountainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
   //Create span 
   let span = document.createElement("span")

   //Create Letter text Node
   let theLetter = document.createTextNode(letter)

   //Append The Letter to span 
   span.appendChild(theLetter)

   // Add Class on span 
   span.className = 'letter-box';

   //Append The  span to The Letters Container
   lettersCountainer.appendChild(span);

});

// Object Of Words + Categories
   const words = {
   programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
   movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
   people: ["Albert-Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma-Ghandi"],
   countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
   }

// Get Random Property
   let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
   let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category 
   let randomPropName = allKeys[randomPropNumber];

// Category Words
   let randomPropValue = words[randomPropName];

   //Random Number Depend on Words 
   let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

   //The Chosen Word
   let randomValueValue = randomPropValue[randomValueNumber].toLowerCase();

// Set Category Info
   document.querySelector(".game-info .category span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letter-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depended On Word
lettersAndSpace.forEach(letter => {

      // Create Empty Span
      let emptySpan = document.createElement("span");

      // If Letter Is Space
      if (letter === ' ') {
         // Add Class To The Span
         emptySpan.className = 'with-space';
      }

      // Append Spans To The Guess Container
      lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letter-guess span");

let wrongAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");


document.addEventListener("click", (e) => {
   let theStatus = false;

   if (e.target.className === 'letter-box') {
      // إذا كانت المحاولات الخاطئة أقل من 8، اسمح بالنقر
      if (wrongAttempts < 8) {
         e.target.classList.add("clicked");

         let theClickedLetter = e.target.innerHTML.toLowerCase();

         lettersAndSpace.forEach((wordLetter, Wordindex) => {
            if (theClickedLetter === wordLetter) {
               theStatus = true;

               console.log(`Found At Index Number ${Wordindex}`);

               guessSpans.forEach((span, spanIndex) => {
                  if (Wordindex === spanIndex) {
                     span.innerHTML = theClickedLetter;
                  }
               });
            }
         });

         if (!theStatus) {
            wrongAttempts++;

            theDraw.classList.add(`wrong-${wrongAttempts}`);

            document.getElementById("fail").play();

            if (wrongAttempts === 8) {
               lettersCountainer.classList.add("finished"); // منع المستخدم عند الخطأ الثامن
               endGame(false); // استدعاء endGame عند الخسارة
            }
         } else {
            document.getElementById("success").play();

            // تحقق مما إذا كان المستخدم قد فاز
            let allFilled = true;
            guessSpans.forEach((span) => {
               if (span.innerHTML === '') {
                  allFilled = false;
               }
            });

            if (allFilled) {
               lettersCountainer.classList.add("finished");
               endGame(true); // استدعاء endGame عند الفوز
            }
         }
      }
   }
});

function endGame(isWinner) {
   let div = document.createElement("div");

   let divText;

   if (isWinner) {
      divText = document.createTextNode(
         `Congratulations! You Won! Wrong Attempts: ${wrongAttempts}`
      );
   } else {
      divText = document.createTextNode(`Game Over, Word Is ${randomValueValue}`);
   }

   div.appendChild(divText);

   div.className = 'popup';

   document.body.appendChild(div);
}

// document.addEventListener("click", (e) => {
//    let theStatus = false;

//    if (e.target.className === 'letter-box') {
//       // إذا كانت المحاولات الخاطئة أقل من 8، اسمح بالنقر
//       if (wrongAttempts < 8) {
//          e.target.classList.add("clicked");

//          let theClickedLetter = e.target.innerHTML.toLowerCase();

//          lettersAndSpace.forEach((wordLetter, Wordindex) => {
//             if (theClickedLetter === wordLetter) {
//                theStatus = true;

//                console.log(`Found At Index Number ${Wordindex}`);

//                guessSpans.forEach((span, spanIndex) => {
//                   if (Wordindex === spanIndex) {
//                      span.innerHTML = theClickedLetter;
//                   }
//                });
//             }
//          });

//          if (!theStatus) {
//             wrongAttempts++;

//             theDraw.classList.add(`wrong-${wrongAttempts}`);

//             document.getElementById("fail").play();

//             if (wrongAttempts === 8) {
//                lettersCountainer.classList.add("finished"); // منع المستخدم عند الخطأ الثامن
//                endGame();
//             }
//          } else {
//             document.getElementById("success").play();
//          }
//       }
//    }
// });

// function endGame() {
//    let div = document.createElement("div");

//    let divText = document.createTextNode(`Game Over, Word Is ${randomValueValue}`);

//    div.appendChild(divText);

//    div.className = 'popup';

//    document.body.appendChild(div);
// }

