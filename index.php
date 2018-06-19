<?php
session_start();
if(!isset($_SESSION['login'])) {
    $_SESSION['login'] == FALSE;
}
?>
<!DOCTYPE html lang="en">
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>NuzMon</title>
    <link rel="icon" type="image/png" href="../img/favicon.png"/>
    <link rel="stylesheet" type="text/css" media="screen" href="index.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">

    <script src="game/scripts/utility.js"></script>
</head>
<body>
    <nav class="navbar navbar-light navbar-expand-lg text-dark">
        <a class="navbar-brand" id="home-link" href="#">NuzMon</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item text-right">
                    <a class="nav-link" id="about-link" href="#">About</a>
                </li>
                <li class="nav-item text-right">
                    <a class="nav-link" id="rmon-link" href="#">Random 'Mon</a>
                </li>
                <?php 
                if($_SESSION['login']) {
                ?>
                <li class='nav-item text-right'>
                    <a class='nav-link' href='#'>Log Out</a>
                </li>
                <?php
                } 
                ?>
            </ul>
        </div>
    </nav>
    <section id="heading"></section>
    <section id="main"></section>
    <section id="footer"></section>

    <script src="index.js"></script>
</body>
</html>