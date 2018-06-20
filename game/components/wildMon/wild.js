// back button functionality copied from map page
$('#back-btn').click(function() {
    var id = $(this).attr('data');
    $.post(locComp, { id: id }, function(data) {
        var id = "#game-foci";
        var child = $(id).find(':first-child');
        var cid = child.attr('id');
        $("#" + cid).fadeOut('fast', function() {
            $("#" + cid).remove();
            $(id).append(data).hide().fadeIn('fast');
        });
    });
});

$('#again-btn').click(function () {
    var id = $(this).attr('data');
    var locId = $('#back-btn').attr('data');
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

$(document).ready(function() {
    setInterval(function() {
        console.log('calling timeout');
        shakeImg()
    }, 3000);
});


function shakeImg() {
    var h = $('#mon-img').width();
    $('#mon-img').animate({width: '300px'}, "fast");
    $('#mon-img').animate({width: w}, "fast");
    $('#mon-img').animate({width: '300px'}, "fast");
    $('#mon-img').animate({width: w}, "fast");
}

