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
<script>
    var locations = [
<?php
while($row = mysqli_fetch_assoc($r)) {
    if($currentLocation['location_id'] == $row['location_id']) {

    ?>
        {
            "id" : <?php echo $row['location_id'];?>,
            "name" : "<?php echo $row['name'];?>",
            "desc" : "<?php echo $row['description'];?>",
            "x" : <?php echo $row['x'];?>,
            "y" : <?php echo $row['y'];?>,
            "current" : true
        },
    <?php
    } else {
    ?>
        {
            "id" : <?php echo $row['location_id'];?>,
            "name" : "<?php echo $row['name'];?>",
            "desc" : "<?php echo $row['description'];?>",
            "x" : <?php echo $row['x'];?>,
            "y" : <?php echo $row['y'];?>,
            "current" : false
        },
    <?php
    }
}
?> 
    ]
</script>
<div>
    <h2><?php echo $areaInfo['name'];?></h2>
    <p><?php echo $areaInfo['description'];?></p>
    <canvas id="main-canvas"></canvas>
</div>
<div id="location-container">
<?php
$_POST['id'] = $currentLocation['location_id'];
include("components/location/location.php");
?>
</div>
<div class="hidden">
    <img id="area-map" src="img/areas/<?php echo $areaNameTrim;?>.png">
    <img id="player-pointer" src="img/point.png">
</div>
<script src="components/map/map.js"></script>

