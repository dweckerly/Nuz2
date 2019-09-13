<?php

// get location information
$locId = $gameArr['location'];
$q = "SELECT * FROM locations WHERE location_id = '$locId'";
$r = mysqli_query($conn, $q);
$currentLocation = mysqli_fetch_assoc($r);

// get area info
$areaId = $currentLocation['area_id'];
$q = "SELECT * FROM areas WHERE area_id = '$areaId'";
$r = mysqli_query($conn, $q);
$areaInfo = mysqli_fetch_assoc($r);

// get all locations in area
$q = "SELECT * FROM locations WHERE area_id = '$areaId'";
$r = mysqli_query($conn, $q);
$locations = mysqli_fetch_assoc($r);
?>

<div>
    <h2><?php echo $areaInfo['name'];?></h2>
</div>
<div>
    <ul>
<?php
foreach($locations as $loc){
    if($currentLocation['location_id'] == $loc['location_id']) {
    ?>
        <li>Current: <?php echo $loc['name'];?></li>
    <?php
    } else {
    ?>
        <li><?php echo $loc['name'];?></li>
    <?php
    }
}
?> 
    </ul>
</div>

