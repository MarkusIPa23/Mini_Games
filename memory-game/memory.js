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
    constructor(level) {
        this.level = level;
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
        const symbols = ["🍎","🍌","🍇","🍒","🍋","🍉","🥝","🍍","🥥","🍑"];
        const pairCount = this.level === "easy" ? 2 :
                          this.level === "medium" ? 6 : 10;

        const selected = symbols.slice(0, pairCount);
        this.cards = selected.concat(selected).map((s,i)=>new Card(i,s));
        this.setGrid();
    }

    setGrid() {
        const pairCount = this.level === "easy" ? 2 :
                          this.level === "medium" ? 6 : 10;
        const totalCards = pairCount * 2;

        this.boardElement.style.gridTemplateColumns = `repeat(${totalCards}, 80px)`;
        this.boardElement.style.gridTemplateRows = `80px`;
    }

    shuffleCards() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    renderBoard() {
        this.boardElement.innerHTML = "";
        this.cards.forEach(card => {
            const div = document.createElement("div");
            div.className = "card";
            div.textContent = "?";
            div.onclick = () => this.cardClick(card, div);
            this.boardElement.appendChild(div);
        });
    }

    cardClick(card, div) {
        if (card.flipped || this.secondCard) return;

        card.flip();
        div.classList.add('flipped');
        div.textContent = card.symbol;

        if (!this.firstCard) {
            this.firstCard = { card, div };
        } else {
            this.secondCard = { card, div };
            setTimeout(() => this.checkMatch(), 600);
        }
    }

    checkMatch() {
        if (this.firstCard.card.isMatch(this.secondCard.card)) {
            this.matchedPairs++;
        } else {
            this.firstCard.card.flip();
            this.secondCard.card.flip();
            setTimeout(() => {
                this.firstCard.div.classList.remove('flipped');
                this.secondCard.div.classList.remove('flipped');
                this.firstCard.div.textContent = "?";
                this.secondCard.div.textContent = "?";
            }, 500);
        }

        this.firstCard = null;
        this.secondCard = null;

        if (this.matchedPairs === this.cards.length / 2) {
            clearInterval(this.timerInterval);
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.saveScore(elapsed);
            alert(`You won! Time: ${elapsed}s`);
            showMemoryLeaderboard(this.level);
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            document.getElementById("timer").textContent = "Time: " + elapsed + "s";
        }, 1000);
    }

    saveScore(time) {
        fetch("../api/save_memory_score.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                level: this.level,
                time_seconds: time
            })
        })
        .then(r => r.json())
        .then(d => console.log("Score saved:", d));
    }
}

// ---- GAME START ----
function startGame(level) {
    const game = new MemoryGame(level);
    game.start();
}

// ---- LEADERBOARD ----
function showMemoryLeaderboard(level) {
    fetch(`../api/get_memory_scores.php?level=${level}`)
        .then(res => res.json())
        .then(scores => {
            let html = "<h3>Leaderboard</h3><ul>";
            scores.forEach((s, index) => {
                html += `<li>${s.username}: ${s.time_seconds}s (${new Date(s.created_at).toLocaleString()})</li>`;
            });
            html += "</ul>";
            // Now fetch user's score
            fetch("../api/get_user_memory_scores.php")
                .then(res => res.json())
                .then(data => {
                    if (data.status === "success") {
                        const userScore = data.scores.find(s => s.level === level);
                        if (userScore) {
                            html += "<h4>Your Best Time</h4><p>" + userScore.time_seconds + "s - " + new Date(userScore.created_at).toLocaleString() + "</p>";
                        } else {
                            html += "<h4>Your Best Time</h4><p>No score yet</p>";
                        }
                    }
                    document.getElementById("leaderboard").innerHTML = html;
                });
        });
}