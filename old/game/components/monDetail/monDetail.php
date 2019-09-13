<div id="mon-detail-div">
    <button id="mon-back-btn" class="btn btn-outline-secondary">Back</button>
<?php
$id = $_POST['id'];
include_once("../../includes/db.php");
$sql = "SELECT * FROM ownedMons WHERE id = '$id'";
$q = mysqli_query($conn, $sql);
$mon = mysqli_fetch_assoc($q);

$mid = $mon['mid'];
$sql = "SELECT description, anim FROM mons WHERE id = '$mid' LIMIT 1";
$query = mysqli_query($conn, $sql);
$deets = mysqli_fetch_assoc($query);
?>
    <div class="row">
        <div class="col-6">
            <img class="img-fluid mon-img-anim-<?php echo $deets['anim']; ?>" src="img/mons/<?php echo $mon['img']; ?>">
        </div>
        <div class="col-6">
            <div class="card text-center">
                <div class="card-title"><?php echo $mon['name']; ?></div>      
            </div>
<?php

?>
            <div class="card text-center">
                <div class="card-text"><?php echo $deets['description']; ?></div>      
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-4">
            <div class="card">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">HP: <?php echo $mon['currentHp']; ?>/<?php echo $mon['maxHp']; ?></li>
                    <li class="list-group-item">ATK: <?php echo $mon['atk']; ?></li>
                    <li class="list-group-item">DEF: <?php echo $mon['def']; ?></li>
                    <li class="list-group-item">SATK: <?php echo $mon['sAtk']; ?></li>
                    <li class="list-group-item">SDEF: <?php echo $mon['sDef']; ?></li>
                    <li class="list-group-item">SPD: <?php echo $mon['speed']; ?></li>
                </ul>
            </div>
        </div>
        <div class="col-4">
            <div class="card">
<?php
$move1 = $mon['move1'];
$sql = "SELECT * FROM moves WHERE id = '$move1'";
$query = mysqli_query($conn, $sql);
$move1deets = mysqli_fetch_assoc($query);

?>
                <ul class="list-group">
                    <li class="list-group-item"><?php echo $move1deets['name'];?></li>
<?php
if($mon['move2'] !=  NULL) {
    $move2 = $mon['move2'];
    $sql = "SELECT * FROM moves WHERE id = '$move2'";
    $query = mysqli_query($conn, $sql);
    $move2deets = mysqli_fetch_assoc($query);
?>
                    <li class="list-group-item"><?php echo $move2deets['name'];?></li>
<?php
    if($mon['move3'] !=  NULL) {
        $move3 = $mon['move3'];
        $sql = "SELECT * FROM moves WHERE id = '$move3'";
        $query = mysqli_query($conn, $sql);
        $move3deets = mysqli_fetch_assoc($query);
?>
                    <li class="list-group-item"><?php echo $move3deets['name'];?></li>
<?php    
        if($mon['move4'] !=  NULL) {
            $move4 = $mon['move4'];
            $sql = "SELECT * FROM moves WHERE id = '$move4'";
            $query = mysqli_query($conn, $sql);
            $move4deets = mysqli_fetch_assoc($query);
?>
                    <li class="list-group-item"><?php echo $move4deets['name'];?></li>
<?php
        }
    }
}
?>
                </ul>
            </div>
        </div> 
        <div class="col-4">
        </div> 
    </div>
    <script type="text/javascript" src="components/monDetail/monDetail.js"></script>
</div>