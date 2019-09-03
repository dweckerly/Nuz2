$('.nuz-list-item').click(function () {
    var id = $(this).attr('data');
    $.post(monDetailComp, {id: id}, function (data) {
        var id = "#game-foci";
        var child = $(id).find(':first-child');
        var cid = child.attr('id');
        $("#" + cid).fadeOut('fast', function() { 
            $("#" + cid).remove();
            $(id).append(data).hide().fadeIn('fast');
        });
    });
});

$('.up-arrow').click(function () {
    event.stopPropagation();
    var id = parseInt($(this).attr('data-order'));
    var total = $('.nuz-list-item').length;
    if(id == 1) {
        $('#nuz-' + id).insertAfter($('#nuz-' + total));
    } else {
        $('#nuz-' + (id - 1)).insertAfter($('#nuz-' + id));
    } 
    resetListIds();
});

$('.down-arrow').click(function () {
    event.stopPropagation();
    var id = parseInt($(this).attr('data-order'));
    var total = $('.nuz-list-item').length;
    if(id == total) {
        $('#nuz-' + total).insertBefore($('#nuz-1'));
    } else {
        $('#nuz-' + id).insertAfter($('#nuz-' + (id + 1)));
    } 
    resetListIds();
});

function resetListIds() {
    $('.nuz-list-item').each(function (index, li) {
        $(li).attr('id', "nuz-" + (index + 1));
        $(li).find('.up-arrow').attr('data-order', (index + 1));
        $(li).find('.down-arrow').attr('data-order', (index + 1));
    }).promise().done(function () {
        updateListOrderInDB();
    });
}

function updateListOrderInDB() {
    var playerMons = [];
    $('.nuz-list-item').each(function () {
        let obj = {
            id: $(this).attr('data'),
            order: $(this).attr('id').split('-')[1]
        }
        playerMons.push(obj);
    });
    var total = $('.nuz-list-item').length;
    $.post(updatePartyOrderTrans, { pMons: playerMons, count: total });
}