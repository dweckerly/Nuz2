$(window).on('resize', function() {
    var win = $(this);
    if (win.width() > 600) {
        $('#nav-div').width(250);
    }
    if (win.width() <= 600) {
        $('#nav-div').width(0);
    }
});

function insertHTML(id, path, callback) {
    $.get(path, function(data) {
        $(id).html(data).hide().fadeIn('fast', function() {});
        if (callback != undefined) {
            callback();
        }
    });

}

function appendHTML(id, path, callback) {
    $.get(path, function(data) {
        $(id).append(data).hide().fadeIn('fast', function() {});
        if (callback != undefined) {
            callback();
        }
    });
}

// gets the first child of a section, removes it, and appends new data
function changeSection(id, path, callback) {
    var child = $(id).find(':first-child');
    if (child == null) {
        appendHTML(id, path);
    }
    var cid = child.attr('id');
    $("#" + cid).fadeOut('fast', function() {
        $("#" + cid).remove();
        appendHTML(id, path);
        if (callback != undefined) {
            callback();
        }
    });
}

function removeSection(id) {
    var child = $(id).find(':first-child');
    if (child != null) {
        var cid = child.attr('id');
        $("#" + cid).fadeOut('fast', function() {
            $("#" + cid).remove();
        });
    }
}

function storeAndSwitch(path) {
    changeSection('#game-foci', path);
}

function typeWriter(text, id) {
    clearTimeout(typeEffect);
    document.getElementById(id).innerHTML = "";
    var i = 0;
    var typeEffect = setInterval(function() {
        if (i < text.length) {
            document.getElementById(id).innerHTML += text.charAt(i);
            i++;
        } else {
            clearTimeout(typeEffect);
        }
    }, 50);
}