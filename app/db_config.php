<?php 

// PRODUCTION
// define('DB_CONFIG', 'mysql:host=localhost;dbname=safe4younewsite;charset=utf8mb4');  // registration_form DB in productions site // ferrari_registration DB in local
// define('DB_USER', 'safe4younewsite');
// define('DB_PASSWORD', 'Rcm8YSZADJbJdMm');

// STAGING
// define('DB_CONFIG1', 'mysql:host=localhost;dbname=safe4younewsite;charset=utf8mb4');  // registration_form DB in productions site // ferrari_registration DB in local
// define('DB_USER1', 'safe4younewsite');
// define('DB_PASSWORD1', 'Rcm8YSZADJbJdMm');

// LOCAL
define('DB_CONFIG', 'mysql:host=devkinsta_db;dbname=outbrain_gaming;charset=utf8mb4');  // registration_form DB in productions site // ferrari_registration DB in local
define('DB_USER', 'root');
define('DB_PASSWORD', 'Dp0dvXYNYvenpMxG');

try {
    $db = new PDO(DB_CONFIG, DB_USER, DB_PASSWORD);
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}