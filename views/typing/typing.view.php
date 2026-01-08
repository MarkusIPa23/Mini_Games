<?php require "views/components/header.php" ?>
<?php require "views/components/navbar.php" ?>

<?php
function getFlag($lang) {
    $flags = [
        'lv' => '🇱🇻',
        'en' => '🇬🇧',
        'lt' => '🇱🇹',
        'et' => '🇪🇪'
    ];
    // PIEVIENO ŠO:
    return $flags[$lang] ?? '🌐'; 
}
?>

<main class="container">
    <h1>Ātrrakstīšana</h1>
    
    <div id="language-select">
        <button class="lang-btn active" title="Latviešu" onclick="setLanguage('lv')">🇱🇻</button>
        <button class="lang-btn" title="English" onclick="setLanguage('en')">🇬🇧</button>
    </div>

    <div id="level-select">
        <button class="btn level-btn" onclick="startTypingGame('easy')">
            <span class="stars">⭐</span>
        </button>
        <button class="btn level-btn" onclick="startTypingGame('medium')">
            <span class="stars">⭐⭐</span>
        </button>
        <button class="btn level-btn" onclick="startTypingGame('hard')">
            <span class="stars">⭐⭐⭐</span>
        </button>
        <button class="btn level-btn" onclick="startTypingGame('hardcore')">
            <span class="stars">⭐⭐⭐⭐</span>
        </button>
    </div>

    <div id="progress-container">
        <div id="progress-bar"></div>
    </div>

    <div id="text-display" class="typing-text-area">Izvēlies valodu un grūtības pakāpi...</div>
    <div id="typing-input" contenteditable="true" class="typing-input-field" placeholder="Raksti šeit..."></div>

    <div class="stats-bar">
        <div id="timer">Laiks: 0s</div>
        <div id="wpm">WPM: 0</div>
    </div>

    <button id="restart-btn" class="btn" style="display:none; background-color: #27ae60; margin: 10px auto;" onclick="location.reload()">Sākt no jauna</button>

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
    <span><?= getFlag($s['language'] ?? 'lv') ?></span> 
    <strong><?= htmlspecialchars($s['username']) ?></strong>: <?= round($s['wpm'], 1) ?> WPM
</li>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </ol>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</main>

<script src="/js/typing.js"></script>
<?php require "views/components/footer.php" ?>