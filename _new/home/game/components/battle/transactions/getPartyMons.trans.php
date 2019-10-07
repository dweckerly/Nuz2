<?php
session_start();
include("../../../includes/db.inc.php");
$uid = $_SESSION['uid'];
$q = "SELECT * FROM owned_mons WHERE account_id = '$uid' ORDER BY party_order";
$r = mysqli_query($conn, $q);
$mons = array();
while($row = mysqli_fetch_assoc($r)) {
    $mons[] = array(
        'mon_name' => $row['nick_name'],
        'img' => $row['img'],
        'type_1' => $row['type_1'],
        'type_2' => $row['type_2'],
        'hp' => $row['hp'],
        'atk' => $row['atk'],
        'def' => $row['def'],
        'e_atk' => $row['e_atk'],
        'e_def' => $row['e_def'],
        'speed' => $row['speed'],
        'moves' => $row['moves'],
        'ability' => $row['ability'],
        'current_hp' => $row['current_hp'],
        'status' => $row['status'],
        'lvl' => $row['lvl'],
        'xp' => $row['xp']
    );
}
$_SESSION['playerMons'] = $mons;
echo json_encode($mons);