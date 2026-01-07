<?php
if (!isset($_SESSION['user_id'])) {
    header("Location: /login");
    exit();
}

$pageTitle = "Leaderboard";

require "views/leaderboard.view.php";