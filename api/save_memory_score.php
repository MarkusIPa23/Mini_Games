<?php
include 'connect.php';

$user_id = $_POST['user_id'];
$level = $_POST['level'];
$time_seconds = $_POST['time_seconds'];

// Check if user already has a score for this level
$sql_check = "SELECT * FROM memory_highscores WHERE user_id=$user_id AND level='$level' ORDER BY time_seconds ASC LIMIT 1";
$res = $conn->query($sql_check);

if($res->num_rows > 0){
    $row = $res->fetch_assoc();
    if($time_seconds < $row['time_seconds']){
        // New best, update
        $sql_update = "UPDATE memory_highscores SET time_seconds=$time_seconds, created_at=NOW() WHERE id=".$row['id'];
        $conn->query($sql_update);
        $message = "New personal best!";
    } else {
        $message = "Score saved, but not better than your best";
    }
} else {
    // No previous score, insert new
    $sql_insert = "INSERT INTO memory_highscores (user_id, level, time_seconds) VALUES ($user_id,'$level',$time_seconds)";
    $conn->query($sql_insert);
    $message = "Score saved!";
}

echo json_encode(["status"=>"success","message"=>$message]);
$conn->close();
?>
