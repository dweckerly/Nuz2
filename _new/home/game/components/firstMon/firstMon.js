$(document).ready(() => {
    $("[id^=img]").each(function() {
        this.onclick = function() {
            let id = $(this).attr('id').split('-')[1];
            $("[id^=desc]").hide();
            $("#desc-" + id).show();
        }
    });
});