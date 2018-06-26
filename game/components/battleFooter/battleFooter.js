var currentPlayerMon = 1;
var currentNpcMon = 1;

var roundSegs = {};
var segIndex = 0;
var segInterval = 2500;

var rounds = 0;

var playerMove;
var enemyMove;

var mod = 0.1;
var minMod = -6;
var maxMod = 6;

var crtiEvaAccMod = 10;

var playerMods = {
    'atk' : {
        'mod' : 0,
        'count' : 0
    },
    'def' : {
        'mod' : 0,
        'count' : 0
    },
    'sAtk' : {
        'mod' : 0,
        'count' : 0
    },
    'sDef' : {
        'mod' : 0,
        'count' : 0
    },
    'speed' : {
        'mod' : 0,
        'count' : 0
    },
    'acc' : {
        'mod' : 0,
        'count' : 0
    },
    'crit' : {
        'mod' : 0,
        'count' : 0
    },
    'evasion' : {
        'mod' : 0,
        'count' : 0
    }
}

var enemyMods = {
    'atk' : {
        'mod' : 0,
        'count' : 0
    },
    'def' : {
        'mod' : 0,
        'count' : 0
    },
    'sAtk' : {
        'mod' : 0,
        'count' : 0
    },
    'sDef' : {
        'mod' : 0,
        'count' : 0
    },
    'speed' : {
        'mod' : 0,
        'count' : 0
    },
    'acc' : {
        'mod' : 0,
        'count' : 0
    },
    'crit' : {
        'mod' : 0,
        'count' : 0
    },
    'evasion' : {
        'mod' : 0,
        'count' : 0
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
    populateMoves(1);
});

$('#run-btn').click(function () {
    removeSection('#header');
    removeSection('#game-nav');
    removeSection('#game-foci');
    removeSection('#footer');
    $.post(locComp, {id: locId}, function(data) {
        $('#game-foci').append(data).hide().fadeIn('fast');
        insertHTML('#header', gHeaderComp, function() {
            insertHTML('#game-nav', navComp);
        });
    });
});


$('#opponent-img').on("animationend webkitAnimationEnd", function () {
    console.log('opponent end animation');
    $('#opponent-img').removeClass('battle-anim-slidein-right');
});

$('#player-img').on('animationend', function () {
    console.log('player end animation');
    $('#player-img').removeClass('battle-anim-slidein-left');
});

$('#fight-btn').click(function() {
    $('#battle-btns').fadeOut("fast", function() {
        $('#move-btns').fadeIn("fast");
    });
});

