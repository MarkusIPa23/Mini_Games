<?php
// routes.php pamatmapē
return [
    "/" => "controllers/index.php",          // Galvenā lapa (Mainpage)
    "/cards" => "controllers/cards/cards.php", // Atmiņas spēle [cite: 1]
    "/typing" => "controllers/typing/typing.php", // Rakstīšanas spēle [cite: 8]
    "/leaderboard" => "controllers/leaderboard.php", // Kopējais tops [cite: 19]
    "/login" => "controllers/login.php",
    "/register" => "controllers/register.php",
    "/logout" => "controllers/logout.php"
];