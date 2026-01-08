class MemoryGame {
    constructor(level) {
        this.level = level;
        this.cards = [];
        this.firstCard = null;
        this.secondCard = null;
        this.matchedPairs = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.boardElement = document.getElementById("game-board");
        this.isLocked = false;
    }

    start() {
        // 1. APTURAM JEBKURU ESOŠO TAIMERI, PIRMS SĀKAM JAUNU
        if (window.memoryTimer) clearInterval(window.memoryTimer);
        
        this.isLocked = false;
        this.firstCard = null;
        this.secondCard = null;
        this.matchedPairs = 0;
        
        this.generateCards();
        this.shuffleCards();
        this.renderBoard();
        
        this.startTime = Date.now();
        this.startTimer();
        document.getElementById("restart-btn").style.display = "none";
    }

    setGrid() {
        const configs = {
            'easy': { cols: 2 },
            'medium': { cols: 4 },
            'hard': { cols: 5 }
        };
        const config = configs[this.level];
        // Izmantojam fiksētu pikseļu izmēru, lai kārtis nesarautos
        this.boardElement.style.gridTemplateColumns = `repeat(${config.cols}, 100px)`;
    }

    generateCards() {
        const symbols = ["🍎","🍌","🍇","🍒","🍋","🍉","🥝","🍍","🥥","🍑"];
        const pairCount = this.level === "easy" ? 2 : this.level === "medium" ? 6 : 10;
        const selected = symbols.slice(0, pairCount);
        this.cards = [...selected, ...selected].map((s, i) => ({ id: i, symbol: s, flipped: false }));
        this.setGrid();
    }

    shuffleCards() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    renderBoard() {
        this.boardElement.innerHTML = "";
        this.cards.forEach((card) => {
            const cardEl = document.createElement("div");
            cardEl.className = "memory-card";
            cardEl.innerHTML = `
                <div class="inner">
                    <div class="front">?</div>
                    <div class="back">${card.symbol}</div>
                </div>
            `;
            cardEl.onclick = () => this.handleFlip(card, cardEl);
            this.boardElement.appendChild(cardEl);
        });
    }

    handleFlip(card, el) {
        // Neļaujam klikšķināt, ja dēlis ir bloķēts vai kārte jau atvērta
        if (this.isLocked || card.flipped || el.classList.contains('flipped')) return;

        el.classList.add('flipped');
        card.flipped = true;

        if (!this.firstCard) {
            this.firstCard = { card, el };
        } else {
            this.secondCard = { card, el };
            this.checkMatch();
        }
    }

    checkMatch() {
        this.isLocked = true; // Bloķējam klikšķus pārbaudes laikā
        const isMatch = this.firstCard.card.symbol === this.secondCard.card.symbol;

        if (isMatch) {
            this.matchedPairs++;
            this.resetTurn();
            if (this.matchedPairs === this.cards.length / 2) {
                setTimeout(() => this.win(), 500);
            }
        } else {
            // Ja nav sakritības, paturam atvērtas 1 sekundi, tad aizveram
            setTimeout(() => {
                this.firstCard.el.classList.remove('flipped');
                this.secondCard.el.classList.remove('flipped');
                this.firstCard.card.flipped = false;
                this.secondCard.card.flipped = false;
                this.resetTurn();
            }, 1000);
        }
    }

    resetTurn() {
        this.firstCard = null;
        this.secondCard = null;
        this.isLocked = false;
    }

    startTimer() {
        window.memoryTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            document.getElementById("timer").textContent = `Laiks: ${elapsed}s`;
        }, 1000);
    }

    win() {
        clearInterval(window.memoryTimer);
        const finalTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.saveScore(finalTime);
        alert(`Apsveicam! Tavs laiks: ${finalTime}s`);
        document.getElementById("restart-btn").style.display = "block";
    }

    saveScore(time) {
        const formData = new FormData();
        formData.append('level', this.level);
        formData.append('time_seconds', time);

        fetch("/cards", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.new_record) alert("Jauns personīgais rekords!");
        });
    }
}

function startGame(level) {
    window.currentGame = new MemoryGame(level);
    window.currentGame.start();
}

function updateLeaderboardUI() {
   fetch('/controllers/cards/getTopCards.php')
        .then(res => res.json())
        .then(data => {
            Object.keys(data).forEach(level => {
                // Atrodam pareizo sarakstu pēc līmeņa nosaukuma
                const card = document.querySelector(`.score-card[data-level="${level}"] ol`);
                if (!card) return;

                if (data[level].length === 0) {
                    card.innerHTML = "<li>Vēl nav rezultātu</li>";
                } else {
                    card.innerHTML = data[level].map(s => 
                        `<li><strong>${escapeHtml(s.username)}</strong>: ${s.time_seconds}s</li>`
                    ).join('');
                }
            });
        });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}