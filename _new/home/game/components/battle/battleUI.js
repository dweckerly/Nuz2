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

function monIntroLerp(uiDetails, endIndicator, animIndicator) {
    ctx.drawImage(uiDetails.img, uiDetails.x, uiDetails.y, uiDetails.w, uiDetails.h);
    uiDetails.x = lerp(uiDetails.x, endPositions[endIndicator], 0.1);
    if (uiDetails.x > endPositions[endIndicator]) {
        if (uiDetails.x <= endPositions[endIndicator] + 0.1) {
            // end lerp
        }
    } else if (uiDetails.x < endPositions[endIndicator]) {
        if (uiDetails.x >= endPositions[endIndicator] - 0.1) {
            // end lerp
        }
    }
}

function drawDetailsRect(uiDetails, endIndicator, mon) {
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#f7f7f7";
    roundRect(ctx, uiDetails.detailsRect.x, uiDetails.detailsRect.y, uiDetails.detailsRect.w, uiDetails.detailsRect.h, uiDetails.detailsRect.radius, true, true);

    uiDetails.detailsRect.y = lerp(uiDetails.detailsRect.y, endPositions[endIndicator], 0.05);

    uiDetails.name.x = uiDetails.detailsRect.x + 20;
    uiDetails.name.y = uiDetails.detailsRect.y + 36;
    uiDetails.name.txt = mon.mon_name;

    uiDetails.healthBg.x = uiDetails.detailsRect.x + 20;
    uiDetails.healthBg.y = uiDetails.detailsRect.y + 60;

    uiDetails.healthLabel.x = uiDetails.healthBg.x + 10;
    uiDetails.healthLabel.y = uiDetails.healthBg.y + 13;

    uiDetails.healthRect.x = uiDetails.detailsRect.x + 60;
    uiDetails.healthRect.y = uiDetails.detailsRect.y + 60;

    uiDetails.healthOverlay.x = uiDetails.healthRect.x;
    uiDetails.healthOverlay.y = uiDetails.healthRect.y;

    uiDetails.status.x = uiDetails.detailsRect.x + 124;
    uiDetails.status.y = uiDetails.detailsRect.y + 36;
}

function drawText(uiDetails) {
    ctx.fillStyle = "black";
    ctx.font = "26px ShadowsIntoLight";
    ctx.fillText(uiDetails.name.txt, uiDetails.name.x, uiDetails.name.y);

    ctx.font = "20px ShadowsIntoLight";
    ctx.fillText(uiDetails.status.txt, uiDetails.status.x, uiDetails.status.y);

    ctx.font = "18px Courier New";
    ctx.fillText(uiDetails.lvl.txt, uiDetails.lvl.x, uiDetails.lvl.y);
}

function drawHealth(uiDetails) {
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    roundRect(ctx, uiDetails.healthBg.x, uiDetails.healthBg.y, uiDetails.healthBg.w, uiDetails.healthBg.h, { tl: 5, bl: 5 }, true, true);
    ctx.fillStyle = "#888";
    roundRect(ctx, uiDetails.healthOverlay.x, uiDetails.healthOverlay.y, uiDetails.healthOverlay.w, uiDetails.healthOverlay.h, { tr: 5, br: 5 }, true, false);
    roundRect(ctx, uiDetails.healthRect.x, uiDetails.healthRect.y, uiDetails.healthRect.w, uiDetails.healthRect.h, { tr: 5, br: 5 }, false, true);

    ctx.font = "18px Courier New";
    ctx.fillStyle = "#fff";
    ctx.fillText(uiDetails.healthLabel.txt, uiDetails.healthLabel.x, uiDetails.healthLabel.y);
}

function drawLevelTag(uiDetails, mon) {
    tag(uiDetails.detailsRect.x + uiDetails.detailsRect.w - 60, uiDetails.detailsRect.y + 30);
    uiDetails.lvl = {
        x: uiDetails.detailsRect.x + uiDetails.detailsRect.w - 40,
        y: uiDetails.detailsRect.y + 36,
        txt: "lvl " + mon.lvl
    }
}

function drawMonDetails(uiDetails, mon) {
    ctx.drawImage(uiDetails.img, uiDetails.x, uiDetails.y, uiDetails.w, uiDetails.h);
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#f7f7f7";
    roundRect(ctx, uiDetails.detailsRect.x, uiDetails.detailsRect.y, uiDetails.detailsRect.w, uiDetails.detailsRect.h, uiDetails.detailsRect.radius, true, true);
    drawHealth(uiDetails);
    drawLevelTag(uiDetails, mon);
    drawText(uiDetails);
}

function opponentMonEnter() {
    if (opponentMonUIDetails.img !== null) {
        monIntroLerp(opponentMonUIDetails.img, "opponentImg", "opponentIntro");
        drawDetailsRect(opponentMonUIDetails, "opponentDetail", opponentMon);
        drawLevelTag(opponentMonUIDetails, opponentMon);
        drawText(opponentMonUIDetails);
        drawHealth(opponentMonUIDetails);
    }
}

function opponentMonStatic() {
    drawMonDetails(opponentMonUIDetails, opponentMon);
}

function opponentMonExit() {

}

function playerMonEnter() {
    if (playerMonUIDetails.img !== null) {
        monIntroLerp(playerMonUIDetails.img, "playerImg", "playerIntro");
        drawDetailsRect(playerMonUIDetails, "playerDetail", playerMon);
        drawLevelTag(playerMonUIDetails, playerMon);
        drawText(playerMonUIDetails);
        drawHealth(playerMonUIDetails);
    }
}

function playerMonStatic() {
    drawMonDetails(playerMonUIDetails, playerMon);
}

function playerMonExit() {

}

function playerMonSelect() {

}

function animator() {

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