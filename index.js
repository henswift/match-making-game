/* The Match Making Game

Do a 4x4 grid = 16 cards = 8 matches

Click two cards at a time and it should tell you if they are matched

If they are a match then they should disappear and the player gets the point

    The image should just change from the front of a card to the back of the card

If it's not a match the cards remain and they try again. 

    If you pick the wrong card you lose a life. 
    
    If you pick the right ones you gain a life. 


Two people playing the game and they take turns guessing. 








// If you don't want to unflip the last one... I think

// document.querySelectorAll('.card').forEach(function(card) {
//     card.addEventListener('click', function() {
//       const innerCard = this.querySelector('.card-inner');
//       innerCard.style.transform = 
//         innerCard.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
//     });
//   });
  
  */
let lastFlippedCard = null;

document.querySelectorAll('.card').forEach(function(card) {
  card.addEventListener('click', function() {
    const innerCard = this.querySelector('.card-inner');

    // Flip the current card
    innerCard.style.transform = 
      innerCard.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';

    // If there was a last flipped card, flip it back
    if (lastFlippedCard && lastFlippedCard !== innerCard) {
      lastFlippedCard.style.transform = 'rotateY(0deg)';
    }

    // Update lastFlippedCard
    lastFlippedCard = innerCard.style.transform === 'rotateY(180deg)' ? innerCard : null;
  });
});