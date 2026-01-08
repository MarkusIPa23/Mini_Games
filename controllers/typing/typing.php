<?php
if (!isset($_SESSION['user_id'])) {
    header("Location: /login");
    exit();
}
$pageTitle = "Rakstīšana";
$cssFile = "typing.css";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $userId = $_SESSION['user_id'];
    $level = $_POST['level'];
    
    // PIEVIENO ŠO RINDIŅU:
    $language = $_POST['language'] ?? 'lv'; 
    
    $wpm = (float)$_POST['wpm'];
    $time = (int)$_POST['time_seconds'];

    // Tagad $language būs vērtība, un SQL vairs nebūs (null)
    $db->query("INSERT INTO typing_history (user_id, level, language, wpm, time_seconds) VALUES (:u, :l, :lang, :w, :t)", 
              ['u' => $userId, 'l' => $level, 'lang' => $language, 'w' => $wpm, 't' => $time]);

    $db->query("INSERT INTO typing_highscores (user_id, level, language, wpm, time_seconds) 
                VALUES (:u, :l, :lang, :w, :t) 
                ON DUPLICATE KEY UPDATE wpm = GREATEST(wpm, :w), time_seconds = :t", 
                ['u' => $userId, 'l' => $level, 'lang' => $language, 'w' => $wpm, 't' => $time]);

    echo json_encode(["status" => "success"]);
    exit;
}


// Top 3 atlase (pievienojam valodas kolonnu)
$levels = ['easy', 'medium', 'hard', 'hardcore'];
$topScores = [];
foreach ($levels as $lvl) {
    $topScores[$lvl] = $db->query("
        SELECT users.username, typing_highscores.wpm, typing_highscores.language 
        FROM typing_highscores 
        JOIN users ON typing_highscores.user_id = users.id 
        WHERE level = :l 
        ORDER BY wpm DESC LIMIT 3", ['l' => $lvl])->fetchAll();
}

$pageTitle = "Rakstīšanas tests";
$cssFile = "typing.css";
require "views/typing/typing.view.php";