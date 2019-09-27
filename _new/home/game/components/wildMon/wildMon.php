<?php
if(isset($_GET['enc_mon'])) {
    include_once('../../includes/db.inc.php');
    $wildMon = mysqli_real_escape_string($conn, $_GET['enc_mon']);
    $wId = $wildMon['id'];
    $q = "SELECT * FROM mons WHERE mon_id = '$wId'";
    $r = mysqli_query($conn, $q);
    $monInfo = mysqli_fetch_assoc($r);
?>
<div id="wild-encounter-container">
    <div class="center">
        <img class="mon-img-anim-<?php echo $monInfo['animation']?>" src="img/mons/<?php echo $monInfo['mon_name'];?>.png">
    </div>
    <div>
        <h3 class="center-text">You found a wild <span class="prop-name"><?php echo $monInfo['mon_name'];?></span>!</h3>
    </div>
    <div class="center-text">
        <button>Fight!</button>
        <!-- Here run button will need to update DB with stored session destination
        information before returning player to the map -->
        <button onclick="backToMain()">Run!</button>
    </div>
</div>
<?php
}
