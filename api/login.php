<?php
include 'connect.php';

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username='$username'";
$res = $conn->query($sql);

if($res->num_rows>0){
    $user = $res->fetch_assoc();
    if(password_verify($password,$user['password'])){
        $_SESSION['user_id']=$user['id'];
        $_SESSION['username']=$user['username'];
        echo json_encode(["status"=>"success","message"=>"Login successful","user_id"=>$user['id'],"username"=>$user['username']]);
    } else {
        echo json_encode(["status"=>"error","message"=>"Wrong password"]);
    }
} else {
    echo json_encode(["status"=>"error","message"=>"User not found"]);
}
$conn->close();
?>
