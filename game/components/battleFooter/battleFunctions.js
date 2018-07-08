$(document).ready(function() {
    $('#move-btns').hide();
    $('.switch-mon-btn').each(function() {
        if ($(this).attr('data') == currentPlayerMon) {
            $(this).prop('disabled', true);
        }
    });
    populateMoves(currentPlayerMon);
});

function addBattleText(str, target) {
    roundSegs[target][segIndex] = { 'text': str };
    segIndex++;
}

function addBattleAction(action, target) {
    roundSegs[target][segIndex] = action;
    segIndex++;
}

function backtoMap() {
    $.post(updateMonsTrans, { pMons: pMons, count: totalPlayerMons }, function(data) {
        removeSection('#header');
        removeSection('#game-nav');
        removeSection('#game-foci');
        removeSection('#footer');
        insertHTML('#header', gHeaderComp, function() {
            insertHTML('#game-nav', navComp, function() {
                insertHTML('#game-foci', mapComp);
            });
        });
    });
}

function backToLocation() {
    $.post(updateMonsTrans, { pMons: pMons, count: totalPlayerMons }, function() {
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
}

function broadcastText(str) {
    typeWriter(str, "battle-text");
}

function calculateDamage(atkMon, atkMonMove, atkMonMods, defMon, defMonMods) {
    var base = atkMon['moves'][atkMonMove]['dmg'];
    if (atkMon['moves'][atkMonMove]['special'] == 1) {
        var a = parseInt(atkMon['sAtk']) + parseInt(atkMonMods['sAtk']['mod']);
        var d = parseInt(defMon['sDef']) + parseInt(defMonMods['sDef']['mod']);
    } else {
        var a = parseInt(atkMon['atk']) + parseInt(atkMonMods['atk']['mod']);
        var d = parseInt(defMon['def']) + parseInt(defMonMods['def']['mod']);
    }

    var roundDmg = Math.round(base * (a / d));
    if (roundDmg < 1) {
        roundDmg = 1;
    }
    roundDmg *= checkType(atkMon, defMon);
    if (roundDmg < 1) {
        roundDmg = 1;
    }
    if (checkStab(atkMon, atkMonMove)) {
        roundDmg *= 1.5;
        roundDmg = Math.round(roundDmg);
    }
    return roundDmg;
}

function checkCrit(mon, monMove, monMods) {
    var crit = mon['moves'][monMove]['crit']
    crit += monMods['crit']['mod'];
    var chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= crit) {
        return true;
    }
    return false;
}

function checkHit(atkMon, atkMonMove, atkMonMods, defMonMods) {
    var chance = Math.floor(Math.random() * 100) + 1;
    var acc = parseInt(atkMon['moves'][atkMonMove]['acc']);
    acc += parseInt(atkMonMods['acc']['mod']);
    acc -= parseInt(defMonMods['evasion']['mod']);
    if (acc > 100) {
        acc = 100;
    } else if (acc < 1) {
        acc = 1;
    }
    return (chance <= acc) ? true : false;
}

function checkMonsAvailable() {
    for (i = 1; i <= totalPlayerMons; i++) {
        if (pMons[i]['alive'] == 1) {
            return true;
        }
    }
    return false;
}

function checkStab(atkMon, atkMonMove) {
    if (atkMon['type1'] == atkMon['moves'][atkMonMove]['type']) {
        return true;
    } else if (atkMon['type2'] == atkMon['moves'][atkMonMove]['type']) {
        return true;
    }
    return false;
}

function checkType(atkMon, defMon) {
    // will return the amount dmg should be multiplied

    return 1;
}

function clearSegment() {
    roundSegs = {
        'player': {},
        'enemy': {}
    };
    segIndex = 0;
    clearInterval(segInterval);
}

function determineOpponentAction() {
    // will add additional opponent AI behaviors here
    if (opponentAI == 'random') {
        randomMoveSelect(opponentMons[opponentCurrentMon]['moves']);
    }
}

function getIntervalFromString(str) {
    return (str.length * 50) + 1000;
}

function itemView() {
    $('#battle-main').fadeOut('fast');
    $('#battle-footer').fadeOut('fast', function() {
        $('#mon-select').hide();
        $('#game-nav').fadeIn('fast', function() {
            $('#item-select').show();
            $('#battle-util').fadeIn('fast');
        });
    });
}

function movePriorityCheck() {
    var opponentPriority = priorityCheck(opponentMons[opponentCurrentMon]['moves'], opponentMove);
    var playerPriority = priorityCheck(playerMons[playerCurrentMon]['moves'], playerMove);
    if (playerPriority > opponentPriority) {
        turn = 'player'
    } else if (opponentPriority > playerPriority) {
        turn = 'opponent';
    }
}

function nuzMonView() {
    $('#battle-main').fadeOut('fast');
    $('#battle-footer').fadeOut('fast', function() {
        $('#item-select').hide();
        $('#game-nav').fadeIn('fast', function() {
            $('#mon-select').show();
            $('#battle-util').fadeIn('fast');
        });
    });
}

function populateMoves(id) {
    $('#move1-btn').html(pMons[id]['moves']['1']['name']);
    if (pMons[id]['moves']['2']) {
        $('#move2-btn').html(pMons[id]['moves']['2']['name']);
        $('#move2-btn').prop("disabled", false);
    } else {
        $('#move2-btn').html('~');
        $('#move2-btn').prop("disabled", true);
    }
    if (pMons[id]['moves']['3']) {
        $('#move3-btn').html(pMons[id]['moves']['3']['name']);
        $('#move3-btn').prop("disabled", false);
    } else {
        $('#move3-btn').html('~');
        $('#move3-btn').prop("disabled", true);
    }
    if (pMons[id]['moves']['4']) {
        $('#move4-btn').html(pMons[id]['moves']['4']['name']);
        $('#move4-btn').prop("disabled", false);
    } else {
        $('#move4-btn').html('~');
        $('#move4-btn').prop("disabled", true);
    }
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

function resetAnimation(element) {
    element.removeClass();
    var newElem = element.clone(false);
    element.replaceWith(newElem);
    return newElem;
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

function showBattleText() {
    $('#battle-btns').hide();
    $('#move-btns').fadeOut("fast", function() {
        $('#game-nav').fadeOut('fast', function() {
            $('#battle-main').fadeIn('fast');
            $('#battle-footer').fadeIn('fast', function() {
                $('#battle-text').html("");
                $('#battle-text').fadeIn("fast");
            });
        });
    });
}

function speedCheck() {
    var playerSpeed = parseInt(playerMons[playerCurrentMon]['speed']) + parseInt(playerMods['speed']['mod']);
    var opponentSpeed = parseInt(opponentMons[opponentCurrentMon]['speed']) + parseInt(opponentMods['speed']['mod']);
    if (playerSpeed > opponentSpeed) {
        turn = 'player';
    } else if (opponentSpeed > playerSpeed) {
        turn = 'opponent';
    } else if (playerSpeed == opponentSpeed) {
        var rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            turn = 'player';
        } else if (rand == 1) {
            turn = 'opponent';
        }
    }
}

function switchMon(id, target) {
    if (target == 'player') {
        playerAction = 'switch';
        if (pMons[currentPlayerMon]['alive'] == 1) {
            addBattleText(pMons[currentPlayerMon]['name'] + " come back!", target);
            addBattleAction({ 'switch-mon': 'out' }, target);
        }
        currentPlayerMon = id;
        addBattleText(pMons[currentPlayerMon]['name'] + ", go!", target);
        addBattleAction({ 'switch-mon': 'in' }, target);
    } else if (target == 'enemy') {
        enemyAction = 'switch';
        if (npcMons[currentNpcMon]['alive'] == 1) {
            addBattleText(npcMons[currentNpcMon]['name'] + " come back!", target);
            addBattleAction({ 'switch-mon': 'out' }, target);
        }
        currentNpcMon = id;
        addBattleText(npcMons[currentNpcMon]['name'] + ", go!", target);
        addBattleAction({ 'switch-mon': 'in' }, target);
    }
}

function switchPlayerMons(callback) {
    $('#player-health').attr('aria-valuenow', pMons[currentPlayerMon]['currentHp']);
    $('#player-health').attr('aria-valuemax', pMons[currentPlayerMon]['maxHp']);

    var pHealth = Math.round((pMons[currentPlayerMon]['currentHp'] / pMons[currentPlayerMon]['maxHp']) * 100);
    $('#player-health').css('width', pHealth + '%');
    $('#player-img').attr('src', "img/mons/" + pMons[currentPlayerMon]['img']);
    $('#player-name').html(pMons[currentPlayerMon]['name']);
    var status = pMons[currentPlayerMon]['status'];
    $('#player-status').html(status.toUpperCase());
    populateMoves(currentPlayerMon);
    $('.switch-mon-btn').each(function() {
        if ($(this).attr('data') == currentPlayerMon) {
            $(this).prop('disabled', true);
        } else {
            $(this).prop('disabled', false);
        }
    });
    if (callback) {
        callback();
    }
}

function switchTurn() {
    if (turnCount == 2) {
        endRound();
    } else {
        turnCount++;
        if (turn == 'player') {
            turn = 'opponent';
            opponentTurn();
        } else if (turn == 'opponent') {
            turn = 'player';
            playerTurn();
        }
    }

}

function updateItemView(data) {

}

function updateMonView() {
    $("#" + currentPlayerMon + "-hp").html(pMons[currentPlayerMon]['currentHp'] + "/" + pMons[currentPlayerMon]['maxHp'])
}

function whoGoesFirst() {
    if (playerAction == 'attack') {
        if (opponentAction == 'attack') {
            speedCheck();
            movePriorityCheck();
        } else if (opponentAction == 'switch' || opponentAction == 'item') {
            turn = 'opponent';
        }
    }
    if (playerAction == 'switch' || playerAction == 'item') {
        if (opponentAction == 'attack') {
            turn = 'player';
        } else if (opponentAction == 'switch' || opponentAction == 'item') {
            speedCheck();
        }
    }
}