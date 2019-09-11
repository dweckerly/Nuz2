<?php

function generateMons($id, $lvl) {
    include_once("../includes/db.inc.php");
    $q = "SELECT * FROM mons where mon_id = '$id'";
    $res = mysqli_query($conn, $res);
    $monArr = mysqli_fetch_assoc($res);
}