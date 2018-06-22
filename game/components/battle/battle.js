$(document).ready(function () {
    $('#opponent-health').attr('aria-valuenow', wildMon['currentHp']);
    $('#opponent-health').attr('aria-valuemax', wildMon['maxHp']);
    $('#opponent-health').css('width', '100%');
    
    $('#player-health').attr('aria-valuenow', pMons['1']['currentHp']);
    $('#player-health').attr('aria-valuemax', pMons['1']['maxHp']);
    
    var pHealth = Math.round((pMons['1']['currentHp'] / pMons['1']['maxHp']) * 100);
    $('#player-health').css('width', pHealth + '%');

    $('#opponent-img').attr('src', "img/mons/" + wildMon['img']);
    $('#player-img').attr('src', "img/mons/" + pMons['1']['img']);

    $('#opponent-name').html(wildMon['name']);
    $('#player-name').html(pMons['1']['name']);
    $('#player-status').html(pMons['1']['status']);
});


$('#player-img').on('animationend', function () {
    $.get(bFooterComp, function(data) {
        $('#footer').append(data).hide().fadeIn('fast');
    });
});