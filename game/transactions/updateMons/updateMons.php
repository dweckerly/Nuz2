<?php
$pMons = $_POST['pMons'];
$count = $_POST['count'];
include_once('../../includes/db.php');
for($i = 1; $i <= $count; $i++) {
    $id = $pMons[$i]['id'];
    $cHp = $pMons[$i]['currentHp'];
    $status = $pMons[$i]['status'];
    if(empty($status)) {
        $sql = "UPDATE ownedMons SET currentHp='$cHp', status=NULL WHERE id='$id'";
    } else {
        $sql = "UPDATE ownedMons SET currentHp='$cHp', status='$status' WHERE id='$id'";
    }
    mysqli_query($conn, $sql);
}