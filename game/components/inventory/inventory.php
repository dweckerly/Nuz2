<div id="inventory-div">
<?php
include_once("../../includes/db.php");
$uid = $_SESSION['uid'];
$sql = "SELECT * FROM ownedItems WHERE uid = '$uid'";
$result = mysqli_query($conn, $sql);
if(mysqli_num_rows($result) > 0) {
    ?>
    <div class="accordion" id="inventory-list">
    <?php
    $i = 0;
    while($rows = mysqli_fetch_assoc($result)) {
        $id = $rows['iid'];
        $sql = "SELECT * FROM items WHERE id = '$id'";
        $res = mysqli_query($conn, $sql);
        $item = mysqli_fetch_assoc($res);
    ?>
        <div class="card">
            <div class="card-header" id="heading<?php echo $i; ?>">
                <h5>
                    <button class="btn btn-secondary" data-toggle="collapse" data-target="#item<?php echo $i; ?>" aria-expanded="false" aria-controls="item<?php echo $i; ?>">
                        <?php echo $item['name']; ?>
                    </button>
                </h5>
                <div align="right">
                    <span class="badge badge-light"><?php echo $rows['quantity']; ?></span>
                </div>
            </div>
            <div id="item<?php echo $i; ?>" class="colapse show" aria-labeledby="heading<?php echo $i; ?>" data-parent="#inventory-list">
                <div class="card-body">
                    <?php echo $item['description']; ?>
                </div>
            </div>
        </div>
    
    <?php
        $i++;
    }
    ?>
    </div>
    <?php
}

?>
</div>
