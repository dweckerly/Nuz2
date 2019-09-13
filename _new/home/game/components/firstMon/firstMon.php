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
<div>
    <p>Welcome! Choose a NuzMon to be the first ever member of your team.</p>
</div>
<div>
<?php
foreach($mons as $mon) {
?>
    <div>
        <div>
            <img src="img/mons/<?php echo $mon['mon_name'];?>.png" class="mon-img-anim-<?php echo $mon['animation'];?>">
        </div>
        <div>
            <h3><?php echo $mon['mon_name'];?></h3>
            <p><?php echo $mon['description'];?></p>
        </div>
    </div>
<?php
}
?>
</div>