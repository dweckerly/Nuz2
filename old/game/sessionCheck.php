<?php
session_start();
if(!isset($_SESSION['uid'])) {
    header("Location: ../");
    exit();
} else {
    $uid = $_SESSION['uid'];
}