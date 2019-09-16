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
?>
<div>
    <h2><?php echo $areaInfo['name'];?></h2>
</div>
<div>
    <ul>
<?php
while($row = mysqli_fetch_assoc($r)) {
    if($currentLocation['location_id'] == $row['location_id']) {
    ?>
        <li>Current: <?php echo $row['name'];?></li>
    <?php
    } else {
    ?>
        <li><?php echo $row['name'];?></li>
    <?php
    }
}
?> 
    </ul>
</div>

