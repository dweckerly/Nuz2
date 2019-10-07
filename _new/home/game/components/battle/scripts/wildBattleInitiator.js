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

function instantiateOpponentMon(opponentImgDetails) {
    $.get("components/battle/transactions/returnSessionMon.trans.php", function(data) {
        opponentMon = JSON.parse(data);
        loadImg(opponentMon.img, 'opponent-img', function() {
            instantiateOpponentMonDetails(opponentImgDetails);
        });
    });
}

function instantiatePlayerMon(playerImgDetails) {
    $.get("components/battle/transactions/getPartyMons.trans.php", function(data) {
        playerMons = JSON.parse(data);
        if (playerMons.length == 1) {
            instantiatePlayerMonDetails(playerImgDetails);
        } else {
            showMonSelect(playerMons);
        }
    });
}

function showMonSelect(playerMons) {
    $('#battle-container').append(`
        <div id="select-container" class="hidden">
        <p>Select a NuzMon to send out!</p>
    `);
    playerMons.forEach(function(mon) {
        $('#select-container').append(`
            <div class="grid-5 border-bottom">
                <div>
                    <img src="img/mons/` + mon.img + `">
                </div>
                <div>
                    <p>` + mon.name + `</p>
                </div>
                <div>
                    <p><` + mon.currentHp + `/` + mon.hp + `</p>
                </div>
                <div>
                    <p>` + mon.status + `</p>
                </div>
                <div>
                    <p>` + mon.level + `</p>
                </div>
            </div>
        `);
    });
    $('#battle-container').append(`
        </div>
    `);
    $('#select-container').fadeIn();
}