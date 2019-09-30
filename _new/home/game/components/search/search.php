<?php
session_start();
$uid = $_SESSION['uid'];
include_once('../../includes/db.inc.php');
$q = "SELECT * FROM games WHERE account_id = '$uid'";
$r = mysqli_query($conn, $q);
$game = mysqli_fetch_assoc($r);
$locId = $game['location'];

$q = "SELECT * FROM encounter_pools WHERE encounter_pool_id = (SELECT search_id FROM locations WHERE location_id = '$locId')";
$r = mysqli_query($conn, $q);
$encounterInfo = mysqli_fetch_assoc($r);
include("../../util/rand.util.php");
$encType = parseEncounterType($encounterInfo['encounter_rates']);
if($encType == 'mon') {
    $_GET['enc_mon'] = parseMonEncounter($encounterInfo['mon_encounters']);
    include('../../components/wildMon/wildMon.php');
} elseif($encType == 'event') {
    include('../../components/event/event.php');
} elseif ($encType == 'item') {
    include('../../components/itemFind/itemFind.php');
}