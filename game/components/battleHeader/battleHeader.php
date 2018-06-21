<?php
include_once("../../includes/db.php");
$id = $_POST['id'];
$type = $_POST['type'];
$locId = $_POST['locId'];
if($type == 'wild') {
    $sql = "SELECT * FROM mons WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);

} else if($type == 'trainer') {

}