var currentPlayerMon = 1;
var currentNpcMon = 1;

var turn = 'player';

var endFight = false;
var switching = false;

var roundSegs = {};
var segIndex = 0;
var segInterval = 2000;
var segments;

var rounds = 0;

var playerMove;
var enemyMove;

var mod = 0.1;
var minMod = -6;
var maxMod = 6;

var crtiEvaAccMod = 10;

var playerMods = {
    'atk': {
        'mod': 0,
        'count': 0
    },
    'def': {
        'mod': 0,
        'count': 0
    },
    'sAtk': {
        'mod': 0,
        'count': 0
    },
    'sDef': {
        'mod': 0,
        'count': 0
    },
    'speed': {
        'mod': 0,
        'count': 0
    },
    'acc': {
        'mod': 0,
        'count': 0
    },
    'crit': {
        'mod': 0,
        'count': 0
    },
    'evasion': {
        'mod': 0,
        'count': 0
    }
}

var enemyMods = {
    'atk': {
        'mod': 0,
        'count': 0
    },
    'def': {
        'mod': 0,
        'count': 0
    },
    'sAtk': {
        'mod': 0,
        'count': 0
    },
    'sDef': {
        'mod': 0,
        'count': 0
    },
    'speed': {
        'mod': 0,
        'count': 0
    },
    'acc': {
        'mod': 0,
        'count': 0
    },
    'crit': {
        'mod': 0,
        'count': 0
    },
    'evasion': {
        'mod': 0,
        'count': 0
    }
}

var atkMon;
var defMon;
var atkMonMove;
var defMonMove;
var atkMonMods;
var defMonMods;
var atkMonStatus;
var defMonStatus;
var atkMonHealth;
var defMonHealth;

var roundDmg = 0;


$(document).ready(function() {
    $('#move-btns').hide();
    $('.switch-mon-btn').each(function () {
        if($(this).attr('data') == currentPlayerMon) {
            $(this).prop('disabled', true);
        }
    });
    populateMoves(1);
});

$('#run-btn').click(function() {
    removeSection('#header');
    removeSection('#game-nav');
    removeSection('#game-foci');
    removeSection('#footer');
    $.post(locComp, { id: locId }, function(data) {
        $('#game-foci').append(data).hide().fadeIn('fast');
        insertHTML('#header', gHeaderComp, function() {
            insertHTML('#game-nav', navComp);
        });
    });
});


$('#fight-btn').click(function() {
    $('#battle-btns').fadeOut("fast", function() {
        $('#move-btns').fadeIn("fast");
    });
});

$('#back-battle-btn').click(function() {
    $('#move-btns').fadeOut("fast", function() {
        $('#battle-btns').fadeIn("fast");
    });
});

$('#nuzmon-btn').click(function () {
    $('#battle-main').fadeOut('fast');
    $('#battle-footer').fadeOut('fast', function () {
        $('#item-select').hide();
        $('#game-nav').fadeIn('fast', function () {
            $('#battle-util').fadeIn('fast');
        });
    });
});

$('.move-btn').click(function() {
    var id = $(this).attr('data');
    playerMove = id;
    $('#move-btns').fadeOut("fast", function() {
        $('#battle-text').html("");
        $('#battle-text').fadeIn("fast");
        startRound();
    });
});

$('.nuz-list-item').click(function () {
    jQuery('.collapse').collapse('hide');
});

$('.switch-mon-btn').click(function () {
    switching = true;
    addBattleText(pMons[currentPlayerMon]['name'] + " come back!");
    addBattleAction({'switch-mon-player': 'out'});
    var id = $(this).attr('data');
    currentPlayerMon = id;
    addBattleText(pMons[currentPlayerMon]['name'] + ", go!");
    addBattleAction({'switch-mon-player': 'in'});
    $('#battle-btns').hide();
    $('#game-nav').fadeOut('fast', function (){
        $('#battle-main').fadeIn('fast');
        $('#battle-footer').fadeIn('fast', function () {
            $('#battle-text').html("");
            $('#battle-text').fadeIn("fast");
            playSegments();
        });
    });
});

