<?php
include "connect.php";

if (!isset($_POST["user_id"]) || !isset($_POST["level"]) || !isset($_POST["time_seconds"])) {
    echo json_encode(["status" => "error", "message" => "Invalid data"]);
    exit;
}

$user_id = (int)$_POST["user_id"];
$level = $_POST["level"];
$time = (int)$_POST["time_seconds"];

$sql = "INSERT INTO memory_highscores (user_id, level, time_seconds) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE time_seconds = LEAST(time_seconds, VALUES(time_seconds))";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("isi", $user_id, $level, $time);
if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Execute failed: " . $stmt->error]);
    exit;
}

echo json_encode(["status" => "success"]);
?>