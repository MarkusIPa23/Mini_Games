<?php
header('Content-Type: application/json');
include 'connect.php';

$sql = "SELECT u.username, m.level, m.time_seconds 
        FROM memory_highscores m 
        JOIN users u ON m.user_id=u.id";
$result = $conn->query($sql);

$scores = [];
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $scores[] = $row;
    }
}
echo json_encode($scores);
