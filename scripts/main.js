insertHTML('#header', 'components/gameHeader.html', function() {
    insertHTML('#game-nav', 'components/nav.html', function() {
        insertHTML('#game-foci', 'components/map.html');
    });
});