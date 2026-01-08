<?php require "views/components/header.php" ?>
<?php require "views/components/navbar.php" ?>

<?php
// Karodziņu funkcija
function getFlag($lang) {
    $flags = ['lv' => '🇱🇻', 'en' => '🇬🇧'];
    return $flags[$lang] ?? '';
}
?>

<main class="container">
    <h1>Visi rezultāti</h1>

    <div class="filter-bar" style="margin-bottom: 30px; text-align: center;">
        <form method="GET" action="/leaderboard">
            <select name="order" id="order" onchange="this.form.submit()">
                <option value="DESC" <?= isset($_GET['order']) && $_GET['order'] == 'DESC' ? 'selected' : '' ?>>DSC</option>
                <option value="ASC" <?= isset($_GET['order']) && $_GET['order'] == 'ASC' ? 'selected' : '' ?>>ASC</option>
            </select>
        </form>
    </div>

    <div class="leaderboard-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
        
        <section class="score-section">
            <h2>Atmiņas spēle</h2>
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th>Lietotājs</th>
                        <th>Līmenis</th>
                        <th>Laiks (s)</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($memoryScores)): ?>
                        <tr><td colspan="3">Nav rezultātu</td></tr>
                    <?php else: ?>
                        <?php foreach ($memoryScores as $score): ?>
                            <tr>
                                <td><strong><?= htmlspecialchars($score['username']) ?></strong></td>
                                <td><?= ucfirst($score['level']) ?></td>
                                <td><?= $score['time_seconds'] ?>s</td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </section>

        <section class="score-section">
            <h2>Ātrrakstīšana</h2>
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th>Lietotājs</th>
                        <th>Valoda</th>
                        <th>Grūtības pakāpe</th>
                        <th>WPM</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($typingScores)): ?>
                        <tr><td colspan="4">Nav rezultātu</td></tr>
                    <?php else: ?>
                        <?php foreach ($typingScores as $score): ?>
                            <tr>
                                <td><strong><?= htmlspecialchars($score['username']) ?></strong></td>
                                <td><?= getFlag($score['language']) ?></td>
                                <td><?= ucfirst($score['level']) ?></td>
                                <td><?= round($score['wpm'], 1) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </section>

    </div>
</main>

<style>
/* Galvenie stili */
.leaderboard-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.leaderboard-table th, .leaderboard-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.leaderboard-table th {
    background-color: #3498db;
    color: white;
    font-weight: bold;
}

.leaderboard-table tr:hover {
    background-color: #f9f9f9;
}

h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 20px;
}

/* --- RESPONSĪVAIS DIZAINS (@media) --- */

/* Planšetēm un mazākiem ekrāniem (līdz 900px) */
@media (max-width: 900px) {
    .leaderboard-grid {
        grid-template-columns: 1fr !important; /* Pārslēdzas uz vienu kolonnu */
        gap: 20px !important;
    }
}

/* Telefoniem (līdz 600px) */
@media (max-width: 600px) {
    .container {
        padding: 10px;
    }

    h1 {
        font-size: 1.5rem;
    }

    /* Padara tabulas horizontāli ritināmas, lai tās nesaspiestos */
    .score-section {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .leaderboard-table th, .leaderboard-table td {
        padding: 8px 10px; /* Mazākas atstarpes šūnas */
        font-size: 0.9rem;  /* Mazāks teksts */
    }

    /* Filtrācijas joslas pielāgošana */
    .filter-bar select {
        width: 100%;
        margin-top: 10px;
    }
}
</style>

<?php require "views/components/footer.php" ?>