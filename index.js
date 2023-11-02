let startButton = document.getElementById('loadCards');
let playerButton = document.getElementById('playerButton');

class Card {
  constructor(image, id) {
    this.image = image; 
    this.id = id; 
    this.facedown = true; 
  }
}

class Player {
  constructor(number, points) {
    this.number = number;
    this.points = points;
    this.wonCards = [];
  }
}


class MatchingGame {
  constructor() {
    this.cards = [];
    this.players = [];
    this.flippedCards = [];
    this.currentPlayer = null;
    this.cpNum = 1;
    startButton.addEventListener('click', () => {
      this.cards = []; 
      this.createCards();
      this.loadCards();
      this.createPlayers();
      this.loadPlayers();
    })
  }

  
  createPlayers () {
    let numberOfPlayers = prompt("How many players are there?");
    for (let x = 1; x <= numberOfPlayers; x++) {
      let player = new Player(x,0);
      this.players.push(player);
    }
    this.currentPlayer = this.players[0];
  }

  loadPlayers() {
    let playerSection = document.getElementById('playerSection');
    let current = document.getElementById('currentPlayer');
    playerSection.innerHTML = "";

    for (let player of this.players) {
      console.log('in load players', player);
      let playerBlock = document.createElement('div');
      let playerName = document.createElement('h3');
      let playerPoints = document.createElement('h3');

      playerName = player.number;
      playerPoints = player.points;

      playerBlock.append(playerName, playerPoints);
      playerSection.append(playerBlock);
    }

    current.innerText = `Current player is Player ${this.currentPlayer}`
  }

  createCards() {
    for (let x = 1; x <= 8; x++) {
      for (let i = 1; i <= 2; i++) {
        let card = new Card(`${x}-Superhero.png`, `${x}.${i}`)
        this.cards.push(card);
      }
    }

    // 2. Randomize the order of this.cards - Don't Delete This
    // for (let i = this.cards.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    // }
  }

  // for each of the card objects in array this.cards, create and append html elements to cardSection.
  loadCards() {
    let cardDiv = document.getElementById('cardSection');
    cardDiv.innerHTML = "";

    for (let card of this.cards) {
      let matchCard = document.createElement('div');
      let image = document.createElement('img');
      image.setAttribute('class', 'card');
      image.src = card.facedown ? 'cardfront.jpeg' : card.image;

      matchCard.append(image);
      cardDiv.append(matchCard);

      matchCard.addEventListener('click', () => {
        this.flipCard(card);
      })
    }
  }

  // Returns true or false if the card IDs match or not
  flipCard(card) {
    card.facedown = !card.facedown;
    this.loadCards();
    card.flipped = true;
    this.flippedCards.push(card);
    this.matchCardIds();
  }

  matchCardIds() {
    if (this.flippedCards.length !== 2) return;
    console.log(this.flippedCards);
    let [card1, card2] = this.flippedCards;

   

    if (card1.image === card2.image) {
      console.log('cards match!');
      this.currentPlayer = this.players[1];
      this.flippedCards = [];
    }
    else {
      console.log('cards do not match');
    }
  }
  
}


let game = new MatchingGame();


// What still needs to be done?

// Make it so that the turns rotate through the players when a match attempt is failed

// Make the points system work