<?php
include_once("../../includes/db.inc.php");
include_once("../../includes/vars.inc.php");
$locId = $_POST['id'];
$q = "SELECT * FROM locations WHERE location_id = '$locId'";
$r = mysqli_query($conn, $q);
$location = mysqli_fetch_assoc($r);

session_start();
$accId = $_SESSION['uid'];
$q = "SELECT * FROM games WHERE account_id = '$accId'";
$r = mysqli_query($conn, $q);
$game = mysqli_fetch_assoc($r);
?>
    <h2><?php echo $location['name']?></h2>
    <p><?php echo $location['description']?></p>
    <div class="grid-2 center">
<?php
if($location['location_id'] == $game['location']) {
    if($location['search_id']){ 
?>
        <button onclick="locationActionSelect(<?php echo $location['search_id'];?>, <?php echo SEARCH;?>)">Search</button>
<?php
    }
    if($location['shop_id'] != null) {
?>
        <button onclick="locationActionSelect(<?php echo $location['shop_id'];?>, <?php echo SHOP;?>)">Shop</button>
<?php
    }
    if($location['rest_id'] != null) {
?>
        <button onclick="locationActionSelect(<?php echo $location['rest_id'];?>, <?php echo REST;?>)">Rest</button>
<?php
    }
} else {
?>
        <button class="grid-item-full" onclick="locationActionSelect(<?php echo $location['location_id'];?>, <?php echo TRAVEL;?>)">Travel Here</button>
<?php
}
mysqli_close($conn);
?>