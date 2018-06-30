<div id="party-div">
    <ul class="list-group list-group-flush">
<?php
session_start();
$uid = $_SESSION['uid'];
include_once('../../includes/db.php');
$sql = "SELECT * FROM ownedMons WHERE uid = '$uid' AND inParty <> 0 ORDER BY inParty";
$q = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($q)) {
?>
        <li data="<?php echo $row['id']?>" class="list-group-item nuz-list-item">
            <div class="row">
<?php
    if($row['alive'] == 1) {
?>
                <div class="col-3">
                    <img height="128px" width="128px" src="img/mons/<?php echo $row['img']; ?>">
                </div>
<?php
    } else {
?>
                <div class="col-3">
                    DEAD
                </div>
<?php
    }
?>
                <div class="col-3">
                    <p><?php echo $row['name']; ?></p>
<?php
    if($row['type2'] == null) {
?>
                    <p><?php echo $row['type1']; ?></p>
<?php
    } else {
?>
                    <p><?php echo $row['type1'];?>/<?php echo $row['type2']; ?></p>
<?php
    }
    $width = round(($row['currentHp']/$row['maxHp']) * 100);
?>
                </div>
                <div class="col-3">
                    <div class="progress">
                        <div style="width: <?php echo $width; ?>%" class="progress-bar bg-secondary" role="progressbar" aria-valuenow="<?php echo $row['currentHp']; ?>" aria-valuemin="0" aria-valuemax="<?php echo $row['maxHp']; ?>"></div>
                    </div>
                    <p><?php echo $row['currentHp']; ?>/<?php echo $row['maxHp']; ?></p>
                </div>
                <div class="col-3">
                    <p><?php echo strtoupper($row['status']); ?></p>
                </div>
            </div>
        </li>
<?php
}
?>
    <script type="text/javascript" src="components/party/party.js"></script>
</div>
