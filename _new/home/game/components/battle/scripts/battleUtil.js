function loadImg(src, id, callback) {
    $('#img-container').append(`
    <img id="` + id + `" src="img/mons/` + src + `">
    `);
    if (callback && typeof(callback) === "function") {
        callback();
    }
}

function lerp(min, max, fraction) {
    return (max - min) * fraction + min;
}

function calculateImageSizeAndPosition(canvas, ind) {
    let w, h, x, y;
    w = canvas.width / 2;
    h = w;
    x = canvas.width;
    if (ind == "opponent") {
        y = 0;
        enterPositions.opponentImg = canvas.width / 2;
    } else if (ind == "player") {
        y = canvas.height / 2;
        enterPositions.playerImg = canvas.width / 2;
    }
    return {
        w: w,
        h: h,
        x: x,
        y: y
    }
}