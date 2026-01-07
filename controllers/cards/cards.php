<?php
if (!isset($_SESSION['user_id'])) {
    header("Location: /login");
    exit();
}
$pageTitle = "Kārtis";
$cssFile = "memory.css";

require "views/cards/cards.view.php";