function switchPlayerMons() {
    $('#player-health').attr('aria-valuenow', pMons[currentPlayerMon]['currentHp']);
    $('#player-health').attr('aria-valuemax', pMons[currentPlayerMon]['maxHp']);
    
    var pHealth = Math.round((pMons[currentPlayerMon]['currentHp'] / pMons[currentPlayerMon]['maxHp']) * 100);
    $('#player-health').css('width', pHealth + '%');
    $('#player-img').attr('src', "img/mons/" + pMons[currentPlayerMon]['img']);
    $('#player-name').html(pMons[currentPlayerMon]['name']);
    $('#player-status').html(pMons[currentPlayerMon]['status']);
    populateMoves(currentPlayerMon);
    $('.switch-mon-btn').each(function () {
        if($(this).attr('data') == currentPlayerMon) {
            $(this).prop('disabled', true);
        } else {
            $(this).prop('disabled', false);
        }
    });
}

function populateMoves(id) {
    $('#move1-btn').html(pMons[id]['moves']['1']['name']);
    if (pMons[id]['moves']['2']) {
        $('#move2-btn').html(pMons[id]['moves']['2']['name']);
    } else {
        $('#move2-btn').html('~');
        $('#move2-btn').prop("disabled", true);
    }
    if (pMons[id]['moves']['3']) {
        $('#move3-btn').html(pMons[id]['moves']['3']['name']);
    } else {
        $('#move3-btn').html('~');
        $('#move3-btn').prop("disabled", true);
    }
    if (pMons[id]['moves']['4']) {
        $('#move4-btn').html(pMons[id]['moves']['4']['name']);
    } else {
        $('#move4-btn').html('~');
        $('#move4-btn').prop("disabled", true);
    }
}

function startRound() {
    whoseTurn();
    round();
}

function declareAttacker() {
    if (turn == 'player') {
        atkMon = pMons[currentPlayerMon];
        atkMonMove = playerMove;
        atkMonMods = playerMods;
        atkMonStatus = $('#player-status');
        atkMonHealth = $('#player-health');
        if (wildMon) {
            defMon = wildMon;
        } else {
            defMon = npcMons[currentNpcMon];
        }
        defMonMove = enemyMove;
        defMonMods = enemyMods;
        defMonStatus = $('#opponent-status');
        defMonHealth = $('#opponent-health');
    }
    if (turn == 'enemy') {
        if (wildMon) {
            atkMon = wildMon
        } else {
            atkMon = npcMons[currentNpcMon];
        }
        atkMonMove = enemyMove;
        atkMonMods = enemyMods
        atkMonStatus = $('#opponent-status');
        atkMonHealth = $('#opponent-health');
        defMon = pMons[currentPlayerMon];
        defMonMove = playerMove;
        defMonMods = playerMods;
        defMonStatus = $('#player-status');
        defMonHealth = $('#player-health');
    }
}

function whoseTurn() {
    if (wildMon) {
        randomMoveSelect(wildMon['moves']);
        var enemySpeed = parseInt(wildMon['speed']) + parseInt(enemyMods['speed']['mod']);
        var enemyPriority = priorityCheck(wildMon['moves'], enemyMove);
    } else {
        randomMoveSelect(npcMons[currentNpcMon]['moves']);
        var enemySpeed = parseInt(npcMons[currentNpcMon]['speed']) + parseInt(enemyMods['speed']['mod']);
        var enemyPriority = priorityCheck(npcMons[currentNpcMon]['moves'], enemyMove);
    }

    var playerSpeed = parseInt(pMons[currentPlayerMon]['speed']) + parseInt(playerMods['speed']['mod']);
    var playerPriority = priorityCheck(pMons[currentPlayerMon]['moves'], playerMove);

    if (playerPriority == enemyPriority) {
        if (playerSpeed > enemySpeed) {
            turn = 'player';
        } else if (enemySpeed > playerSpeed) {
            turn = 'enemy';
        } else if (playerSpeed == enemySpeed) {
            var rand = Math.floor(Math.random() * 2);
            if (rand == 0) {
                turn = 'player';
            } else if (rand == 1) {
                turn = 'enemy';
            }
        }
    } else if (playerPriority > enemyPriority) {
        turn = 'player'
    } else if (enemyPriority > playerPriority) {
        turn = 'enemy';
    }
}

function round() {
    roundSegs = {};
    segIndex = 0;
    rounds++;
    if (rounds > 2) {
        endRound();
    } else if (rounds == 2) {
        switchTurn();
        declareAttacker();
        checkStatus();
        parseMove();
    } else if (rounds == 1) {
        declareAttacker();
        checkStatus();
        parseMove();
    }
}

function endRound() {
    rounds = 0;
    roundSegs = {};
    segIndex = 0;
    $('#battle-text').fadeOut('fast', function() {
        $('#battle-btns').fadeIn("fast");
    });
}

function switchTurn() {
    if (turn == 'player') {
        turn = 'enemy';
    } else if (turn == 'enemy') {
        turn = 'player';
    }
}

