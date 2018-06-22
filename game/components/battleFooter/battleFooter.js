var currentMon = 1;
var battleText = [];

$(document).ready(function () {
    populateMoves(1);
});

$('#fight-btn').click(function () {
    $('#battle-btns').fadeOut("fast", function () {
        $('#move-btns').fadeIn("fast");
    });
});

$('.move-btn').click(function () {
    var id = $(this).attr('data');
    parseMove(id);
});

function populateMoves(id) {
    $('#move1-btn').html(pMons[id]['moves']['1']['name']);
    if(pMons[id]['moves']['2']) {
        $('#move2-btn').html(pMons[id]['moves']['2']['name']);
    } else {
        $('#move2-btn').html('~');
        $('#move2-btn').prop("disabled", true);
    }
    if(pMons[id]['moves']['3']) {
        $('#move3-btn').html(pMons[id]['moves']['3']['name']);
    } else {
        $('#move3-btn').html('~');
        $('#move3-btn').prop("disabled", true);
    }
    if(pMons[id]['moves']['4']) {
        $('#move4-btn').html(pMons[id]['moves']['4']['name']);
    } else {
        $('#move4-btn').html('~');
        $('#move4-btn').prop("disabled", true);
    }
}

function parseMove(id) {
    var moveName = pMons[currentMon]['moves'][id]['name'];
    battleText[0] = pMons[currentMon]['name'] + " used " + moveName + "!";

    if(hitOrMiss(id)) {
        if(pMons[currentMon]['moves'][id]['dmg'] > 0) {
            var dmg = pMons[currentMon]['moves'][id]['dmg'];
        }
    } else {
        battleText[1] = "It missed...";
    }
    
    var crit = pMons[currentMon]['moves'][id]['crit'];
    var acc = pMons[currentMon]['moves'][id]['acc'];
    var type = pMons[currentMon]['moves'][id]['type'];
    var spec = pMons[currentMon]['moves'][id]['special'];
    var cont = pMons[currentMon]['moves'][id]['contact'];
    var anim = pMons[currentMon]['moves'][id]['anim'];
    var e1 = pMons[currentMon]['moves'][id]['e1'];
    var e2 = pMons[currentMon]['moves'][id]['e2'];
    var e3 = pMons[currentMon]['moves'][id]['e3'];

}

function hitOrMiss(id) {
    var chance = Math.floor(Math.random() * 100) + 1;
    return (chance <= pMons[currentMon]['moves'][id]['acc']) ? true : false;
}

function calculateDamage(id) {

}