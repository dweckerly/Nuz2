$(document).ready(function() {
    $('#location-container').fadeIn('fast');
});

function locationActionSelect(id, action) {
    $.post('components/location/location.trans.php', { id: id, action: action }, function(data) {
        transition(data);
    });
}