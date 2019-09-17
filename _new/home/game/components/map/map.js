var c = document.getElementById("main-canvas");
var ctx = c.getContext("2d");
var img = document.getElementById("area-map");

const winOffset = 30;

const cMaxHeight = 540;
const cMaxWidth = 540;

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
    c.height = c.width;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    drawAreaLabels();
}

function drawAreaLabels() {
    ctx.font = "20px Amatic";
    ctx.fillText("Hello World", 10, 50);
}