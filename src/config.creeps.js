module.exports = {

  "builder": {
    priority: 1,

    canBuild: function (rc) {
      if (rc.getLevel() > 2) {
        return (rc.getCreeps().length === 0);
      } else {
        return rc.getCreeps("builder").length < 5;
      }
    },

    body: [
      [MOVE, WORK, CARRY, MOVE, CARRY],
      [MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY]
    ],

    behaviors: ["get_energy_dropped", "get_energy_link", "get_energy_storage", "harvest", "transfer_energy_spawn", "transfer_energy_extensions", "build_structures", "upgrade_controller"]

  },


  "miner": {
    priority: 2,
    levelMin: 3,

    canBuild: function (rc) {
      var miners = rc.getCreeps("miner");
      var sources = rc.getSources();

      return (miners.length < sources.length);
    },

    body: [
      null,
      null,
      [MOVE, WORK, WORK, WORK, WORK, WORK],
      [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY]
    ],
    behaviors: ["miner_harvest"]
  },

  "transporter": {
    priority: 1,
    levelMin: 3,

    canBuild: function (rc) {
      var miners = rc.getCreeps('miner');
      var transpoters = rc.getCreeps('transporter');
      var links = _.filter(rc.find(FIND_MY_STRUCTURES), function (s) {
        return (s.structureType === STRUCTURE_LINK);
      });
      // Generell doppelt so viele Transporter wie Miner. Zahl verringert sich mit Links. Formel ist noch nicht 100% korrekt. 
      return ((transpoters.length + links.length - 1) < miners.length * 2);

    },

    body: [
      null,
      null,
      [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
      [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
      [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
    ],

    behaviors: ["get_energy_dropped", "get_energy_link", "get_energy_storage", "get_energy_container", "transfer_energy_extensions", "transfer_energy_spawn", "transfer_energy_tower", "transfer_energy_upgrader", "transfer_energy_storage"]
  },

  "upgrader": {
    priority: 4,
    levelMin: 3,

    canBuild: function (rc) {
      var controller = rc.getController();
      return (controller && controller.my && rc.getCreeps('upgrader').length < 1);
      //return false;
      // var max = controller.getFreeFields();
      // if ( max > 3 ) {
      //   max = 3;
      // }
      // return ( rc.getCreeps('upgrader').length < max) ;
    },

    body: [
      null,
      null,
      [MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY],
      [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY],
      [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
      [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
      [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY]

    ],

    behaviors: ["goto_controller", "find_near_energy", "upgrade_controller"]
  },

  "constructor": {
    priority: 5,
    levelMin: 3,

    canBuild: function (rc) {
      return rc.getCreeps("constructor").length < 2;
    },

    body: [
      null,
      null,
      [MOVE, MOVE, WORK, WORK, CARRY, CARRY],
      [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY],
      [MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY],
      [MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY],
    ],

    behaviors: ["get_energy_dropped", "get_energy_link", "get_energy_storage", "get_energy_spawn", "build_structures", "repair", "goto_blue_flag"]
  },

  'attacker': {
    produceGlobal: false,
    priority: 3,
    minLevel: 4,

    canBuild: function (rc) {
      var flags = _.filter(Game.flags, { 'color': COLOR_RED });
      if (flags.length === 0) return false;
      var attackers = _.filter(Game.creeps, { 'memory': { 'role': 'attacker' } });
      return attackers.length < 1;
    },

    body: [
      [TOUGH, ATTACK, MOVE, MOVE],
      [TOUGH, TOUGH, TOUGH, ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
      [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    ],

    behaviors: ['goto_red_flag', 'attack_enemy']

  },

  'scout': {
    produceGlobal: false,
    priority: 6,
    minLevel: 3,

    canBuild: function (rc) {
      var flags = _.filter(Game.flags, { 'color': COLOR_WHITE });
      if (flags.length === 0) return false;
      var scouts = _.filter(Game.creeps, { 'memory': { 'role': 'scout' } });
      return scouts.length < 3;
    },

    body: [
      [CARRY, CARRY, WORK, MOVE, MOVE],
      [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      [CARRY, CARRY, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      [CARRY, CARRY, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CLAIM]
    ],

    behaviors: ['goto_white_flag', "claim_controller", "get_energy_dropped", "harvest", "transfer_energy_spawn", "transfer_energy_extensions", "build_structures", "upgrade_controller"]

  }

};
