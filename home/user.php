<?php
include_once("../game/includes/db.php");
$uName = $_POST['uName'];
$pwd = $_POST['pwd'];
$sql = "SELECT * FROM users WHERE userName = '$uName' AND pwd = '$pwd'";
$result = mysqli_query($conn, $sql);
if(mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    session_start();
    $_SESSION['uid'] = $row['id'];
    ?>
<div id="user-div" class="container" align="center">
    <h4>Hey <?php echo $row['userName']; ?></h4>
    <a href="game"><button class="btn btn-outline-secondary" id="playBtn">Play Game</button></a>
</div>
    <?php
} else {
    echo "Not found :(";
}

