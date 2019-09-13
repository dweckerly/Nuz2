const headerPath = "home/header.html";
const loginPath = "home/login.html";
const footerPath = "home/footer.html";
const userPath = "home/user.php";

$(document).ready(function() {
    insertHTML("#heading", headerPath, function() {
        insertHTML("#main", loginPath, function() {
            insertHTML("#footer", footerPath);
        });
    });
});