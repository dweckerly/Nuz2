<!DOCTYPE html>
<html>
    <head>
        <link rel="shortcut icon" type="image/png" href="../favicon.png"/>
        <link rel="stylesheet" type="text/css" href="style/main.css">
        <script src="game/scripts/jquery.js"></script>
        <title>NuzMon</title>
    </head>
    <body>
        <header>
            <h1>NuzMon</h1>
            <p></p>
        </header>
        <main class="grid">
            <div id="signup-form">
                <form class="form" action="game/util/signup.util.php" method="POST">
                    <h2>Sign Up <span class="sub-text">Or <a id="login-switch" class="sub-link">log in</a></span></h2>
                    <label for="name">Account Name</label>
                    <input type="text" name="name" maxlength="12" placeholder="12 characters max">
                    <label for="email">Email <span class="sub-text">(optional)</span></label>
                    <input type="text" name="email" placeholder="get emailed updates">
                    <label for="password">Password</label>
                    <input type='password' name="password" placeholder="keep it secret, keep it safe">
                    <button type="submit" name='submit'>Sign Up</button>
                </form>
<?php
if(!empty($_GET['signup'])) {
    $suErr = $_GET['signup'];
    if($suErr == 'empty') {
        echo "<div class='error-message'>fill out both name and password</div>";
    } elseif($suErr == 'nametaken') {
        echo "<div class='error-message'>that name is taken :(</div>";
    } elseif($suErr == 'pwd') { 
        echo "<div class='error-message'>password must be greater than 3 characters</div>";
    } elseif($suErr == 'emailtaken') {
        echo "<div class='error-message'>that email is already in the database</div>";
    } elseif($suErr == 'emailinvalid') {
        echo "<div class='error-message'>I don't think that's an email...</div>";
    }
}
?>
            </div>
            <div id="login-form">
                <form class="form" action="game/util/login.util.php" method="POST">
                    <h2>Log In <span class="sub-text">Or <a id="signup-switch" class="sub-link">sign up</a></span></h2>
                    <label for="name">Account Name</label>
                    <input type="text" name="name" maxlength="12">
                    <label for="password">Password</label>
                    <input type='password' name="password">
                    <button type="submit" name='submit'>Log In</button>
                </form>
<?php
if(!empty($_GET['login'])) {
    $suErr = $_GET['login'];
    if($suErr == 'empty') {
        echo "<div class='error-message'>fill out both name and password</div>";
    } elseif($suErr == 'na') {
        echo "<div class='error-message'>no account found by that name</div>";
    } elseif($suErr == 'pwd') { 
        echo "<div class='error-message'>password does not match account name</div>";
    } elseif($suErr == 'nact') { 
        echo "<div class='error-message'>this account is no longer active</div>";
    }
}
?>
            </div>
            <div>
               <h2>News</h2>
               <p>"Good news, everyone!"</p>
               <p>- Hubert J. Farnsworth</p>
            </div>
        </main>
    </body>
    <script src="scripts/index.js"></script>
</html>