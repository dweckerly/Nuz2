function insertHTML (id, path) {
    $.get(path, function(data) {
        $(id).html(data);
    });
}

function appendHTML (id, path) {
    $.get(path, function(data) {
        $(id).append(data);
    });
}
