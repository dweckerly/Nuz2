<?php
// verifies client-side request is in line with stored data
if(isset($_POST['id']) && isset($_POST['action'])) {
    session_start();
    if(isset($_SESSION['uid']) && $_SESSION['login']) {
        include('../../includes/db.inc.php');
        $uid = $_SESSION['uid'];
        $q = "SELECT location FROM games WHERE account_id = '$uid'";
        $r = mysqli_query($conn, $q);
        $savedLoc = mysqli_fetch_assoc($r);
        $action = $_POST['action'];
        if($action == 'travel') {
            $q = "SELECT * FROM locations WHERE location_id = '$savedLoc'";
            $r = mysqli_query($conn, $q);
            $currentLoc = mysqli_fetch_assoc($r);
            $newId = $_POST['id'];
            $q = "SELECT * FROM locations WHERE location_id = '$newId'";
            $r = mysqli_query($conn, $q);
            $newLoc = mysqli_fetch_assoc($r);
            if($currentLoc['area_id'] == $newLoc['area_id']) {
                // update game table and send player to new location
            }
        } else if ($action == 'connection') {

        } else {

        }
    }
}