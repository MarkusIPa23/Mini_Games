<?php
if (!isset($_SESSION['user_id'])) {
    header("Location: /login");
    exit();
}

$pageTitle = "Līderu saraksts";
$cssFile = "leaderboard.css";

// Saņemam kārtošanas virzienu
$order = isset($_GET['order']) && $_GET['order'] === 'ASC' ? 'ASC' : 'DESC';

// 1. Memory Game rezultāti
// Pievienojam tukšu masīvu [] kā otro argumentu
$memoryScores = $db->query("
    SELECT users.username, memory_highscores.level, memory_highscores.time_seconds, memory_highscores.created_at
    FROM memory_highscores
    JOIN users ON memory_highscores.user_id = users.id
    ORDER BY memory_highscores.time_seconds $order
", [])->fetchAll();

// 2. Typing Game rezultāti
// Pievienojam tukšu masīvu [] kā otro argumentu
$typingScores = $db->query("
    SELECT users.username, typing_highscores.level, typing_highscores.language, 
           typing_highscores.wpm, typing_highscores.time_seconds, typing_highscores.created_at
    FROM typing_highscores
    JOIN users ON typing_highscores.user_id = users.id
    ORDER BY typing_highscores.wpm $order
", [])->fetchAll();

require "views/leaderboard.view.php";