var Behavior = require("_behavior");

var b = new Behavior("miner_harvest");

b.when = function() {
  return true;
};

b.completed = function() {
  return false;
};

b.work = function(creep, rc) {
  var source = creep.getTarget();

  if (!creep.target) {
    source = _.find(rc.getSources(), function(s) {
      return (rc.getCreeps("miner", s.id).length === 0);
    });
  }

  if (source === null) {
    source = Game.getObjectById(creep.target);
  }

  if (source !== null) {
    creep.target = source.id;
    if (!creep.pos.isNearTo(source)) {
      creep.moveTo(source);
    } else {
      creep.harvest(source);
    }
  }
};

module.exports = b;
