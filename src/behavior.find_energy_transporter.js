var Behavior = require("_behavior");

function applyMiner(creep, rc) {
	//   var minerId = creep.memory.miner;

	//   if ( minerId && minerId !== "" ) {
	//     // check, if miner exists
	//     if ( Game.getObjectById(minerId) !== null ) {
	//       return;
	//     }
	//   }

	var transporters = rc.getCreeps("transporter");
	var miners = rc.getCreeps("miner");

	var perMiner = transporters.length / miners.length;

	var fFilter = function (t) {
		return (t.memory.miner == miner.id);
	};

	for (var m in miners) {
		var miner = miners[m];

		var tm = _.filter(transporters, fFilter);
		if (tm.length < perMiner) {
			creep.memory.miner = miner.id;
			return;
		}
	}
}


var b = new Behavior("find_energy_transporter");

b.when = function (creep, rc) {
	return (creep.energy === 0);
};

b.completed = function (creep, rc) {
	var target = Game.getObjectById(creep.target);
	return (target === null || creep.energy === creep.energyCapacity);
};

b.work = function (creep, rc) {
	// applyMiner(creep, rc);

	var target = creep.getTarget();

	if (!target) {
		var miner = Game.getObjectById(creep.memory.miner || null);

		if (miner !== null) {
			var minerSource = miner.getTarget();
			if (!minerSource || !miner.pos.isNearTo(minerSource)) {
				return;
			}

			var energy = miner.pos.findInRange(rc.find(FIND_DROPPED_ENERGY), 2);

			// var energy = _.filter(rc.find(FIND_DROPPED_ENERGY), function (e) {
			// 	return e.pos.inRangeTo(miner, 2);
			// });

			if (energy.length) {
				target = energy[0];
				creep.target = target.id;
			}
		}
	}

	if (target !== null) {
		if (!creep.pos.isNearTo(target)) {
			creep.moveToEx(target);
		} else {
			creep.pickup(target);
			creep.target = null;
		}
	}
};

module.exports = b;
