const moves = document.getElementsById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector("game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

// Items array
const items = [
    { name: "puri", image: "puri.jpg"},
{ name: "french-fries", image: "french-fries.png"},
{ name: "dosa", image: "dosa.avif"},
{ name: "chicken-biriyani", image: "chicken-biriyani.jpg"},
{ name: "burger", image: "burger.webp"},
{ name: "pizza", image: "pizza.webp"},
{ name: "obbattu", image: "obbattu.webp"},
{ name: "pani-puri", image: "pani-puri.webp"},
{ name: "vada-pav", image: "vada-pav.jpg"},
{ name: "chaii-samosa", image: "chaii-samosa.jpg"},

];

//Initial Time
let seconds = 0,
minutes = 0;
//Initial moves and win count
let moveCount = 0,
wincount = 0;

//for timer
const timeGenerator = () => {
    seconds += 1;
    //minutes logic
    if(seconds >=60){
        minutes += 1;
        seconds = 0;
    }
//format timer before displaying
let secondsValue = seconds < 10 ? '0${seconds}':
seconds;
let minutesValue = minutes < 10 ? '0${minutes}':
minutes;
timeValue.innerHTML = `<span>Time:</span> ${minutesValue}:${secondsValue}`;
}
