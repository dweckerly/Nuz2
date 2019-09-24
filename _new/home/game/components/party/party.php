<?php
include("../../components/menu/menu.php");
include("../../includes/db.inc.php");
session_start();
$uid = $_SESSION['uid'];
$q = "SELECT * FROM owned_mons WHERE account_id = '$uid' AND party_order <> 0 ORDER BY party_order";
$r = mysqli_query($conn, $q);
?>
<div id="party-container">
    <h2 class="prop-name border-bottom">On Deck</h2>
    <div id="in-party-container">
<?php
while($inPartyMon = mysqli_fetch_assoc($r)) {
?>
        <div class="grid-5 border-bottom">
            <div>
                <img src="img/mons/<?php echo $inPartyMon['img'];?>">
            </div>
            <div>
                <p><?php echo $inPartyMon['nick_name'];?></p>
            </div>
            <div>
                <p><?php echo $inPartyMon['current_hp'];?>/<?php echo $inPartyMon['hp'];?></p>
            </div>
            <div>
                <p><?php echo $inPartyMon['status'];?></p>
            </div>
            <div>
                <p><?php echo $inPartyMon['lvl'];?></p>
            </div>
        </div>
<?php
}
?>
    </div>
    <h2 class="prop-name border-bottom">Stored</h2>
    <div id="stored-container">
<?php
$q = "SELECT * FROM owned_mons WHERE account_id = '$uid' AND party_order = 0";
$r = mysqli_query($conn, $q);
while($storedMon = mysqli_fetch_assoc($r)) {
?>
        <div class="grid-5 border-bottom">
            <div>
                <img src="img/mons/<?php echo $storedMon['img'];?>">
            </div>
            <div>
                <p><?php echo $storedMon['nick_name'];?></p>
            </div>
            <div>
                <p><?php echo $storedMon['current_hp'];?>/<?php echo $storedMon['hp'];?></p>
            </div>
            <div>
                <p><?php echo $storedMon['status'];?></p>
            </div>
            <div>
                <p><?php echo $storedMon['lvl'];?></p>
            </div>
        </div>
<?php
}
?>
    </div>
</div>