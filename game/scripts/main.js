insertHTML('#header', gHeaderComp, function() {
    insertHTML('#game-nav', navComp, function() {
        insertHTML('#game-foci', mapComp);
    });
});

