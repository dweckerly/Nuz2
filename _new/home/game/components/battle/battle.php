<?php
session_start();
if(isset($_SESSION['encounter'])) {
?>
<script src="components/battle/scripts/battleUtil.js"></script>
<script src="components/battle/scripts/battleVars.js"></script>
<div id="battle-container">
    <canvas id="battle-canvas"></canvas>
    <div class="hidden" id="img-container"></div>
<?php
    if($_SESSION['encounter']['type'] == 'wild') {
        include_once("../../includes/db.inc.php");
        $id = $_SESSION['encounter']['mon']['mon_id'];
        $q = "SELECT * FROM mons WHERE mon_id = '$id'";
        $r = mysqli_query($conn, $q);
        $monInfo = mysqli_fetch_assoc($r);
        include("../../util/mons.util.php");
        $mon = generateMon($monInfo, $id, $_SESSION['encounter']['lvl']);
        $_SESSION['opponent'] = $mon;
?>
    <script src="components/battle/scripts/wildBattleInitiator.js"></script>
<?php
    } elseif($_SESSION['encounter']['type'] == 'trainer') {
?>
    <script src="components/battle/scripts/trainerBattle.js"></script>
<?php
    }
?>
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
        <div id="switch-content"></div>
    </div>
    <script src="components/battle/battleUI.js"></script>
</div>
<?php
}