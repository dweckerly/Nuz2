<?php
include_once('../../includes/db.php');
$id = $_POST['id'];
$locId = $_POST['locId'];
$sql = "SELECT * FROM wildPools WHERE id = '$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$chance = rand(1, 100);
if($chance <= $row['mon1Chance']) {
    $monId = $row['mon1'];
} else if($chance <= $row['mon2Chance']) {
    $monId = $row['mon2'];
} else if ($chance <= $row['mon3Chance']) {
    $monId = $row['mon3'];
} else if ($chance <= $row['mon4Chance']) {
    $monId = $row['mon4'];
} else if ($chance <= $row['mon5Chance']) {
    $monId = $row['mon5'];
}

$sql = "SELECT * FROM mons WHERE id = '$monId'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
?>
<div id="wildMon-container" align="center">
    <div class="card text-center" style="width: 18rem;">
        <img id="mon-img" class="card-img-top mon-img-anim-<?php echo $row['anim']; ?>" src="img/mons/<?php echo $row['img']; ?>">
        <div class="card-body">
            <h5 class="card-title">You found a wild <?php echo $row['name']; ?>!</h5>
<?php
session_start();
$uid = $_SESSION['uid'];
$sql = "SELECT alive FROM ownedMons WHERE uid = '$uid' AND alive = 1";
$q = mysqli_query($conn, $sql);
if(mysqli_num_rows($q) > 0) {
?>
            <button class="btn btn-outline-secondary wild-btn" id="fight-btn" data="<?php echo $monId; ?>">Fight</button>
<?php
} else {
?>
            <button class="btn btn-outline-secondary wild-btn" id="coerce-btn" data="<?php echo $monId; ?>">Coerce</button>
<?php
}
?>
            <button class="btn btn-outline-secondary wild-btn" id="again-btn" data="<?php echo $id; ?>">Look Again</button>
            <button class="btn btn-outline-secondary wild-btn" id="back-btn" data="<?php echo $locId; ?>">Back</button>
        </div>
    </div>
    <script src="components/wildMon/wild.js"></script>
</div>
