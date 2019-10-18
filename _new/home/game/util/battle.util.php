<?php
function attackHandler($playerMon, $pMonMove, $opponentMon, $oMonMove, $mods) {
    $attacking = '';
    for($i = 0; $i < 2; $i++) {
        if($attacking == '') {
            $pMonEffArr = explode('_', $pMonMove['effects']);
            $oMonEffArr = explode('_', $oMonMove['effects']);
            $attacking = turnOrder($pMonEffArr, $oMonEffArr, $playerMon['speed'], $opponentMon['speed'], $mods['player']['speed'], $mods['opponent']['speed']);
        }
        if($attacking == 'player') {
            $atkMon = $playerMon;
            $atkMove = $pMonMove;
            $defMon = $opponentMon;
            $defending = 'opponent';  
        } else {
            $atkMon = $opponentMon;
            $atkMove = $oMonMove;
            $defMon = $playerMon;
            $defending = 'player'; 
        }
        if($roundArray == null) {
            $roundArray = array(
                0 => array(
                    'text' => $atkMon['nick_name'] . " used " . $atkMove['name'] . "!"
                )
            );
        } else {
            array_push($roundArray, array(
                'text' => $atkMon['nick_name'] . " used " . $atkMove['name'] . "!"
            ));
        }
        if($atkMove['distance'] != 's') {
            if(checkForHit($atkMove['accuracy'], $mods[$attacking]['acc'], $mods[$defending]['eva'])) {
                if($atkMove['category'] == 'p') {
                    $dmg = damageCalc($atkMon['atk'], $mods[$attacking]['atk'], $atkMove['damage'], $defMon['def'], $mods[$defending]['def']);
                } elseif($pMonMove['category'] == 'e') {
                    $dmg = damageCalc($atkMon['e_atk'], $mods[$attacking]['e_atk'], $atkMove['damage'], $defMon['e_def'], $mods[$defending]['e_def']);
                }
                $mod = typeCheck($atkMove['type'], $defMon);
                $dmgText = '';
                if($mod > 1) {
                    $dmgText += 'Super effective! ';
                } elseif($mod < 1) {
                    $dmgText += 'Ineffective... ';
                }
                if(checkForCrit($atkMove['crit'], $mods[$attacking]['crit'])) {
                    $mod *= 2;
                    $dmgText += 'Critical hit!';
                }
                array_push($roundArray, array(
                    'dmg' => round($dmg * $mod),
                    'anim' => $atkMove['animation'],
                    'text' => $dmgText,
                    'target' => $defending
                ));
            } else {
                // missed attack
                array_push($roundArray, array(
                    'text' => $atkMon['nick_name'] . " missed..."
                ));
            }
        }
        // TODO: effects parse and self-targeted moves...
        // TODO: check for dead state
        $attacking = $defending;
    }
    return $roundArray;
}

function typeCheck($atkType, $defMon) {
    $mult = 1;
    if($atkType == 'Fire') {
        if($defMon['type_1'] == 'Plant' || $defMon['type_2'] == 'Plant') {
            $mult *= 2;
        }
        if($defMon['type_1'] == 'Water' || $defMon['type_2'] == 'Water') {
            $mult *= 0.5;
        }
    } elseif($atkType == 'Plant') {
        if($defMon['type_1'] == 'Water' || $defMon['type_2'] == 'Water') {
            $mult *= 2;
        }
        if($defMon['type_1'] == 'Fire' || $defMon['type_2'] == 'Fire') {
            $mult *= 0.5;
        }
    } elseif($atkType == 'Water') {
        if($defMon['type_1'] == 'Fire' || $defMon['type_2'] == 'Fire') {
            $mult *= 2;
        }
        if($defMon['type_1'] == 'Plant' || $defMon['type_2'] == 'Plant') {
            $mult *= 0.5;
        }
    }
    return $mult;
}

function checkForCrit($atkCrit, $critMod) {
    $critChance = rand(0, 100);
    if(($atkCrit * $critMod) >= $critChance) {
        return true;
    }
    return false;
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