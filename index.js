let startButton = document.getElementById('start');
let restartButton = document.getElementById('buttonRestart');

const radioButtons = document.querySelectorAll('input[type="radio"][name="players"]');

radioButtons.forEach(radio => {
  radio.addEventListener('change', () => {
    startButton.style.display = 'inline';
  });
});

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
      startButton.style.display = 'none';
      restartButton.style.display = 'inline';
    })

    //extrapolate event listener logic
  }

  loadInstructions() {
    // when one card is clicked, say "pick one more card"
    let instructionsDiv = document.getElementById('instructions');
    let instructions = document.createElement('h3');
    instructions.innerHTML = 'Choose Two Cards:';
    instructionsDiv.append(instructions);
  }

  createPlayers() {
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
        let card = new Card(`/photos/${x}-Superhero.png`, `${x}.${i}`)
        this.cards.push(card);
      }
    }
    // Randomize the order of this.cards - Don't Delete This
    // for (let i = this.cards.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    // }
  }

  loadPlayers() { //draws cards
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
      image.setAttribute('class', card.isWon ? 'card invisible' : 'card');
      image.src = card.facedown ? '/photos/cardfront.jpeg' : card.image;

      matchCard.append(image);
      cardDiv.append(matchCard);
      if (!card.isWon) {
        matchCard.addEventListener('click', () => {
          if (this.flippedCards.length === 2) {
            return;
          }
          this.flipCard(card);
        });
      }
    }
  }

  flipCard(card) {
    if (card.facedown) {
      card.facedown = !card.facedown;
      this.loadCards();
      // card.flipped = true;
      this.flippedCards.push(card);
      this.matchCardIds();
    }
  }

  matchCardIds() {
    if (this.flippedCards.length !== 2) return;
    let [card1, card2] = this.flippedCards;


    if (card1.image === card2.image) {
      setTimeout(() => this.cardsMatch(this.flippedCards), 1000);
    } else {
      setTimeout(() => this.cardsDoNotMatch(card1, card2), 2000);
    }

  }

  cardsMatch(matchedCards) {
    for (let card of matchedCards) {
      this.currentPlayer.wonCards.push(card);
      card.isWon = true;
    }
    this.currentPlayer.points = this.currentPlayer.wonCards.length / 2;
    this.flippedCards = [];
    this.loadPlayers();
    this.loadCards();
    this.endOfGame();
  }

  cardsDoNotMatch() {

    let indexOfCurrent = this.players.indexOf(this.currentPlayer);
    if (indexOfCurrent < this.players.length - 1) {
      this.currentPlayer = this.players[indexOfCurrent + 1];
    }
    else {
      this.currentPlayer = this.players[0];
    }
    this.flippedCards.forEach((card) => card.facedown = true);
    this.flippedCards = [];
    this.loadPlayers();
    this.loadCards();
  }

  endOfGame() {
    //when this.cards is empty and after loadcards is in
    let totalActiveCards = 0;
    let winningScore = 0;
    for (let x = 0; x < this.players.length; x++) {
      totalActiveCards += this.players[x].wonCards.length;
      if (this.players[x].points >= winningScore) {
        winningScore = this.players[x].points;
      }
    }
    if (totalActiveCards === 16) {
      this.cards = [];
      let cardDiv = document.getElementById('cardSection');
      cardDiv.innerHTML = "";
      let winnerAnnouncement = document.createElement('h1');
      for (let x = 0; x < this.players.length; x++) {
        if (this.players[x].points === winningScore) {
          winnerAnnouncement.innerHTML = `Player ${this.players[x].number} wins!`
          cardDiv.append(winnerAnnouncement);
        }
      }
      let instructionsDiv = document.getElementById('instructions');
      instructionsDiv.innerHTML = '';
    }
  }

}

let game = new MatchingGame();


// STILL NEEDS TO BE DONE:
// update instructions for when one card is clicked then say "choose one more card"
// maybe add something visual if there's a match or not?

// IMPORTANT!: get rid of current player when the game is won.

// Ideas for fun: Can we get each player's number and score to highlight when it's their turn?
// Ideas for fun: If we have time: add a card flip sound and/or animation when we flip a card?

// When you click on one card you should have it stay