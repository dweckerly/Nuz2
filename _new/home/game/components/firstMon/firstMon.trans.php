<?php
if(isset($_POST['mon'])) {
    $id = $_POST['mon'];
    if($id == FIRSTMONS[0] || $id == FIRSTMONS[1] || $id == FIRSTMONS[2]) {
        session_start();
        if(isset($_SESSION['uid']) && $_SESSION['login']) {
            $uid = $_SESSION['uid'];
            include('../../includes/db.inc.php');
            include('../../util/mons.util.php');
            $q = "SELECT * FROM mons WHERE mon_id = '$id'";
            $res = mysqli_query($conn, $q);
            $monArr = mysqli_fetch_assoc($res);
            $fMon = generateMon($monArr, $id, 3);
            $sql = "UPDATE games SET flag0 = 1 WHERE account_id = '$uid'";
            $exec = mysqli_query($conn, $sql);
            $sql = "INSERT INTO owned_mons (account_id, mon_id, mon_name, nick_name, img, type_1, type_2, hp, atk, def, e_atk, e_def, speed, moves, ability, happiness, current_hp, lvl, xp) VALUES ('$uid', '" .$fMon['mon_id']. "', '" .$fMon['mon_name']. "', '" .$fMon['nick_name']. "', '" .$fMon['img']. "', '" .$fMon['type_1']. "', '" . $fMon['type_2'] . "', '" .$fMon['hp']. "', '" .$fMon['atk']. "', '" .$fMon['def']. "', '" .$fMon['e_atk']. "', '" .$fMon['e_def']. "', '" .$fMon['speed']. "', '" .$fMon['moves']. "', '" .$fMon['ability']. "', '" .$fMon['happiness']. "', '" .$fMon['hp']. "', '" .$fMon['lvl']. "', '" .$fMon['xp']. "')";
            $exec = mysqli_query($conn, $sql);
            mysqli_close($conn);
            header("Location: /home/game/");
            exit();
        } else {
            // session vars not set
            mysqli_close($conn);
            header("Location: ../index.php");
            exit();
        }
    } else {
        // invalid id sent
        mysqli_close($conn);
        header("Location: ../index.php");
        exit();
    }
} else {
    // no post info
    mysqli_close($conn);
    header("Location: ../index.php");
    exit();
}