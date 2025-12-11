class Card {
    constructor(id, symbol) {
        this.id = id;
        this.symbol = symbol;
        this.flipped = false;
    }
    flip() { this.flipped = !this.flipped; }
    isMatch(otherCard) { return this.symbol === otherCard.symbol; }
}

class MemoryGame {
    constructor(level, userId) {
        this.level = level;
        this.userId = userId; // Logged-in user's ID
        this.cards = [];
        this.firstCard = null;
        this.secondCard = null;
        this.matchedPairs = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.boardElement = document.getElementById("game-board");
    }

    start() {
        this.generateCards();
        this.shuffleCards();
        this.renderBoard();
        this.startTime = Date.now();
        this.startTimer();
    }

    generateCards() {
        let symbols = ["🍎","🍌","🍇","🍒","🍋","🍉","🥝","🍍","🥥","🍑"];
        let count = this.level === "easy" ? 2*2/2 : this.level === "medium" ? 6 : 10;
        let selected = symbols.slice(0, count);
        this.cards = selected.concat(selected).map((s,i)=>new Card(i,s));
        this.setGrid();
    }

    setGrid() {
        let rows = this.level === "easy" ? 2 : this.level === "medium" ? 3 : 4;
        let cols = this.level === "easy" ? 2 : this.level === "medium" ? 4 : 5;
        this.boardElement.style.gridTemplateColumns = `repeat(${cols}, 80px)`;
        this.boardElement.style.gridTemplateRows = `repeat(${rows}, 80px)`;
    }

    shuffleCards() { this.cards.sort(() => Math.random() - 0.5); }

    renderBoard() {
        this.boardElement.innerHTML = "";
        this.cards.forEach(card => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";
            cardDiv.textContent = "?";
            cardDiv.addEventListener("click", () => this.cardClick(card, cardDiv));
            this.boardElement.appendChild(cardDiv);
        });
    }

    cardClick(card, cardDiv) {
        if (card.flipped) return;
        card.flip();
        cardDiv.textContent = card.symbol;

        if (!this.firstCard) {
            this.firstCard = { card, div: cardDiv };
        } else {
            this.secondCard = { card, div: cardDiv };
            setTimeout(() => this.checkMatch(), 500);
        }
    }

    checkMatch() {
        if (this.firstCard.card.isMatch(this.secondCard.card)) {
            this.matchedPairs++;
        } else {
            this.firstCard.card.flip();
            this.secondCard.card.flip();
            this.firstCard.div.textContent = "?";
            this.secondCard.div.textContent = "?";
        }
        this.firstCard = null;
        this.secondCard = null;

        if (this.matchedPairs === this.cards.length / 2) {
            clearInterval(this.timerInterval);
            let elapsed = Math.floor((Date.now() - this.startTime)/1000);
            saveMemoryScore(this.userId, this.level, elapsed);
            showMemoryLeaderboard(this.level);
            alert("You won! Time: "+elapsed+"s");
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            let elapsed = Math.floor((Date.now() - this.startTime)/1000);
            document.getElementById("timer").textContent = "Time: " + elapsed + "s";
        }, 1000);
    }
}

function startGame(level) {
    const userId = window.userId || null; // optional
    const game = new MemoryGame(level, userId); // still passes null if not logged in
    game.start();
}


// API calls
function saveMemoryScore(userId, level, time) {
    fetch('../api/save_memory_score.php', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `user_id=${userId}&level=${level}&time_seconds=${time}`
    }).then(res=>res.json()).then(data=>{
        if(data.status==='success') console.log('Score saved');
    });
}

function showMemoryLeaderboard(level) {
    fetch(`../api/get_memory_scores.php?level=${level}`)
    .then(res=>res.json())
    .then(scores=>{
        let html = '<h3>Leaderboard</h3><ol>';
        scores.forEach(s => html+=`<li>${s.username}: ${s.time_seconds}s</li>`);
        html+='</ol>';
        document.getElementById('leaderboard').innerHTML = html;
    });
}
