<?php
session_start();
echo $_SESSION['login'] . " " . $_SESSION['uid'];