<?php
session_start();
include('includes/header.php');
if(isset($_SESSION['login']) && $_SESSION['login'] && isset($_SESSION['uid'])) {
    include_once('includes/db.inc.php');
    $uid = $_SESSION['uid'];
    $q = "SELECT * FROM games WHERE user_id = '$uid'";
    $result = mysqli_query($conn, $q);
    $resultCheck = mysqli_num_rows($result);
    if($resultCheck != 1) {
        // no game found
        mysqli_close($conn);
        header("Location: ../../index.php");
        exit();
    } else {
        $gameArr = mysqli_fetch_assoc($result);
        if($gameArr['flag0'] == 0) {
            // initiate first mon pick
            echo "pick first mon";
            include("includes/vars.inc.php");

            $monId0 = FIRSTMONS[0];
            $monId1 = FIRSTMONS[1];
            $monId2 = FIRSTMONS[2];

            $q = "SELECT * FROM mons WHERE mon_id = '$monId0'";
            $r = mysqli_query($conn, $q);
            $mon0 = mysqli_fetch_assoc($r);

            $q = "SELECT * FROM mons WHERE mon_id = '$monId1'";
            $r = mysqli_query($conn, $q);
            $mon1 = mysqli_fetch_assoc($r);

            $q = "SELECT * FROM mons WHERE mon_id = '$monId2'";
            $r = mysqli_query($conn, $q);
            $mon2 = mysqli_fetch_assoc($r);

            $mons = array($mon0, $mon1, $mon2);
            echo $mons[0]['mon_name'] . " " . $mons[1]['mon_name'] . " " . $mons[2]['mon_name'];
        } else {
            echo "Area:" . $gameArr['area'] . " Location:" . $gameArr['location'];
        }
    }
} else {
    // not logged in
    mysqli_close($conn);
    header("Location: ../../index.php");
    exit();
}
include('includes/footer.php');