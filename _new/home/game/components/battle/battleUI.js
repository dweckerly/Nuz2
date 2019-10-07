var c = document.getElementById('battle-canvas');
var ctx = c.getContext('2d');

function instantiateOpponentMonDetails(imgSizeAndPosition) {
    opponentMonUIDetails.img = { x: imgSizeAndPosition.x, y: imgSizeAndPosition.y, w: imgSizeAndPosition.w, h: imgSizeAndPosition.h, img: document.getElementById('opponent-img') };
    opponentMonUIDetails.detailsRect = { x: 0, y: -91, w: imgSizeAndPosition.w, h: 90, radius: { tr: 20, bl: 20 } };
    opponentMonUIDetails.name = {
        x: opponentMonUIDetails.detailsRect.x + (opponentMonUIDetails.detailsRect.w / 2) - ctx.measureText(opponentMon.mon_name).width,
        y: opponentMonUIDetails.detailsRect.y + opponentMonUIDetails.detailsRect.h + 28,
        txt: opponentMon.mon_name
    };
    opponentMonUIDetails.lvl = {
        x: opponentMonUIDetails.detailsRect.x + opponentMonUIDetails.detailsRect.w - (ctx.measureText(opponentMon.lvl).width * 2),
        y: opponentMonUIDetails.name.y,
        txt: opponentMon.lvl
    }
    opponentMonUIDetails.healthRect = {
        x: opponentMonUIDetails.detailsRect.x + 60,
        y: opponentMonUIDetails.detailsRect.y + 60,
        w: opponentMonUIDetails.detailsRect.w - 80,
        h: 16
    };
    opponentMonUIDetails.healthOverlay = {
        x: opponentMonUIDetails.healthRect.x,
        y: opponentMonUIDetails.healthRect.y,
        w: opponentMonUIDetails.healthRect.w,
        h: opponentMonUIDetails.healthRect.h
    };

    opponentMonUIDetails.healthBg = {
        x: opponentMonUIDetails.healthRect.x,
        y: opponentMonUIDetails.healthRect.y,
        w: 42,
        h: opponentMonUIDetails.healthRect.h
    }
    opponentMonUIDetails.healthLabel = {
        x: 0,
        y: 0,
        txt: "HP"
    }
    opponentMonUIDetails.status = { x: 0, y: 0, txt: "" };
    animationTracker.opponent.enter = true;
}

function instantiatePlayerMonDetails(imgSizeAndPosition) {
    playerMonUIDetails.img = { x: imgSizeAndPosition.x, y: imgSizeAndPosition.y, w: imgSizeAndPosition.w, h: imgSizeAndPosition.h, img: document.getElementById('player-img') };
    playerMonUIDetails.detailsRect = { x: imgSizeAndPosition.w, y: c.height, w: imgSizeAndPosition.w, h: 90, radius: { tr: 20, bl: 20 } };
    playerMonUIDetails.name = {
        x: playerMonUIDetails.detailsRect.x + (playerMonUIDetails.detailsRect.w / 2) - ctx.measureText(playerMon.mon_name).width,
        y: playerMonUIDetails.detailsRect.y + playerMonUIDetails.detailsRect.h + 28,
        txt: playerMon.mon_name
    };
    playerMonUIDetails.lvl = {
        x: playerMonUIDetails.detailsRect.x + playerMonUIDetails.detailsRect.w - (ctx.measureText(playerMon.lvl).width * 2),
        y: playerMonUIDetails.name.y,
        txt: playerMon.lvl
    }
    playerMonUIDetails.healthRect = {
        x: playerMonUIDetails.detailsRect.x + 60,
        y: playerMonUIDetails.detailsRect.y + 60,
        w: playerMonUIDetails.detailsRect.w - 80,
        h: 16
    };
    playerMonUIDetails.healthOverlay = {
        x: playerMonUIDetails.healthRect.x,
        y: playerMonUIDetails.healthRect.y,
        w: playerMonUIDetails.healthRect.w,
        h: playerMonUIDetails.healthRect.h
    };

    playerMonUIDetails.healthBg = {
        x: playerMonUIDetails.healthRect.x,
        y: playerMonUIDetails.healthRect.y,
        w: 42,
        h: playerMonUIDetails.healthRect.h
    }
    playerMonUIDetails.healthLabel = {
        x: 0,
        y: 0,
        txt: "HP"
    }
    playerMonUIDetails.status = { x: 0, y: 0, txt: "" };
    animationTracker.player.enter = true;
}

function instantiateOpponentMon() {
    $.get("components/battle/transactions/returnSessionMon.trans.php", function(data) {
        opponentMon = JSON.parse(data);
        loadImg(opponentMon.img, 'opponent-img', function() {
            instantiateOpponentMonDetails(calculateImageSizeAndPosition(c, "opponent"));
        });
    });
}

