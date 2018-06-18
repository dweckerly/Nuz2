<?php
include_once('../../includes/db.php');
$sql = "SELECT * FROM locations";
$results = mysqli_query($conn, $sql);
?>
<div id="map-div">
<?php
$i = 1;
$j = 1;
?>
    <div id="map-row-<?php echo $j; ?>" class="row">
<?php
while($row = mysqli_fetch_assoc($results)) {
?>
        <div id="map-<?php echo $j; ?>-<?php echo $i; ?>" class="col-4 map-item" align="center">
            <button data="<?php echo $i; ?>" class="map-btn"><?php echo $row['name']; ?></button>
        </div>
<?php
    if($i % 3 == 0){
        $j++;
?>
    </div>
    <div id="map-row-<?php echo $j; ?>" class="row">
<?php
    }
    $i++;
}
?>
    </div>
    <script type="text/javascript" src="components/map/map.js"></script>
</div>
