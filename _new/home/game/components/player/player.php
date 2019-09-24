<?php
include("../../components/menu/menu.php");
include("../../includes/db.inc.php");
session_start();
$uid = $_SESSION['uid'];
$q = "SELECT * FROM games WHERE account_id = '$uid'";
$r = mysqli_query($conn, $q);
$gameInfo = mysqli_fetch_assoc($r);
$q = "SELECT * FROM accounts WHERE account_id = '$uid'";
$r = mysqli_query($conn, $q);
$accountInfo = mysqli_fetch_assoc($r);
$createdDate = date("F j, Y", strtotime($accountInfo['created_on']));
$loginDate = date("F j, Y", strtotime($accountInfo['last_login']));
?>
<div id="player-container">
    <h1 class="prop-name border-bottom"><?php echo $accountInfo['account_name'];?></h1>
    <div class="grid-2">
        <div class="border-bottom">
            <label class="border-bottom">Created On:</label><p><?php echo $createdDate;?></p>
        </div>
        <div class="border-bottom">
            <label class="border-bottom">Last Login:</label><p><?php echo $loginDate;?></p>
        </div>
    </div>
</div>