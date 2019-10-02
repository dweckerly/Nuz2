function loadImg(src, id, callback) {
    $('#img-container').append(`
    <img id="` + id + `" src="` + src + `">
    `);
    if (callback && typeof(callback) === "function") {
        callback();
    }
}