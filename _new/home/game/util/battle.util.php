<?php
function attackHandler($playerMon, $pMonMove, $opponentMon, $oMonMove, $mods) {
    $pMonEffArr = explode('_', $pMonMove['effects']);
    $oMonEffArr = explode('_', $oMonMove['effects']);
    $firstMove = turnOrder($pMonEffArr, $oMonEffArr, $playerMon['speed'], $opponentMon['speed'], $mods['player']['speed'], $mods['opponent']['speed']);
    if($firstMove == 'player') {
        if($pMonMove['distance'] != 's') {
            if(checkForHit($pMonMove['accuracy'], $mods['player']['acc'], $mods['opponent']['eva'])) {
                if($pMonMove['category'] == 'p') {
                    $dmg = damageCalc($playerMon['atk'], $mods['player']['atk'], $pMonMove['damage'], $opponentMon['def'], $mods['opponent']['def']);
                } elseif($pMonMove['category'] == 'e') {
                    $dmg = damageCalc($playerMon['e_atk'], $mods['player']['e_atk'], $pMonMove['damage'], $opponentMon['e_def'], $mods['opponent']['e_def']);
                } elseif($pMonMove['category'] == 's') {
                    
                }
            } else {
                // missed attack
            }
        } else {
            // self targeted move
        }
    } else {
        // opponent goes first
    }
    return "";    
}

function checkForHit($acc, $accMod, $evaMod) {
    $accRoll = rand(0, 100);
    if(($acc * $accMod * $evaMod) >= $accRoll) {
        return true;
    }
    return false;
}

function damageCalc($atkAttr, $atkMod, $dmg, $defAttr, $defMod) {
    $randMod = $dmg / 10;
    $rMod = round(rand(0, $randMod * 2) - $randMod);
    $damage = round(($dmg * (($atkAttr * $atkMod) / ($defAttr * $defMod))) + $rMod) + 1;
    if($damage > 0) {
        return $damage;
    }
    return 1;
}

function turnOrder($pMonEffArr, $oMonEffArr, $pSpeed, $oSpeed, $pSpdMod, $oSpdMod) {
    $pPriority = priorityCheck($pMonEffArr);
    $oPriority = priorityCheck($oMonEffArr);
    if($pPriority != $oPriority) {
        // check speed
        if(($pSpeed * $pSpdMod) > ($oSpeed * $oSpdMod)) {
            return 'player';
        } elseif(($pSpeed * $pSpdMod) < ($oSpeed * $oSpdMod)) {
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