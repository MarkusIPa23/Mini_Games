<?php
if (!isset($_SESSION['user_id'])) {
    header("Location: /login");
    exit();
}
$pageTitle = "Kārtis";
$cssFile = "memory.css";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $userId = $_SESSION['user_id'];
    $level = $_POST['level'];
    $time = (int)$_POST['time_seconds'];

    // 1. Saglabājam vēsturē (visus rezultātus)
    $db->query("INSERT INTO memory_history (user_id, level, time_seconds) VALUES (:u, :l, :t)", 
              ['u' => $userId, 'l' => $level, 't' => $time]);

    // 2. Atjaunojam labāko rezultātu (Highscores tabula)
    $existing = $db->query("SELECT time_seconds FROM memory_highscores WHERE user_id = :u AND level = :l", 
                          ['u' => $userId, 'l' => $level])->fetch();

    if (!$existing || $time < $existing['time_seconds']) {
        $db->query("INSERT INTO memory_highscores (user_id, level, time_seconds) 
                    VALUES (:u, :l, :t) 
                    ON DUPLICATE KEY UPDATE time_seconds = :t", 
                    ['u' => $userId, 'l' => $level, 't' => $time]);
        echo json_encode(["status" => "success", "new_record" => true]);
    } else {
        echo json_encode(["status" => "success", "new_record" => false]);
    }
    exit;
}

// Datu atlase priekš Top 3 (GET)
$levels = ['easy', 'medium', 'hard'];
$topScores = [];

foreach ($levels as $lvl) {
    $topScores[$lvl] = $db->query("
        SELECT users.username, memory_highscores.time_seconds 
        FROM memory_highscores 
        JOIN users ON memory_highscores.user_id = users.id 
        WHERE level = :l 
        ORDER BY time_seconds ASC 
        LIMIT 3", ['l' => $lvl])->fetchAll();
}

$pageTitle = "Atmiņas spēle";
$cssFile = "memory.css";
require "views/cards/cards.view.php";