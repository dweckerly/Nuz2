var c = document.getElementById('battle-canvas');
var ctx = c.getContext('2d');

var winOffset = 30;

var cMaxHeight = 540;
var cMaxWidth = 540;

var animTracker = {
    imagesAnim: true,
    detailsAnim: false
}

var showingUtil = false;

var endPositions = {
    playerImg: 44,
    opponentImg: 450,
    playerDetail: 310,
    opponentDetail: -1
}

var playerImg = { x: -256, y: 144, w: 256, h: 256, img: document.getElementById('player-img') };
var playerDetailsRect = { x: 400, y: 400, w: 300, h: 90, radius: { tl: 20, br: 20 } };
var playerNameTxt = {
    x: playerDetailsRect.x + (playerDetailsRect.w / 2) - ctx.measureText(playerMonName).width,
    y: playerDetailsRect.y - 14,
    txt: playerMonName
};
var playerLvlTxt = {
    x: playerDetailsRect.x + playerDetailsRect.w - ctx.measureText(pLvlTxt).width,
    y: playerNameTxt.y,
    txt: pLvlTxt
}
var playerHealthRect = {
    x: playerDetailsRect.x + 20,
    y: playerDetailsRect.y + 20,
    w: playerDetailsRect.w - 80,
    h: 16
};
let disPer = (currentPlayerMon.hp.current / currentPlayerMon.hp.max) * playerHealthRect.w;
var playerHealthOverlay = {
    x: playerHealthRect.x,
    y: playerHealthRect.y,
    w: disPer,
    h: playerHealthRect.h
};

currentPlayerMon['healthDisplay'] = playerHealthOverlay;

var playerHealthBg = {
    x: playerHealthRect.x,
    y: playerHealthRect.y,
    w: 42,
    h: 16
}
var pHpLabel = {
    x: 0,
    y: 0,
    txt: "HP"
}
var playerStatus = { x: 0, y: 0, txt: playerStatusTxt };
var playerExpRect = { x: 0, y: 0, w: 0, h: 0 };
var playerExpOverlay = { x: 0, y: 0, w: 0, h: 0 };


var opponentImg = { x: 1006, y: 0, w: 256, h: 256, img: document.getElementById('opponent-img') };
var opponentDetailsRect = { x: 50, y: -91, w: 300, h: 90, radius: { tr: 20, bl: 20 } };
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
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    drawAreaLabels();
}