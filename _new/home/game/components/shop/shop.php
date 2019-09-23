<?php
include("includes/db.inc.php");
session_start();
$uid = $_SESSION['uid'];
$q = "SELECT * FROM games WHERE account_id = '$uid'";
$r = mysqli_query($conn, $q);
$game = mysqli_fetch_assoc($r);
$locId = $game['location'];
$q = "SELECT * FROM shop_table WHERE shop_id = (SELECT shop_id FROM locations WHERE location_id = '$locId')";
$r = mysqli_query($conn, $q);
$shopInfo = mysqli_fetch_assoc($r) 
?>
<div>Shop component retrieved!</div>
<div><?php echo $shopInfo['shop_id'] . " " . $shopInfo['items']?></div>
<button onclick="backToMain()">Back</button>