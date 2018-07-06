$(document).ready(function() {
    $('#move-btns').hide();
    $('.switch-mon-btn').each(function () {
        if($(this).attr('data') == currentPlayerMon) {
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
    $.post(updateMonsTrans, {pMons: pMons, count: totalPlayerMons}, function(data) {
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
    $.post(updateMonsTrans, {pMons: pMons, count: totalPlayerMons}, function() {
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

function calculateDamage(target) {
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
        addBattleText("Critical hit!", target);
    }
    addBattleAction({ 'animation-enemy': 'battle-anim-hit-enemy' }, target);
    addBattleAction({ 'damage-enemy': roundDmg }, target);
}

function checkCrit() {
    var crit = atkMon['moves'][atkMonMove]['crit']
    crit += atkMonMods['crit']['mod'];
    var chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= crit) {
        return true;
    }
    return false;
}

function checkMiss() {
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

function checkMonsAvailable() {
    for(i = 1; i <= totalPlayerMons; i++) {
        if(pMons[i]['alive'] == 1) {
            return true;
        }
    }
    return false;
}

function checkStab() {
    if(atkMon['type1'] == atkMon['moves'][atkMonMove]['type']) {
        return true;
    } else if(atkMon['type2'] == atkMon['moves'][atkMonMove]['type']){
        return true;
    }
    return false;
}

function checkType() {
    // will return the amount dmg should be multiplied

    return 1;
}

function clearSegment() {
    roundSegs = {};
    segIndex = 0;
    clearInterval(segInterval);
}

function declareAttacker(target) {
    if(target == 'player') {
        atkMon = pMons[currentPlayerMon];
        atkMonMove = playerMove;
        atkMonMods = playerMods;
        if(wildMon) {
            defMon = wildMon;
        } else {
            defMon = npcMons[currentNpcMon];
        }
        defMonMods = enemyMods;
    } else if (target == 'enemy') {
        if(wildMon) {
            atkMon = wildMon;
        } else {
            atkMon = npcMons[currentNpcMon];
        }
        atkMonMove = enemyMove;
        atkMonMods = enemyMods;
        defMon = pMons[currentPlayerMon];
        defMonMods = playerMods;
    }
}

function itemView() {
    $('#battle-main').fadeOut('fast');
    $('#battle-footer').fadeOut('fast', function () {
        $('#mon-select').hide();
        $('#game-nav').fadeIn('fast', function () {
            $('#item-select').show();
            $('#battle-util').fadeIn('fast');
        });
    });   
}

function nuzMonView() {
    $('#battle-main').fadeOut('fast');
    $('#battle-footer').fadeOut('fast', function () {
        $('#item-select').hide();
        $('#game-nav').fadeIn('fast', function () {
            $('#mon-select').show();
            $('#battle-util').fadeIn('fast');
        });
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

function switchMon(id, target) {
    if(target == 'player') {
        playerAction = 'switch';
        if (pMons[currentPlayerMon]['alive'] == 1) {
            addBattleText(pMons[currentPlayerMon]['name'] + " come back!", target);
            addBattleAction({ 'switch-mon': 'out' }, target);
        }
        currentPlayerMon = id;
        addBattleText(pMons[currentPlayerMon]['name'] + ", go!", target);
        addBattleAction({ 'switch-mon': 'in' }, target);
    } else if(target == 'enemy') {
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
    $('.switch-mon-btn').each(function () {
        if($(this).attr('data') == currentPlayerMon) {
            $(this).prop('disabled', true);
        } else {
            $(this).prop('disabled', false);
        }
    });
    if(callback) {
        callback();
    }
}

function switchTurn() {
    if (turn == 'player') {
        turn = 'enemy';
    } else if (turn == 'enemy') {
        turn = 'player';
    }
}

function updateItemView(data) {

}

function updateMonView() {
    $("#" + currentPlayerMon + "-hp").html(pMons[currentPlayerMon]['currentHp'] + "/" + pMons[currentPlayerMon]['maxHp'] )
}