function addBattleText(str) {
    roundSegs[segIndex] = { 'text': str };
    segIndex++;
}

function addBattleAction(action) {
    roundSegs[segIndex] = action;
    segIndex++;
}

function checkStatus() {
    // will check for and apply status effects
    switch (atkMon['status']) {
        case 'burn':
            break;
        case 'stun':
            break;
        case 'wound':
            break;
        default:
            break;
    }
}

function randomMoveSelect(monMoves) {
    enemyMove = (Math.floor(Math.random() * Object.keys(monMoves).length) + 1);
}

function priorityCheck(monMoves, id) {
    if (monMoves[id]['e1']) {
        var e = monMoves[id]['e1'].split('-');
        if (e[0] == 'priority') {
            return e[1];
        }
    }
    if (monMoves[id]['e2']) {
        var e = monMoves[id]['e2'].split('-');
        if (e[0] == 'priority') {
            return e[1];
        }
    }
    if (monMoves[id]['e3']) {
        var e = monMoves[id]['e3'].split('-');
        if (e[0] == 'priority') {
            return e[1];
        }
    }
    return 0;
}

function playSegments() {
    var i = 0;
    console.log(roundSegs);
    segments = setInterval(function() {
        if (roundSegs[i]) {
            if ('text' in roundSegs[i]) {
                typeWriter(roundSegs[i]['text'], "battle-text");
            } else if ('damage-self' in roundSegs[i]) {
                applyDamage(roundSegs[i]['damage-self'], atkMon, atkMonHealth);
            } else if ('damage-enemy' in roundSegs[i]) {
                applyDamage(roundSegs[i]['damage-enemy'], defMon, defMonHealth);
            } else if ('animation-enemy' in roundSegs[i]) {
                if (turn == 'player') {
                    var el = $('#opponent-img');
                } else if (turn == 'enemy') {
                    var el = $('#player-img');
                    var player = true;
                }
                el = resetAnimation(el);
                if (player) {
                    el.addClass("flip-img battle-img " + roundSegs[i]['animation-enemy']);
                } else {
                    el.addClass("battle-img " + roundSegs[i]['animation-enemy']);
                }
            } else if ('animation-self' in roundSegs[i]) {
                if (turn == 'player') {
                    var el = $('#player-img');
                    var player = true;
                } else if (turn == 'enemy') {
                    var el = $('#opponent-img');
                }
                el = resetAnimation(el);
                if (player) {
                    el.addClass("flip-img battle-img " + roundSegs[i]['animation-self']);
                } else {
                    el.addClass("battle-img " + roundSegs[i]['animation-self']);
                }
            } else if('heal-self' in roundSegs[i]) {
                applyHeal(roundSegs[i]['heal-self'], atkMon, atkMonHealth);
            } else if('heal-enemy' in roundSegs[i]) {
                applyHeal(roundSegs[i]['heal-enemy'], defMon, defMonHealth);
            } else if ('die-enemy' in roundSegs[i]) {
                if (turn == 'player') {
                    var enemy = $('#opponent-img');
                } else if (turn == 'enemy') {
                    var enemy = ('#player-img');
                }
                enemy.fadeOut('slow');
            } else if ('die-self' in roundSegs[i]) {
                if (turn == 'player') {
                    var selfMon = $('#player-img');
                } else if (turn == 'enemy') {
                    var selfMon = ('#opponent-img');
                }
                selfMon.fadeOut('slow');
            } else if('switch-mon-player' in roundSegs[i]) {
                if(roundSegs[i]['switch-mon-player'] == 'in') {
                    switching = true;
                    switchPlayerMons();
                    $('#player-info-div').animate({opacity: 1});
                    $('#player-img-div').animate({opacity: 1});
                } else if (roundSegs[i]['switch-mon-player'] == 'out') {
                    $('#player-info-div').animate({opacity: 0});
                    $('#player-img-div').animate({opacity: 0});
                    resetMods(playerMods);
                }
            }
            i++;
        } else {
            clearInterval(segments);
            if (endFight) {

            } else if(switching){
                switching = false;
                endRound();
            } else {
                round();
            }
        }
    }, segInterval);
}

function die(mon) {
    console.log("kilt 'em...");
    if (mon == atkMon) {
        addBattleAction({ 'die-self': 'die' });
        addBattleText(atkMon['name'] + " was defeated!");
    } else if (mon == defMon) {
        addBattleAction({ 'die-enemy': 'die' });
        addBattleText(defMon['name'] + " was defeated!");
    }
    endFight = true;
}

