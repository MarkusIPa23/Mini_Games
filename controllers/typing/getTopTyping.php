<?php
// controllers/typing/getTopTyping.php
require "../../Database.php"; // Pielāgo ceļu līdz savai DB klasei
$config = require "../../config.php";
$db = new Database($config);

header('Content-Type: application/json');

$levels = ['easy', 'medium', 'hard', 'hardcore'];
$topScores = [];

foreach ($levels as $lvl) {
    $topScores[$lvl] = $db->query("
        SELECT 
    users.username, 
    typing_highscores.wpm,
    typing_highscores.language
FROM typing_highscores 
JOIN users ON typing_highscores.user_id = users.id 
WHERE level = :l 
ORDER BY wpm DESC 
LIMIT 3");
}

echo json_encode($topScores);