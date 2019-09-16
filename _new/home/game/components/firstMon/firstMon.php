<?php

$monId0 = FIRSTMONS[0];
$monId1 = FIRSTMONS[1];
$monId2 = FIRSTMONS[2];

$q = "SELECT * FROM mons WHERE mon_id = '$monId0'";
$r = mysqli_query($conn, $q);
$mon0 = mysqli_fetch_assoc($r);

$q = "SELECT * FROM mons WHERE mon_id = '$monId1'";
$r = mysqli_query($conn, $q);
$mon1 = mysqli_fetch_assoc($r);

$q = "SELECT * FROM mons WHERE mon_id = '$monId2'";
$r = mysqli_query($conn, $q);
$mon2 = mysqli_fetch_assoc($r);

$mons = array($mon0, $mon1, $mon2);

?>
<div class="center-text">
    <p>Welcome! Choose a NuzMon to be the first ever member of your team.</p>
</div>
<div class="grid-3 center-text">
<?php
foreach($mons as $mon) {
?>
    <div class="grid-item-first">
        <img src="img/mons/<?php echo $mon['mon_name'];?>.png" class="mon-img-anim-<?php echo $mon['animation'];?> first-mon-img" id="img-<?php echo $mon['mon_id'];?>">
    </div>
    <div class="grid-item-full hidden" id="desc-<?php echo $mon['mon_id'];?>">
        <h2 class="prop-name"><?php echo $mon['mon_name'];?></h2>
        <p><?php echo $mon['description'];?></p>
        <button id="btn-<?php echo $mon['mon_id'];?>">Choose <?php echo $mon['mon_name'];?></button>
    </div>
<?php
}
?>
</div>
<script src="components/firstMon/firstMon.js"></script>