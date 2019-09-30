<?php
if(isset($_POST['enc_mon'])) {
    $mons = $_POST['enc_mon'];
    include("includes/db.inc.php");
    if(count($mons) > 1) {
        // multiple mons, trainer or event
    } else {
        // only one mon, not trainer, not event
        $id = $mons['id'];
        $q = "SELECT * FROM mons WHERE mon_id = '$id'";
        $r = mysqli_query($conn, $q);
        $monInfo = mysqli_fetch_assoc($r);
        include("util/mons.util.php");
        $mon = generateMon($monInfo, $id, $mons['lvl']);
        session_start();
        $_SESSION['oponent'] = $mon;

    }
?>
<div id="battle-container">
    <canvas id="battle-canvas"></canvas>
    <div id="battle-text-container" class="grid-1 hidden">
        <p id="battle-text" class="center-text"></p>
    </div>
    <div id="battle-options-container" class="grid-3 hidden">
        <div>
            <button id="atk-1" class="hidden"></button>
            <button id="atk-3" class="hidden"></button>
        </div>
        <div>
            <button id="atk-2" class="hidden"></button>
            <button id="atk-4" class="hidden"></button>
        </div>
        <div>
            <button>Switch</button>
            <button>Item</button>
            <button>Run</button>
        </div>
        
    </div>
    <div id="switch-conatiner" class="modal-bg hidden">
        <div id="switch-content">

        </div>
    </div>
    <div class="hidden" id="img-container">
        <img id="opponent-img" src="img/mons/<?php echo $_SESSION['oppponent']['img'];?>">
    </div>
    <script src="components/battle/battle.js"></script>
</div>
<?php
}