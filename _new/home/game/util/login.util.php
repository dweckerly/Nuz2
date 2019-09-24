<?php
if(isset($_POST['submit'])) {
    include_once('../includes/db.inc.php');
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    if(empty($name) || empty($password)) {
        mysqli_close($conn);
        header("Location: ../../index.php?login=empty");
        exit();
    } else {
        $name = strtoupper($name);
        $sql = "SELECT * from accounts where account_name = '$name'";
        $res = mysqli_query($conn, $sql);
        if(mysqli_num_rows($res) < 1) {
            mysqli_close($conn);
            header("Location: ../../index.php?login=na");
            exit();
        } else {
            $accArr = mysqli_fetch_assoc($res);
            if($accArr['active'] != 1) {
                mysqli_close($conn);
                header("Location: ../../index.php?login=nact");
                exit();
            } else {
                $hash = $accArr['password'];
                if(password_verify($password, $hash)) {
                    // all systems go!
                    echo "Hold yer bologna...";
                    $uid = $accArr['account_id'];
                    session_start();
                    $_SESSION['login'] = TRUE;
                    $_SESSION['uid'] = $uid;
                    $time = date("Y-m-d H:i:s");
                    $sql = "UPDATE accounts set last_login = '$time' where account_id = '$uid'";
                    $q = mysqli_query($conn, $sql);
                    mysqli_close($conn);
                    header("Location: ../");
                    exit();
                } else {
                    mysqli_close($conn);
                    header("Location: ../../index.php?login=pwd");
                    exit();
                }
            }
        }
    }
} else {
    header("Location: ../../index.php");
    exit();
}