<?php
if (!isset($_SESSION['user_id'])) {
    header("Location: /login");
    exit();
}


$pageTitle = "Sākums - Mini Games";
require "views/index.view.php";
?>