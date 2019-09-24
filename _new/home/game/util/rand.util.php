<?php
function uniqidReal($lenght = 13) {
    if (function_exists("random_bytes")) {
        $bytes = random_bytes(ceil($lenght / 2));
    } elseif (function_exists("openssl_random_pseudo_bytes")) {
        $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
    } else {
        throw new Exception("no cryptographically secure random function available");
    }
    return substr(bin2hex($bytes), 0, $lenght);
}

function parseEncounterType($eRate) {
    $rates = explode("/", $eRate);
    $rates[1] = $rates[1] + $rates[0];
    $rates[2] = $rates[2] + $rates[1];
    $rand = mt_rand(1, 100);
    if($rand <= $rates[0]) {
        return 'mon';
    } elseif ($rand <= $rates[1]) {
        return 'event';
    } elseif ($rand <= $rates[2]) {
        return 'item';
    }
}

function parseMonEncounter($monEnc) {
    $mons = explode('_', $monEnc);
    $rateCountArr = array(
        'c' => 0,
        'u' => 0,
        'r' => 0,
        'm' => 0
    );
    foreach($mons as $mon) {
        $temp = explode('/', $mon);
        $rateCountArr[$temp[2]]++;
    }

}

function solveMonRate($monRates) {
    $x = floor(100 / ($monRates[0] + (0.5 * $monRates[1]) + (0.25 * $monRates[2]) + (0.125 * $monRates[3])));
    $chance = array();
    $i = 0;
    $mod = 1;
    foreach($monRates as $mr){
        for($j = 0; $j < $mr; $j++) {
            if ($i = 1) {
                $mod = 0.5;
            } elseif ($i = 2) {
                $mod = 0.25;
            } elseif ($i = 3) {
                $mod = 0.125;
            }
            if(count($chance) == 0) {
                array_push($chance, $mod * $x);
            } else {
                array_push($chance, ($mod * $x) + end($chance));
            }
        }
        $i++;
    }
    $rand = mt_rand(1, floor(end($chance)));
    for($i = 0; $i < count($chance); $i++) {
        if($rand <= $chance[$i]) {
            return $i;
        }
    }
}