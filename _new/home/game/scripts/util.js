function transition(data) {
    $("<div id='transition'></div>").hide().appendTo('body').fadeIn(function() {
        clearIntervals();
        $('#game-container').empty();
        $('#game-container').append(data);
        $('#transition').fadeOut('slow', function() {
            $('#transition').remove();
        });
    });
}