<?php
session_start();
$uid = $_SESSION['uid'];
include_once("../../includes/db.php");
$wm = $_POST['wildMon'];
$sql = "SELECT * FROM ownedMons WHERE uid = '$uid' AND inParty != 0";
$query = mysqli_query($conn, $sql);
$party = 1;
while($row = mysqli_fetch_assoc($query)) {
    if($row['inParty'] > $party) {
        $party = $row['inParty'];
    }
}
$party++;
if($party > 6) {
    $party = 0;
    echo $wm['name'] . " was sent to the Ranch.";
} else {
    echo $wm['name'] . " joined your party!";
}

$id = $wm['id'];
$name = $wm['name'];
$img = $wm['img'];
$t1 = $wm['type1'];
$t2 = $wm['type2'];
$maxHp = $wm['maxHp'];
$cHp = $wm['currentHp'];
$atk = $wm['atk'];
$def = $wm['def'];
$sAtk = $wm['sAtk'];
$sDef = $wm['sDef'];
$spd = $wm['speed'];
$status = $wm['status'];
$m1 = $wm['moves']['1']['id'];
$m2 = $wm['moves']['2']['id'];
$pot = $wm['potential'];



$sql = "INSERT INTO ownedMons (uid, mid, name, img, type1, type2, maxHp, currentHp, atk, def, sAtk, sDef, speed, status, move1, move2, inParty, potential) 
VALUES ('$uid', '$id', '$name', '$img', '$t1', '$t2', '$maxHp', '$cHp', '$atk', '$def', '$sAtk', '$sDef', '$spd', '$status', '$m1', '$m2', '$party', '$pot')";

mysqli_query($conn, $sql);