<div id="inventory-div" class="container">
    <h4>Inventory</h4>
    <div id="information pane" align="center">
        <h5 id="item-name"></h5>
        <p id="item-description"></p>
    </div>
    
<?php
include_once("../../includes/db.php");
session_start();
$uid = $_SESSION['uid'];
$sql = "SELECT * FROM ownedItems WHERE uid = '$uid'";
$result = mysqli_query($conn, $sql);
if(mysqli_num_rows($result) > 0) {
    ?>
    <table>
        <tbody>
            <tr>

    <?php
    $i = 1;
    while($rows = mysqli_fetch_assoc($result)) {
        $id = $rows['iid'];
        $sql = "SELECT * FROM items WHERE id = '$id'";
        $res = mysqli_query($conn, $sql);
        $item = mysqli_fetch_assoc($res);

        // need to create method for adding effect to the button meta data
    ?>
                <td class="item-col">
                    <button class="btn btn-link item-btn" data-name="<?php echo $item['name'];?>" data-description="<?php echo $item['description']; ?>" data-effect="<?php echo $item['effect']; ?>">
                        <img height="64px" width="64px" src="img/items/<?php echo $item['img']; ?>">
                        <h3><span class="badge badge-light"><?php echo $rows['quantity']; ?></span></h3>
                    </button>
                </td>
    <?php
        if($i % 5 == 0) {
    ?>
            </tr>
            <tr>
    <?php
        }
        $i++;
    }
    ?>
            </tr>
        </tbody>
    </table>
    <?php
} else {
?>

<?php
}
?>
    <script src="components/inventory/inv.js"></script>
</div>

