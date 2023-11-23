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

//Items array for images 
const items = [
  { name: "img1", image: "easy 1.1.png" },
  { name: "img2", image: "easy 1.2.png" },
  { name: "img3", image: "easy 1.3.png" },
  { name: "img4", image: "easy 1.4.png" },
  { name: "img5", image: "easy 1.5.png" },
  { name: "img6", image: "easy 1.6.png" },
  { name: "img7", image: "easy 1.7.png" },
  { name: "img8", image: "easy 1.8.png" },
  { name: "img9", image: "images/difficult 1.1.jpeg" },
  { name: "img10", image: "images/difficult 1.6.jpeg" },
  { name: "img11", image: "images/difficult 1.10.jpeg" },
  { name: "img12", image: "images/medium 2.1.jpeg" },
];

const timeGenerator = () => {
    seconds += 1;
  
    // Check if time is up (2 minutes)
    if (minutes === 2) {
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
    timeValue.innerHTML = `<span style="color: white;">Time:</span>${minutesValue}:${secondsValue}`;
  };
  
  // For calculating moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span style="color: white;">Moves:0</span>${movesCount}`;
  
    // Check if moves count reaches a certain limit (e.g., 13 moves)
    if (movesCount === 13) {
      result.innerHTML = `<h2 style="color: white;">Too many moves!</h2><h4 style="color: white;">Try again!</h4>`;
      stopGame();
    }
  };
  

// objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //  shuffle the cards when the restart the game 
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
      /*
          Create Cards
          before => front side (contains CARD LOGO)
          after => back side (contains actual image);
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
        // If selected card is not matched yet
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
              firstCard.style.transition = "0.5s";
              secondCard.style.transition = "0.5s";
              firstCard.style.transform = "scale(0)";
              secondCard.style.transform = "scale(0)";
              // Set firstCard to false since the next card would be the first now
              firstCard = false;
              // WinCount increment as the user found a correct match
              winCount += 1;
              // Check if winCount == half of cardValues
              if (winCount == Math.floor(cardValues.length / 2)) {
                result.innerHTML = `<h1 style="color: white;" >congratulations</h1> <br> <h2 style="color: white;">You Won The level</h2>
              <h4 style="color: white;">Moves: ${movesCount}</h4>`;
                stopGame();
              }
            } else {
              // If the cards don't match
              // Flip the cards back to normal
              let [tempFirst, tempSecond] = [firstCard, secondCard];
              firstCard = false;
              secondCard = false;
              let delay = setTimeout(() => {
                if (!tempFirst.classList.contains("matched") && !tempSecond.classList.contains("matched")) {
                  tempFirst.classList.remove("flipped");
                  tempSecond.classList.remove("flipped");
                }
              }, 900);              
            }
          }
        }
      });
    });
  };
//Start game
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

const gameAudio = document.getElementById("gameAudio");
const audioToggleBtn = document.getElementById("audioToggle");

// Function to play the audio
const playAudio = () => {
  gameAudio.play();
};

// Function to pause the audio
const pauseAudio = () => {
  gameAudio.pause();
};

// Function to toggle play/pause
const toggleAudio = () => {
  if (gameAudio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
};

// Event listener for when the audio ends, restart it
gameAudio.addEventListener("ended", () => {
  playAudio();
});

// Event listener for the button to toggle audio
audioToggleBtn.addEventListener("click", () => {
  toggleAudio();
  // Save the audio state to sessionStorage
  sessionStorage.setItem("audioState", gameAudio.paused ? "off" : "on");
});

// Event listener for when the page is unloaded (e.g., when navigating to another page)
window.addEventListener("beforeunload", () => {
  // Save the audio playback position to sessionStorage
  sessionStorage.setItem("audioPlaybackPosition", gameAudio.currentTime);
});

// Start playing the audio when the page loads
if (sessionStorage.getItem("audioState") === "on") {
  playAudio();
}

// Restore the audio playback position from sessionStorage
const savedPosition = sessionStorage.getItem("audioPlaybackPosition");
if (savedPosition) {
  gameAudio.currentTime = parseFloat(savedPosition);
}

// Stop the audio when the game stops
stopButton.addEventListener("click", () => {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
  pauseAudio();
});