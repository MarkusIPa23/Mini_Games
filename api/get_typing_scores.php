<?php
header("Content-Type: application/json");
include "connect.php";

$level = $_GET['level'] ?? null;

if (!$level) {
    echo json_encode([]);
    exit;
}

$sql = "
SELECT u.username, t.wpm, t.time_seconds, t.created_at
FROM typing_highscores t
JOIN users u ON u.id = t.user_id
WHERE t.level = ?
ORDER BY t.wpm DESC
LIMIT 10
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $level);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>