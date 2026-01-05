<?php
include "connect.php";

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
    exit;
}

if (!isset($_POST["level"]) || !isset($_POST["wpm"]) || !isset($_POST["time_seconds"])) {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
    exit;
}

$user_id = $_SESSION["user_id"];
$level = $_POST["level"];
$wpm = (float)$_POST["wpm"];
$time = (int)$_POST["time_seconds"];

$sql = "
INSERT INTO typing_highscores (user_id, level, wpm, time_seconds)
VALUES (?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
wpm = GREATEST(wpm, VALUES(wpm)),
time_seconds = CASE WHEN VALUES(wpm) > wpm THEN VALUES(time_seconds) ELSE time_seconds END
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("isdi", $user_id, $level, $wpm, $time);
if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Execute failed: " . $stmt->error]);
    exit;
}

echo json_encode(["status" => "success"]);
