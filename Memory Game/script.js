const board = document.getElementById('board');
const resetButton = document.getElementById('reset');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let isBoardLocked = false;

// Cards with emoji pairs
const cardEmojis = [
  '🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🥝',
  '🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🥝'
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  // Shuffle emoji cards
  cards = shuffleArray([...cardEmojis]);

  // Create card elements and add them to the board
  board.innerHTML = '';
  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (isBoardLocked || card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }

  card.classList.add('flipped');
  card.textContent = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  isBoardLocked = true;

  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;

    if (matchedPairs === cardEmojis.length / 2) {
      setTimeout(() => alert('You Win!'), 500);
    }

    flippedCards = [];
    isBoardLocked = false;
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
      isBoardLocked = false;
    }, 1000);
  }
}

// Reset the game
resetButton.addEventListener('click', () => {
  matchedPairs = 0;
  flippedCards = [];
  isBoardLocked = false;
  createBoard();
});

// Initialize the board
createBoard();