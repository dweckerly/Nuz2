$('.move-btn').click(function() {
    var id = $(this).attr('data');
    playerMove = id;
    parseMove('player');
    startRound();
});

$('.switch-mon-btn').click(function() {
    $('#back-util').prop('disabled', false);
    var id = $(this).attr('data');
    switchMon(id, 'player');
    startRound();
});

$('.item-btn').click(function() {
    var id = $(this).attr('data');
    var effect = $(this).attr('data-effect');
    var iName = $(this).attr('data-name');
    useItem(id, effect, iName, 'player');
    startRound();
});

function parseMove(target) {
    declareAttacker(target);
    addBattleText(atkMon['name'] + " used " + atkMon['moves'][atkMonMove]['name'] + "!", target);
    if (checkMiss()) {
        if (atkMon['moves'][atkMonMove]['dmg'] > 0) {
            calculateDamage(target);
        }
        parseEffect();
    } else {
        if (atkMon['moves'][atkMonMove]['dmg'] > 0) {
            addBattleText("It missed...", target);
        } else {
            addBattleText("It failed...", target);
        }
    }
}

function useItem(id, effect, iName, target) {
    if(target == 'player') {
        playerAction = 'item';
    } else if (target == 'enemy') {
        enemyAction = 'item';
    }
    $.post(useItemTrans, { id: id }, function(data) {
        updateItemView(data);
    });
    addBattleText('You use the ' + iName + '!', target);
    var ef = effect.split('-');
    if (ef[0] == 'catch') {
        catchMon(ef[1]);
    }
}

function catchMon(r) {
    var rate = ((((wildMon['currentHp'] / wildMon['maxHp']) * 100) - 100) * (-1));
    rate += parseInt(r);
    var rand = Math.floor(Math.random() * 100) + 1;
    if (rand <= rate) {
        addBattleText('You caught ' + wildMon['name'] + '!', 'player');
        $.post(catchMonTrans, { wildMon: wildMon }, function(data) {
            addBattleText(data, 'player');
        });
        endFight = true;
    } else {
        addBattleAction({ 'escape': wildMon['name'] + ' escaped!' }, 'player');
    }
}

function setTurn(t) {
    turn = t;
}

function startRound() {
    $('#battle-btns').hide();
    $('#move-btns').fadeOut("fast", function () {
        $('#game-nav').fadeOut('fast', function() {
            $('#battle-main').fadeIn('fast');
            $('#battle-footer').fadeIn('fast', function() {
                $('#battle-text').html("");
                $('#battle-text').fadeIn("fast");
                whoGoesFirst();
                round();
            });
        });
    });
}

function whoGoesFirst() {
    determineEnemyAction();
    if(playerAction == 'attack') {
        if(enemyAction == 'attack') {
            speedCheck();
            movePriorityCheck();
        } else if (enemyAction == 'switch' || enemyAction == 'item') {
            setTurn('enemy');
        }
    }
    if(playerAction == 'switch' || playerAction == 'item') {
        if(enemyAction == 'attack') {
            setTurn('player');
        } else if(enemyAction == 'switch' || enemyAction == 'item') {
            speedCheck();
        }
    }
}

function speedCheck() {
    var playerSpeed = parseInt(pMons[currentPlayerMon]['speed']) + parseInt(playerMods['speed']['mod']);
    var enemySpeed = parseInt(wildMon['speed']) + parseInt(enemyMods['speed']['mod']);
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
}

function movePriorityCheck() {
    var enemyPriority = priorityCheck(wildMon['moves'], enemyMove);
    var playerPriority = priorityCheck(pMons[currentPlayerMon]['moves'], playerMove);
    if (playerPriority > enemyPriority) {
        turn = 'player'
    } else if (enemyPriority > playerPriority) {
        turn = 'enemy';
    }
}

function determineEnemyAction() {
    if(eAi == 'random') {
        if(wildMon) {
            randomMoveSelect(wildMon['moves']);
        } else {
            randomMoveSelect(npcMons[currentNpcMon]['moves']);
        }
    }
}

