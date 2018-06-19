$('#login-btn').click(function() {
    var uName = $('#user-name').val();
    var pwd = $('#pwd').val();
    $.post(userPath, { uName: uName, pwd: pwd }, function(data) {
        var id = "#main";
        var child = $(id).find(':first-child');
        var cid = child.attr('id');
        $("#" + cid).fadeOut('fast', function() {
            $("#" + cid).remove();
            $(id).append(data).hide().fadeIn('fast');
        });
    });
});