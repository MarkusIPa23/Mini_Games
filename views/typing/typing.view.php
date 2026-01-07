<?php require "views/components/header.php" ?>
<?php require "views/components/navbar.php" ?>


    <h1>Typing Speed</h1>
    <div id="level-select">
        <button onclick="startTypingGame('easy')">Easy</button>
        <button onclick="startTypingGame('medium')">Medium</button>
        <button onclick="startTypingGame('hard')">Hard</button>
        <button onclick="startTypingGame('hardcore')">HardCore</button>
    </div>

    <div id="progress-container">
        <div id="progress-bar"></div>
    </div>
    <div id="text-display"></div>
    <div id="typing-input" contenteditable="true"></div>
    <div id="timer">Time: 0s</div>
    <div id="wpm">WPM: 0</div>
    <button id="restart-btn" style="display:none;">Restart</button>
    <div id="leaderboard"></div>
    <script>window.userId = localStorage.getItem('userId');</script>
    <script src="typing.js"></script>
</body>
</html>
