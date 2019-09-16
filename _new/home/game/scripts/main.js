window.onload = function() {
    $(document).ready(function() {
        $('#login-switch').click(() => {
            $('#signup-form').hide();
            $('#login-form').show();
        });

        $('#signup-switch').click(() => {
            $('#login-form').hide();
            $('#signup-form').show();
        });
    });
}