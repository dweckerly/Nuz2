$('#menu-toggle').click(function () {
    $('#nav-div').width(250);
});

$('#close-menu').click(function () {
    $('#nav-div').width(0);
});

$('.nav-link').click(function () {
    switch($(this).attr('data')) {
        case 'cs':
            storeAndSwitch(charSheetComp);
            break;
        case 'party':
            storeAndSwitch(partyComp);
            break;
        case 'inv':
            storeAndSwitch(invComp);
            break;
        case 'snq':
            console.log('save and quit clicked');
            break;
    }
})
