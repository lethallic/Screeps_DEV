var BEHAVIORS = require("_config.behaviors");

module.exports = {

	behaviors: BEHAVIORS,

	intervals : {
		'checkPopulation' : 10,
		'checkConstructions': 100
	},

	getBehavior: function (name) {
		if (name && this.behaviors[name]) {
			return this.behaviors[name];
		}
		return null;
	},

	getCreepConfig: function (role) {
		if (role && this.creeps[role]) {
			return this.creeps[role];
		}
		return null;
	},

	getCreepBehaviors: function (role) {
		var cfg = this.getCreepConfig(role);
		return (cfg != null ? cfg.behaviors : []);
	},

	creeps: {

		"builder": {
			levelRequired: 1,
			levelMax: 2,
			body: [
				[MOVE, CARRY, WORK],
				[MOVE, MOVE, CARRY, CARRY, WORK]
			],
			behaviors: [
				BEHAVIORS.HARVERST,
				BEHAVIORS.TRANSPORT_ENERGY,
				BEHAVIORS.STRUCTURES_BUILD,
				BEHAVIORS.STURCUTRES_REPAIR
			],
			canBuild : function(roomController) {
				return (roomController.findCreeps("builder") < 3);
			}
		},

		"miner": {
			priority: 2,
			levelRequired: 3,
			body: [
				[MOVE, WORK],
				[MOVE, WORK],
				[MOVE, WORK, WORK],
			],
			behaviors = [
				BEHAVIORS.HARVETS_MINER
			],
			canBuild : function(roomController) {
				var miners = roomController.getCreeps("miner");
				var sources = roomController.getSources();

				return ( miners.length < sources.length );
			}
		},

		"transporter": {
			priority : 1,
			levelRequired: 3,
			body: [
				[MOVE, CARRY],
				[MOVE, MOVE, CARRY, CARRY],
				[MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]
			],
			behaviors: [
				BEHAVIORS.FIND_ENERGY,
				BEHAVIORS.TRANSPORT_ENERGY
			],
			canBuild : function(roomController) {
				var miners = roomController.getCreeps('miner');
				var transpoters = roomController.getCreep('transporter');

				return ( transpoters.length < miners.length * 2 );
			}
		},

		"upgrader": {

		},

		"constructor": {

		}

	}

}
