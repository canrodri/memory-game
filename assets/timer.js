const countdown = document.getElementById("time-left");
const startingMinutes = 2;
let time = startingMinutes * 60;
let timeInterval; // Variable global para el intervalo

function startTimer() {
    clearInterval(timeInterval); // Limpia el intervalo anterior antes de empezar uno nuevo

    time = startingMinutes * 60; // Reinicia el tiempo
    countdown.textContent = `${startingMinutes}:00`; // Resetea el contador visible

    timeInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        countdown.textContent = `${minutes}:${seconds}`;
        time--;

        if (time < 0) {
            clearInterval(timeInterval);
            countdown.textContent = "00:00";
            gameOver();
        }
    }, 1000);
}
function gameOver() {
    document.getElementById("game-over").hidden= false;
    document.querySelectorAll(".card").forEach((card) => {
        card.style.pointerEvents = "none"; // Deshabilitar la interacción con las cartas
        
    });
    soundManager.gameOver();
    // resetGame();
  }