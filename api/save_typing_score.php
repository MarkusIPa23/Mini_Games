<?php
include 'connect.php';

$user_id = $_POST['user_id'];
$level = $_POST['level'];
$wpm = $_POST['wpm'];
$time_seconds = $_POST['time_seconds'];

// Check if user has a score for this level
$sql_check = "SELECT * FROM typing_highscores WHERE user_id=$user_id AND level='$level' ORDER BY wpm DESC LIMIT 1";
$res = $conn->query($sql_check);

if($res->num_rows > 0){
    $row = $res->fetch_assoc();
    if($wpm > $row['wpm']){
        // New best, update
        $sql_update = "UPDATE typing_highscores SET wpm=$wpm, time_seconds=$time_seconds, created_at=NOW() WHERE id=".$row['id'];
        $conn->query($sql_update);
        $message = "New personal best!";
    } else {
        $message = "Score saved, but not better than your best";
    }
} else {
    // No previous score
    $sql_insert = "INSERT INTO typing_highscores (user_id, level, wpm, time_seconds) VALUES ($user_id,'$level',$wpm,$time_seconds)";
    $conn->query($sql_insert);
    $message = "Score saved!";
}

echo json_encode(["status"=>"success","message"=>$message]);
$conn->close();
?>
