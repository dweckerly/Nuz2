var playerMon;
var playerMonUIDetails = {
    img: null,
    detailsRect: null,
    lvl: null,
    name: null,
    healthRect: null,
    healthOverlay: null,
    healthBg: null,
    healthLabel: null,
    status: null
};
var opponentMon;
var opponentMonUIDetails = {
    img: null,
    detailsRect: null,
    lvl: null,
    name: null,
    healthRect: null,
    healthOverlay: null,
    healthBg: null,
    healthLabel: null,
    status: null
};

var endPositions = {
    playerImg: 0,
    opponentImg: 0,
    playerDetail: 310,
    opponentDetail: -1
}

var startPositions = {
    playerImg: 0,
    opponentImg: 0,
    playerDetail: 0,
    opponentDetail: 0
}

var winOffset = 30;
var cMaxHeight = 540;
var cMaxWidth = 540;