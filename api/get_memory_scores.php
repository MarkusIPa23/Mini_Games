<?php
header("Content-Type: application/json");
include "connect.php";

$level = $_GET['level'] ?? null;

if (!$level) {
    echo json_encode([]);
    exit;
}

$sql = "
SELECT u.username, m.time_seconds, m.created_at
FROM memory_highscores m
JOIN users u ON u.id = m.user_id
WHERE m.level = ?
ORDER BY m.time_seconds ASC
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