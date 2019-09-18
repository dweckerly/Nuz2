var c = document.getElementById("main-canvas");
var ctx = c.getContext("2d");
var img = document.getElementById("area-map");

const winOffset = 30;

const cMaxHeight = 540;
const cMaxWidth = 540;

const fontSize = 24;
const labelPadding = 5;

$(document).ready(function() {
    ctx.font = fontSize + "px Amatic";
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
    locations.forEach(function (e) {
        var txt = e.name;
        ctx.fillStyle = "#FFF";
        roundRect(ctx, (e.x - labelPadding) * (c.width / cMaxWidth), (e.y - (labelPadding * 0.5) - (fontSize * (cMaxHeight / c.height))) * (c.height / cMaxHeight), ctx.measureText(txt).width + (labelPadding * 2), fontSize + labelPadding * 2, 4, true);
        ctx.fillStyle = "#000";
        ctx.fillText(txt, e.x * (c.width / cMaxWidth), e.y * (c.height / cMaxHeight));
    });
}

c.onmousemove = function (evt) {
    console.log(getMousePos(c, evt));
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}


function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}