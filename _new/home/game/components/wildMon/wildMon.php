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
        <h2 class="center-text no-bold">You found a wild <span class="prop-name bold"><?php echo $monInfo['mon_name'];?></span>!</h2>
    </div>
    <div class="center-text">
        <button onclick="callBattle()">Fight!</button>
        <button onclick="backToMain()">Run!</button>
        <button onclick="callSearch()">Search Again</button>
<?php
    } elseif($_GET['source'] == "travel") {
?>
        <h2 class="center-text no-bold">A wild <span class="prop-name bold"><?php echo $monInfo['mon_name'];?></span> is in your way!</h2>
    </div>
    <div class="center-text">
        <button onclick="callBattle()">Fight!</button>
        <button onclick="backToMain()">Run!</button>
<?php
    }
?>
    </div>
    <script src="components/wildMon/wildMon.js"></script>
</div>
<?php
}
