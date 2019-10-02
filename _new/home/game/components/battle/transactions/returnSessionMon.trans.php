<?php
session_start();
if(isset($_SESSION['opponent'])) {
    echo json_encode($_SESSION['opponent']);
} else {
    header("Location: ../../../index.php");
}
