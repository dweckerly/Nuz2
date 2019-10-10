<?php
session_start();
if(isset($_GET['id'])) {
    $moveId = $_GET['id'];
    $playerMon = $_SESSION['currentPlayerMon'];
    $moves = explode('_', $playerMon['moves']);
    $valid = false;
    foreach($moves as $move) {
        if($move == $moveId) {
            $valid = true;
        }
    }
    if($valid) {
        // get player move info
        include('../../../includes/db.inc.php');
        $q = "SELECT * FROM moves WHERE move_id = '$moveId'";
        $r = mysqli_query($conn, $q);
        $playerMoveInfo = mysqli_fetch_assoc($r);
        // get opponent move info
        $opponentMon = $_SESSION['opponent'];
        $oMonMoveStr = $opponentMon['moves'];
        $oMonMoveArr = explode('_', $oMonMoveStr);
        $oMonMoveIndex = rand(0, count($oMonMoveArr) - 1);
        $oMonMoveId = $oMonMoveArr[$oMonMoveIndex];
        $q = "SELECT * FROM moves where move_id = '$oMonMoveId'";
        $r = mysqli_query($conn, $q);
        $opponentMoveInfo = mysqli_fetch_assoc($r);
        // calculate battle stuff
        include('../../../util/battle.util.php');
        echo simpleAttackHandler($playerMon, $playerMoveInfo, $opponentMon, $opponentMoveInfo);
    }
}