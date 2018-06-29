<div id="party-div">
    <ul class="list-group list-group-flush">
<?php
session_start();
$uid = $_SESSION['uid'];
include_once('../../includes/db.php');
$sql = "SELECT * FROM ownedMons WHERE uid = '$uid' ORDER BY inParty";
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
                </div>
                <div class="col-3">
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
