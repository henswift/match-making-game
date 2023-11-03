let startButton = document.getElementById('start');

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
      this.loadInstructions();
      this.createCards();
      this.loadCards();
      this.createPlayers();
      this.loadPlayers();
    })
  }

  loadInstructions() {
    let instructionsDiv = document.getElementById('instructions');
    let instructions = document.createElement('h3');
    instructions.innerHTML = 'Choose Two Cards:';
    instructionsDiv.append(instructions);
  }
  
  createPlayers () {
   //I ADDED THIS FOR THE RADIO BUTTONS- Leah
    let playersRadio = document.getElementsByName('players');
    for (let x = 0; x < playersRadio.length; x++) {
      if (playersRadio[x].checked) {
        let numberOfPlayers = Number(playersRadio[x].value);
        for (let x = 1; x <= numberOfPlayers; x++) {
          let player = new Player(x, 0);
          this.players.push(player);
        }
      }
    }
    this.currentPlayer = this.players[0];
  }

  createCards() {
    for (let x = 1; x <= 8; x++) {
      for (let i = 1; i <= 2; i++) {
        let card = new Card(`${x}-Superhero.png`, `${x}.${i}`)
        this.cards.push(card);
      }
    }
    // Randomize the order of this.cards - Don't Delete This
    // for (let i = this.cards.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    // }
  }

  loadPlayers() {
    let playerSection = document.getElementById('playerSection');
    let current = document.getElementById('currentPlayer');
    playerSection.innerHTML = "";

    for (let player of this.players) {
      let playerBlock = document.createElement('div');
      let playerName = document.createElement('h2');
      let playerPoints = document.createElement('h2');
      playerBlock.setAttribute('class', 'player');

      playerName = player.number;
      playerPoints = player.points;

      playerBlock.append(`Player ${playerName} - Score ${playerPoints}`);
      playerSection.append(playerBlock);
    }

    current.innerText = `Current player is:  Player ${this.currentPlayer.number}`
  }

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
      });
    }
  }

  flipCard(card) {
    card.facedown = !card.facedown;
    this.loadCards();
    card.flipped = true;
    this.flippedCards.push(card);
    this.matchCardIds();
  }

  cardsMatch(card1, card2) {
    let indexOfCard1 = this.cards.indexOf(card1);
    this.currentPlayer.wonCards.push(this.cards.splice(indexOfCard1, 1));

    let indexOfCard2 = this.cards.indexOf(card2)
    this.currentPlayer.wonCards.push(this.cards.splice(indexOfCard2, 1));

    this.currentPlayer.points = this.currentPlayer.wonCards.length / 2;
  }

  cardsDoNotMatch(card1, card2) {
    console.log(card1.id, card2.id);
    let indexOfCurrent = this.players.indexOf(this.currentPlayer);
    if (indexOfCurrent < this.players.length - 1) {
      this.currentPlayer = this.players[indexOfCurrent + 1];
    }
    else {
      this.currentPlayer = this.players[0];
    }
    // this.flippedCards.forEach((card) => card.facedown = true);
  }

  matchCardIds() {
    if (this.flippedCards.length !== 2) return;
    let [card1, card2] = this.flippedCards;
    // setTimeout(this.cardsMatch, "1000");
    // setTimeout(this.cardsDoNotMatch, "1000");

    if (card1.image === card2.image) {
      this.cardsMatch(card1, card2)
    }
    else {
      this.cardsDoNotMatch(card1, card2);
    }
    this.flippedCards = [];
    this.loadPlayers();
    this.loadCards();
    console.log(this.cards);
  }
}

let game = new MatchingGame();


// STILL NEEDS TO BE DONE:

// Rotate turns through players for each failed match.
// Assign points to players who make a correct match.

// Maybe: Delete pair and/or add them to the player's "deck".

// Maybe: Get rid of the start button and/or replace it with a reset button after we push start?

// Ideas for fun: Can we get each player's number and score to highlight when it's their turn?
// Ideas for fun: If we have time: add a card flip sound and/or animation when we flip a card?