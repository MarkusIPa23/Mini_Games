<?php
include "connect.php";

$user_id = $_GET["user_id"] ?? null;
if (!$user_id) {
    echo json_encode(["status" => "error", "message" => "No user_id"]);
    exit;
}

$user_id = (int)$user_id;

$sql = "SELECT u.username, t.level, t.wpm, t.time_seconds, t.created_at FROM typing_highscores t JOIN users u ON u.id = t.user_id WHERE t.user_id = ? ORDER BY FIELD(t.level, 'easy', 'medium', 'hard', 'hardcore')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$scores = [];
while ($row = $result->fetch_assoc()) {
    $scores[] = $row;
}

echo json_encode(["status" => "success", "scores" => $scores]);
?>