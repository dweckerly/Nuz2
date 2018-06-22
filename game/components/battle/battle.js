$(document).ready(function () {
    $('#oponent-health').attr('aria-valuenow', wildMon['currentHp']);
    $('#oponent-health').attr('aria-valuemax', wildMon['maxHp']);
    $('#player-health').attr('aria-valuenow', pMons['1']['currentHp']);
    $('#player-health').attr('aria-valuemax', pMons['1']['maxHp']);

    $('#oponent-img').attr('src', "img/mons/" + wildMon['img']);
    $('#player-img').attr('src', "img/mons/" + pMons['1']['img']);

    $('#oponent-name').html(wildMon['name']);
    $('#player-name').html(pMons['1']['name']);
    $('#player-status').html(pMons['1']['status']);
});