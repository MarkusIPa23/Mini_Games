<?php
if (!isset($_SESSION['user_id'])) {
    header("Location: /login");
    exit();
}

$pageTitle = "Ātrrakstīšana";
$cssFile = "typing.css";

require "views/typing/typing.view.php";