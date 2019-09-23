<?php
include("includes/db.inc.php");
session_start();
$uid = $_SESSION['uid'];
$q = "SELECT * FROM games WHERE account_id = '$uid'";
$r = mysqli_query($conn, $q);
$game = mysqli_fetch_assoc($r);
$locId = $game['location'];
$q = "SELECT * FROM search_table WHERE search_id = (SELECT search_id FROM locations WHERE location_id = '$locId')";
$r = mysqli_query($conn, $q);
$searchInfo = mysqli_fetch_assoc($r) 
?>
<div>Search component retrieved!</div>
<button onclick="backToMain()">Back</button>