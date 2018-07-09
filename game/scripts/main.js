$(document).ready(function () {
    /*
    if(playerCreated == 1) {
        instantiatePage();
    } else {
        insertHTML('#game-foci', createPlayerComp);
    }*/
    instantiatePage();
});

function instantiatePage() {
    insertHTML('#header', gHeaderComp, function() {
        insertHTML('#game-nav', navComp, function() {
            insertHTML('#game-foci', mapComp);
        });
    });
}

