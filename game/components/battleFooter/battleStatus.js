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
                    statusEffect(p[1], p[2], 'burn')
                    break;
                case 'decrease':
                    decreaseStat(p[1], p[2], p[3])
                    break;
                case 'increase':
                    increaseStat(p[1], p[2], p[3])
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
            if (atkMonStatus != eff) {
                addStatus(atkMon, atkMonStatus, eff);
            }
        } else if (target == 'target') {
            if (defMonStatus != eff) {
                addStatus(defMon, defMonStatus, eff);
            }
        }
    }
}

function addStatus(mon, status, eff) {
    if (eff == 'wet') {
        addBattleText(mon['name'] + " is " + eff + "!");
    } else if(eff == 'sleep') {
        addBattleText(mon['name'] + " fell a" + eff + "!");
    } else if(eff == 'stun') {
        addBattleText(mon['name'] + " is " + eff + "ned!");
    } else {
        addBattleText(mon['name'] + " is " + eff + "ed!");
    }
    mon['status'] = eff;
    status.html(eff.toUpperCase());
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
                var adjAmount = maxMod - atkMonMods[stat]['count'];
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
                var adjAmount = maxMod - defMonMods[stat]['count'];
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