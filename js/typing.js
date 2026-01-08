class TypingGame {
    constructor(level, language = 'lv') {
        this.level = level;
        this.language = language;
        this.texts = {
            lv: {
                easy: [
                    "Sniega pārslas lēni krīt pār kluso mežu, radot mīkstu un baltu segu.",
                    "Ziemas rīts sākās ar sarmu uz logiem un aukstu, dzidru gaisu dārzā.",
                    "Mazie putni meklē barību piesnigušajos koku zaros pie mājas sliekšņa."
                ],
                medium: [
                    "Ziemas vidū dienas kļūst īsas, un vakari piepildās ar siltu gaismu no mājīgām telpām.",
                    "Ziemeļvējš dzenā sniega vērpuļus pa tukšajām ielām, kamēr cilvēki steidzas mājup pie mīļajiem.",
                    "Ezers ir aizsalis, un bērni ar slidām izbauda pirmo ledus klājumu zem spožās ziemas saules."
                ],
                hard: [
                    "Aukstums iekož vaigos, bet sirdi silda karsta tēja un atmiņas par aizvadīto vasaru dārzā.",
                    "Sarma izrotā koku zarus kā smalkas mežģīnes, padarot visu mežu par pasaku valstību klusumā.",
                    "Meža dzīvnieki lēni pārvietojas pa dziļajām kupenām, atstājot skaidras pēdas baltajā sniegā šonakt."
                ],
                hardcore: [
                    "Ziemeļu ziema ir skarba dabas izpausme, kas pieprasa izturību un sagatavotību katram gājējam.",
                    "Sniega vētras var plosīties stundām ilgi, aizputinot ceļus un noslēpjot ainavas zem necaurredzama plīvura.",
                    "Pēc vētras nāk skaidras debesis, kurās dejo ziemeļblāzma, atgādinot par dabas nebeidzamo skaistumu."
                ]
            },
            en: {
                easy: ["Snow falls softly.", "Cold winter days.", "White snow everywhere."],
                medium: ["Winter brings cold winds.", "Hot chocolate by the fire.", "Short days and long nights."],
                hard: ["Frost covers the green grass.", "Walking through deep white snow.", "The silence of a winter forest."],
                hardcore: ["The northern lights dance tonight.", "Survival in the frozen arctic.", "Endless blizzards hide the path."]
            },
            lt: {
                easy: ["Sninga labai tyliai.", "Šalta žiemos diena.", "Baltas sniegas miške."],
                medium: ["Žiema atneša šaltį.", "Karšta arbata namuose.", "Trumpos dienos ir naktys."],
                hard: ["Šerkšnas puošia medžius.", "Einant per gilias pusnis.", "Tyla žiemiškoje girioje."],
                hardcore: ["Šiaurės pašvaistė danguje.", "Išgyvenimas šaltoje Arktyje.", "Pūgos slepia visus kelius."]
            },
            et: {
                easy: ["Lund sajab laias laastus.", "Külm talvepäev õues.", "Valge lumi on maas."],
                medium: ["Talv toob külmad tuuled.", "Kuum tee sooja toa sees.", "Lühikesed päevad on käes."],
                hard: ["Härmatis kaunistab puid.", "Kõndides läbi sügava lume.", "Vaikus talvises metsas."],
                hardcore: ["Virmalised tantsivad taevas.", "Ellujäämine külmas Arktikas.", "Lumetormid peidavad raja."]
            }
        };

        const possibleTexts = this.texts[this.language][this.level];
        this.text = possibleTexts[Math.floor(Math.random() * possibleTexts.length)];
        
        this.startTime = null;
        this.timerInterval = null;
        this.isStarted = false;
        this.isFinished = false;
    }

    start() {
        const display = document.getElementById("text-display");
        display.innerHTML = this.text.split(' ').map(word => `<span>${word}</span>`).join(' ');
        
        const input = document.getElementById("typing-input");
        input.innerText = "";
        input.focus();
        
        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (this.isStarted && !this.isFinished) this.finish();
                return;
            }

            if (!this.isStarted && e.key !== "Escape") {
                this.isStarted = true;
                this.startTime = Date.now();
                this.startTimer();
            }
        };

        input.oninput = () => this.checkInput(input.innerText);
    }

    checkInput(userInput) {
        if (this.isFinished) return;

        const spans = document.querySelectorAll("#text-display span");
        const targetWords = this.text.split(' ');
        const userWords = userInput.trim().split(/\s+/);

        targetWords.forEach((word, i) => {
            if (!userWords[i]) {
                spans[i].className = '';
            } else if (userWords[i] === word) {
                spans[i].className = 'correct';
            } else {
                spans[i].className = 'incorrect';
            }
            if (userWords.length - 1 === i) spans[i].classList.add('current');
        });

        const progress = Math.min((userWords.length / targetWords.length) * 100, 100);
        document.getElementById("progress-bar").style.width = `${progress}%`;

        if (userWords.length === targetWords.length && userWords[userWords.length-1] === targetWords[targetWords.length-1]) {
            this.finish();
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = (Date.now() - this.startTime) / 1000;
            const userWords = document.getElementById("typing-input").innerText.trim().split(/\s+/).length;
            const wpm = Math.round((userWords / elapsed) * 60) || 0;
            
            document.getElementById("timer").textContent = `Laiks: ${Math.floor(elapsed)}s`;
            document.getElementById("wpm").textContent = `WPM: ${wpm}`;
        }, 500);
    }

    finish() {
        if (this.isFinished) return;
        this.isFinished = true;
        clearInterval(this.timerInterval);

        const elapsed = (Date.now() - this.startTime) / 1000;
        const wordsCount = this.text.split(' ').length;
        const wpm = Math.round((wordsCount / elapsed) * 60);
        
        this.saveScore(wpm, Math.floor(elapsed));
        alert(`Gatavs! Tavs ātrums: ${wpm} WPM`);
        document.getElementById("restart-btn").style.display = "block";
    }

    saveScore(wpm, time) {
        const formData = new FormData();
        formData.append('level', this.level);
        formData.append('language', this.language);
        formData.append('wpm', wpm);
        formData.append('time_seconds', time);

        fetch("/typing", { 
            method: "POST", 
            body: formData 
        })
        .then(res => res.json())
        .then(data => {
            console.log("Rezultāts saglabāts:", data);
            updateLeaderboardUI(); // Tagad šī funkcija ir definēta zemāk!
        })
        .catch(err => console.error("Kļūda saglabājot:", err));
    }
}