function instantiatePlayerMon() {
    $.get("components/battle/transactions/getPartyMons.trans.php", function(data) {
        playerMons = JSON.parse(data);
        console.log(playerMons);
        if (playerMons.length > 1) {
            showMonSelect(playerMons);
        } else {
            selectMon(0);
        }
    });
}

function selectMon(index) {
    if ($('#select-container').length > 0) {
        $('#select-container').fadeOut();
    }
    playerMon = playerMons[index];
    loadImg(playerMon.img, 'player-img', function() {
        instantiatePlayerMonDetails(calculateImageSizeAndPosition(c, "player"));
        instantiateBatteOptions();
    });
}

function showMonSelect(playerMons) {
    $('#battle-container').append(`
        <div id="select-container" class="hidden center-text scroll-div">
            <h4>Select a NuzMon to battle with!</h4>
    `);
    playerMons.forEach(function(mon, index) {
        $('#select-container').append(`
            <div class="grid-5 border-bottom" onclick="selectMon(` + index + `)">
                <div>
                    <img src="img/mons/` + mon.img + `">
                </div>
                <div>
                    <p>` + mon.mon_name + `</p>
                </div>
                <div>
                    <p>` + mon.current_hp + `/` + mon.hp + `</p>
                </div>
                <div>
                    <p>` + mon.status + `</p>
                </div>
                <div>
                    <p>` + mon.lvl + `</p>
                </div>
            </div>
        `);
    });
    $('#battle-container').append(`
        </div>
    `);
    $('#select-container').fadeIn();
}

function instantiateBatteOptions() {

}

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

function monIntroLerp(uiDetails, animIndicator) {
    ctx.drawImage(uiDetails.img, uiDetails.x, uiDetails.y, uiDetails.w, uiDetails.h);
    if (animIndicator == "opponent") {
        uiDetails.x = lerp(uiDetails.x, enterPositions["opponentImg"], 0.1);
        if (uiDetails.x <= enterPositions["opponentImg"] + 0.1) {
            animationTracker.opponent.enter = false;
            animationTracker.opponent.idle = true;
        }
    } else if (animIndicator == "player") {
        uiDetails.x = lerp(uiDetails.x, enterPositions["playerImg"], 0.1);
        if (uiDetails.x >= enterPositions["playerImg"] - 0.1) {
            animationTracker.player.enter = false;
            animationTracker.player.idle = true;
        }
    }
}

function drawDetailsRect(uiDetails, endIndicator, mon) {
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#f7f7f7";
    roundRect(ctx, uiDetails.detailsRect.x, uiDetails.detailsRect.y, uiDetails.detailsRect.w, uiDetails.detailsRect.h, uiDetails.detailsRect.radius, true, true);

    uiDetails.detailsRect.y = lerp(uiDetails.detailsRect.y, enterPositions[endIndicator], 0.05);

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
    ctx.drawImage(uiDetails.img.img, uiDetails.img.x, uiDetails.img.y, uiDetails.img.w, uiDetails.img.h);
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#f7f7f7";
    roundRect(ctx, uiDetails.detailsRect.x, uiDetails.detailsRect.y, uiDetails.detailsRect.w, uiDetails.detailsRect.h, uiDetails.detailsRect.radius, true, true);
    drawHealth(uiDetails);
    drawLevelTag(uiDetails, mon);
    drawText(uiDetails);
}

function opponentMonEnter() {
    if (opponentMonUIDetails.img !== null) {
        monIntroLerp(opponentMonUIDetails.img, "opponent");
        drawDetailsRect(opponentMonUIDetails, "opponentDetail", opponentMon);
        drawLevelTag(opponentMonUIDetails, opponentMon);
        drawText(opponentMonUIDetails);
        drawHealth(opponentMonUIDetails);
    }
}

function opponentMonIdle() {
    drawMonDetails(opponentMonUIDetails, opponentMon);
}

function opponentMonExit() {

}

function playerMonEnter() {
    if (playerMonUIDetails.img !== null) {
        monIntroLerp(playerMonUIDetails.img, "player");
        drawDetailsRect(playerMonUIDetails, "playerDetail", playerMon);
        drawLevelTag(playerMonUIDetails, playerMon);
        drawText(playerMonUIDetails);
        drawHealth(playerMonUIDetails);
    }
}

function playerMonIdle() {
    drawMonDetails(playerMonUIDetails, playerMon);
}

function playerMonExit() {

}

function playerMonSelect() {

}

function animator() {
    if (animationTracker.opponent.enter) {
        opponentMonEnter();
    }
    if (animationTracker.opponent.idle) {
        opponentMonIdle();
    }
    if (animationTracker.player.enter) {
        playerMonEnter();
    }
    if (animationTracker.player.idle) {
        playerMonIdle();
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
    instantiateOpponentMon();
    instantiatePlayerMon();
    update();
});