function callBattle() {
    $.get("components/battle/battle.php", function(data) {
        transition(data);
    });
}

function callSearch() {
    $.get("components/search/search.php", function(data) {
        transition(data);
    });
}