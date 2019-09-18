<?php
include_once("../../includes/db.inc.php");
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
<?php
if($location['location_id'] == $game['location']) {
    if($location['search_id']){ 
?>
    <button>Search</button>
<?php
    }
    if($location['shop_id'] != null) {
?>
    <button>Shop</button>
<?php
    }
    if($location['rest_id'] != null) {
?>
    <button>Rest</button>
<?php
    }
} else {
?>
    <button>Travel Here</button>
<?php
}
mysqli_close();
?>