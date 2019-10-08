<?php
session_start();
if(isset($_GET['ind']) && isset($_SESSION['playerMons'])) {
    $ind = $_GET['ind'];
    $mon = $_SESSION['playerMons'][$ind];
    $moves = $mon['moves'];
    $moveList = explode('_', $moves);
    include("../../../includes/db.inc.php");
    $returnMoves = array();
    foreach($moveList as $move) {
        $q = "SELECT * FROM moves WHERE move_id = '$move'";
        $r = mysqli_query($conn, $q);
        $moveDetails = mysqli_fetch_assoc($r);
        $returnMoves[] = $moveDetails;
    }
    echo json_encode($returnMoves);
}