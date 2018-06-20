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
<div id="wildMon-container">
    <div class="card text-center" style="width: 18rem;">
        <img class="card-img-top" src="img/mons/<?php echo $row['imgPath']; ?>">
        <div class="card-body">
            <h5 class="card-title">You found a wild <?php echo $row['name']; ?>!</h5>
            <button class="btn btn-outline-secondary" id="catch-btn" data="<?php echo $monId; ?>">Catch it!</button>
            <button class="btn btn-outline-secondary" id="again-btn" data="<?php echo $id; ?>">Look Again</button>
            <button class="btn btn-outline-secondary" id="back-btn" data="<?php echo $locId; ?>">Back</button>
        </div>
    </div>
</div>
<script src="components/wildMon/wild.js"></script>