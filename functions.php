<?php

function dd($data){
    echo"<pre>";
    var_dump($data);
    echo"</pre>";
    die();//kill  codoo
}

function abort($code = 404) {
    http_response_code($code); // Iestatām servera atbildi (404, 403, utt.)
    
    // Pārbaudām, vai mums ir skats šai kļūdai
    if (file_exists("views/{$code}.view.php")) {
        require "views/{$code}.view.php";
    } else {
        echo "Kļūda $code. Lapa netika atrasta.";
    }
    
    die(); // Apturam tālāku koda izpildi
}

function authorize($condition) {
    if (!$condition) {
        // Ja lietotājs nav ielogojies, sūtām uz login lapu
        header("Location: /login");
        exit();
    }
}