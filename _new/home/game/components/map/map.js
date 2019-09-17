window.onload = function() {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("area-map");
    ctx.drawImage(img, 0, 0, canvas.clientWidth, canvas.height);
};