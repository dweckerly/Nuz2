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

function changeSection(id, path, callback) {
    $(id).first().fadeOut('fast', function() {
        appendHTML(id, path);
        if(callback != undefined) {
            callback();
        }
    });
}
