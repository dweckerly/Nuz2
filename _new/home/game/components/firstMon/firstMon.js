var selected = 0;
$(document).ready(() => {
    $("[id^=img-]").each(function() {
        this.onclick = function() {
            selected = $(this).attr('id').split('-')[1];
            $("[id^=desc-]").hide();
            $("#desc-" + selected).show();
        }
    });

    $("[id^=btn-]").each(function() {
        this.onclick = function() {
            $.post("components/firstMon/firstMon.trans.php", { mon: selected })
        }
    })
});