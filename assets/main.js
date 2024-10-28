const cards = [
  { name: 'bruja', img: 'bruja.png' },
  { name: 'budu', img: 'budu.png' },
  { name: 'calabaza', img: 'calabaza.png' },
  { name: 'dracula', img: 'dracula.png' },
  { name: 'fantasma', img: 'fantasma.png' },
  { name: 'frank', img: 'frank.png' },
  { name: 'muerto', img: 'muerto.png' },
  { name: 'noche', img: 'noche.png' },
  { name: 'parca', img: 'parca.png' },
  { name: 'pocion', img: 'pocion.png' },
  { name: 'telaraña', img: 'telaraña.png' },
  { name: 'tumba', img: 'tumba.png' },
  { name: 'bruja', img: 'bruja.png' },
  { name: 'budu', img: 'budu.png' },
  { name: 'calabaza', img: 'calabaza.png' },
  { name: 'dracula', img: 'dracula.png' },
  { name: 'fantasma', img: 'fantasma.png' },
  { name: 'frank', img: 'frank.png' },
  { name: 'muerto', img: 'muerto.png' },
  { name: 'noche', img: 'noche.png' },
  { name: 'parca', img: 'parca.png' },
  { name: 'pocion', img: 'pocion.png' },
  { name: 'telaraña', img: 'telaraña.png' },
  { name: 'tumba', img: 'tumba.png' },
];
document.addEventListener("DOMContentLoaded", () => {
  // Crear la instancia del juego
  memoryGame = new MemoryGame(cards);
  soundManager = new SoundManager();
  memoryGame.shuffleCards(); // Mezclar las cartas
  startTimer(); // Inicia el temporizador
  renderBoard(); // Renderizar el tablero inicialmente

});


// Función para renderizar el tablero
const renderBoard = () => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    // Generar el HTML para cada carta
    html += `
<div class="card" data-card-name="${pic.name}">
 <div class="back" name="${pic.img}"></div>
 <div class="front" style="background-image: url('img/${pic.img}'); background-size: cover;"></div>
</div>
 `;
  });
  // Insertar las cartas en el DOM
  document.querySelector('#memory-board').innerHTML = html;

  // Manejar clic en cartas
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      handleCardClick(card);
    });
  });
}

// Función para manejar el clic en las cartas
const handleCardClick = (card) => {
  if (memoryGame.pickedCards.length >= 2 || card.classList.contains("turned")) return; // Evitar hacer clic en cartas giradas

  // Girar la carta
  card.classList.add("turned");
  memoryGame.pickedCards.push(card);
  soundManager.flip();

  if (memoryGame.pickedCards.length === 2) {
    const isPair = memoryGame.checkIfPair(
      memoryGame.pickedCards[0].dataset.cardName,
      memoryGame.pickedCards[1].dataset.cardName
    );

    if (!isPair) {
      setTimeout(() => {
        memoryGame.pickedCards[0].classList.remove("turned");
        memoryGame.pickedCards[1].classList.remove("turned");
        memoryGame.pickedCards = [];
      }, 1000);
    } else {
      memoryGame.pairsGuessed++;
      memoryGame.pickedCards = [];
      memoryGame.checkIfFinished();

      // Actualizar el score
      document.getElementById('pairs-clicked').textContent = memoryGame.pairsClicked;
      document.getElementById('pairs-guessed').textContent = memoryGame.pairsGuessed;
    }
  }

}
// botón de reinicio
document.getElementById("game-over-button").addEventListener("click", resetGame);

function resetGame() {
    // Reinicia el temporizador
    clearInterval(timeInterval); // Limpia el intervalo anterior
    time = startingMinutes * 60; // Reinicia el tiempo
    countdown.textContent = `${startingMinutes}:00`; // Resetea el contador visible

    // Reinicia el juego
    memoryGame = new MemoryGame(cards); 
    memoryGame.shuffleCards(); // Baraja las cartas nuevamente

    // Limpia el tablero
    document.querySelector('#memory-board').innerHTML = '';
    let html = '';
    memoryGame.cards.forEach((pic) => {
        html += `
            <div class="card" data-card-name="${pic.name}">
                <div class="back" name="${pic.img}"></div>
                <div class="front" style="background-image: url('img/${pic.img}'); background-size: cover;"></div>
            </div>
        `;
    });
    document.querySelector('#memory-board').innerHTML = html; // Vuelve a insertar las cartas

// Reinicia darle la vuelta a las cartas
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
          handleCardClick(card); // Agregar el evento de click a cada carta
      });

    // Reinicia el score
    document.getElementById('pairs-clicked').textContent = 0;
    document.getElementById('pairs-guessed').textContent = 0;


    });

    // Oculta la pantalla de Game Over cuando se reinicia
    document.getElementById("game-over").hidden = true;

    startTimer(); // Inicia el temporizador nuevamente
}

