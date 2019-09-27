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

function setMoves($moveArr, $lvl) {
    $moves = explode('_', $moveArr);
    $monMoves = array();
    $i = 0;
    foreach($moves as $move) {
        $parsedMove = explode('/', $move);
        if($parsedMove[1] <= $lvl) {
            if($i > 3) {
                array_splice($monMoves, ($i % 4), 0, $parsedMove[0]);
            } else {
                array_push($monMoves, $parsedMove[0]);
            }
        }
        $i++;
    }
    $moveStr = "";
    foreach($monMoves as $m) {
        $moveStr .= $m . '_';
    }
    $moveStr = substr($moveStr, 0, -1);
    return $moveStr;
}

function generateMon($monArr, $id, $level, $moveArr) {
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
        "moves" => setMoves($moveArr, $level),
        "ability" => 0,
        "happiness" => 50,
        "lvl" => $level,
        "xp" => xpCalc($level)
    );
}