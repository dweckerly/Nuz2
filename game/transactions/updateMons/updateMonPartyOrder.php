<?php
$pMons = $_POST['pMons'];
$count = $_POST['count'];
include_once('../../includes/db.php');
for($i = 1; $i <= $count; $i++) {
    $id = $pMons[$i]['id'];
    $order = $pMons[$i]['order'];
    $sql = "UPDATE ownedMons SET inParty='$order' WHERE id='$id'";
    mysqli_query($conn, $sql);
}