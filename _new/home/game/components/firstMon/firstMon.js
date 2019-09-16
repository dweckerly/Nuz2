var selected = 0;
$(document).ready(() => {
    $("[id^=img]").each(function() {
        this.onclick = function() {
            $('#img-' + selected).width("-=100");
            $('#img-' + selected).height("-=100");
            selected = $(this).attr('id').split('-')[1];
            $("[id^=desc]").hide();
            $('#img-' + selected).width("+=100");
            $('#img-' + selected).height("+=100");
            $("#desc-" + selected).show();
        }
    });
});