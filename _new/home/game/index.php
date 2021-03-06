<?php
session_start();
unset($_SESSION['encounter']); 
include('includes/header.php');
if(isset($_SESSION['login']) && $_SESSION['login'] && isset($_SESSION['uid'])) {
    include_once('includes/db.inc.php');
    $uid = $_SESSION['uid'];
    $q = "SELECT * FROM games WHERE account_id = '$uid'";
    $result = mysqli_query($conn, $q);
    $resultCheck = mysqli_num_rows($result);
    if($resultCheck != 1) {
        // no game found
        mysqli_close($conn);
        header("Location: ../index.php");
        exit();
    } else {
        $gameArr = mysqli_fetch_assoc($result);
        if($gameArr['flag0'] == 0) {
            // initiate first mon pick
            include("includes/vars.inc.php");
            include("components/firstMon/firstMon.php");
        } else {
            include("components/menu/menu.php");
            $_GET['loc_id'] = $gameArr['location'];
            include("components/map/map.php");
            include("components/location/location.php");
        }
    }
} else {
    // not logged in
    mysqli_close($conn);
    header("Location: ../index.php");
    exit();
}
include('includes/footer.php');