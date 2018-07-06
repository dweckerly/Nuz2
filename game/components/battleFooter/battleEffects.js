var sleepRounds = 0;

function parseEffect(subject) {
    var e1 = atkMon['moves'][atkMonMove]['e1'];
    var e2 = atkMon['moves'][atkMonMove]['e2'];
    var e3 = atkMon['moves'][atkMonMove]['e3'];
    var effects = [e1, e2, e3];
    effects.forEach(e => {
        if (e) {
            var p = e.split('-');
            switch (p[0]) {
                case 'burn':
                    statusEffect(p[1], p[2], 'burn', subject);
                    break;
                case 'decrease':
                    decreaseStat(p[1], p[2], parseInt(p[3]), subject);
                    break;
                case 'increase':
                    increaseStat(p[1], p[2], parseInt(p[3]), subject);
                    break;
                case 'multi':
                    multi(p[1], subject);
                    break;
                case 'recoil':
                    recoil(p[1], subject);
                    break;
                case 'recover':
                    recover(p[1], p[2], subject);
                    break;
                case 'sleep':
                    statusEffect(p[1], p[2], 'sleep', subject);
                    break;
                case 'stun':
                    statusEffect(p[1], p[2], 'stun', subject);
                    break;
                case 'wet':
                    statusEffect(p[1], p[2], 'wet', subject);
                    break;
                case 'wound':
                    statusEffect(p[1], p[2], 'wound', subject);
                    break;
                default:
                    break;
            }
        }
    });

}

function statusEffect(target, chance, eff, subject) {
    var prob = Math.floor(Math.random() * 100) + 1;
    if (prob <= chance) {
        if (target == 'self') {
            var status = $(atkMonStatus).html();
            if (checkForStatus(status, eff.toUpperCase())) {
                alreadyHasStatus(atkMon, eff, subject);
            } else {
                addStatus(atkMon, eff, subject);
            }
        } else if (target == 'target') {
            var status = $(defMonStatus).html();
            if (checkForStatus(status, eff.toUpperCase())) {
                alreadyHasStatus(defMon, eff, subject);
            } else {
                addStatus(defMon, eff, subject);
            }
        }
    }
}

function addStatus(mon, eff, subject) {
    if (eff == 'wet') {
        addBattlAction({'apply-effect':{'text':mon['name'] + " is " + eff + "!", 'mon':mon}}, subject);
    } else if(eff == 'sleep') {
        addBattleAction({'apply-effect':{'text':mon['name'] + " fell a" + eff + "!", 'mon':mon}}, subject);
    } else if(eff == 'stun') {
        addBattleAction({'apply-effect':{'text':mon['name'] + " is " + eff + "!", 'mon':mon}}, subject);
    } else {
        addBattleAction({'apply-effect':{'text':mon['name'] + " is " + eff + "!", 'mon':mon}}, subject);
    }
    if(mon['status'] == '') {
        mon['status'] = eff;
    } else {
        mon['status'] = mon['status'] + '-' + eff;
    }
}

function alreadyHasStatus(mon, eff, subject) {
    if (eff == 'wet' || eff=='sleep') {
        addBattleText(mon['name'] + " is already a" + eff + "!", subject);
    } else if(eff == 'stun') {
        addBattleText(mon['name'] + " is already " + eff + "ned!", subject);
    } else {
        addBattleText(mon['name'] + " is already " + eff + "ed!", subject);
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

function decreaseStat(stat, target, amount, subject) {
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
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor, subject);
            } else {
                var adjAmount = atkMonMods[stat]['count'] - minMod;
                atkMonMods[stat]['count'] = minMod;
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] -= (crtiEvaAccMod * adjAmount);
                } else {
                    atkMonMods[stat]['mod'] -= (Math.round(atkMon[stat] * mod)) * adjAmount;
                }
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor, subject);
            }

            if (turn == 'player') {
                playerMods = atkMonMods;
            } else if (turn == 'enemy') {
                enemyMods = atkMonMods
            }
        } else {
            addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + " can't go any lower!", subject);
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
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor, subject);
            } else {
                var adjAmount = defMonMods[stat]['count'] - minMod;
                defMonMods[stat]['count'] = minMod;
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] -= (crtiEvaAccMod * adjAmount);
                } else {
                    defMonMods[stat]['mod'] -= (Math.round(defMon[stat] * mod)) * adjAmount;
                }

                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor, subject);
            }

            if (turn == 'player') {
                enemyMods = defMonMods;
            } else if (turn == 'enemy') {
                playerMods = defMonMods
            }
        } else {
            addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + " can't go any lower!", subject);
        }
    }
}

function increaseStat(stat, target, amount, subject) {
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
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor, subject);
            } else {
                var adjAmount = maxMod - count;
                atkMonMods[stat]['count'] = maxMod;
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] += (crtiEvaAccMod * adjAmount);
                } else {
                    atkMonMods[stat]['mod'] += (Math.round(atkMon[stat] * mod)) * adjAmount;
                }
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor, subject);
            }
            if (turn == 'player') {
                playerMods = atkMonMods;
            } else if (turn == 'enemy') {
                enemyMods = atkMonMods
            }
        } else {
            addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + " can't go any higher!", subject);
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
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor, subject);
            } else {
                var adjAmount = maxMod - count;
                defMonMods[stat]['count'] = maxMod;
                if (stat == 'evasion' || stat == 'crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] += (crtiEvaAccMod * adjAmount);
                } else {
                    defMonMods[stat]['mod'] += (Math.round(defMon[stat] * mod)) * adjAmount;
                }
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor, subject);
            }
            if (turn == 'player') {
                enemyMods = defMonMods;
            } else if (turn == 'enemy') {
                playerMods = defMonMods
            }
        } else {
            addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + " can't go any higher!", subject);
        }
    }
}

function multi(amount, subject) {
    var hits = Math.floor(Math.random() * amount) + 1;
    for (i = 1; i < hits; i++) {
        calculateDamage();
    }
    addBattleText("Hit " + hits + " times!", subject);
}

function recoil(amount, subject) {
    addBattleText(atkMon['name'] + " took recoil damage.", subject);
    var recoilDmg = Math.round(atkMon['maxHp'] * (amount / 100));
    addBattleAction({ 'damage-self': recoilDmg }, subject);
}

function recover(target, amount, subject) {
    if(target == 'self') {
        addBattleText(atkMon['name'] + " recovered health!", subject);
        addBattleAction({'heal-self': amount}, subject);
    } else {
        addBattleText(defMon['name'] + " recovered health!", subject);
        addBattleAction({'heal-enemy': amount}, subject);
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
    updateStatusDisplay(mon);
}

function updateStatusDisplay(mon) {
    if(mon == pMons[currentPlayerMon]) {
        var monStatus = pMons[currentPlayerMon]['status'];
        $('#player-status').html(monStatus.toUpperCase());
    } else if(mon == wildMon) {
        var monStatus = wildMon['status'];
        $('#opponent-status').html(monStatus.toUpperCase());
    } else if (mon == npcMons[currentNpcMon]) {
        var monStatus = npcMons[currentNpcMon]['status']
        $('#opponent-status').html(monStatus.toUpperCase());
    }
}

function wakeUp(mon, subject) {
    addBattleText(mon['name'] + ' woke up!', subject);
    removeStatus(mon, 'sleep');
}
