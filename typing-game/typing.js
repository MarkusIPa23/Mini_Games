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

        if (percent === 100) {
            clearInterval(this.timerInterval);
            const elapsed = (Date.now() - this.startTime)/1000;
            const wpm = (userInput.split(" ").length)/(elapsed/60);
            saveTypingScore(this.userId, this.level, wpm, Math.floor(elapsed));
            showTypingLeaderboard(this.level);
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
        let html = '<h3>Leaderboard</h3><ol>';
        scores.forEach(s => html+=`<li>${s.username}: ${s.wpm.toFixed(1)} WPM</li>`);
        html+='</ol>';
        document.getElementById('leaderboard').innerHTML = html;
    });
}
