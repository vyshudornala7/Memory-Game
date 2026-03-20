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
    { name: "puri", image:"puri.jpg" },
    { name: "french-fries", image: "french-fries.png" },
    { name: "dosa", image: "dosa.avif" },
    { name: "chicken-biriyani", image: "chicken-biriyani.jpg" },
    { name: "burger", image:"burger.webp" },
    { name: "pizza", image:"Pizza.webp" },
    { name: "obbattu", image:"obbattu.webp" },
    { name: "pani-puri", image:"pani-puri.webp" },
   { name: "vada-pav", image:"vada-Pav.jpg" },
    { name: "chaii-samosa", image: "chaii-samosa.jpg" }
];

//Initial Time
let seconds = 0,
    minutes = 0;
//Initial moves and win count
let movesCount = 0,
    wincount = 0;

//for timer
const timeGenerator = () => {
    seconds += 1;
    //minutes logic
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    //format timer before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` :
        seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` :
        minutes;
    timeValue.innerHTML = `<span>Time:</span> ${minutesValue}:${secondsValue}`;
}

// for calculating moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
}

//pick random objects from the items array
const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardvalues array
    let cardValues = [];
    //sizes should be double ( 4*4 matrix)/2 since pairs of objects would exists
    size = (size * size) / 2;
    // random object selection
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        //once selected remove the object from temp array
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;

}

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        /*
        create cards
        before => front side (contains question marks)
        after => back side (contains actual images);
        data-cards-values is a custom attribute which tores the names of the cards to match later
        */
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="images/${cardValues[i].image}" class="image"/></div>
        </div>
        `;
    }
    //Grid
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    //cards
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            // If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
            if (!card.classList.contains("matched")) {
                //flip the clicked card
                card.classList.add("flipped");
                //if it is the firstcard (! firstCard since firstCard is initially false)

                if (!firstCard) {
                    //so current card will become firstCard
                    firstCard = card;
                    //current cards value becomes firstCardValue
                    firstCardValue = card.getAttribute("data-card-value");
                }
                else {
                    //increment moves since user selected second card
                    movesCounter();
                    //secondCard and  value
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        //if noth cards match add matched class so these cards would be ignored next time
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        //set firstCard to false since next card would be first now
                        firstCard = false;
                        //winCount increment as user found a correct match
                        wincount += 1;
                        //check if winCount ==half of cardValues
                        if (wincount == Math.floor(cardValues.length / 2)) {
                       result.innerHTML = `<h2>🎉 You Won 🎉</h2>
                       <h4>Moves: ${movesCount}</h4>`;

                       celebrate(); // 🎊 ADD THIS

                        stopGame();
                       }

                    } else {
                        //if the cards dont match
                        //flip the cards back to normal
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);

                    }
                }
            }
        })
    })
}

//start game
startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    //controls and buttons visibility
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    //start timer
    interval = setInterval(timeGenerator, 1000);
    //initial moves
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
})

const celebrate = () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
};

// stop game
stopButton.addEventListener("click", (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
}))

//Initialize values and func calls
const initializer = () => {
    result.innerText = "";
    wincount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
}