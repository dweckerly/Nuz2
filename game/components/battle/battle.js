var firstMon;

$(document).ready(function () {
    for(i = 1; i <= totalPlayerMons; i++) {
        if(pMons[i]['alive'] == 1) {
            firstMon = i;
            break;
        }
    }

    $('#opponent-health').attr('aria-valuenow', wildMon['currentHp']);
    $('#opponent-health').attr('aria-valuemax', wildMon['maxHp']);
    $('#opponent-health').css('width', '100%');
    
    $('#player-health').attr('aria-valuenow', pMons[firstMon]['currentHp']);
    $('#player-health').attr('aria-valuemax', pMons[firstMon]['maxHp']);
    
    var pHealth = Math.round((pMons[firstMon]['currentHp'] / pMons[firstMon]['maxHp']) * 100);
    $('#player-health').css('width', pHealth + '%');

    $('#opponent-img').attr('src', "img/mons/" + wildMon['img']);
    $('#player-img').attr('src', "img/mons/" + pMons[firstMon]['img']);

    $('#opponent-name').html(wildMon['name']);
    $('#player-name').html(pMons[firstMon]['name']);
    var status = pMons[firstMon]['status'];
    $('#player-status').html(status.toUpperCase());
});


$('#player-img').on('animationend', function () {
    $('#player-img').removeClass('battle-anim-slidein-left');
    $.get(bFooterComp, function(data) {
        $('#footer').append(data).hide().fadeIn('fast');
    });
});

$('#opponent-img').on('animationend', function () {
    $('#opponent-img').removeClass('battle-anim-slidein-right');
});