<?php
?>
<a href='javascript:void(0)' id="menu-toggle" onclick="openMenu()"><img src="img/ui/menu.png"></a>
<div id="menu-main" class="grid-1">
    <a href="javascript:void(0)" id="menu-close" onclick="closeMenu()">&times;</a>
    <img class="menu-img" src="img/ui/player.png" onclick="changeView('player')">
    <img class="menu-img" src="img/ui/party.png" onclick="changeView('party')">
    <img class="menu-img" src="img/ui/inventory.png" onclick="changeView('inventory')">
    <img class="menu-img" src="img/ui/map.png" onclick="backToMain()">
    <img class="menu-img" src="img/ui/journal.png" onclick="changeView('journal')">
</div>
<script src="components/menu/menu.js"></script>
