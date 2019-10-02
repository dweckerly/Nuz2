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
            //done return true;
        }
    } else if (uiDetails.x < endPositions[endIndicator]) {
        if (uiDetails.x >= endPositions[endIndicator] - 0.1) {
            //done return true;
        }
    }
}

function drawDetailsRect() {
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#f7f7f7";
    roundRect(ctx, opponentMonUIDetails.detailsRect.x, opponentMonUIDetails.detailsRect.y, opponentMonUIDetails.detailsRect.w, opponentMonUIDetails.detailsRect.h, opponentMonUIDetails.detailsRect.radius, true, true);

    opponentMonUIDetails.detailsRect.y = lerp(opponentMonUIDetails.detailsRect.y, endPositions.opponentDetail, 0.05);

    opponentMonUIDetails.name.x = opponentMonUIDetails.detailsRect.x + 20;
    opponentMonUIDetails.name.y = opponentMonUIDetails.detailsRect.y + 36;
    opponentMonUIDetails.name.txt = opponentMon.mon_name;

    opponentMonUIDetails.healthBg.x = opponentMonUIDetails.detailsRect.x + 20;
    opponentMonUIDetails.healthBg.y = opponentMonUIDetails.detailsRect.y + 60;

    opponentMonUIDetails.healthLabel.x = opponentMonUIDetails.healthBg.x + 10;
    opponentMonUIDetails.healthLabel.y = opponentMonUIDetails.healthBg.y + 13;

    opponentMonUIDetails.healthRect.x = opponentMonUIDetails.detailsRect.x + 60;
    opponentMonUIDetails.healthRect.y = opponentMonUIDetails.detailsRect.y + 60;

    opponentMonUIDetails.healthOverlay.x = opponentMonUIDetails.healthRect.x;
    opponentMonUIDetails.healthOverlay.y = opponentMonUIDetails.healthRect.y;

    opponentMonUIDetails.status.x = opponentMonUIDetails.detailsRect.x + 124;
    opponentMonUIDetails.status.y = opponentMonUIDetails.detailsRect.y + 36;
}

function drawText() {
    ctx.fillStyle = "black";
    ctx.font = "26px ShadowsIntoLight";
    ctx.fillText(opponentMonUIDetails.name.txt, opponentMonUIDetails.name.x, opponentMonUIDetails.name.y);

    ctx.font = "20px ShadowsIntoLight";
    ctx.fillText(opponentMonUIDetails.status.txt, opponentMonUIDetails.status.x, opponentMonUIDetails.status.y);

    ctx.font = "18px Courier New";
    ctx.fillText(opponentMonUIDetails.lvl.txt, opponentMonUIDetails.lvl.x, opponentMonUIDetails.lvl.y);
}

function drawHealth() {
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    roundRect(ctx, opponentMonUIDetails.healthBg.x, opponentMonUIDetails.healthBg.y, opponentMonUIDetails.healthBg.w, opponentMonUIDetails.healthBg.h, { tl: 5, bl: 5 }, true, true);
    ctx.fillStyle = "#888";
    roundRect(ctx, opponentMonUIDetails.healthOverlay.x, opponentMonUIDetails.healthOverlay.y, opponentMonUIDetails.healthOverlay.w, opponentMonUIDetails.healthOverlay.h, { tr: 5, br: 5 }, true, false);
    roundRect(ctx, opponentMonUIDetails.healthRect.x, opponentMonUIDetails.healthRect.y, opponentMonUIDetails.healthRect.w, opponentMonUIDetails.healthRect.h, { tr: 5, br: 5 }, false, true);

    ctx.font = "18px Courier New";
    ctx.fillStyle = "#fff";
    ctx.fillText(opponentMonUIDetails.healthLabel.txt, opponentMonUIDetails.healthLabel.x, opponentMonUIDetails.healthLabel.y);
}

function drawLevelTag() {
    tag(opponentMonUIDetails.detailsRect.x + opponentMonUIDetails.detailsRect.w - 60, opponentMonUIDetails.detailsRect.y + 30);
    opponentMonUIDetails.lvl = {
        x: opponentMonUIDetails.detailsRect.x + opponentMonUIDetails.detailsRect.w - 40,
        y: opponentMonUIDetails.detailsRect.y + 36,
        txt: "lvl " + opponentMon.lvl
    }
}

function animator() {
    if (opponentMonUIDetails.img !== null) {
        monIntroLerp(opponentMonUIDetails.img, "opponentImg");
        drawDetailsRect();
        drawLevelTag();
        drawText();
        drawHealth();
    }
}

function update() {
    ctx.clearRect(0, 0, c.width, c.height);
    setCanvasSize();
    animator();
    requestAnimationFrame(update);
}

$(document).ready(function() {
    setCanvasSize();
    instantiateOpponentMon(calculateImageSizeAndPosition(c, "opponent"));
    update();
});