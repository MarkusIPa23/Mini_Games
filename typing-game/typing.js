class TypingGame {
    constructor(level, userId) {
        this.level = level;
        this.userId = userId; // Logged-in user's ID
        this.texts = {
            easy: "This is an easy typing test with about fifty words for practice.",
            medium: "Typing tests at medium level usually contain around one hundred words for moderate challenge.",
            hard: "Hard typing test has more words, maybe 150 or so, to push your typing skills further.",
            hardcore: "HardCore is extremely long, around three hundred words, designed to test both speed and endurance of typists."
        };
        this.text = this.texts[level];
        this.startTime = null;
        this.timerInterval = null;
    }

    start() {
        document.getElementById("text-display").textContent = this.text;
        const input = document.getElementById("typing-input");
        input.value = "";
        input.disabled = false;
        input.focus();
        this.startTime = Date.now();
        this.startTimer();

        input.addEventListener("input", () => this.checkInput(input.value));
    }

    checkInput(userInput) {
        let correctLength = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === this.text[i]) correctLength++;
        }
        const percent = Math.floor(correctLength / this.text.length * 100);
        document.getElementById("progress-bar").style.width = percent + "%";

        if (percent === 100) {
            clearInterval(this.timerInterval);
            const elapsed = (Date.now() - this.startTime)/1000;
            const wpm = (userInput.split(" ").length)/(elapsed/60);
            saveTypingScore(this.userId, this.level, wpm, Math.floor(elapsed));
            showTypingLeaderboard(this.level);
            document.getElementById("restart-btn").style.display = "block";
            alert("Finished! WPM: "+wpm.toFixed(1));
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            let elapsed = Math.floor((Date.now() - this.startTime)/1000);
            document.getElementById("timer").textContent = "Time: " + elapsed + "s";
            const input = document.getElementById("typing-input").value;
            const wpm = Math.floor((input.split(" ").length)/(elapsed/60));
            document.getElementById("wpm").textContent = "WPM: " + wpm;
        }, 500);
    }
}

function startTypingGame(level) {
    const userId = window.userId || null; // optional
    const game = new TypingGame(level, userId); // still passes null if not logged in
    game.start();
    window.currentLevel = level; // Store current level
}

// API calls
function saveTypingScore(userId, level, wpm, time) {
    fetch('../api/save_typing_score.php', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `user_id=${userId}&level=${level}&wpm=${wpm}&time_seconds=${time}`
    }).then(res=>res.json()).then(data=>{
        if(data.status==='success') console.log('Typing score saved');
    });
}

function showTypingLeaderboard(level) {
    fetch(`../api/get_typing_scores.php?level=${level}`)
    .then(res=>res.json())
    .then(scores=>{
        let html = '<h3>Leaderboard</h3><ul>';
        scores.forEach(s => html+=`<li>${s.username}: ${s.wpm.toFixed(1)} WPM (${new Date(s.created_at).toLocaleString()})</li>`);
        html+='</ul>';
        // Fetch user's score
        fetch('../api/get_user_typing_scores.php')
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                const userScore = data.scores.find(s => s.level === level);
                if (userScore) {
                    html += '<h4>Your Best WPM</h4><p>' + userScore.wpm.toFixed(1) + ' WPM (' + userScore.time_seconds + 's) - ' + new Date(userScore.created_at).toLocaleString() + '</p>';
                } else {
                    html += '<h4>Your Best WPM</h4><p>No score yet</p>';
                }
            }
            document.getElementById('leaderboard').innerHTML = html;
        });
    });
}

// Restart functionality
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("restart-btn").addEventListener("click", () => {
        startTypingGame(window.currentLevel || 'easy');
        document.getElementById("restart-btn").style.display = "none";
        document.getElementById("leaderboard").innerHTML = "";
    });
});