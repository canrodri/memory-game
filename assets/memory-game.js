class MemoryGame {
    constructor(cards) {
        this.cards = cards;
        this.pickedCards = [];
        this.pairsClicked = 0;
        this.pairsGuessed = 0;
        this.totalPairs = cards.length / 2;
        this.soundManager = new SoundManager();
    
    }
    shuffleCards() {
        const shuffleCards = [];


        while (this.cards.length > 0) {
            const i = Math.floor(Math.random() * this.cards.length);
            const randomCard = this.cards[i];

            shuffleCards.push(randomCard);

            this.cards = this.cards.filter(card => card !== randomCard);
        }

        this.cards = shuffleCards;
    }

    checkIfPair(card1, card2) {
        this.pairsClicked++;

        if (card1 === card2) {
            this.pairsGuessed++;
            this.precision();
            return true
        }
        this.precision();

        return false
    }
   
    checkIfFinished() {
   
        if (this.pairsGuessed === this.totalPairs) {
            document.getElementById("victory").hidden = false;
            document.querySelectorAll(".card").forEach((card) => {
                card.style.pointerEvents = "none"; 
            });
            
            this.precision();
            clearInterval(timeInterval); // cuando encuentre todas las parejas se detiene el temp.
            this.soundManager.victory();
            

        }
    }
    gameOver() {
        document.getElementById("game-over").hidden = false;
        document.querySelectorAll(".card").forEach((card) => {
            card.style.pointerEvents = "none"; // Deshabilitar la interacción con las cartas
            this.soundManager.gameOver();
        });
    }

    precision() {
        let precision = 0;
        if(this.pairsClicked > 0 ) {
            precision = (this.pairsGuessed / this.pairsClicked) * 100;
        }
        document.getElementById("precision").textContent = `${precision.toFixed(2)}%`
    }

}