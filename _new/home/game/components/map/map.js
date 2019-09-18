var c = document.getElementById("main-canvas");
var ctx = c.getContext("2d");
var img = document.getElementById("area-map");
var pointImg = document.getElementById("player-pointer");
var clickable = [];
var pointArr = {
    'x' : 0,
    'y' : 0
}
var pointAnimY = 0;

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
    ctx.font = fontSize + "px Amatic";
    clickable = [];
    locations.forEach(function (e) {
        var txt = e.name;
        ctx.fillStyle = "#FFF";
        var loc = {
            id : e.id,
            x1 : (e.x - labelPadding) * (c.width / cMaxWidth),
            x2 : (e.x - labelPadding) * (c.width / cMaxWidth) + ctx.measureText(txt).width + (labelPadding * 2),
            y1 : (e.y - (labelPadding * 0.5) - (fontSize * (cMaxHeight / c.height))) * (c.height / cMaxHeight),
            y2 : (e.y - (labelPadding * 0.5) - (fontSize * (cMaxHeight / c.height))) * (c.height / cMaxHeight) + fontSize + labelPadding * 2
        };
        roundRect(ctx, loc.x1, loc.y1, ctx.measureText(txt).width + (labelPadding * 2), fontSize + labelPadding * 2, 4, true);
        ctx.fillStyle = "#000";
        ctx.fillText(txt, e.x * (c.width / cMaxWidth), e.y * (c.height / cMaxHeight));
        if(e.current) {
            pointArr.x = ((loc.x2 - loc.x1) / 2) + loc.x1 - (pointImg.width / 2)
            pointArr.y = (((loc.y2 - loc.y1) / 2) + loc.y1 - (pointImg.height / 2)) + pointAnimY; 
            ctx.drawImage(pointImg, pointArr.x, pointArr.y);
        }
        clickable.push(loc);
    });
}

c.onmousedown = function (evt) {
    var mousePos = getMousePos(c, evt);
    clickable.forEach(function (e) {
        if(mousePos.x >= e.x1 && mousePos.x <= e.x2 && mousePos.y >= e.y1 && mousePos.y <= e.y2) {
            locations.forEach(function (element) {
                if(element.id == e.id) {
                    $('#location-container').fadeOut(function () {
                        $('#location-container').empty();
                        $.post("components/location/location.php", {id: e.id}, function (data) {
                            $('#location-container').append(data);
                        });
                        $('#location-container').fadeIn();
                    });
                }
            });
        }
    });
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

var i = 0;
sinAnim = setInterval(function() {
    if (i >= 6.2) {
        i = 0;
    }
    pointAnimY = (Math.sin(i)) * 20;
    i += 0.1;
}, 30);

main = setInterval(function() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    drawAreaLabels();
}, 20);