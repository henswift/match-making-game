/* The Match Making Game

Do a 4x4 grid = 16 cards = 8 matches

Click two cards at a time and it should tell you if they are matched

If they are a match then they should disappear and the player gets the point

    The image should just change from the front of a card to the back of the card

If it's not a match the cards remain and they try again. 


Two people playing the game and they take turns guessing. 


Create a function that will make the card in the exact same way as the html. 

One file for creating cards and another one for making the game run. 

*/


// grab start button from html to use in class MatchingGame
let startButton = document.getElementById('loadCards');

let numberOfFlips = 0;
let playerOnePoints = 0;
let playerTwoPoints = 0;

class Card {
  // Constructs a new object Card given the parameters (image, id)
  constructor(image, id) {
    this.image = image; // Superhero image
    this.id = id; // ex. 1.2, 2.2, 3.1, etc.
    this.facedown = true; // if true then show image
  }
}


class MatchingGame {
  constructor() {
    this.cards = [];
    // Start button
    startButton.addEventListener('click', () => {
      this.createCards();
      this.loadCards();
    })
  }


  // Creates 16 cards and adds them to our array this.cards.
  // Randomizes the this.cards at the end
  createCards() {
    // 1. loop twice through each of the 8 images
    for (let x = 1; x <= 8; x++) {
      for (let i = 1; i <= 2; i++) {

        // create a card with the previously defined card class, and pass it the parameters needed (image, id)
        let card = new Card(`${x}-Superhero.png`, `${x}.${i}`)

        // push the card we just made onto our card array, this.cards.
        this.cards.push(card);
      }
    }

    // 2. Randomize the order of this.cards 
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }


  // for each of the card objects in array this.cards, create and append html elements to cardSection.
  loadCards() {
    // grab the html section that we want to append the cards to
    let cardDiv = document.getElementById('cardSection');
    // idk what this does but the cards don't flip without it
    cardDiv.innerHTML = "";

    // for each card of our array this.cards:
    for (let card of this.cards) {
      // 1. create a div and an image (with attribute card)
      let matchCard = document.createElement('div');
      let image = document.createElement('img');
      image.setAttribute('class', 'card');

      // 2. if the card is facedown, show facedown image.  Otherwise show the superhero image that the card has
      image.src = card.facedown ? 'cardfront.jpeg' : card.image;

      // 3. append the image to the div, and the div to the html section we grabbed
      matchCard.append(image);
      cardDiv.append(matchCard);

      // 4. add the flipCard function when the card is clicked

      // QUESTION: store the object that was clicked somehow  for matchCardIds (??)

      // - Leah - added if statement
      matchCard.addEventListener('click', () => {
        if (!card.flipped){
          this.flipCard(card);
        }
      })
    }
  }

  // Returns true or false if the card IDs match or not
  // I don't actually know how this function works tbh
  flipCard(card) { 
    card.facedown = !card.facedown;
    this.loadCards();
    // - Leah: count how many times we run this function and save that to nuumberOfFlips
    numberOfFlips++;
    // = Leah - set card.flipped to true QUESTION: why define it like this instead of cardFlipped?
    card.flipped = true;
  }


  // For every two cards clicked, check to see if the IDs of the selected cards match (1.1,1.2 or 3.1,3.2).
  // If they match, then delete the pair and add one point to the current player.
  // If they don't match, flip them back over and move to the next player.
  matchCardIds (card1, card2) {
    // For every other click
    if (numberOfFlips % 2 === 0 && numberOfFlips != 0) {
      // If Ids match (or both start with the same digit? idk)
      if (card1.id.startsWith(card2.id)) {
        console.log("match")
      }
      else {
        console.log("not a match")
      }
    }
  }

}

// Create game with class MatchingGame
let game = new MatchingGame();




// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// // Create and fill cardArray as before
// let cardArray = [];
// // ... populate cardArray ...

// // Shuffle it
// shuffleArray(cardArray);

// // Then append to cardSection, same as before

















// every time the doesCardMatch returns false,


// May be unnessicary at one point but this is what flips the cards as of now....  Hen

// let lastFlippedCard = null;

// document.querySelectorAll('.card').forEach(function(card) {
//   card.addEventListener('click', function() {
//     const innerCard = this.querySelector('.card-inner');

//     // Flip the current card
//     innerCard.style.transform =
//       innerCard.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';

//     // If there was a last flipped card, flip it back
//     if (lastFlippedCard && lastFlippedCard !== innerCard) {
//       lastFlippedCard.style.transform = 'rotateY(0deg)';
//     }

//     // Update lastFlippedCard
//     lastFlippedCard = innerCard.style.transform === 'rotateY(180deg)' ? innerCard : null;
//   });
// });