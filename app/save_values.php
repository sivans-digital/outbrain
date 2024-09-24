<?php

if (isset($_POST['form_data'])) {

    $form_valid = true;
    $team = null;
    $full_name = null;
    $gender = null;
    $place = null;
    $good_at = null;
    $like_go = null;
    $hobby = null;
    $about = null;
    $game_often = null;
    $advertising = null;
    $company_name = null;

    // GUID
    if (isset($_POST['form_data']['team'])) {
        $team = $_POST['form_data']['team'];
        $team = htmlentities($team);
        $team = trim($team);

        // echo 'team: ' . $team;
        // echo '<br>';
    } else {
        $form_valid = false;
    }

    if ($form_valid) {

        require  __DIR__ . '/db_config.php';

        $sql = "INSERT INTO ws_bids (token, full_name, email, tel, company_id, destination, departure, arrival, total_days, total_price) VALUES (:token,:fname,:email,:tel,:company_id,:destination,:departure,:arrival,:total_days,:total_price)";
        $query = $db->prepare($sql);

        try {
            $result = $query->execute([':token' => $guid, ':fname' => $name, ':email' => $email, ':tel' => $tel, ':company_id' => $company_id, ':destination' => $region, ':departure' => $date_from, ':arrival' => $date_to, ':total_days' => $total_days, ':total_price' => $total_price]);

            if ($result) {
                
            }
        } catch (PDOException $e) {
            die("Error store 'form data' values on DB (Step 1): " . $e->getMessage());
        }
    } else {
        header('location: ');
    }
}