// --- GLOBĀLĀS FUNKCIJAS (Atrodas ārpus klases) ---

let currentLang = 'lv';

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        // Pārbauda vai pogas teksts vai onclick satur doto valodu
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(lang));
    });
    if (window.activeLevel) startTypingGame(window.activeLevel);
}

function startTypingGame(level) {
    window.activeLevel = level;
    // Ja ir vecs taimeris, to nodzēšam
    const timerElem = document.getElementById("timer");
    const wpmElem = document.getElementById("wpm");
    if(timerElem) timerElem.textContent = "Laiks: 0s";
    if(wpmElem) wpmElem.textContent = "WPM: 0";
    
    const game = new TypingGame(level, currentLang);
    game.start();
    document.getElementById("restart-btn").style.display = "none";
}

function updateLeaderboardUI() {
    const flags = { lv: '🇱🇻', en: '🇬🇧', lt: '🇱🇹', et: '🇪🇪' };

    fetch('controllers/typing/getTopTyping.php')
        .then(res => {
            if (!res.ok) throw new Error('404');
            return res.json();
        })
        .then(data => {
            Object.keys(data).forEach(lvl => {
                const list = document.querySelector(`.score-card[data-level="${lvl}"] ol`);
                if (list) {
                    if (!data[lvl] || data[lvl].length === 0) {
                        list.innerHTML = "<li>Nav rekordu</li>";
                    } else {
                        list.innerHTML = data[lvl].map(s => `
                            <li>
                                <span>${flags[s.language] || '🌐'}</span>
                                <strong>${s.username}</strong>: ${parseFloat(s.wpm).toFixed(1)} WPM
                            </li>
                        `).join('');
                    }
                }
            });
        })
        .catch(err => console.error("Leaderboard kļūda:", err));
}

// Izsaucam vienreiz ielādējot lapu, lai aizpildītu datus
document.addEventListener("DOMContentLoaded", updateLeaderboardUI);