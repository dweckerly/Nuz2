<?php
if(isset($_POST['enc_mon'])) {
    $wildMon = $_POST['enc_mon'];
    $wId = $wildMon['id'];
    include_once('../../includes/db.inc.php');
    $q = "SELECT * FROM mons WHERE mon_id = '$wId'";
    $r = mysqli_query($conn, $q);
    $monInfo = mysqli_fetch_assoc($r);
?>
<div id="wild-encounter-container">
    <div class="center">
        <img src="img/mons/<?php echo $monInfo['mon_name'];?>.png">
    </div>
    <div class="center-text">
        <p>A wild <span class="prop-name"><?php echo $monInfo['mon_name'];?></span> appeared!</p>
    </div>
    <div>
        <button>Fight!</button>
        <!-- Here run button will need to update DB with stored session destination
        information before returning player to the map -->
        <button onclick="backToMain()">Run!</button>
    </div>
</div>
<?php
}
