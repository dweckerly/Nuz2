$('.move-btn').click(function() {
    var id = $(this).attr('data');
    playerMove = id;
    playerAction = 'attack';
    preBattlePhase();
});

$('.switch-mon-btn').click(function() {
    $('#back-util').prop('disabled', false);
    var id = $(this).attr('data');
    playerSwicthMonId = id;
    playerAction = 'switch';
    preBattlePhase();
});

$('.item-btn').click(function() {
    var id = $(this).attr('data');
    playerUseItemId = id;
    playerAction = 'item';
    preBattlePhase();
});

function preBattlePhase() {
    showBattleText();
    if (type == 'wild' || type == 'npc') {
        determineOpponentAction();
        startRound();
    }
    /// else { POST action and listen/check for opponent action }
}

function startRound() {
    whoGoesFirst();
    if (turn == 'player') {
        playerTurn();
    } else if (turn == 'opponent') {
        opponentTurn();
    }
}

function playerTurn() {
    turnCount++;
    switch (playerAction) {
        case 'attack':
            playerCheckAttack();
            break;
        case 'item':
            playerBroadcastItem();
            break;
        case 'switch':
            playerBroadcastSwitchOut();
            break;
        default:
            break;
    }
}

function playerCheckAttack() {
    if (playerMons[playerCurrentMon]['status'] == 'sleep' ||
        playerMons[playerCurrentMon]['status'] == 'stun'
    ) {

    } else {
        playerBroadcastAttack();
    }
}

function playerBroadcastAttack() {
    var str = playerMons[playerCurrentMon]['name'] + " used " + playerMons[playerCurrentMon]['moves'][playerMoveId]['name'] + "!";
    broadcastText(str);
    var time = getItervalFromString(str);
    var nextPhase = setInterval(function() {
        playerUseAttack();
        clearInterval(nextPhase);
    }, time);
}

function playerUseAttack() {
    if (checkHit(playerMons, playerMoveId, playerMods, opponentMods)) {
        if (playerMons[playerCurrentMon]['moves'][playerMoveId]['dmg'] == 0) {
            playerApplyDamage();
        } else {
            playerApplyEffects();
        }
    } else {
        if (playerMons[playerCurrentMon]['moves'][playerMoveId]['dmg'] == 0) {
            var str = "it failed...";
        } else {
            var str = "it missed...";
        }
        broadcastText(str);
        var time = getItervalFromString(str);
        var nextPhase = setInterval(function() {
            switchTurn();
            clearInterval(nextPhase);
        }, time);
    }
}

function playerApplyDamage() {
    var dmg = calculateDamage(playerMons[playerCurrentMon], playerMoveId, playerMods, opponentMons[opponentCurrentMon], opponentMods);
    if (checkCrit(atkMon, atkMonMove, atkMonMods)) {
        dmg *= 2;
    } else {
        applyDamage(dmg, opponentMons[opponentCurrentMon], $('#opponent-health'));
        var nextPhase = setInterval(function() {
            playerParseEffects();
            clearInterval(nextPhase);
        }, baseInterval);
    }
}

function playerParseEffects() {
    if (playerMons[currentPlayerMon]['moves'][playerMoveId]['e1'] == '') {
        switchTurn();
    } else {
        var effects = [
            playerMons[playerCurrentMon]['moves'][playerMoveId]['e1'],
            playerMons[playerCurrentMon]['moves'][playerMoveId]['e2'],
            playerMons[playerCurrentMon]['moves'][playerMoveId]['e3']
        ];
        effects.forEach(function(eff) {
            if (eff) {
                var p = eff.split('-');
                switch (p[0]) {
                    case 'burn':
                        if (p[1] == 'self') {
                            playerBurnSelf();
                        } else if (p[1] == 'target') {
                            playerBurnTarget();
                        }
                        break;
                    case 'decrease':
                        if (p[2] == 'self') {
                            playerDecreaseStatSelf();
                        } else if (p[2] == 'target') {
                            playerDecreaseStatTarget();
                        }
                        break;
                    case 'increase':
                        if (p[2] == 'self') {
                            playerIncreaseStatSelf();
                        } else if (p[2] == 'target') {
                            playerIncreaseStatTarget();
                        }
                        break;
                    case 'multi':
                        playerMultiAttack();
                        break;
                    case 'recoil':
                        playerRecoil();
                        break;
                    case 'recover':
                        if (p[1] == 'self') {
                            playerRecoverSelf();
                        } else if (p[1] == 'target') {
                            playerRecoverTarget();
                        }
                        break;
                    case 'sleep':
                        if (p[1] == 'self') {
                            playerSleepSelf();
                        } else if (p[1] == 'target') {
                            playerSleepTarget();
                        }
                        break;
                    case 'stun':
                        if (p[1] == 'self') {
                            playerStunSelf();
                        } else if (p[1] == 'target') {
                            playerStunTarget();
                        }
                        break;
                    case 'wet':
                        if (p[1] == 'self') {
                            playerWetSelf();
                        } else if (p[1] == 'target') {
                            playerWetTarget();
                        }
                        break;
                    case 'wound':
                        if (p[1] == 'self') {
                            playerWoundSelf();
                        } else if (p[1] == 'target') {
                            playerWoundTarget();
                        }
                        break;
                }
            }
        });
    }
}

