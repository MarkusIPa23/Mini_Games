<?php
include "connect.php";

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
    exit;
}

$user_id = $_SESSION["user_id"];

$sql = "SELECT level, wpm, time_seconds, created_at FROM typing_highscores WHERE user_id = ? ORDER BY FIELD(level, 'easy', 'medium', 'hard', 'hardcore')";
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