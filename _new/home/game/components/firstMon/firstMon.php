<?php
include("../../includes/vars.inc.php");
include("../../includes/db.inc.php");

$mons = array(
    selectAssoc("mons", "mon_id", FIRSTMONS[0]),
    selectAssoc("mons", "mon_id", FIRSTMONS[1]),
    selectAssoc("mons", "mon_id", FIRSTMONS[2])
);
echo $mons[0]['mon_name'] . " " . $mons[1]['mon_name'] . " " . $mons[2]['mon_name'];