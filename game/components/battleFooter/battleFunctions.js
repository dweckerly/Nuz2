$(document).ready(function() {
    $('#move-btns').hide();
    $('.switch-mon-btn').each(function () {
        if($(this).attr('data') == currentPlayerMon) {
            $(this).prop('disabled', true);
        }
    });
    populateMoves(1);
});

function addBattleText(str) {
    roundSegs[segIndex] = { 'text': str };
    segIndex++;
}

function addBattleAction(action) {
    roundSegs[segIndex] = action;
    segIndex++;
}

function backToLocation() {
    $.post(updateMonsTrans, {pMons: pMons, count: totalPlayerMons}, function(data) {
        removeSection('#header');
        removeSection('#game-nav');
        removeSection('#game-foci');
        removeSection('#footer');
        $('#footer').append(data);
        $.post(locComp, { id: locId }, function(data) {
            $('#game-foci').append(data).hide().fadeIn('fast');
            insertHTML('#header', gHeaderComp, function() {
                insertHTML('#game-nav', navComp);
            });
        });
    });
}

function checkCrit() {
    var crit = atkMon['moves'][atkMonMove]['crit']
    crit += atkMonMods['crit']['mod'];
    var chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= crit) {
        addBattleText("Critical hit!");
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

function switchTurn() {
    if (turn == 'player') {
        turn = 'enemy';
    } else if (turn == 'enemy') {
        turn = 'player';
    }
}

function updateMonView() {
    $("#" + currentPlayerMon + "-hp").html(pMons[currentPlayerMon]['currentHp'] + "/" + pMons[currentPlayerMon]['maxHp'] )
}
