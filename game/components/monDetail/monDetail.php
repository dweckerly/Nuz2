<div id="mon-detail-div">
    <button id="mon-back-btn" class="btn btn-outline-secondary">Back</button>
<?php
$id = $_POST['id'];
include_once("../../includes/db.php");
$sql = "SELECT * FROM ownedMons WHERE id = '$id'";
$q = mysqli_query($conn, $sql);
$mon = mysqli_fetch_assoc($q);
?>
    <div class="row">
        <div class="col-6">
            <img class="img-fluid" src="img/mons/<?php echo $mon['img']; ?>">
        </div>
        <div class="col-6">
            <div class="card text-center">
                <div class="card-title"><?php echo $mon['name']; ?></div>      
            </div>
<?php
$mid = $mon['mid'];
$sql = "SELECT description FROM mons WHERE id = '$mid' LIMIT 1";
$query = mysqli_query($conn, $sql);
$deets = mysqli_fetch_assoc($query);
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

        </div> 
        <div class="col-4">
        </div> 
    </div>
    <script type="text/javascript" src="components/monDetail/monDetail.js"></script>
</div>