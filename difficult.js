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
  { name: "img1", image: "images/difficult 1.1.jpeg" },
  { name: "img2", image: "images/difficult 1.2.jpeg" },
  { name: "img3", image: "images/difficult 1.3.jpeg" },
  { name: "img4", image: "images/difficult 1.4.jpeg" },
  { name: "img5", image: "images/difficult 1.5.jpeg" },
  { name: "img6", image: "images/difficult 1.6.jpeg" },
  { name: "img7", image: "images/difficult 1.7.jpeg" },
  { name: "img8", image: "images/difficult 1.8.jpeg" },
  { name: "img9", image: "images/difficult 1.9.jpeg" },
  { name: "img10", image: "images/difficult 1.10.jpeg" },
  { name: "img11", image: "images/difficult 1.11.jpeg" },
  { name: "img12", image: "images/difficult 1.12.jpeg" },
  { name: "img13", image: "images/difficult 1.13.jpeg" },
  { name: "img14", image: "images/difficult 1.14.jpeg" },
  { name: "img15", image: "images/difficult 1.15.jpeg" },
  { name: "img16", image: "images/difficult 1.16.jpeg" },
  { name: "img17", image: "images/difficult 1.17.jpeg" },
  { name: "img18", image: "images/difficult 1.18.jpeg" },
  { name: "img19", image: "images/difficult 1.19.jpeg" },
  { name: "img20", image: "images/difficult 1.20.jpeg" },
  { name: "img21", image: "images/difficult 1.21.jpeg" },
  { name: "img22", image: "images/difficult 1.22.jpeg" },
  { name: "img23", image: "images/difficult 1.23.jpeg" },
  { name: "img24", image: "images/difficult 1.24.jpeg" },
  { name: "img25", image: "images/difficult 1.25.jpeg" },
  { name: "img26", image: "images/difficult 1.27.jpeg" },
  { name: "img27", image: "images/difficult 1.28.jpeg" },
  { name: "img28", image: "images/difficult 1.29.jpeg" },
  { name: "img29", image: "images/difficult 1.30.jpeg" },
  { name: "img30", image: "images/difficult 1.26.jpeg" },
  { name: "img31", image: "images/difficult 1.31.jpeg" },
  { name: "img32", image: "images/difficult 1.32.jpeg" },
  { name: "img33", image: "images/medium 2.1.jpeg" },
  { name: "img34", image: "images/medium 2.2.jpeg" },
  { name: "img35", image: "images/medium 2.3.jpeg" },
  { name: "img36", image: "images/medium 2.4.png" },
];
// for some is not working 
function checkImageAvailability() {
  items.forEach(item => {
      const imgElement = new Image();
      imgElement.src = item.image;

      imgElement.onload = function() {
          console.log(`Image loaded successfully: ${item.name}`);
      };

      imgElement.onerror = function() {
          console.error(`Error loading image: ${item.name} - ${item.image}`);
      };
  });
}

// Call the function to check image availability
checkImageAvailability();

  

let movesCount = 0;
let seconds = 0;
let minutes = 0;
let winCount = 0;
let firstCardValue;

const timeGenerator = () => {
  seconds += 1;

  // Check if time is up 
  if (minutes === 10 && seconds === 0) {
    result.innerHTML = `<h2 style="font-size: 60px; color: red; text-shadow: 2px 2px 4px rgba(197, 203, 35, 0.8);">Time's up!</h2><h4 style="font-size: 40px; color: red; text-shadow: 2px 2px 4px rgba(197, 203, 35, 0.8);">Try again!</h4>`;
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
  timeValue.innerHTML = `<span style="color: black;" >Time:</span>${minutesValue}:${secondsValue}`;
};

// For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span  style="color: black;">Moves:</span>${movesCount}`;

  // Check if moves count reaches a certain limit 
  if (movesCount === 75) {
    result.innerHTML = `<h2 style="font-size: 60px; color: red; text-shadow: 2px 2px 4px rgba(197, 203, 35, 0.8);">Too many moves!</h2><h4 style="font-size: 40px; color: red; text-shadow: 2px 2px 4px rgba(197, 203, 35, 0.8);">Try again!</h4>`;
    stopGame();
  }
};

// Pick random objects from the items array
const generateRandom = (size = 8) => {
  // temporary array
  let tempArray = [...items];
  // initializes cardValues array
  let cardValues = [];
  // size should be double (8*8 matrix)/2 since pairs of objects would exist
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

const matrixGenerator = (cardValues, size = 8) => {
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
              result.innerHTML = `<h1 style="font-size: 60px; color: red; text-shadow: 2px 2px 4px rgba(197, 203, 35, 0.8);" >congratulations</h1> <br> <h2 style="font-size: 40px; color: red; text-shadow: 2px 2px 4px rgba(197, 203, 35, 0.8);">You Won The level</h2>
              <h4 style="font-size: 30px; color: red; text-shadow: 2px 2px 4px rgba(197, 203, 35, 0.8);">Moves: ${movesCount}</h4>`;
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
    // document.getElementById("body").style.backgroundImage = url('images/image\ for\ game.png');
    //Start timer
    interval = setInterval(timeGenerator, 1000);
    //initial moves the player clicked
    moves.innerHTML = `<span style="color: black;">Moves:</span> ${movesCount}`;
    initializer();
  });
  // Stop game
stopButton.addEventListener("click", stopGame);

function stopGame() {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
}

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