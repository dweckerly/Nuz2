$('.move-btn').click(function() {
    var id = $(this).attr('data');
    playerMove = id;
    $('#move-btns').fadeOut("fast", function() {
        $('#battle-text').html("");
        $('#battle-text').fadeIn("fast");
        startRound();
    });
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
                    var monImg = $('#opponent-img');
                    var monInfo = $('#opponent-info-div');
                } else if (turn == 'enemy') {
                    var monImg = ('#player-img');
                    var monInfo = $('#player-info-div');
                }
                monImg.animate({opacity: 0});
                monInfo.animate({opacity: 0});
            } else if ('die-self' in roundSegs[i]) {
                if (turn == 'player') {
                    var monImg = $('#player-img');
                    var monInfo = $('#player-info-div');
                } else if (turn == 'enemy') {
                    var monImg = ('#opponent-img');
                    var monInfo = $('#opponent-info-div');
                }
                monImg.animate({opacity: 0});
                monInfo.animate({opacity: 0});
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
                backToLocation();
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

    if(mon == pMons[currentPlayerMon]) {

    } else if(mon == wildMon) {
        endFight = true;
    }
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


function parseMove() {
    addBattleText(atkMon['name'] + " used " + atkMon['moves'][atkMonMove]['name'] + "!");
    if (checkMiss()) {
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
    roundDmg *= checkType();
    if (roundDmg < 1) {
        roundDmg = 1;
    }
    if(checkStab()) {
        roundDmg *= 1.5;
        roundDmg = Math.round(roundDmg);
    } 
    if (checkCrit()) {
        roundDmg *= 2;
    }
    addBattleAction({ 'animation-enemy': 'battle-anim-hit-enemy' });
    addBattleAction({ 'damage-enemy': roundDmg });
}
