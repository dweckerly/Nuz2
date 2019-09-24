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
        $action = strtolower($_POST['action']);
        $newId = $_POST['id'];
        if($action == 'travel') {
            $q = "SELECT * FROM locations WHERE location_id = '$savedLoc'";
            $r = mysqli_query($conn, $q);
            $currentLoc = mysqli_fetch_assoc($r);
            $q = "SELECT * FROM locations WHERE location_id = '$newId'";
            $r = mysqli_query($conn, $q);
            $newLoc = mysqli_fetch_assoc($r);
            // check for if location is in same area
            // if so this is a valid travel
            if($currentLoc['area_id'] == $newLoc['area_id']) {
                // check for random encounter
                $aId = $newLoc['area_id'];
                $q = "SELECT encounter_rate FROM areas WHERE area_id = '$aId'";
                $r = mysqli_query($conn, $q);
                $eRate = mysqli_fetch_assoc($r);
                $rand = mt_rand(1, 100);
                if($rand < $eRate) {
                    // do random encounter
                    // store travel destination
                    $_SESSION['destination'] = $newId;
                    
                } else {
                    // update game table and send player to new location
                    $q = "UPDATE games SET location = '$newId' WHERE account_id = '$uid'";
                    $r = mysqli_query($conn, $q);
                    include("../../components/menu/menu.php");
                    $_POST['loc_id'] = $newId;
                    include("../../components/map/map.php");
                    include("../../components/location/location.php");
                }
            }
        } else if ($action == 'connection') {
            $q = "SELECT area_id FROM locations WHERE location_id = '$savedLoc'";
            $r = mysqli_query($conn, $q);
            $areaId = mysqli_fetch_assoc($r);
            $q = "SELECT * FROM areas WHERE area_id = '$areaId'";
            $r = mysqli_query($conn, $q);
            $currentArea = mysqli_fetch_assoc($r);
            if($currentArea['north_connection'] == $newId) {

            } elseif($currentArea['east_connection'] == $newId) {

            } elseif($currentArea['south_connection'] == $newId) {

            } elseif($currentArea['west_connection'] == $newId) {

            }
        } else {
            $param = $action . '_id';
            $q = "SELECT * FROM locations WHERE " . $param . " = '$newId'";
            $r = mysqli_query($conn, $q);
            if(mysqli_num_rows($r) > 0) {
                $table = $action . '_table';
                $q = "SELECT * FROM " . $table. " WHERE " . $param . " = '$newId'";
                $r = mysqli_query($conn, $q);
                $actionInfo = mysqli_fetch_assoc($r);
                include("../../components/" . $action . "/" . $action . ".php");
            } else {
                echo "no data found! " . $newId;
            }
        }
    }
}