class TypingGame {
    constructor(level, userId) {
        this.level = level;
        this.userId = userId;
        this.texts = {
            easy: [
                "This is an easy typing test with about fifty words for practice. It includes simple sentences to help you get started. Typing regularly can improve your speed and accuracy over time. Focus on correct posture and finger placement for better results.",
                "Another easy text for practice. Words flow naturally here. Keep your eyes on the screen and type without looking at the keyboard. This will build muscle memory and increase your typing efficiency in the long run."
            ],
            medium: [
                "Typing tests at medium level usually contain around one hundred words for moderate challenge. This text is designed to test your ability to maintain speed while ensuring accuracy. Pay attention to punctuation and capitalization as they are important. Regular practice will make this feel easier over time.",
                "Here is another medium text. It has more words to keep you engaged. Focus on rhythm and avoid mistakes that slow you down. Good typing habits include taking breaks and warming up your fingers before starting."
            ],
            hard: [
                "Hard typing test has more words, maybe 150 or so, to push your typing skills further. This level requires concentration and quick thinking. Mistakes can add up, so accuracy is key. Advanced typists can handle this with ease, but it challenges everyone.",
                "Another hard text with increased complexity. Sentences are longer and vocabulary is varied. Maintain steady pace and correct errors promptly. This will help in building endurance for longer typing sessions."
            ],
            hardcore: [
                "HardCore is extremely long, around three hundred words, designed to test both speed and endurance of typists. This text simulates real-world typing scenarios where you need to type large amounts of content quickly and accurately. It includes various sentence structures and requires full attention. Only the most dedicated typists can complete this without fatigue. Practice makes perfect, and this level will push your limits. Keep going even if it feels tough.",
                "This is the ultimate test for hardcore typists. With over three hundred words, it demands precision and stamina. Every keystroke counts, and maintaining high WPM is crucial. Don't let errors derail your progress. This level separates the amateurs from the professionals in the world of typing."
            ]
        };
        this.text = this.getRandomText();
        this.startTime = null;
        this.timerInterval = null;
        this.timerStarted = false;
    }

    getRandomText() {
        const texts = this.texts[this.level];
        return texts[Math.floor(Math.random() * texts.length)];
    }

    start() {
        const display = document.getElementById("text-display");
        const words = this.text.split(/\s+/);
        display.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
        const input = document.getElementById("typing-input");
        input.textContent = "";
        input.disabled = false;
        input.focus();
        input.addEventListener("input", () => this.checkInput(input.textContent));
    }

    checkInput(userInput) {
        if (!this.timerStarted) {
            this.startTime = Date.now();
            this.startTimer();
            this.timerStarted = true;
        }
        console.log("checkInput called, userInput length:", userInput.length);
        const spans = document.querySelectorAll("#text-display span");
        const words = this.text.split(/\s+/);
        const userWords = userInput.trim().split(/\s+/);
        console.log("words length:", words.length, "userWords length:", userWords.length);
        for (let i = 0; i < words.length; i++) {
            if (i < userWords.length) {
                if (userWords[i] === words[i]) {
                    spans[i].className = 'correct';
                } else {
                    spans[i].className = 'incorrect';
                }
            } else {
                spans[i].className = '';
            }
        }
        // Set current to next word
        if (userWords.length < words.length) {
            spans[userWords.length].className = 'current';
        }
        const correctChars = userInput.split('').filter((char, i) => i < this.text.length && char === this.text[i]).length;
        const percent = Math.floor((correctChars / this.text.length) * 100);
        document.getElementById("progress-bar").style.width = percent + "%";

        if (userWords.length === words.length && userWords.every((w, i) => w === words[i])) {
            clearInterval(this.timerInterval);
            const elapsed = (Date.now() - this.startTime)/1000;
            const wpm = (userInput.split(/\s+/).length)/(elapsed/60);
            saveTypingScore(this.userId, this.level, wpm, Math.floor(elapsed));
            showTypingLeaderboard(this.level);
            document.getElementById("restart-btn").style.display = "block";
            alert("Finished! Time: "+formatTime(Math.floor(elapsed)));
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            let elapsed = Math.floor((Date.now() - this.startTime)/1000);
            document.getElementById("timer").textContent = "Time: " + elapsed + "s";
            const input = document.getElementById("typing-input").textContent;
            const wpm = Math.floor((input.split(/\s+/).length)/(elapsed/60)) || 0;
            document.getElementById("wpm").textContent = "WPM: " + wpm;
        }, 500);
    }
}

function startTypingGame(level) {
    const userId = window.userId || null;
    const game = new TypingGame(level, userId);
    game.start();
    window.currentLevel = level;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function saveTypingScore(userId, level, wpm, time) {
    console.log("Saving typing score:", { user_id: userId, level, wpm, time_seconds: time });
    fetch('../api/save_typing_score.php', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `user_id=${userId}&level=${level}&wpm=${wpm}&time_seconds=${time}`
    })
    .then(r => {
        console.log("Typing save response status:", r.status);
        return r.json();
    })
    .then(data => {
        if(data.status==='success') console.log('Typing score saved');
    })
    .catch(err => console.error("Typing save error:", err));
}

function showTypingLeaderboard(level) {
    const levels = ['easy', 'medium', 'hard', 'hardcore'];
    let html = '<h3>Leaderboard</h3>';
    const promises = levels.map(lvl => fetch(`../api/get_typing_scores.php?level=${lvl}`).then(res => res.json()).then(scores => ({ level: lvl, scores })));

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
            fetch('../api/get_user_typing_scores.php?user_id=' + window.userId)
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

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("restart-btn").addEventListener("click", () => {
        startTypingGame(window.currentLevel || 'easy');
        document.getElementById("restart-btn").style.display = "none";
        document.getElementById("leaderboard").innerHTML = "";
    });
});