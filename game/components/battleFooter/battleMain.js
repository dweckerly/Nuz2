$('.move-btn').click(function() {
    var id = $(this).attr('data');
    playerMove = id;
    $('#move-btns').fadeOut("fast", function() {
        $('#battle-text').html("");
        $('#battle-text').fadeIn("fast");
        startRound();
    });
});

$('.switch-mon-btn').click(function() {
    $('#back-util').prop('disabled', false);
    switching = true;
    if (pMons[currentPlayerMon]['alive'] == 1) {
        addBattleText(pMons[currentPlayerMon]['name'] + " come back!");
        addBattleAction({ 'switch-mon-player': 'out' });
    }
    var id = $(this).attr('data');
    currentPlayerMon = id;
    addBattleText(pMons[currentPlayerMon]['name'] + ", go!");
    addBattleAction({ 'switch-mon-player': 'in' });
    $('#battle-btns').hide();
    $('#game-nav').fadeOut('fast', function() {
        $('#battle-main').fadeIn('fast');
        $('#battle-footer').fadeIn('fast', function() {
            $('#battle-text').html("");
            $('#battle-text').fadeIn("fast");
            playSegments();
        });
    });
});

$('.item-btn').click(function() {
    clearSegment();
    var id = $(this).attr('data');
    var effect = $(this).attr('data-effect');
    var iName = $(this).attr('data-name');
    $.post(useItemTrans, { id: id }, function(data) {
        updateItemView(data);
    });
    addBattleText('You use the ' + iName + '!');
    var ef = effect.split('-');
    if (ef[0] == 'catch') {
        var rate = ((((wildMon['currentHp'] / wildMon['maxHp']) * 100) - 100) * (-1));
        rate += parseInt(ef[1]);
        var rand = Math.floor(Math.random() * 100) + 1;
        if (rand <= rate) {
            addBattleText('You caught ' + wildMon['name'] + '!');

            //will retrun whether or not it went into the party
            $.post(catchMonTrans, { wildMon: wildMon }, function(data) {
                addBattleText(data);
            });
            endFight = true;
        } else {
            addBattleAction({ 'escape': wildMon['name'] + ' escaped!' });
        }
    }

    $('#battle-btns').hide();
    $('#game-nav').fadeOut('fast', function() {
        $('#battle-main').fadeIn('fast');
        $('#battle-footer').fadeIn('fast', function() {
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
    clearSegment();
    canAttack = true;
    rounds++;
    if (rounds > 2) {
        endRound();
    } else if (rounds == 2) {
        switchTurn();
        declareAttacker();
        checkStatus();
        if (canAttack) {
            parseMove();
        }
    } else if (rounds == 1) {
        declareAttacker();
        checkStatus();
        if (canAttack) {
            parseMove();
        }
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
            } else if ('heal-self' in roundSegs[i]) {
                applyHeal(roundSegs[i]['heal-self'], atkMon, atkMonHealth);
            } else if ('heal-enemy' in roundSegs[i]) {
                applyHeal(roundSegs[i]['heal-enemy'], defMon, defMonHealth);
            } else if ('die-enemy' in roundSegs[i]) {
                if (turn == 'player') {
                    $('#opponent-img-div').animate({ opacity: 0 });;
                    $('#opponent-info-div').animate({ opacity: 0 });
                } else if (turn == 'enemy') {
                    $('#player-img-div').animate({ opacity: 0 });
                    $('#player-info-div').animate({ opacity: 0 });
                }
            } else if ('die-self' in roundSegs[i]) {
                if (turn == 'player') {
                    $('#player-img-div').animate({ opacity: 0 });
                    $('#player-info-div').animate({ opacity: 0 });
                } else if (turn == 'enemy') {
                    ('#opponent-img-div').animate({ opacity: 0 });
                    $('#opponent-info-div').animate({ opacity: 0 });
                }
            } else if ('switch-mon-player' in roundSegs[i]) {
                if (roundSegs[i]['switch-mon-player'] == 'in') {
                    switching = true;
                    switchPlayerMons(function() {
                        $('#player-info-div').animate({ opacity: 1 });
                        $('#player-img-div').animate({ opacity: 1 });
                    });
                } else if (roundSegs[i]['switch-mon-player'] == 'out') {
                    $('#player-info-div').animate({ opacity: 0 });
                    $('#player-img-div').animate({ opacity: 0 });
                    resetMods(playerMods);
                }
            } else if ('select-mon' in roundSegs[i]) {
                if (roundSegs[i]['select-mon'] == 'player') {
                    nuzMonView();
                }
            } else if ('escape' in roundSegs[i]) {
                randomMoveSelect(wildMon['moves']);
                typeWriter(roundSegs[i]['escape'], "battle-text");
                turn = 'player';
                rounds = 1;
            }
            i++;
            updateStatusDisplay();
        } else {
            clearInterval(segments);
            if (endFight) {
                endBattle();
            } else if (switching) {
                switching = false;
                endRound();
            } else {
                round();
            }
        }
    }, segInterval);
}

function die(mon) {
    clearInterval(segments);
    segIndex = 0;
    roundSegs = {};
    console.log("kilt 'em...");
    if (mon == atkMon) {
        addBattleAction({ 'die-self': 'die' });
        addBattleText(atkMon['name'] + " was defeated!");
    } else if (mon == defMon) {
        addBattleAction({ 'die-enemy': 'die' });
        addBattleText(defMon['name'] + " was defeated!");
    }

    if (mon == pMons[currentPlayerMon]) {
        pMons[currentPlayerMon]['alive'] = 0;
        $('.switch-mon-btn').each(function() {
            if ($(this).attr('data') == currentPlayerMon) {
                $(this).remove();
            }
        });
        if (checkMonsAvailable()) {
            switching = true;
            $('#back-util').prop('disabled', true);
            addBattleAction({ "select-mon": "player" });
        } else {
            addBattleText("You're out of NuzMon!");
            endFight = true;
            win = false;
        }
    } else if (mon == wildMon) {
        endFight = true;
    }
    playSegments();
}

function endBattle() {
    if (win) {
        backToLocation();
    } else {
        backtoMap();
    }
}

function applyDamage(amount, mon, health) {
    mon['currentHp'] -= amount;
    var hPercent = Math.round((mon['currentHp'] / mon['maxHp']) * 100);
    if (mon['currentHp'] <= 0) {
        mon['currentHp'] = 0;
        die(mon);
    } else {
        if (hPercent <= 0) {
            hPercent = 1;
        }
    }
    health.attr('aria-valuenow', mon['currentHp']);
    health.css('width', hPercent + '%');
    if (turn == 'enemy') {
        updateMonView();
    }

    if (mon['status'].includes("sleep")) {
        wakeUp(mon);
    }
}

function applyHeal(amount, mon, health) {
    var recover = Math.round(mon['maxHp'] * (parseInt(amount) / 100));
    if ((parseInt(mon['currentHp']) + parseInt(recover)) > mon['maxHp']) {
        mon['currentHp'] = mon['maxHp'];
    } else {
        var hp = parseInt(mon['currentHp']) + parseInt(recover);
        mon['currentHp'] = hp;
    }
    var hPercent = Math.round((mon['currentHp'] / mon['maxHp']) * 100);
    health.attr('aria-valuenow', mon['currentHp']);
    health.css('width', hPercent + '%');
    if (turn == 'player') {
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
    if (checkStab()) {
        roundDmg *= 1.5;
        roundDmg = Math.round(roundDmg);
    }
    if (checkCrit()) {
        roundDmg *= 2;
    }
    addBattleAction({ 'animation-enemy': 'battle-anim-hit-enemy' });
    addBattleAction({ 'damage-enemy': roundDmg });
}