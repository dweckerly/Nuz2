const headerPath = "home/header.html";
const loginPath = "home/login.html";
const footerPath = "home/footer.html";
const userPath = "home/user.php";

$(document).ready(function() {
    insertHTML("#heading", headerPath, function() {
        insertHTML("#main", loginPath, function() {
            insertHTML("#footer", footerPath);
        });
    });
});

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