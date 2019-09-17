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
$areaNameTrim = strtolower(str_replace(' ', '', $areaInfo['name']));
?>
<div>
    <h2><?php echo $areaInfo['name'];?></h2>
    <p><?php echo $areaInfo['description'];?></p>
    <canvas id="main-canvas"></canvas>
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
<p style="position:absolute; top: 100px; left: 100px;">Test</p>
<img id="area-map" class="hidden" src="img/areas/<?php echo $areaNameTrim;?>.png">
<script src="components/map/map.js"></script>

