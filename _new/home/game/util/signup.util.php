<?php

if(isset($_POST['submit'])) {
    include_once('../includes/db.inc.php');
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    if(empty($name) || empty($password)) {
        mysqli_close($conn);
        header("Location: ../../index.php?signup=empty");
        exit();
    } else {
        // check for unique name and password length > 3
        $sql = "SELECT * FROM accounts where account_name = '$name'";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
        if($resultCheck > 0) {
            mysqli_close($conn);
            header("Location: ../../index.php?signup=nametaken");
            exit();
        } elseif(strlen($password) < 4) {
            mysqli_close($conn);
            header("Location: ../../index.php?signup=pwd");
            exit();
        } else {
            // check for unique and valid email
            if(!empty($email)) {
                if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $sql = "SELECT * FROM accounts where email = '$email'";
                $result = mysqli_query($conn, $sql);
                $resultCheck = mysqli_num_rows($result);
                    if($resultCheck > 0) {
                        // email not unique
                        mysqli_close($conn);
                        header("Location: ../../index.php?signup=emailtaken");
                        exit();
                    } 
                } else {
                    // invalid email
                    mysqli_close($conn);
                    header("Location: ../../index.php?signup=emailinvalid");
                    exit();
                }
            }
            // all systems go!
            $hashedPwd = password_hash($password, PASSWORD_DEFAULT);
            include("rand.util.php");
            $uid = uniqidReal();
            $name = strtoupper($name);
            $sql = "INSERT INTO accounts (user_id, account_name, password, email) VALUES ('$uid', '$name', '$hashedPwd', '$email')";
            mysqli_query($conn, $sql);
            // create game
            $sql = "INSERT INTO games (account_id) VALUES ('$uid')";
            mysqli_query($conn, $sql);
            mysqli_close($conn);
            // add session info
            session_start();
            $_SESSION['login'] = TRUE;
            $_SESSION['uid'] = $uid;
            header("Location: ../");
            exit();
        }
    }
} else {
    header("Location: ../../index.php");
    exit();
}