const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

// Items array
const items = [
    { name: "img1", image: "images/medium 2.1.jpeg" },
    { name: "img2", image: "images/medium 2.2.jpeg" },
    { name: "img3", image: "images/medium 2.3.jpeg" },
    { name: "img4", image: "images/medium 2.4.jpeg" },
    { name: "img5", image: "images/medium 2.5.jpeg" },
    { name: "img6", image: "images/medium 2.6.jpeg" },
    { name: "img7", image: "images/medium 2.7.jpeg" },
    { name: "img8", image: "images/medium 2.8.jpeg" },
    { name: "img9", image: "images/medium 2.9.jpeg" },
    { name: "img10", image: "images/medium 2.10.jpeg" },
    { name: "img11", image: "images/medium 2.11.jpeg" },
    { name: "img12", image: "images/medium 2.12.jpeg" },
    { name: "img13", image: "images/medium 2.13.jpeg" },
    { name: "img14", image: "images/medium 2.14.jpeg" },
    { name: "img15", image: "images/medium 2.15.jpeg" },
    { name: "img16", image: "images/medium 2.16.jpeg" },
    { name: "img17", image: "images/medium 2.17.jpeg" },
    { name: "img18", image: "images/medium 2.18.jpeg" },
  ];
  

let movesCount = 0;
let seconds = 0;
let minutes = 0;
let winCount = 0;
let firstCardValue;

const timeGenerator = () => {
  seconds += 1;

  // Check if time is up (3 minutes)
  if (minutes === 3 && seconds === 0) {
    result.innerHTML = `<h2>Time's up!</h2><h4>Try again!</h4>`;
    stopGame();
    return;
  }

  // minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }

  // format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span style="color: white;" >Time:</span>${minutesValue}:${secondsValue}`;
};

// For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;

  // Check if moves count reaches a certain limit (e.g., 23 moves)
  if (movesCount === 23) {
    result.innerHTML = `<h2>Too many moves!</h2><h4>Try again!</h4>`;
    stopGame();
  }
};

// Pick random objects from the items array
const generateRandom = (size = 6) => {
  // temporary array
  let tempArray = [...items];
  // initializes cardValues array
  let cardValues = [];
  // size should be double (6*6 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  // Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    // once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }

  return cardValues;
};

const matrixGenerator = (cardValues, size = 6) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  // simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains CARD LOGO)
        after => back side (contains actual image);
        data-card-values is a custom attribute that stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card">
          <div class="card-front">
            <!-- CARD LOGO image goes here -->
            <img src="CARD LOGO.webp" alt="CARD LOGO" class="card-logo" />
          </div>
          <div class="card-back">
            <img src="${cardValues[i].image}" class="image" style="max-width: 100%; max-height: 100%;" />
          </div>
        </div>
     </div>
     `;
  }
  // Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

  // Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // If selected card is not matched yet, then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        // Flip the clicked card
        card.classList.add("flipped");
        // If it is the first card (!firstCard since firstCard is initially false)
        if (!firstCard) {
          // So the current card will become firstCard
          firstCard = card;
          // Current card's value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          // Increment moves since the user selected the second card
          movesCounter();
          // Second card and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            // If both cards match, add matched class so these cards would be ignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            // Set firstCard to false since the next card would be the first now
            firstCard = false;
            // WinCount increment as the user found a correct match
            winCount += 1;
            // Check if winCount == half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
          <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            // If the cards don't match
            // Flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

// Start game
startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    //controls amd buttons visibility
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    //Start timer
    interval = setInterval(timeGenerator, 1000);
    //initial moves the player clicked
    moves.innerHTML = `<span style="color: white;">Moves:</span> ${movesCount}`;
    initializer();
  });
  
  //Stop game
  stopButton.addEventListener(
    "click",
    (stopGame = () => {
      controls.classList.remove("hide");
      stopButton.classList.add("hide");
      startButton.classList.remove("hide");
      clearInterval(interval);
    })
  );
  
  //Initialize values and func calls
  const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
  };