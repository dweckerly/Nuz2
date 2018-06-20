$('#back').click(function () {
    changeSection('#game-foci', mapComp);
});

$('#wild-btn').click(function () {
    var id = $(this).attr('data');
    var locId = $('#loc-card').attr('data');
    $.post(wildComp, {id: id, locId: locId}, function(data) {
        var id = "#game-foci";
        var child = $(id).find(':first-child');
        var cid = child.attr('id');
        $("#" + cid).fadeOut('fast', function() { 
            $("#" + cid).remove();
            $(id).append(data).hide().fadeIn('fast');
        });
    });
});