function playerBroadcastItem() {
    var itemName = $('#item-' + playerUseItemId).attr('data-name');
    var effect = $('#item-' + playerUseItemId).attr('data-effect');
    var str = "You use the " + itemName + "!";
    broadcastText(str);
    var time = getIntervalFromString(str);
    var nextPhase = setInterval(function() {
        playerUseItem(effect);
        clearInterval(nextPhase);
    }, time);
}

function playerBroadcastSwitchOut() {
    if (playerMons[playerCurrentMon]['currentHp'] > 0) {
        str = playerMons[playerCurrentMon]['name'] + " come back!";
        broadcastText(str);
        var time = getIntervalFromString(str);
        var nextPhase = segInterval(function() {
            playerAnimateMonOut();
            clearInterval(nextPhase);
        }, time);
    } else {
        nuzMonView();
    }
}

function round() {

    if (rounds > 2) {
        endRound();
    } else if (rounds == 2) {
        switchTurn();
        playSegments();
    } else if (rounds == 1) {
        playSegments();
    }
}

function parseMove(target) {
    declareAttacker(target);
    addBattleText(atkMon['name'] + " used " + atkMon['moves'][atkMonMove]['name'] + "!", target);
    if (checkMiss()) {
        if (atkMon['moves'][atkMonMove]['dmg'] > 0) {
            calculateDamage(target);
        }
        parseEffect(target);
    } else {
        if (atkMon['moves'][atkMonMove]['dmg'] > 0) {
            addBattleText("It missed...", target);
        } else {
            addBattleText("It failed...", target);
        }
    }
}

function useItem(id, effect, iName, target) {
    if (target == 'player') {
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
        win = true;
    } else {
        addBattleAction({ 'escape': wildMon['name'] + ' escaped!' }, 'player');
    }
}

function endRound() {
    rounds = 0;
    clearSegment();
    $('#battle-text').fadeOut('fast', function() {
        $('#battle-btns').fadeIn("fast");
    });
}

function playSegments() {
    var i = 0;
    console.log(roundSegs);
    declareAttacker(turn);
    segments = setInterval(function() {
        if (roundSegs[turn][i]) {
            if ('text' in roundSegs[turn][i]) {
                typeWriter(roundSegs[turn][i]['text'], "battle-text");
            } else if ('apply-effect' in roundSegs[turn][i]) {
                typeWriter(roundSegs[turn][i]['apply-effect']['text'], "battle-text");
                updateStatusDisplay(roundSegs[turn][i]['apply-effect']['mon']);
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
                typeWriter(roundSegs[turn][i]['escape'], "battle-text");
            }
            i++;
        } else {
            clearInterval(segments);
            if (endFight) {
                endBattle();
            } else {
                round();
            }
        }
    }, segInterval);
}

function die(mon) {
    if (mon == atkMon) {
        addBattleAction({ 'die-self': 'die' }, turn);
        addBattleText(atkMon['name'] + " was defeated!", turn);
    } else if (mon == defMon) {
        addBattleAction({ 'die-enemy': 'die' }, turn);
        addBattleText(defMon['name'] + " was defeated!", turn);
    }

    if (mon == pMons[currentPlayerMon]) {
        pMons[currentPlayerMon]['alive'] = 0;
        $('.switch-mon-btn').each(function() {
            if ($(this).attr('data') == currentPlayerMon) {
                $(this).remove();
            }
        });
        if (checkMonsAvailable()) {
            $('#back-util').prop('disabled', true);
            addBattleAction({ "select-mon": "player" }, turn);
        } else {
            addBattleText("You're out of NuzMon!", turn);
            endFight = true;
            win = false;
        }
    } else if (mon == wildMon) {
        endFight = true;
        win = true;
    }
}

function endBattle() {
    clearSegment();
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
    if (turn == 'opponent') {
        updateMonView();
    }

    if (mon['status'].includes("sleep")) {
        wakeUp(mon, turn);
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