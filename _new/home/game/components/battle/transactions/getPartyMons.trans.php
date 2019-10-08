<?php
session_start();
include("../../../includes/db.inc.php");
$uid = $_SESSION['uid'];
$q = "SELECT * FROM owned_mons WHERE account_id = '$uid' ORDER BY party_order";
$r = mysqli_query($conn, $q);
$mons = array();
while($row = mysqli_fetch_assoc($r)) {
    $mons[] = $row;
}
$_SESSION['playerMons'] = $mons;
echo json_encode($mons);