$('.move-btn').click(function() {
    var id = $(this).attr('data');
    playerMove = id;
    $('#move-btns').fadeOut("fast", function () {
        $('#battle-text').html("");
        $('#battle-text').fadeIn("fast");
        startRound();
    });
});



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
    if(turn == 'player') {
        atkMon = pMons[currentPlayerMon];
        atkMonMove = playerMove;
        atkMonMods = playerMods;
        atkMonStatus = $('#player-status');
        atkMonHealth = $('#player-health');
        if(wildMon) {
            defMon = wildMon;
        } else {
            defMon = npcMons[currentNpcMon];
        }
        defMonMove = enemyMove;
        defMonMods = enemyMods;
        defMonStatus = $('#opponent-status');
        defMonHealth = $('#opponent-health');
    }
    if(turn == 'enemy') {
        if(wildMon) {
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
    if(wildMon) {
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

    if(playerPriority == enemyPriority) {
        if(playerSpeed > enemySpeed) {
            turn = 'player';
        } else if(enemySpeed > playerSpeed) {
            turn = 'enemy';
        } else if(playerSpeed == enemySpeed) {
            var rand = Math.floor(Math.random() * 2);
            if(rand == 0) {
                turn = 'player';
            } else if(rand == 1) {
                turn = 'enemy';
            }
        }
    } else if(playerPriority > enemyPriority) {
        turn = 'player'
    } else if(enemyPriority > playerPriority) {
        turn = 'enemy';
    }
}

function round() {
    roundSegs = {};
    segIndex = 0;
    rounds++;
    if(rounds > 2) {
        endRound();
    } else if(rounds == 2) {
        switchTurn();
        declareAttacker();
        checkStatus();
        parseMove();
    } else if(rounds == 1) {
        declareAttacker();
        checkStatus();
        parseMove();
    }
}

function endRound() {
    
    rounds = 0;
    $('#battle-text').fadeOut('fast', function () {
        $('#battle-btns').fadeIn("fast");
    });
}

function switchTurn() {
    if(turn == 'player') {
        turn = 'enemy';
    } else if(turn == 'enemy') {
        turn = 'player';
    }
}

function addBattleText(str) {
    roundSegs[segIndex] = {'text': str};
    segIndex++;
}

function addBattleAction(action) {
    roundSegs[segIndex] = action;
    segIndex++;
}

function checkStatus() {
    // will check for and apply status effects
    switch (atkMon['status']) {
        case 'burn' :
            break;
        case 'stun' :
            break;
        case 'wound' :
            break;
        default:
            break;
    }
}

function randomMoveSelect(monMoves) {
    enemyMove = (Math.floor(Math.random() * Object.keys(monMoves).length) + 1);
}

function priorityCheck(monMoves, id) {
    if(monMoves[id]['e1']) {
        var e = monMoves[id]['e1'].split('-');
        if(e[0] == 'priority') {
            return e[1];
        }
    }
    if(monMoves[id]['e2']) {
        var e = monMoves[id]['e2'].split('-');
        if(e[0] == 'priority') {
            return e[1];
        }
    }
    if(monMoves[id]['e3']) {
        var e = monMoves[id]['e3'].split('-');
        if(e[0] == 'priority') {
            return e[1];
        }
    }
    return 0;
}

function playSegments() {
    var i = 0;
    segments = setInterval(function() {
        if(roundSegs[i]) {
            if('text' in roundSegs[i]) {
                typeWriter(roundSegs[i]['text'], "battle-text");
            } else if('damage-self' in roundSegs[i]) {
                applyDamage(roundSegs[i]['damage-self'], atkMon, atkMonHealth);
            } else if('damage-enemy' in roundSegs[i]) {
                applyDamage(roundSegs[i]['damage-enemy'], defMon, defMonHealth);
            }
            i++;
        } else {
            clearInterval(segments);
            round();
        }
    }, segInterval);
}

function die(){
    console.log("kilt 'em...");
}

function applyDamage(amount, mon, health) {
    mon['currentHp'] -= amount;
    var hPercent = Math.round((mon['currentHp'] / mon['maxHp']) * 100);
    if(mon['currentHp'] <= 0) {
        die();
    } else {
        if(hPercent <= 0) {
            hPercent = 1;
        }
    }
    health.attr('aria-valuenow', mon['currentHp']);
    health.css('width', hPercent + '%');
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
    var acc = atkMon['moves'][atkMonMove]['acc'];
    acc += atkMonMods['acc']['mod'];
    acc -= defMonMods['evasion']['mod'];
    if(acc > 100) {
        acc = 100;
    }
    return (chance <= acc) ? true : false;
}

function critCheck() {
    var crit = atkMon['moves'][atkMonMove]['crit']
    crit += atkMonMods['crit']['mod'];
    var chance = Math.floor(Math.random() * 100) + 1;
    if(chance <= crit) {
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
    if(atkMon['moves'][atkMonMove]['special'] == 1) {
        var a = parseInt(atkMon['sAtk']) + parseInt(atkMonMods['sAtk']['mod']);
        var d = parseInt(defMon['sDef']) + parseInt(defMonMods['sDef']['mod']);
    } else {
        var a = parseInt(atkMon['atk']) + parseInt(atkMonMods['atk']['mod']);
        var d = parseInt(defMon['def']) + parseInt(defMonMods['def']['mod']);
    }
    console.log(a);
    console.log(d)
    console.log(base)
    console.log(base * (a / d));
    roundDmg = Math.round(base * (a / d));
    console.log(roundDmg);
    if(roundDmg < 1) {
        roundDmg = 1; 
    }
    roundDmg *= typeCheck();
    if(roundDmg < 1) {
        roundDmg = 1; 
    }
    if(critCheck()) {
        roundDmg *= 2;
    }
    addBattleAction({'damage-enemy' : roundDmg});
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
                case 'burn' :
                    statusEffect(p[1], p[2], 'burn')
                    break;
                case 'decrease' :
                    decreaseStat(p[1], p[2], p[3])
                    break;
                case 'increase' :
                    increaseStat(p[1], p[2], p[3])
                    break;
                case 'multi' :
                    multi(p[1]);
                    break;
                case 'recoil' :
                    recoil(p[1]);
                    break;
                case 'stun' :
                    statusEffect(p[1], p[2], 'stun');
                    break;
                case 'wet' :
                    statusEffect(p[1], p[2], 'wet');
                    break;
                case 'wound' :
                    statusEffect(p[1], p[2], 'wound');
                    break;
                default :
                    break;
            }
        }
    });
    
}

function statusEffect(target, chance, eff) {
    var prob = Math.floor(Math.random() * 100) + 1;
    if(prob <= chance) {
        if(target == 'self') {
            addStatus(atkMon, atkMonStatus, eff);
        } else if(target == 'target') {
            addStatus(defMon, defMonStatus, eff);
        }
    }
}

function addStatus(mon, status, eff) {
    if(eff == 'wet') {
        addBattleText(mon['name'] + " is " + eff + "!");
    } else {
        addBattleText(mon['name'] + " is " + eff + "ed!");
    }
    mon['status'] = eff;
    status.html(eff.toUpperCase());
}

