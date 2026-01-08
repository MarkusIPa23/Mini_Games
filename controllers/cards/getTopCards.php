<?php
session_start(); // Ja nepieciešams pārbaudīt sesiju
require_once "../../Database.php"; // Pielāgo ceļu līdz savai Database klasei
$config = require "../../config.php"; // Pielāgo ceļu līdz config
$db = new Database($config);

header('Content-Type: application/json');

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

echo json_encode($topScores);
exit;