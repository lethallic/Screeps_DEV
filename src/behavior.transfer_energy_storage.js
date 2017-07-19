var Behavior = require("_behavior");

var b = new Behavior("transfer_energy_storage");

b.when = function (creep, rc) {
  if (creep.energy === 0) return false;
  var storage = creep.room.storage;
  if (!storage) return false;
  // Individuelles Limit für jeden RCL
  if ( creep.room.controller.level === 4 && storage.store[RESOURCE_ENERGY] < global.getInterval('StoreLevel4')) return true;
  if ( creep.room.controller.level === 5 && storage.store[RESOURCE_ENERGY] < global.getInterval('StoreLevel5')) return true;
  if ( creep.room.controller.level === 6 && storage.store[RESOURCE_ENERGY] < global.getInterval('StoreLevel6')) return true;
  if ( creep.room.controller.level === 7 && storage.store[RESOURCE_ENERGY] < global.getInterval('StoreLevel7')) return true;
  if ( creep.room.controller.level === 8 && storage.store[RESOURCE_ENERGY] < global.getInterval('StoreLevel8')) return true;
  return (false);
};

b.completed = function (creep, rc) {
  var storage = creep.getTarget();

  if (creep.energy === 0) return true;
  if (storage && storage.store.energy === storage.storeCapacity) return true;

  return false;
};

b.work = function (creep, rc) {
  var storage = creep.getTarget();

  if (storage === null) {
    storage = rc.room.storage;
    if (storage) {
      creep.target = storage.id;
    }
  }

  if (storage) {
    if (!creep.pos.isNearTo(storage)) {
      creep.travelTo(storage);
    } else {
      creep.transfer(storage, RESOURCE_ENERGY);
    }
  }

};

module.exports = b;
