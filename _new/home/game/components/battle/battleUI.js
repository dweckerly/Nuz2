var c = document.getElementById('battle-canvas');
var ctx = c.getContext('2d');

function tag(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 25, y + 25);
    ctx.lineTo(x + 100, y + 25);
    ctx.lineTo(x + 100, y - 25);
    ctx.lineTo(x + 25, y - 25);
    ctx.lineTo(x, y);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.stroke();
}

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
}

function monIntroLerp(uiDetails, endIndicator) {
    ctx.drawImage(uiDetails.img, uiDetails.x, uiDetails.y, uiDetails.w, uiDetails.h);
    uiDetails.x = lerp(uiDetails.x, endPositions[endIndicator], 0.1);
    if (uiDetails.x > endPositions[endIndicator]) {
        if (uiDetails.x <= endPositions[endIndicator] + 0.1) {
            //return true;
        }
    } else if (uiDetails.x < endPositions[endIndicator]) {
        if (uiDetails.x >= endPositions[endIndicator] - 0.1) {
            //return true;
        }
    }
}

function animator() {
    if (opponentMonUIDetails.img !== null) {
        monIntroLerp(opponentMonUIDetails.img, "opponentImg");
    }
}

function update() {
    ctx.clearRect(0, 0, c.width, c.height);
    setCanvasSize();
    animator();
    requestAnimationFrame(update);
}

$(document).ready(function() {
    instantiateOpponentMon(calculateImageSizeAndPosition(c, "opponent"));
    update();
});