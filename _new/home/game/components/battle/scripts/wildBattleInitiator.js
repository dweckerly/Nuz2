function instantiateOpponentMonDetails() {
    opponentMonUIDetails.img = { x: 1006, y: 0, w: 256, h: 256, img: document.getElementById('opponent-img') };
    opponentMonUIDetails.detailsRect = { x: 50, y: -91, w: 300, h: 90, radius: { tr: 20, bl: 20 } };
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
}

$(document).ready(function() {
    $.get("components/battle/transactions/returnSessionMon.trans.php", function(data) {
        opponentMon = JSON.parse(data);
        loadImg(opponentMon.img, 'opponent-img', function() {
            instantiateOpponentMonDetails();
        });
    });
});