<?php
include_once('../../includes/db.php');
$id = $_POST['id'];
$sql = "SELECT * FROM locations WHERE id = '$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$json = json_encode($row);
?>

<div id="loc-div" class="container">
    <button id="back">Back to Map</button>
    <div id="loc-card" class="card text-center">
        <div class="card-body">
            <h4 id="loc-name" class="card-title"><?php echo $row['name']; ?></h4>
            <p id="loc-desc" class="card-text"><?php echo $row['description']; ?></p>
        </div>
        <!--<img id="loc-img" class="card-img-bottom" src="" alt="Card image cap">-->
        <div id="action-div"></div>
    </div>
    <script type="text/javascript" src="components/locations/loc.js"></script>
</div>