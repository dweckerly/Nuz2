var currentPlayerMon = firstMon;
var currentNpcMon = 1;

var turn = 'player';

var endFight = false;
var switching = false;

var roundSegs = {};
var segIndex = 0;
var segInterval = 2000;
var segments;

var rounds = 0;

var playerMove;
var enemyMove;

var mod = 0.1;
var minMod = -6;
var maxMod = 6;

var crtiEvaAccMod = 10;

var playerMods = {
    'atk': {
        'mod': 0,
        'count': 0
    },
    'def': {
        'mod': 0,
        'count': 0
    },
    'sAtk': {
        'mod': 0,
        'count': 0
    },
    'sDef': {
        'mod': 0,
        'count': 0
    },
    'speed': {
        'mod': 0,
        'count': 0
    },
    'acc': {
        'mod': 0,
        'count': 0
    },
    'crit': {
        'mod': 0,
        'count': 0
    },
    'evasion': {
        'mod': 0,
        'count': 0
    }
}

var enemyMods = {
    'atk': {
        'mod': 0,
        'count': 0
    },
    'def': {
        'mod': 0,
        'count': 0
    },
    'sAtk': {
        'mod': 0,
        'count': 0
    },
    'sDef': {
        'mod': 0,
        'count': 0
    },
    'speed': {
        'mod': 0,
        'count': 0
    },
    'acc': {
        'mod': 0,
        'count': 0
    },
    'crit': {
        'mod': 0,
        'count': 0
    },
    'evasion': {
        'mod': 0,
        'count': 0
    }
}

var atkMon;
var defMon;
var atkMonMove;
var defMonMove;
var atkMonMods;
var defMonMods;
var atkMonStatus;
var defMonStatus;
var atkMonHealth;
var defMonHealth;

var roundDmg = 0;
var win = true;