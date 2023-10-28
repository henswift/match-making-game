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

let startButton = document.getElementById('loadCards');

class Card {
  constructor(image,id) {
    this.image = image;
    this.id = id;
    this.facedown = true; // if true then show image
  }
}

class MatchingGame {
  constructor() {
    this.cards = [];
    startButton.addEventListener('click', () => {
      this.createCards();
      this.loadCards();
    })
  }

  createCards() {
    // we're creating a function that will load all 8 pairs into our div and randomize the order of the cards.
    
    // include a button that will load the cards in when clicked
    
    // creating an array of 16 cards with each card being called twice
    
    // randomize the array (shuffle function)
    
    // append the randomized array onto ID cardSection

      for (let x = 1; x <= 8; x++) {
        for(let i = 1; i <= 2; i++) {
          let card = new Card(`${x}-Superhero.png`,`${x}.${i}`)

          
          this.cards.push(card);

          // this.cards.forEach(element => cardsection.append(matchCard));

        }
     }

      for (let i = this.cards.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; 
      }
  }

  loadCards() {

    let cardDiv = document.getElementById('cardSection');
    cardDiv.innerHTML = "";

    for (let card of this.cards) {
      let matchCard = document.createElement('div');
      let image = document.createElement('img');

      image.src = card.facedown ? 'cardfront.jpeg' : card.image;
      image.setAttribute('class','card');

      matchCard.append(image);
      cardDiv.append(matchCard);
      
      matchCard.addEventListener('click', () => {
          this.flipCard(card);
      })
    }
  }
    

    flipCard(card) { //returns true or false if the card ID's match or not
      //
      card.facedown = !card.facedown;

      this.loadCards();
    }

}

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
















let playerOnePoints = 0;
let playerTwoPoints = 0;
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