# Memory Game

A simple 4×4 flip-and-match memory game built with **HTML**, **CSS**, and **vanilla JavaScript**, featuring a real-time timer, move counter, and celebratory confetti on win.

## Demo / How it works
1. Click **Start Game** to shuffle cards and begin the timer.
2. Click cards to flip them; find matching pairs of food-themed images from `images/`.
3. Every pair of flips increases the move counter.
4. When all pairs are matched, a win message appears and confetti is triggered.
5. Use **Stop Game** to pause/end a round; you can start again anytime.

## Features
- 4×4 grid with randomized pairs each round.
- Move counter and mm:ss timer.
- Flip animations and front/back card states.
- Win detection with celebratory confetti (`canvas-confetti` CDN).
- Simple, dependency-free setup—just open `index.html`.

## Getting Started (local)
1. Clone the repo:
   ```bash
   git clone https://github.com/vyshudornala7/Memory-Game.git
   cd Memory-Game
   ```
2. Open `index.html` in your browser (no build step required).

## File Structure
```
Memory-Game/
├── index.html      # App shell; loads styles and scripts
├── style.css       # Layout, grid, flip animations, buttons, overlay
├── main.js         # Game logic: shuffle, flips, matching, timer, confetti
└── images/         # Food-themed card faces (JPEG/PNG/WEBP/AVIF)
```

## Key Logic (main.js)
- `generateRandom(size=4)`: picks random item pairs for the board.
- `matrixGenerator(cardValues, size=4)`: builds and shuffles the grid markup.
- `timeGenerator()`: updates the timer every second.
- `movesCounter()`: tracks moves per two flips.
- Win condition: when matched pairs == half of card values, show results and confetti.

## Customization Tips
- **Grid size**: adjust `size` in `generateRandom`/`matrixGenerator` (e.g., 6 for 6×6) and update CSS grid columns.
- **Card set**: edit the `items` array in `main.js` to change images and labels (add files under `images`
