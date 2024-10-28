class SoundManager {
    constructor() {
        this.flipSound = new Audio("Audio/Audio_flip.wav");
        this.victorySound = new Audio("Audio/Audio_victory.wav");
        this.gameOverSound = new Audio("Audio/gameover.wav");

    }
     flip() {
        this.flipSound.play();
    }
    victory() {
        this.victorySound.play()
    }
    gameOver() {
        this.gameOverSound.play();
    }
}
 