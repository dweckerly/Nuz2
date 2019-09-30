<?php
if(isset($_GET['enc_mon'])) {
    include_once('../../includes/db.inc.php');
    $wildMon = $_GET['enc_mon'];
    $wId = $wildMon['id'];
    $q = "SELECT * FROM mons WHERE mon_id = '$wId'";
    $r = mysqli_query($conn, $q);
    $monInfo = mysqli_fetch_assoc($r);
    $_SESSION['encounter'] = array(
        'type' => 'wild',
        'mon' => $monInfo,
        'lvl' => $wildMon['lvl']
    );
?>
<div id="wild-encounter-container">
    <div class="center">
        <img class="mon-img-anim-<?php echo $monInfo['animation']?>" src="img/mons/<?php echo $monInfo['mon_name'];?>.png">
    </div>
    <div>
<?php
    if($_GET['source'] == "search") {
?>
        <h2 class="center-text">You found a wild <span class="prop-name"><?php echo $monInfo['mon_name'];?></span>!</h2>
<?php
    } elseif($_GET['source'] == "travel") {
?>
        <h2 class="center-text">A wild <span class="prop-name"><?php echo $monInfo['mon_name'];?> is in your way!</span>!</h2>
<?php
    }
?>
    </div>
    <div class="center-text">
        <button onclick="callBattle()">Fight!</button>
        <!-- Here run button will need to update DB with stored session destination
        information before returning player to the map -->
        <button onclick="backToMain()">Run!</button>
        <button onclick="callSearch()">Search Again</button>
    </div>
    <script src="components/wildMon/wildMon.js"></script>
</div>
<?php
}
