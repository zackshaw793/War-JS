
// With the object deck we create a deck of 52 cards and concatenate them in accordance of each card.

class Deck { 
    constructor() {
        this.deck = [];

        const suits = ['Clubs','Diamonds','Hearts','Spades'];
        const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

        for (let suit in suits) {
            for (let value in values) { 
                this.deck.push(new Card(value,suit));
            }
        }
    }


/*We shuffle the deck using the Fischer - Yates shuffle. the draw card takes a card off of the end of the shuffled deck.
isEmpty represents the state of the deck before cards are dealt or played. 
*/

shuffle() { 
    for (let i = this.deck.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[x] = this.deck[x], this.deck[i]];
    }
}

drawCard() { 
   return this.deck.pop();
}


isEmpty() { 
    return this.deck.length === 0;
    }
}

// Set the card class with two parameters, value and suit. the toString function will return the value and suit as a string.

class Card { 
    constructor(value,suit) {
        this.value = value;
        this.suit = suit;
    }
    toString() { 
        return `${this.value} of ${this.suit}.`
    }
}

// The player class contains the name of the player and pushes a card to each players deck and as well as adds a point.

class Player { 
    constructor(name) { 
        this.name = name;
        this.deck = [];
        this.points = 0;
    }

    addToDeck(card) { 
        this.deck.push(card);
    }

    addPoint() { 
        this.points++
    }
}

class War { 
    constructor() { 
        this.deck = new Deck();
        this.player1 = new Player('Player One');
        this.player2 = new Player('Player Two');
        this.winner = null;
    }


    dealCards() { 
        this.deck.shuffle();

        while (!this.deck.isEmpty()) { 
            this.player1.addToDeck(this.deck.drawCard());
            this.player2.addToDeck(this.deck.drawCard());
        }
    }

    playRound() { 
        const card1 = this.player1.deck.shift();
        const card2 = this.player2.deck.shift();

        console.log(`${this.player1.name} plays: ${card1}.`);
        console.log(`${this.player2.name} plays: ${card2}.`);

        if (card1.value === card2.value) { 
            console.log(`Its a tie!`);
        } else if (card1.value > card2.value) { 
            console.log(`${this.player1.name} wins, awarded one point!`);
            this.player1.addToDeck(card1);
            this.player1.addToDeck(card2);
            this.player1.addPoint();
        } else if (card1 < card2) { 
            console.log(`${this.player2.name} wins, awarded one point!`);
            this.player2.addToDeck(card1);
            this.player2.addToDeck(card2);
            this.player2.addPoint();
        }

        if (this.player1.deck.length === 0) { 
            this.winner = this.player2;
        } else if (this.player2.deck.length === 0) { 
            this.winner = this.player1;
        }
    }
    playGame() { 
        this.dealCards();

        do { 
            this.playRound();
        } while (!this.winner);

        console.log(`The winner is ${this.winner.name}, with ${this.winner.points} points!`)
    }
} 


const game = new War();
game.playGame();