function decreaseStat(stat, target, amount) {
    if(amount == 1) {
        var flavor = " decreased!";
    } else if(amount == 2) {
        var flavor = " greatly decreased!";
    } else if(amount == 3) {
        var flavor = " drastically decreased!";
    }

    if(target == 'self') {
        if(atkMonMods[stat]['count'] > minMod) {
            if((atkMonMods[stat]['count'] - amount) >= minMod) {
                if(stat == 'evasion' || stat =='crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] -= (crtiEvaAccMod * amount);
                } else {
                    atkMonMods[stat]['mod'] -= (Math.round(atkMon[stat] * mod)) * amount;
                }
                atkMonMods[stat]['count'] -= amount;
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } else {
                var adjAmount = atkMonMods[stat]['count'] - minMod;
                atkMonMods[stat]['count'] = minMod;
                if(stat == 'evasion' || stat =='crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] -= (crtiEvaAccMod * adjAmount);
                } else {
                    atkMonMods[stat]['mod'] -= (Math.round(atkMon[stat] * mod)) * adjAmount;
                }
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } 

            if(turn == 'player') {
                playerMods = atkMonMods;
            } else if(turn == 'enemy') {
                enemyMods = atkMonMods
            }
        } else {
            addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + " can't go any lower!");
        }
         
    } else if(target == 'target') {
        if(defMonMods[stat]['count'] > minMod) {
            if((defMonMods[stat]['count'] - amount) >= minMod){
                if(stat == 'evasion' || stat =='crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] -= (crtiEvaAccMod * amount);
                } else {
                    defMonMods[stat]['mod'] -= (Math.round(defMon[stat] * mod)) * amount;
                }
                defMonMods[stat]['count'] -= amount;
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } else {
                var adjAmount = defMonMods[stat]['count'] - minMod;
                defMonMods[stat]['count'] = minMod;
                if(stat == 'evasion' || stat =='crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] -= (crtiEvaAccMod * adjAmount);
                } else {
                    defMonMods[stat]['mod'] -= (Math.round(defMon[stat] * mod)) * adjAmount;
                }
                
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } 

            if(turn == 'player') {
                enemyMods = defMonMods;
            } else if(turn == 'enemy') {
                playerMods = defMonMods
            }
        } else {
            addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + " can't go any lower!");
        }
    }
}

function increaseStat(stat, target, amount) {
    if(amount == 1) {
        var flavor = " increased!";
    } else if(amount == 2) {
        var flavor = " greatly increased!";
    } else if(amount == 3) {
        var flavor = " drastically increased!";
    }

    if(target == 'self') {
        if(atkMonMods[stat]['count'] < maxMod) {
            if((atkMonMods[stat]['count'] - amount) <= maxMod){
                if(stat == 'evasion' || stat =='crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] += (crtiEvaAccMod * amount);
                } else {
                    atkMonMods[stat]['mod'] += (Math.round(atkMon[stat] * mod)) * amount;
                }
                atkMonMods[stat]['count'] += amount;
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } else {
                var adjAmount = maxMod - atkMonMods[stat]['count'];
                atkMonMods[stat]['count'] = maxMod;
                if(stat == 'evasion' || stat =='crit' || stat == 'acc') {
                    atkMonMods[stat]['mod'] += (crtiEvaAccMod * adjAmount);
                } else {
                    atkMonMods[stat]['mod'] += (Math.round(atkMon[stat] * mod)) * adjAmount;
                }
                addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + flavor);
            }
            if(turn == 'player') {
                playerMods = atkMonMods;
            } else if(turn == 'enemy') {
                enemyMods = atkMonMods
            }
        } else {
            addBattleText(atkMon['name'] + "'s " + stat.toUpperCase() + " can't go any higher!");
        }
    } else if(target == 'target') {
        if(defMonMods[stat]['count'] < maxMod) {
            if((defMonMods[stat]['count'] - amount) <= maxMod){
                if(stat == 'evasion' || stat =='crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] += (crtiEvaAccMod * amount);
                } else {
                    defMonMods[stat]['mod'] += (Math.round(defMon[stat] * mod)) * amount;
                }
                defMonMods[stat]['count'] += amount;
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } else {
                var adjAmount = maxMod - defMonMods[stat]['count'];
                defMonMods[stat]['count'] = maxMod;
                if(stat == 'evasion' || stat =='crit' || stat == 'acc') {
                    defMonMods[stat]['mod'] += (crtiEvaAccMod * adjAmount);
                } else {
                    defMonMods[stat]['mod'] += (Math.round(defMon[stat] * mod)) * adjAmount;
                }
                addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + flavor);
            } 
            if(turn == 'player') {
                enemyMods = defMonMods;
            } else if(turn == 'enemy') {
                playerMods = defMonMods
            }
        } else {
            addBattleText(defMon['name'] + "'s " + stat.toUpperCase() + " can't go any higher!");
        }
    }
}

function multi(amount) {
    var hits = Math.floor(Math.random() * amount) + 1;
    for(i = 1; i < hits; i++) {
        calculateDamage();
    }
    addBattleText("Hit " + hits + " times!");
}

function recoil(amount) {
    addBattleText(atkMon['name'] + " took recoil damage.");
    var recoilDmg = Math.round(atkMon['maxHp'] * (amount / 100));
    addBattleAction({'damage-self': recoilDmg});
}