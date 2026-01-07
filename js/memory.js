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
        const pairCount = this.level === "easy" ? 2 : this.level === "medium" ? 6 : 10;
        const selected = symbols.slice(0, pairCount);
        this.cards = selected.concat(selected).map((s,i)=>new Card(i,s));
        this.setGrid();
    }

    setGrid() {
        if (this.level === "easy") {
            this.boardElement.style.gridTemplateColumns = `repeat(2, 80px)`;
            this.boardElement.style.gridTemplateRows = `repeat(2, 80px)`;
        } else if (this.level === "medium") {
            this.boardElement.style.gridTemplateColumns = `repeat(4, 80px)`;
            this.boardElement.style.gridTemplateRows = `repeat(3, 80px)`;
        } else {
            this.boardElement.style.gridTemplateColumns = `repeat(5, 80px)`;
            this.boardElement.style.gridTemplateRows = `repeat(4, 80px)`;
        }
    }

    shuffleCards() { this.cards.sort(() => Math.random() - 0.5); }

    renderBoard() {
        this.boardElement.innerHTML = "";
        this.cards.forEach(card => {
            const div = document.createElement("div");
            div.className = "card";
            const front = document.createElement("div");
            front.className = "front";
            front.textContent = "?";
            const back = document.createElement("div");
            back.className = "back";
            back.textContent = card.symbol;
            div.appendChild(front);
            div.appendChild(back);
            div.onclick = () => this.cardClick(card, div);
            this.boardElement.appendChild(div);
        });
    }

    cardClick(card, div) {
        if (card.flipped || this.secondCard) return;
        card.flip();
        div.classList.add('flipped');
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
            }, 500);
        }
        this.firstCard = null;
        this.secondCard = null;
        if (this.matchedPairs === this.cards.length / 2) {
            clearInterval(this.timerInterval);
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.saveScore(elapsed);
            alert(`You won! Time: ${elapsed}s`);
            showMemoryLeaderboard(this.level);            document.getElementById("restart-btn").style.display = "block";        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            document.getElementById("timer").textContent = "Time: " + elapsed + "s";
        }, 1000);
    }

    saveScore(time) {
        const userId = window.userId;
        if (!userId) {
            console.log("Not logged in, score not saved");
            return;
        }
        console.log("Saving score:", { user_id: userId, level: this.level, time_seconds: time });
        fetch("../api/save_memory_score.php", {
            method: "POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `user_id=${userId}&level=${this.level}&time_seconds=${time}`
        })
        .then(r => {
            console.log("Save response status:", r.status);
            return r.json();
        })
        .then(d => console.log("Score saved:", d))
        .catch(err => console.error("Save error:", err));
    }
}

function startGame(level) { 
    const game = new MemoryGame(level); 
    game.start(); 
    window.currentLevel = level;
}

function showMemoryLeaderboard(level) {
    const levels = ['easy', 'medium', 'hard'];
    let html = '<h3>Leaderboard</h3>';
    const promises = levels.map(lvl => fetch(`../api/get_memory_scores.php?level=${lvl}`).then(res => res.json()).then(scores => ({ level: lvl, scores })));

    Promise.all(promises).then(results => {
        results.forEach(({ level, scores }) => {
            html += `<h4>${level.charAt(0).toUpperCase() + level.slice(1)}</h4>`;
            if (scores.length === 0) {
                html += '<p>No scores yet.</p>';
            } else {
                html += '<ol>';
                scores.forEach((s, index) => html += `<li>${s.username}: ${formatTime(s.time_seconds)}</li>`);
                html += '</ol>';
            }
        });
        // Add user's best if logged in
        if (window.userId) {
            fetch('../api/get_user_memory_scores.php?user_id=' + window.userId)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success" && data.scores.length > 0) {
                    const username = data.scores[0].username;
                    html += `<h4>${username}'s Best Times</h4>`;
                    levels.forEach(lvl => {
                        const scores = data.scores.filter(s => s.level === lvl);
                        if (scores.length > 0) {
                            const best = scores.reduce((min, s) => s.time_seconds < min.time_seconds ? s : min);
                            html += `<p><strong>${lvl.charAt(0).toUpperCase() + lvl.slice(1)}</strong>: ${formatTime(best.time_seconds)}</p>`;
                        } else {
                            html += `<p><strong>${lvl.charAt(0).toUpperCase() + lvl.slice(1)}</strong>: No score yet</p>`;
                        }
                    });
                }
                document.getElementById('leaderboard').innerHTML = html;
            })
            .catch(() => {
                document.getElementById('leaderboard').innerHTML = html;
            });
        } else {
            document.getElementById('leaderboard').innerHTML = html;
        }
    }).catch(() => {
        document.getElementById('leaderboard').innerHTML = '<h3>Leaderboard</h3><p>Error loading leaderboard</p>';
    });
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("restart-btn").addEventListener("click", () => {
        startGame(window.currentLevel || 'easy');
        document.getElementById("restart-btn").style.display = "none";
        document.getElementById("leaderboard").innerHTML = "";
    });
});