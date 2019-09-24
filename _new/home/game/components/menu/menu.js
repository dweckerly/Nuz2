function openMenu() {
    $('#menu-main').animate({width:"120px"}, 200 );
}

function closeMenu() {
    $('#menu-main').animate({width:"0px"}, 200 );
}

function changeView(newView) {
    closeMenu();
    $.get("components/" + newView + "/" + newView + ".php", function (data) {
        transition(data);
    });
}