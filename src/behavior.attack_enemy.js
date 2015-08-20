var Behavior = require("_behavior");

var b = new Behavior("attack_enemy");


function getTarget(room) {
  var TARGETS = [FIND_HOSTILE_CREEPS, FIND_HOSTILE_SPAWNS, FIND_HOSTILE_STRUCTURES];

  var filter = function(t) {
    if (t.structureType && t.structureType === STRUCTURE_CONTROLLER) return false;
    return (t.owner.username !== 'Source Keeper');
  };

  for (var i in TARGETS) {
    var targets = _.filter(room.find(TARGETS[i]), filter);
    if (targets.length) {
      return targets[0];
    }
  }

  return null;
}

b.when = function(creep, rc) {
  var target = getTarget(creep.room);
  return !!target;
};

b.completed = function(creep, rc) {
  var target = creep.getTarget();
  return !target;
};

b.work = function(creep, rc) {
  var target = creep.getTarget() || getTarget(creep.room);

  if (target !== null) {
    creep.target = target.id;
    if (creep.pos.inRangeTo(target, 3)) {
      creep.rangedAttack(target);

    } else {
      creep.moveTo(target, {
        ignoreDestructibleStructures: true
      }
      );
    }
  }
};

module.exports = b;
