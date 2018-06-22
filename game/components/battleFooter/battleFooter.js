var currentMon = 1;

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
    console.log(id);
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