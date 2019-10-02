function instantiateOpponentMon() {
    opponentImg = { x: 1006, y: 0, w: 256, h: 256, img: document.getElementById('opponent-img') };
    opponentDetailsRect = { x: 50, y: -91, w: 300, h: 90, radius: { tr: 20, bl: 20 } };
    var opponentNameTxt = {
        x: opponentDetailsRect.x + (opponentDetailsRect.w / 2) - ctx.measureText(opponentMonName).width,
        y: opponentDetailsRect.y + opponentDetailsRect.h + 28,
        txt: opponentMonName
    };
    var opponentLvlTxt = {
        x: opponentDetailsRect.x + opponentDetailsRect.w - (ctx.measureText(oLvlTxt).width * 2),
        y: opponentNameTxt.y,
        txt: oLvlTxt
    }
    var opponentHealthRect = {
        x: opponentDetailsRect.x + 60,
        y: opponentDetailsRect.y + 60,
        w: opponentDetailsRect.w - 80,
        h: 16
    };
    var opponentHealthOverlay = {
        x: opponentHealthRect.x,
        y: opponentHealthRect.y,
        w: opponentHealthRect.w,
        h: opponentHealthRect.h
    };

    currentOpponentMon['healthDisplay'] = opponentHealthOverlay;

    var opponentHealthBg = {
        x: opponentHealthRect.x,
        y: opponentHealthRect.y,
        w: 42,
        h: opponentHealthRect.h
    }
    var oHpLabel = {
        x: 0,
        y: 0,
        txt: "HP"
    }
    var opponentStatus = { x: 0, y: 0, txt: createStatusString(currentOpponentMon) };
}

$(document).ready(function () {
    $.get("components/battle/transactions/returnSessionMon.trans.php", function(data) {
        opponentMon = JSON.parse(data);
        loadImg(opponent.img, 'opponent-img', function() {
            instantiateOpponentMon();
        });
    });
});