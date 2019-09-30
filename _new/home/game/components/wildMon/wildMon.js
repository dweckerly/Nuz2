function callSearch() {
    $.get("components/search/search.php", function(data) {
        transition(data);
    });
}