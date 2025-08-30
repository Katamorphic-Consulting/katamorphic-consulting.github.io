class MusicMemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.moves = 0;
        this.gameMode = 'single'; // 'single', 'harmony2', 'harmony3', 'harmony4'
        this.gameBoard = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score');
        this.movesElement = document.getElementById('moves');
        this.pairsFoundElement = document.getElementById('pairs-found');
        this.gameOverBanner = document.getElementById('game-over-banner');
        this.finalScoreElement = document.getElementById('final-score');
        this.finalMovesElement = document.getElementById('final-moves');
        
        this.audioContext = null;
        this.frequencies = [
            261.63, // C4
            293.66, // D4
            329.63, // E4
            349.23, // F4
            392.00, // G4
            440.00, // A4
            493.88, // B4
            523.25  // C5
        ];
        
        // Harmony definitions
        this.harmony2 = [
            { name: 'Major 3rd', frequencies: [261.63, 329.63] }, // C-E
            { name: 'Minor 3rd', frequencies: [261.63, 311.13] }, // C-Eb
            { name: 'Perfect 4th', frequencies: [261.63, 349.23] }, // C-F
            { name: 'Perfect 5th', frequencies: [261.63, 392.00] }, // C-G
            { name: 'Major 6th', frequencies: [261.63, 440.00] }, // C-A
            { name: 'Minor 6th', frequencies: [261.63, 415.30] }, // C-Ab
            { name: 'Octave', frequencies: [261.63, 523.25] }, // C-C
            { name: 'Major 3rd (D)', frequencies: [293.66, 369.99] } // D-F#
        ];
        
        this.harmony3 = [
            { name: 'C Major', frequencies: [261.63, 329.63, 392.00], type: 'major' },
            { name: 'D Minor', frequencies: [293.66, 349.23, 440.00], type: 'minor' },
            { name: 'E Minor', frequencies: [329.63, 392.00, 493.88], type: 'minor' },
            { name: 'F Major', frequencies: [349.23, 440.00, 523.25], type: 'major' },
            { name: 'G Major', frequencies: [392.00, 493.88, 587.33], type: 'major' },
            { name: 'A Minor', frequencies: [440.00, 523.25, 659.25], type: 'minor' },
            { name: 'B Dim', frequencies: [493.88, 587.33, 698.46], type: 'diminished' },
            { name: 'C Major 2', frequencies: [523.25, 659.25, 783.99], type: 'major' }
        ];
        
        this.harmony4 = [
            { name: 'C Maj7', frequencies: [261.63, 329.63, 392.00, 493.88], type: 'maj7' },
            { name: 'C Dom7', frequencies: [261.63, 329.63, 392.00, 466.16], type: 'dom7' },
            { name: 'C Min7', frequencies: [261.63, 311.13, 392.00, 466.16], type: 'min7' },
            { name: 'C Dim7', frequencies: [261.63, 311.13, 369.99, 440.00], type: 'dim7' },
            { name: 'F Maj7', frequencies: [349.23, 440.00, 523.25, 659.25], type: 'maj7' },
            { name: 'G Dom7', frequencies: [392.00, 493.88, 587.33, 698.46], type: 'dom7' },
            { name: 'D Min7', frequencies: [293.66, 349.23, 440.00, 523.25], type: 'min7' },
            { name: 'C Aug7', frequencies: [261.63, 329.63, 415.30, 493.88], type: 'aug7' }
        ];
        
        this.initializeAudio();
        this.bindEvents();
        this.createModeSelector();
        this.startNewGame();
    }
    
    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported');
        }
    }
    
    playTone(frequency, duration = 0.8) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    playHarmony(frequencies, duration = 0.8) {
        if (!this.audioContext) return;
        
        frequencies.forEach((frequency, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            // Stagger the start times slightly for better harmony
            const startTime = this.audioContext.currentTime + (index * 0.05);
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    }
    
    createCard(toneIndex, cardIndex) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.toneIndex = toneIndex;
        card.dataset.cardIndex = cardIndex;
        
        // No visual indicators - only sound will reveal the tone
        card.textContent = '?';
        
        card.addEventListener('click', () => this.handleCardClick(card));
        
        return card;
    }
    
    createModeSelector() {
        const header = document.querySelector('header');
        const modeSelector = document.createElement('div');
        modeSelector.className = 'mode-selector';
        modeSelector.innerHTML = `
            <div class="mode-buttons">
                <button class="mode-btn active" data-mode="single">Single Notes</button>
                <button class="mode-btn" data-mode="harmony2">Harmony (2 Notes)</button>
                <button class="mode-btn" data-mode="harmony3">Harmony (3 Notes)</button>
                <button class="mode-btn" data-mode="harmony4">Harmony (4 Notes)</button>
            </div>
        `;
        
        header.appendChild(modeSelector);
        
        // Add event listeners for mode buttons
        modeSelector.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                modeSelector.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.gameMode = btn.dataset.mode;
                this.startNewGame();
            });
        });
    }
    
    handleCardClick(card) {
        // Prevent clicking if card is already flipped or matched
        if (card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        // Prevent clicking if two cards are already flipped
        if (this.flippedCards.length >= 2) {
            return;
        }
        
        // Flip the card
        card.classList.add('flipped');
        this.flippedCards.push(card);
        
        // Play the appropriate sound based on game mode
        const toneIndex = parseInt(card.dataset.toneIndex);
        
        if (this.gameMode === 'single') {
            this.playTone(this.frequencies[toneIndex]);
        } else if (this.gameMode === 'harmony2') {
            this.playHarmony(this.harmony2[toneIndex].frequencies);
        } else if (this.gameMode === 'harmony3') {
            this.playHarmony(this.harmony3[toneIndex].frequencies);
        } else if (this.gameMode === 'harmony4') {
            this.playHarmony(this.harmony4[toneIndex].frequencies);
        }
        
        // Check if two cards are flipped
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateDisplay();
            
            setTimeout(() => {
                this.checkMatch();
            }, 500);
        }
    }
    
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const tone1 = card1.dataset.toneIndex;
        const tone2 = card2.dataset.toneIndex;
        
        if (tone1 === tone2) {
            // Match found!
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            
            this.matchedPairs++;
            this.score += 10;
            
            if (this.matchedPairs === 8) {
                setTimeout(() => {
                    this.gameOver();
                }, 1000);
            }
        } else {
            // No match
            this.score = Math.max(0, this.score - 5); // Penalty for wrong match
            
            card1.classList.add('wrong');
            card2.classList.add('wrong');
            
            setTimeout(() => {
                card1.classList.remove('flipped', 'wrong');
                card2.classList.remove('flipped', 'wrong');
            }, 1000);
        }
        
        this.flippedCards = [];
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.movesElement.textContent = this.moves;
        this.pairsFoundElement.textContent = this.matchedPairs;
    }
    
    gameOver() {
        this.finalScoreElement.textContent = this.score;
        this.finalMovesElement.textContent = this.moves;
        this.showChordInfo(); // Show chord/note information on cards
        this.gameOverBanner.style.display = 'block';
    }
    
    startNewGame() {
        // Reset game state
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.moves = 0;
        
        // Clear game board
        this.gameBoard.innerHTML = '';
        
        // Create pairs of cards
        const cardPairs = [];
        for (let i = 0; i < 8; i++) {
            cardPairs.push(i, i); // Each tone appears twice
        }
        
        // Shuffle cards
        this.shuffleArray(cardPairs);
        
        // Create and add cards to board
        cardPairs.forEach((toneIndex, cardIndex) => {
            const card = this.createCard(toneIndex, cardIndex);
            this.gameBoard.appendChild(card);
            this.cards.push(card);
        });
        
        this.updateDisplay();
        this.gameOverBanner.style.display = 'none';
    }
    
    showChordInfo() {
        this.cards.forEach(card => {
            const toneIndex = parseInt(card.dataset.toneIndex);
            let info = '';
            
            if (this.gameMode === 'single') {
                const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
                info = noteNames[toneIndex];
            } else if (this.gameMode === 'harmony2') {
                info = this.harmony2[toneIndex].name;
            } else if (this.gameMode === 'harmony3') {
                const chord = this.harmony3[toneIndex];
                info = `${chord.name}\n(${chord.type})`;
            } else if (this.gameMode === 'harmony4') {
                const chord = this.harmony4[toneIndex];
                info = `${chord.name}\n(${chord.type})`;
            }
            
            card.textContent = info;
            card.style.fontSize = '0.8rem';
            card.style.lineHeight = '1.2';
        });
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    bindEvents() {
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.startNewGame();
        });
        
        document.getElementById('give-up-btn').addEventListener('click', () => {
            this.giveUp();
        });
        
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.startNewGame();
        });
        
        // Initialize audio context on first user interaction
        document.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        }, { once: true });
    }
    
    giveUp() {
        this.showChordInfo(); // Show chord/note information on cards
        this.gameOverBanner.style.display = 'block';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MusicMemoryGame();
}); 