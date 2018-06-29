var sleepRounds = 0;

function parseEffect() {
    var e1 = atkMon['moves'][atkMonMove]['e1'];
    var e2 = atkMon['moves'][atkMonMove]['e2'];
    var e3 = atkMon['moves'][atkMonMove]['e3'];
    var effects = [e1, e2, e3];
    effects.forEach(e => {
        if (e) {
            var p = e.split('-');
            switch (p[0]) {
                case 'burn':
                    statusEffect(p[1], p[2], 'burn');
                    break;
                case 'decrease':
                    decreaseStat(p[1], p[2], parseInt(p[3]));
                    break;
                case 'increase':
                    increaseStat(p[1], p[2], parseInt(p[3]));
                    break;
                case 'multi':
                    multi(p[1]);
                    break;
                case 'recoil':
                    recoil(p[1]);
                    break;
                case 'recover':
                    recover(p[1], p[2]);
                    break;
                case 'sleep':
                    statusEffect(p[1], p[2], 'sleep');
                    break;
                case 'stun':
                    statusEffect(p[1], p[2], 'stun');
                    break;
                case 'wet':
                    statusEffect(p[1], p[2], 'wet');
                    break;
                case 'wound':
                    statusEffect(p[1], p[2], 'wound');
                    break;
                default:
                    break;
            }
        }
    });

}

function statusEffect(target, chance, eff) {
    var prob = Math.floor(Math.random() * 100) + 1;
    if (prob <= chance) {
        if (target == 'self') {
            var status = $(atkMonStatus).html();
            if (checkForStatus(status, eff.toUpperCase())) {
                alreadyHasStatus(atkMon, eff);
            } else {
                addStatus(atkMon, eff);
            }
        } else if (target == 'target') {
            var status = $(defMonStatus).html();
            if (checkForStatus(status, eff.toUpperCase())) {
                alreadyHasStatus(defMon, eff);
            } else {
                addStatus(defMon, eff);
            }
        }
    }
}

function addStatus(mon, eff) {
    if (eff == 'wet') {
        addBattleText(mon['name'] + " is " + eff + "!");
    } else if(eff == 'sleep') {
        addBattleText(mon['name'] + " fell a" + eff + "!");
    } else if(eff == 'stun') {
        addBattleText(mon['name'] + " is " + eff + "ned!");
    } else {
        addBattleText(mon['name'] + " is " + eff + "ed!");
    }
    if(mon['status'] == '') {
        mon['status'] = eff;
    } else {
        mon['status'] = mon['status'] + '-' + eff;
    }
}

function alreadyHasStatus(mon, eff) {
    if (eff == 'wet' || eff=='sleep') {
        addBattleText(mon['name'] + " is already a" + eff + "!");
    } else if(eff == 'stun') {
        addBattleText(mon['name'] + " is already " + eff + "ned!");
    } else {
        addBattleText(mon['name'] + " is already " + eff + "ed!");
    }
}

function checkStatus() {
    // will check for and apply status effects
    switch (atkMon['status']) {
        case 'burn':
            break;
        case 'sleep':
            break;
        case 'stun':
            break;
        case 'wound':
            break;
        default:
            break;
    }
}

function checkForStatus(container, eff) {
    var pos = container.indexOf(eff);
    if(pos >= 0) {
        return true;
    }
    return false;
}

function decreaseStat(stat, target, amount) {
    if (amount == 1) {
        var flavor = " decreased!";
    } else if (amount == 2) {
        var flavor = " greatly decreased!";
    } else if (amount == 3) {
        var flavor = " drastically decreased!";
    }

    if (target == 'self') {
        if (atkMonMods[stat]['count'] > minMod) {
            if ((atkMonMods[stat]['count'] - amount) >= minMod) {
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] -= (crtiEvaAccMod * amount);
                } else {
                    atkMonMods[stat]['mod'] -= (Math.round(atkMon[stat] * mod)) * amount;
                }
                atkMonMods[stat]['count'] -= amount;
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } else {
                var adjAmount = atkMonMods[stat]['count'] - minMod;
                atkMonMods[stat]['count'] = minMod;
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] -= (crtiEvaAccMod * adjAmount);
                } else {
                    atkMonMods[stat]['mod'] -= (Math.round(atkMon[stat] * mod)) * adjAmount;
                }
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor);
            }

            if (turn == 'player') {
                playerMods = atkMonMods;
            } else if (turn == 'enemy') {
                enemyMods = atkMonMods
            }
        } else {
            addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + " can't go any lower!");
        }

    } else if (target == 'target') {
        if (defMonMods[stat]['count'] > minMod) {
            if ((defMonMods[stat]['count'] - amount) >= minMod) {
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] -= (crtiEvaAccMod * amount);
                } else {
                    defMonMods[stat]['mod'] -= (Math.round(defMon[stat] * mod)) * amount;
                }
                defMonMods[stat]['count'] -= amount;
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } else {
                var adjAmount = defMonMods[stat]['count'] - minMod;
                defMonMods[stat]['count'] = minMod;
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] -= (crtiEvaAccMod * adjAmount);
                } else {
                    defMonMods[stat]['mod'] -= (Math.round(defMon[stat] * mod)) * adjAmount;
                }

                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor);
            }

            if (turn == 'player') {
                enemyMods = defMonMods;
            } else if (turn == 'enemy') {
                playerMods = defMonMods
            }
        } else {
            addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + " can't go any lower!");
        }
    }
}

