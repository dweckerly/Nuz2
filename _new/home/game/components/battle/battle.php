<?php
session_start();
if(isset($_SESSION['encounter'])) {
?>
<script src="components/battle/scripts/battleVars.js"></script>
<script src="components/battle/scripts/battleUtil.js"></script>
<div id="battle-container">
    <canvas id="battle-canvas"></canvas>
    <div class="hidden" id="img-container"></div>
<?php
    if($_SESSION['encounter']['type'] == 'wild') {
        include("../../includes/db.inc.php");
        $id = $_SESSION['encounter']['mon']['mon_id'];
        $q = "SELECT * FROM mons WHERE mon_id = '$id'";
        $r = mysqli_query($conn, $q);
        $monInfo = mysqli_fetch_assoc($r);
        include("../../util/mons.util.php");
        $mon = generateMon($monInfo, $id, $_SESSION['encounter']['lvl']);
        $_SESSION['opponent'] = $mon;
    } elseif($_SESSION['encounter']['type'] == 'trainer') {

    }
    $_SESSION['mods'] = array(
        'player' => array(
            'atk' => 1,
            'def' => 1,
            'e_atk' => 1,
            'e_def' => 1,
            'speed' => 1,
            'eva' => 1,
            'acc' => 1,
            'crit' => 1,
        ),
        'opponent' => array(
            'atk' => 1,
            'def' => 1,
            'e_atk' => 1,
            'e_def' => 1,
            'speed' => 1,
            'eva' => 1,
            'acc' => 1,
            'crit' => 1,
        )
    );
?>
    <div id="battle-text-container" class="grid-1 hidden">
        <p id="battle-text" class="center-text"></p>
        <button id="next-btn" onclick="roundHandler(roundData[roundCount])" disabled>Next</button>
    </div>
    <div id="battle-options-container" class="grid-3 hidden">
        <div id="moves-container" class="grid-2"></div>
        <div id="options-container" class="grid-3">
            <div>
                <button class="opt-btn">Switch</button>
            </div>
            <div>
                <button class="opt-btn">Item</button>
            </div>
            <div>
                <button class="opt-btn">Run</button>
            </div>
        </div> 
    </div>
    <script src="components/battle/battleUI.js"></script>
</div>
<?php
}