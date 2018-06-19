$('.item-btn').click(function() {
    var name = $(this).attr('data-name');
    var desc = $(this).attr('data-description');
    $('#item-name').html(name);
    $('#item-description').html(desc);
});