function increaseStat(stat, target, amount) {
    if (amount == 1) {
        var flavor = " increased!";
    } else if (amount == 2) {
        var flavor = " greatly increased!";
    } else if (amount == 3) {
        var flavor = " drastically increased!";
    }

    if (target == 'self') {
        if (atkMonMods[stat]['count'] < maxMod) {
            if ((atkMonMods[stat]['count'] - amount) <= maxMod) {
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] += (crtiEvaAccMod * amount);
                } else {
                    atkMonMods[stat]['mod'] += (Math.round(atkMon[stat] * mod)) * amount;
                }
                atkMonMods[stat]['count'] += amount;
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } else {
                var adjAmount = maxMod - count;
                atkMonMods[stat]['count'] = maxMod;
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] += (crtiEvaAccMod * adjAmount);
                } else {
                    atkMonMods[stat]['mod'] += (Math.round(atkMon[stat] * mod)) * adjAmount;
                }
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor);
            }
            if (turn == 'player') {
                playerMods = atkMonMods;
            } else if (turn == 'enemy') {
                enemyMods = atkMonMods
            }
        } else {
            addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + " can't go any higher!");
        }
    } else if (target == 'target') {
        if (defMonMods[stat]['count'] < maxMod) {
            if ((defMonMods[stat]['count'] - amount) <= maxMod) {
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] += (crtiEvaAccMod * amount);
                } else {
                    defMonMods[stat]['mod'] += (Math.round(defMon[stat] * mod)) * amount;
                }
                defMonMods[stat]['count'] += amount;
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } else {
                var adjAmount = maxMod - count;
                defMonMods[stat]['count'] = maxMod;
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] += (crtiEvaAccMod * adjAmount);
                } else {
                    defMonMods[stat]['mod'] += (Math.round(defMon[stat] * mod)) * adjAmount;
                }
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor);
            }
            if (turn == 'player') {
                enemyMods = defMonMods;
            } else if (turn == 'enemy') {
                playerMods = defMonMods
            }
        } else {
            addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + " can't go any higher!");
        }
    }
    console.log(atkMonMods);
}

function multi(amount) {
    var hits = Math.floor(Math.random() * amount) + 1;
    for (i = 1; i < hits; i++) {
        calculateDamage();
    }
    addBattleText("Hit " + hits + " times!");
}

function recoil(amount) {
    addBattleText(atkMon['name'] + " took recoil damage.");
    var recoilDmg = Math.round(atkMon['maxHp'] * (amount / 100));
    addBattleAction({ 'damage-self': recoilDmg });
}

function recover(target, amount) {
    if(target == 'self') {
        addBattleText(atkMon['name'] + " recovered health!");
        addBattleAction({'heal-self': amount});
    } else {
        addBattleText(defMon['name'] + " recovered health!");
        addBattleAction({'heal-enemy': amount});
    }
}

function removeStatus(mon, status) {
    var str = mon['status'].split('-');
    var nStr = "";
    str.forEach(function (s) {
        if(s != status) {
            nStr = nStr + s + '-'
        }
    });
    nStr = nStr.slice(0, -1);
    mon['status'] = nStr;
    updateStatusDisplay();
}

function updateStatusDisplay() {
    var pMonStatus = pMons[currentPlayerMon]['status'];
    $('#player-status').html(pMonStatus.toUpperCase());
    if(wildMon) {
        var eMonStatus = wildMon['status'];
        $('#opponent-status').html(eMonStatus.toUpperCase());
    } else {
        var eMonStatus = npcMons[currentNpcMon]['status']
        $('#opponent-status').html(eMonStatus.toUpperCase());
    }
}

function wakeUp(mon) {
    addBattleText(mon['name'] + ' woke up!');
    removeStatus(mon, 'sleep');
}
