var c = document.getElementById('main-canvas');
var ctx = c.getContext('2d');
var pointerImg = document.getElementById('pointer-img');

const winOffset = 30;

const cMaxHeight = 540;
const cMaxWidth = 960;

$(document).ready(function() {
    setCanvasSize();
});

$(window).resize(function() {
    setCanvasSize();
});

function setCanvasSize() {
    if ($(window).width() > cMaxWidth) {
        c.width = cMaxWidth;
    } else {
        c.width = $(window).width() - winOffset;
    }

    if ($(window).height() > cMaxHeight) {
        c.height = cMaxHeight;
    }
    c.height = (c.width * 0.75);
    console.log(c.height + " " + c.width);
}