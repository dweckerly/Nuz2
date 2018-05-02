function insertHTML (id, path, callback) {
    $.get(path, function(data) {
        $(id).html(data).hide().fadeIn('fast', function () {});
        if(callback != undefined) {
            callback();
        }
    });

}

function appendHTML (id, path, callback) {
    $.get(path, function(data) {
        $(id).append(data).hide().fadeIn('fast', function () {});
        if(callback != undefined) {
            callback();
        }
    });
}

// gets the first child of a section, removes it, and appends new data
function changeSection(id, path, callback) {
    var child = $(id).find(':first-child');
    var cid = child.attr('id');
    $("#" + cid).fadeOut('fast', function() { 
        $("#" + cid).remove();
        appendHTML(id, path);
        if(callback != undefined) {
            callback();
        }
    });
}
