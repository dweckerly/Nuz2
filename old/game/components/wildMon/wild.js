$(document).ready(function () {
    $('.wild-btn').prop('disabled', false);
});


// back button functionality copied from map page
$('#back-btn').click(function() {
    $('.wild-btn').prop('disabled', true);
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
    $('.wild-btn').prop('disabled', true);
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

$('#fight-btn').click(function () {
    $('.wild-btn').prop('disabled', true);
    let data = $(this).attr('data');
    var id = data.split('-')[0];
    var lvl = data.split('-')[1];
    var type = 'wild';
    var locId = $('#back-btn').attr('data');
    removeSection('#header');
    removeSection('#game-nav');
    removeSection('#game-foci');
    removeSection('#footer');
    $.post(bHeaderComp, {id: id, lvl: lvl, type: type, locId: locId}, function(data) {
        $('#header').append(data).hide().fadeIn('fast', function () {
            $.get(bUtilComp, function(data) {
                $('#game-nav').append(data).hide();
            });
            $.get(battleComp, function(data) {
                $('#game-foci').append(data).hide().fadeIn('fast');
            }); 
        });
    });
});
