<?php
header('Content-Type: application/json');
include 'connect.php';

$sql = "SELECT u.username, t.level, t.wpm 
        FROM typing_highscores t 
        JOIN users u ON t.user_id=u.id";
$result = $conn->query($sql);

$scores = [];
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $scores[] = $row;
    }
}
echo json_encode($scores);
