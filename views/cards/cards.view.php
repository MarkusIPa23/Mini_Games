<?php require "views/components/header.php" ?>
<?php require "views/components/navbar.php" ?>


    <h1>Memory Card Match</h1>
    <div id="level-select">
        <button onclick="startGame('easy')">Easy 2x2</button>
        <button onclick="startGame('medium')">Medium 3x4</button>
        <button onclick="startGame('hard')">Hard 4x5</button>
    </div>

    <div id="game-board" class="board"></div>
    <div id="timer">Time: 0s</div>
    <button id="restart-btn" style="display:none;">Restart</button>
    <div id="leaderboard"></div>
    <script>window.userId = localStorage.getItem('userId');</script>
    <script src="../js/memory.js"></script>

    

<?php require "views/components/footer.php" ?>