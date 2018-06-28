
$('#fight-btn').click(function() {
    $('#battle-btns').fadeOut("fast", function() {
        $('#move-btns').fadeIn("fast");
    });
});

$('#back-battle-btn').click(function() {
    $('#move-btns').fadeOut("fast", function() {
        $('#battle-btns').fadeIn("fast");
    });
});

$('#nuzmon-btn').click(function () {
    $('#battle-main').fadeOut('fast');
    $('#battle-footer').fadeOut('fast', function () {
        $('#item-select').hide();
        $('#game-nav').fadeIn('fast', function () {
            $('#battle-util').fadeIn('fast');
        });
    });
});

$('.nuz-list-item').click(function () {
    jQuery('.collapse').collapse('hide');
});


$('#run-btn').click(function() {
    backToLocation();
});