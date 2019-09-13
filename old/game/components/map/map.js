$(document).ready(function () {
    $('.map-btn').prop('disabled', false);
});

$('.map-btn').click(function () {
    $('.map-btn').prop('disabled', true);
    var id = $(this).attr('data');
    $.post(locComp, {id: id}, function(data) {
        var id = "#game-foci";
        var child = $(id).find(':first-child');
        var cid = child.attr('id');
        $("#" + cid).fadeOut('fast', function() { 
            $("#" + cid).remove();
            $(id).append(data).hide().fadeIn('fast');
        });
    });
});