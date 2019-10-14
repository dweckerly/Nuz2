<?php
function attackHandler($playerMon, $pMonMove, $opponentMon, $oMonMove) {
    $pMonEffArr = explode('_', $pMonMove['effects']);
    $oMonEffArr = explode('_', $oMonMove['effects']);
    $firstMove = turnOrder($pMonEffArr, $oMonEffArr, $playerMon['speed'], $opponentMon['speed']);
    if($firstMove == 'player') {
        if($pMonMove['category'] == 'p') {
            $dmg = damageCalc($playerMon['atk'], $pMonMove['damage'], $opponentMon['def']);
        } elseif($pMonMove['category'] == 'e') {
            $dmg = damageCalc($playerMon['e_atk'], $pMonMove['damage'], $opponentMon['e_def']);
        } elseif($pMonMove['category'] == 's') {
            
        }
    } else {

    }
    return "";    
}


function damageCalc($atkAttr, $dmg, $defAttr) {
    return $dmg * ($atkAttr / $defAttr) + 2;
}

function turnOrder($pMonEffArr, $oMonEffArr, $pSpeed, $oSpeed) {
    $pPriority = priorityCheck($pMonEffArr);
    $oPriority = priorityCheck($oMonEffArr);
    if($pPriority != $oPriority) {
        // check speed
        if($pSpeed > $oSpeed) {
            return 'player';
        } elseif($pSpeed < $oSpeed) {
            return 'opponent';
        } else {
            $randChoice = rand(1, 2);
            if($randChoice = 1) {
                return 'player';
            } else {
                return 'opponent';
            }
        }
    } else {
        if($pPriority > $oPriority) {
            return 'player';
        } elseif($pPriority < $oPriority) {
            return 'opponent';
        }
    }
} 

function priorityCheck($effArr) {
    foreach($effArr as $eff) {
        $e = explode('/', $eff);
        if($e[0] == 'priority') {
            return $e[1];
        }
    }
    return 0;
}