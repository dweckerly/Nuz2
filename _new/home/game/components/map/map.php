<?php

// get location information
$locId = $gameArr['location'];
$q = "SELECT * FROM locations WHERE location_id = '$locId'";
$r = mysqli_query($conn, $q);
$locationInfo = mysqli_fetch_assoc($r);

// get area info
$areaId = $locationInfo['area_id'];
$q = "SELECT * FROM areas WHERE area_id = '$areaId'";
$r = mysqli_query($conn, $q);
$areaInfo = mysqli_fetch_assoc($r);

echo $locationInfo['name'] . " " . $areaInfo['name'];

