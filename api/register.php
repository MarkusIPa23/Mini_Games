<?php
include 'connect.php';

$username = $_POST['username'];
$password = $_POST['password'];
$hashed = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed')";
if($conn->query($sql)===TRUE){
    $user_id = $conn->insert_id;
    $_SESSION['user_id']=$user_id;
    $_SESSION['username']=$username;
    echo json_encode(["status"=>"success","message"=>"User registered and logged in!","user_id"=>$user_id,"username"=>$username]);
} else {
    echo json_encode(["status"=>"error","message"=>$conn->error]);
}
$conn->close();
?>
