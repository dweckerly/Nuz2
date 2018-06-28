<?php
$pMons = $_POST['pMons'];
$count = $_POST['count'];
include_once('../../includes/db.php');
for($i = 1; $i <= $count; $i++) {
    $id = $pMons[$i]['id'];
    $cHp = $pMons[$i]['currentHp'];
    $status = $pMons[$i]['status'];
    $alive = $pMons[$i]['alive'];
    if(empty($status)) {
        $sql = "UPDATE ownedMons SET currentHp='$cHp', status=NULL, alive='$alive' WHERE id='$id'";
    } else {
        $sql = "UPDATE ownedMons SET currentHp='$cHp', status='$status', alive='$alive' WHERE id='$id'";
    }
    mysqli_query($conn, $sql);
}