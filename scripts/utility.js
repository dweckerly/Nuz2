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

function changeFoci(path, callback) {
    $('#game-foci').children().fadeOut('fast', function() {
        appendHTML('#game-foci', path);
        if(callback != undefined) {
            callback();
        }
    });
}
