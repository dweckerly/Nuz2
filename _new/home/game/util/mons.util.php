<?php

function hpCalc($hp, $lvl) {
    return floor((($hp * $lvl)/ 50) + $lvl + 10);
} 

function statCalc($stat, $lvl) {
    return floor((($stat * $lvl)/ 50) + $lvl + 5);
}

function xpCalc($lvl) {
    return floor(4 * ($lvl ** 3) / 5);
}

function setMoves($movePool) {
    $q = "SELECT * FROM move_pools WHERE move_pool_id = '$movePool'";
    $r = mysqli_query($conn, $q);
    $moveArr = mysqli_fetch_assoc($r);
    // TODO: need to fill database 
}

function generateMon($monArr, $id, $level) {
    return array(
        "mon_id" => $id,
        "mon_name" => $monArr['mon_name'],
        "nick_name" => $monArr['mon_name'],
        "img" => $monArr['mon_name'] . ".png",
        "type_1" => $monArr['type_1'],
        "type_2" => $monArr['type_2'],
        "hp" => hpCalc($monArr['hp'], $level),
        "atk" => statCalc($monArr['atk'], $level),
        "def" => statCalc($monArr['def'], $level),
        "e_atk" => statCalc($monArr['e_atk'], $level),
        "e_def" => statCalc($monArr['e_def'], $level),
        "speed" => statCalc($monArr['speed'], $level),
        "moves" => "1",
        "ability" => 0,
        "happiness" => 50,
        "lvl" => $level,
        "xp" => xpCalc($level)
    );
}