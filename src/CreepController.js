var Debugger = require("_debugger");

function CreepController(roomController) {
  this.roomController = roomController;
}

/**
 * CreepController.run(creep)
 */
CreepController.prototype.run = function(creep) {

  var config = global.getCreepConfig(creep.role);
  if (config !== null) {
    var behavior = global.getBehavior(creep.behavior);

    if (behavior === null || behavior.completed(creep, this.roomController)) {
      behavior = this.findBehavior(config, creep);
      creep.target = null;
    }

    if (behavior !== null) {
      if (creep.behavior !== behavior.name) {
        creep.behavior = behavior.name;
      }
      var debug = new Debugger("CreepController.run: " + creep + ", behavior: " + behavior.name);
      behavior.work(creep, this.roomController);
      debug.end();
    } else {
      creep.behavior = null;
    }
  }
};


/**
 * CreepController.findBehavior;
 */
CreepController.prototype.findBehavior = function(config, creep) {
  var behaviors = config.behaviors;

  for (var i = 0; i < behaviors.length; i++) {
    var b = global.getBehavior(behaviors[i]);

    if (b !== null && b.when(creep, this.roomController)) {
      return b;
    }
  }

  return null;
};


module.exports = CreepController;
