<?php
$conn = mysqli_connect("localhost", "u715052523_admin", "Db8ten?!?", "u715052523_db");

function selectAssoc($table, $row, $identifier) {
    $q = "SELECT * FROM '$table' WHERE '$row' = '$identifier'";
    $r = mysqli_query($conn, $q);
    return mysqli_fetch_assoc($r);
}