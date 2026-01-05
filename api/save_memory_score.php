<?php
include "connect.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
    exit;
}

if (!$data || !isset($data["level"]) || !isset($data["time_seconds"])) {
    echo json_encode(["status" => "error", "message" => "Invalid data"]);
    exit;
}

$user_id = $_SESSION["user_id"];
$level = $data["level"];
$time = (int)$data["time_seconds"];

$sql = "
INSERT INTO memory_highscores (user_id, level, time_seconds)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE
time_seconds = LEAST(time_seconds, VALUES(time_seconds))
";

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
