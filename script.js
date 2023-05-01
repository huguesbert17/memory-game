const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const colors = [
  "#041014",
  "#2596be",
  "#96be25",
  "#49be25",
  "#9925be",
  "#041014",
  "#2596be",
  "#96be25",
  "#49be25",
  "#9925be"
];

const shuffle = (array) => {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(colors);

const createDivColors = (colorArray) => {
  colorArray.forEach((color) => {
    const div = document.createElement("div");
    div.classList.add(color);
    div.addEventListener("click", handleCardClick);
    gameContainer.append(div);
  })
}

const handleCardClick = (e) => {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(() => {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === colors.length) {
    const restart = document.getElementById("restart")
    restart.style += "display: block"
    restart.querySelector("button").addEventListener("click", (e) => {
      document.location.reload()
    })
  };
}

createDivColors(shuffledColors);
