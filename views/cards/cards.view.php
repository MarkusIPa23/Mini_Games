<?php require "views/components/header.php" ?>
<?php require "views/components/navbar.php" ?>

<main class="container">
    <h1>Atmiņas spēle</h1>
    
    <div id="level-select">
        <button class="btn" onclick="startGame('easy')">Easy 2x2</button>
        <button class="btn" onclick="startGame('medium')">Medium 4x3</button>
        <button class="btn" onclick="startGame('hard')">Hard 5x4</button>
    </div>

    <div id="timer">Laiks: 0s</div>

    <div id="game-board"></div>

    <button id="restart-btn" class="btn" style="display:none; background-color:#27ae60;" onclick="location.reload()">
        Spēlēt vēlreiz
    </button>

    <div class="top-scores-container">
        <h2>Top 3</h2>
        <div class="scores-grid">
            <?php foreach ($topScores as $lvl => $scores): ?>
                <div class="score-card" data-level="<?= $lvl ?>">
                    <h3><?= ucfirst($lvl) ?></h3>
                    <ol>
                        <?php if (empty($scores)): ?>
                            <li>Vēl nav rezultātu</li>
                        <?php else: ?>
                            <?php foreach ($scores as $s): ?>
                                <li>
                                    <strong><?= htmlspecialchars($s['username']) ?></strong>:
                                    <?= $s['time_seconds'] ?>s
                                </li>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </ol>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</main>

<script src="/js/memory.js"></script>
<?php require "views/components/footer.php" ?>
