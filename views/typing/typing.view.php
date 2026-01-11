<?php require "views/components/header.php" ?>
<?php require "views/components/navbar.php" ?>

<?php
function getFlag($lang) {
    return match($lang) {
        'lv' => '🇱🇻',
        'en' => '🇬🇧',
        default => '🌐'
    };
}
?>

<style>
/* =========================
   STICKY OVERLAY
========================= */
.game-controls-wrapper {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: white;
    padding: 14px 16px;
    border-radius: 0 0 18px 18px;
    transition: all 0.3s ease;
}

.game-controls-wrapper.is-sticky {
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    border-bottom: 3px solid #3498db;
}

/* =========================
   INPUT LAUKS
========================= */
.typing-input-field {
    width: 100%;
    max-width: 900px;
    min-height: 60px;
    margin: 8px auto;
    padding: 16px;
    font-size: 1.2rem;
    border: 3px solid #3498db;
    border-radius: 14px;
    outline: none;
}

/* =========================
   TEKSTA ZONA
========================= */
#text-display {
    margin-top: 30px; /* svarīgi – lai nepārklājas */
}


</style>

<main class="container">
    <h1>Ātrrakstīšana</h1>

    <!-- =========================
         VALODU IZVĒLE
    ========================= -->
    <div id="language-select">
        <button class="lang-btn active" onclick="setLanguage('lv')">LV</button>
        <button class="lang-btn" onclick="setLanguage('en')">GB</button>
    </div>

    <!-- =========================
         GRŪTĪBAS IZVĒLE
    ========================= -->
    <div id="level-select">
        <button class="btn level-btn" onclick="startTypingGame('easy')">⭐</button>
        <button class="btn level-btn" onclick="startTypingGame('medium')">⭐⭐</button>
        <button class="btn level-btn" onclick="startTypingGame('hard')">⭐⭐⭐</button>
        <button class="btn level-btn" onclick="startTypingGame('hardcore')">⭐⭐⭐⭐</button>
    </div>

    <!-- =========================
         STICKY OVERLAY
    ========================= -->
    <div class="game-controls-wrapper" id="sticky-header">
        <div id="progress-container">
            <div id="progress-bar"></div>
        </div>

        <div id="typing-input"
             class="typing-input-field"
             contenteditable="true"
             spellcheck="false"
             aria-label="Rakstīšanas lauks">
        </div>

        <div class="stats-bar">
            <div id="timer">Laiks: 0s</div>
            <div id="wpm">WPM: 0</div>
        </div>
    </div>

    <!-- =========================
         TEKSTS
    ========================= -->
    <div id="text-display"
         class="typing-text-area"
         oncontextmenu="return false;">
        Izvēlies valodu un grūtības pakāpi...
    </div>

    <button id="restart-btn"
            class="btn"
            style="display:none; background:#27ae60; margin:20px auto;"
            onclick="location.reload()">
        Sākt no jauna
    </button>

    <!-- =========================
         LEADERBOARD (NEMAINĪTS)
    ========================= -->
    <div class="top-scores-container">
        <h2>Top 3</h2>

        <div class="scores-grid">
            <?php 
            $levels = ['easy', 'medium', 'hard', 'hardcore'];
            foreach ($levels as $lvl): 
                $scores = $topScores[$lvl] ?? [];
            ?>
                <div class="score-card" data-level="<?= $lvl ?>">
                    <h3><?= ucfirst($lvl) ?></h3>
                    <ol>
                        <?php if (empty($scores)): ?>
                            <li>Nav rekordu</li>
                        <?php else: ?>
                            <?php foreach ($scores as $s): ?>
                                <li>
                                    <?= getFlag($s['language'] ?? 'lv') ?>
                                    <strong><?= htmlspecialchars($s['username']) ?></strong>
                                    — <?= round($s['wpm'], 1) ?> WPM
                                </li>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </ol>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</main>

<script>
/* Sticky vizuālais efekts */
window.addEventListener('scroll', () => {
    const header = document.getElementById('sticky-header');
    header.classList.toggle('is-sticky', window.scrollY > 150);
});
</script>

<script src="/js/typing.js"></script>

<?php require "views/components/footer.php" ?>