function applyDamage(amount, mon, health) {
    mon['currentHp'] -= amount;
    var hPercent = Math.round((mon['currentHp'] / mon['maxHp']) * 100);
    if (mon['currentHp'] <= 0) {
        die(mon);
    } else {
        if (hPercent <= 0) {
            hPercent = 1;
        }
    }
    health.attr('aria-valuenow', mon['currentHp']);
    health.css('width', hPercent + '%');
    if(turn == 'enemy') {
        updateMonView();
    }
}

function applyHeal(amount, mon, health) {
    var recover = Math.round(mon['maxHp'] * (amount / 100));
    if((mon['currentHp'] + recover) > mon['maxHp']) {
        mon['currentHp'] = mon['maxHp'];
    } else {
        mon['currentHp'] += recover;
    }
    var hPercent = Math.round((mon['currentHp'] / mon['maxHp']) * 100);
    health.attr('aria-valuenow', mon['currentHp']);
    health.css('width', hPercent + '%');
    if(turn == 'player') {
        updateMonView();
    }
}

function updateMonView() {
    $("#" + currentPlayerMon + "-hp").html(pMons[currentPlayerMon]['currentHp'] + "/" + pMons[currentPlayerMon]['maxHp'] )
}

function parseMove() {
    addBattleText(atkMon['name'] + " used " + atkMon['moves'][atkMonMove]['name'] + "!");
    if (hitOrMiss()) {
        if (atkMon['moves'][atkMonMove]['dmg'] > 0) {
            calculateDamage();
        }
        parseEffect();
    } else {
        if (atkMon['moves'][atkMonMove]['dmg'] > 0) {
            addBattleText("It missed...");
        } else {
            addBattleText("It failed...");
        }
    }
    playSegments();
}

function hitOrMiss() {
    var chance = Math.floor(Math.random() * 100) + 1;
    var acc = parseInt(atkMon['moves'][atkMonMove]['acc']);
    acc += parseInt(atkMonMods['acc']['mod']);
    acc -= parseInt(defMonMods['evasion']['mod']);
    if (acc > 100) {
        acc = 100;
    } else if(acc < 1) {
        acc = 1;
    }
    return (chance <= acc) ? true : false;
}

function critCheck() {
    var crit = atkMon['moves'][atkMonMove]['crit']
    crit += atkMonMods['crit']['mod'];
    var chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= crit) {
        addBattleText("Critical hit!");
        return true;
    }
    return false;
}

function typeCheck() {
    // will return the amount dmg should be multiplied

    return 1;
}

function calculateDamage() {
    var base = atkMon['moves'][atkMonMove]['dmg'];
    if (atkMon['moves'][atkMonMove]['special'] == 1) {
        var a = parseInt(atkMon['sAtk']) + parseInt(atkMonMods['sAtk']['mod']);
        var d = parseInt(defMon['sDef']) + parseInt(defMonMods['sDef']['mod']);
    } else {
        var a = parseInt(atkMon['atk']) + parseInt(atkMonMods['atk']['mod']);
        var d = parseInt(defMon['def']) + parseInt(defMonMods['def']['mod']);
    }

    roundDmg = Math.round(base * (a / d));
    if (roundDmg < 1) {
        roundDmg = 1;
    }
    roundDmg *= typeCheck();
    if (roundDmg < 1) {
        roundDmg = 1;
    }
    if (critCheck()) {
        roundDmg *= 2;
    }
    addBattleAction({ 'animation-enemy': 'battle-anim-hit-enemy' });
    addBattleAction({ 'damage-enemy': roundDmg });
}

function resetAnimation(element) {
    element.removeClass();
    var newElem = element.clone(false);
    element.replaceWith(newElem);
    return newElem;
}

// effect stuff 
// (priority is checked in method above)

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

function resetMods(mod) {
    mod['atk']['mod'] = 0;
    mod['atk']['count'] = 0;
    mod['def']['mod'] = 0;
    mod['def']['count'] = 0;
    mod['sAtk']['mod'] = 0;
    mod['sAtk']['count'] = 0;
    mod['sDef']['mod'] = 0;
    mod['sDef']['count'] = 0;
    mod['speed']['mod'] = 0;
    mod['speed']['count'] = 0;
    mod['acc']['mod'] = 0;
    mod['acc']['count'] = 0;
    mod['crit']['mod'] = 0;
    mod['crit']['count'] = 0;
    mod['evasion']['mod'] = 0;
    mod['evasion']['count'] = 0;
}