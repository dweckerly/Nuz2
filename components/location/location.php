<?php
include_once('../../includes/db.php');
$id = $_POST['id'];
$sql = "SELECT * FROM locations WHERE id = '$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
//$json = json_encode($row);
?>

<div id="loc-div" class="container">
    <button id="back">Back to Map</button>
    <div id="loc-card" class="card text-center">
        <div class="card-body">
            <h4 id="loc-name" class="card-title"><?php echo $row['name']; ?></h4>
            <p id="loc-desc" class="card-text"><?php echo $row['description']; ?></p>
        </div>
        <!--<img id="loc-img" class="card-img-bottom" src="" alt="Card image cap">-->
        <div id="action-div">
<?php
if($row['wild'] != null) {
    ?>
            <button id="wild-btn" data="<?php echo $row['wild']; ?>" class="btn btn-outline-secondary btn-lg btn-block">Look for NuzMon</button>
<?php
}
if($row['store'] != null) {
?>
            <button id="store-btn" data="<?php echo $row['store']; ?>" class="btn btn-outline-secondary btn-lg btn-block">Shop</button>
<?php
}
if($row['talk'] != null) {
?>
            <button id="talk-btn" data="<?php echo $row['talk']; ?>" class="btn btn-outline-secondary btn-lg btn-block">Talk to Someone</button>
<?php
}
if($row['search'] != null) {
?>
            <button id="search-btn" data="<?php echo $row['search']; ?>" class="btn btn-outline-secondary btn-lg btn-block">Search the Area</button>
<?php
}
if($row['gym'] != null) {
    ?>
            <button id="gym-btn" data="<?php echo $row['gym']; ?>" class="btn btn-outline-secondary btn-lg btn-block">Challenge the Gym</button>
<?php
}
?>
        </div>
    </div>
    <script type="text/javascript" src="components/locations/loc.js"></script>
</div>