function round() {
    rounds++;
    if (rounds > 2) {
        endRound();
    } else if (rounds == 2) {
        switchTurn();
        playSegments();
    } else if (rounds == 1) {
        playSegments();
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
    enemyAction = 'attack';
    enemyMove = (Math.floor(Math.random() * Object.keys(monMoves).length) + 1);
    parseMove('enemy');
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
        if (roundSegs[turn][i]) {
            if ('text' in roundSegs[i]) {
                typeWriter(roundSegs[turn][i]['text'], "battle-text");
            } else if ('damage-self' in roundSegs[turn][i]) {
                applyDamage(roundSegs[turn][i]['damage-self'], atkMon, atkMonHealth);
            } else if ('damage-enemy' in roundSegs[turn][i]) {
                applyDamage(roundSegs[turn][i]['damage-enemy'], defMon, defMonHealth);
            } else if ('animation-enemy' in roundSegs[turn][i]) {
                if (turn == 'player') {
                    var el = $('#opponent-img');
                } else if (turn == 'enemy') {
                    var el = $('#player-img');
                    var player = true;
                }
                el = resetAnimation(el);
                if (player) {
                    el.addClass("flip-img battle-img " + roundSegs[turn][i]['animation-enemy']);
                } else {
                    el.addClass("battle-img " + roundSegs[turn][i]['animation-enemy']);
                }
            } else if ('animation-self' in roundSegs[turn][i]) {
                if (turn == 'player') {
                    var el = $('#player-img');
                    var player = true;
                } else if (turn == 'enemy') {
                    var el = $('#opponent-img');
                }
                el = resetAnimation(el);
                if (player) {
                    el.addClass("flip-img battle-img " + roundSegs[turn][i]['animation-self']);
                } else {
                    el.addClass("battle-img " + roundSegs[turn][i]['animation-self']);
                }
            } else if ('heal-self' in roundSegs[turn][i]) {
                applyHeal(roundSegs[turn][i]['heal-self'], atkMon, atkMonHealth);
            } else if ('heal-enemy' in roundSegs[turn][i]) {
                applyHeal(roundSegs[turn][i]['heal-enemy'], defMon, defMonHealth);
            } else if ('die-enemy' in roundSegs[turn][i]) {
                if (turn == 'player') {
                    $('#opponent-img-div').animate({ opacity: 0 });;
                    $('#opponent-info-div').animate({ opacity: 0 });
                } else if (turn == 'enemy') {
                    $('#player-img-div').animate({ opacity: 0 });
                    $('#player-info-div').animate({ opacity: 0 });
                }
            } else if ('die-self' in roundSegs[turn][i]) {
                if (turn == 'player') {
                    $('#player-img-div').animate({ opacity: 0 });
                    $('#player-info-div').animate({ opacity: 0 });
                } else if (turn == 'enemy') {
                    ('#opponent-img-div').animate({ opacity: 0 });
                    $('#opponent-info-div').animate({ opacity: 0 });
                }
            } else if ('switch-mon' in roundSegs[turn][i]) {
                if (roundSegs[turn][i]['switch-mon'] == 'in') {
                    switching = true;
                    switchPlayerMons(function() {
                        $('#player-info-div').animate({ opacity: 1 });
                        $('#player-img-div').animate({ opacity: 1 });
                    });
                } else if (roundSegs[turn][i]['switch-mon'] == 'out') {
                    $('#player-info-div').animate({ opacity: 0 });
                    $('#player-img-div').animate({ opacity: 0 });
                    resetMods(playerMods);
                }
            } else if ('select-mon' in roundSegs[turn][i]) {
                if (roundSegs[turn][i]['select-mon'] == 'player') {
                    nuzMonView();
                }
            } else if ('escape' in roundSegs[turn][i]) {
                randomMoveSelect(wildMon['moves']);
                typeWriter(roundSegs[turn][i]['escape'], "battle-text");
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