<?php
include "connect.php";

$user_id = $_GET["user_id"] ?? null;
if (!$user_id) {
    echo json_encode(["status" => "error", "message" => "No user_id"]);
    exit;
}

$user_id = (int)$user_id;

$sql = "SELECT level, time_seconds, created_at FROM memory_highscores WHERE user_id = ? ORDER BY FIELD(level, 'easy', 'medium', 'hard')";
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