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