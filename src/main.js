/* 
Game.spawns.Southtown.spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], 'Builder_666', {memory: {role: 'builder'}});
Game.spawns.Southtown.spawnCreep([MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], 'Transporter_666', {memory: {role: 'transporter'}});
Game.spawns.Southtown.spawnCreep([MOVE, CARRY, MOVE, CARRY, WORK, WORK, WORK, WORK, WORK, WORK], 'Upgrader_666', {memory: {role: 'upgrader'}});
Game.market.createOrder(ORDER_BUY, RESOURCE_ENERGY, 0.01, 30000, "E68S47");
Game.market.deal('59d1e4719b0a8a64bbfdd5dc', 30000, "E68S47");
Game.market.changeOrderPrice('59d232ed78c2755738b3105e', 0.14);
Game.market.extendOrder('59edcfbcbd894910c4e2fff1', 100000);

Log.warn(`${creep.room.spawns[0].spawning}`, "Spawning")
Log.LEVEL_DEBUG = 0;
Log.LEVEL_INFO = 1;
Log.LEVEL_WARN = 2;
Log.LEVEL_ERROR = 3;
Log.LEVEL_SUCCESS = 4;

todo-tree.tags
**  TODO,FIXME,TEST,BUG,REMOVE,LONGTERM
*/

// LONGTERM Remote Mining (there was a formula for calculation if RH makes sense)
// LONGTERM Sell + Buy at Market
// LONGTERM Harvest Power
// LONGTERM test attack behavior
// LONGTERM spawn defenders if attacked
// LONGTERM Boost creeps
// LONGTERM Build Terminal before extractor
// LONGTERM Allow creeps to transport more then 1 resource 

var profiler = require('screeps-profiler');
var Traveler = require('Traveler');
global.Log = require('Log')
// var stats = require('ControllerStats');

// profiler.enable();
module.exports.loop = function () {
  profiler.wrap(function () {
    // Main.js logic should go here.
    require("_init");
    var ControllerGame = require('ControllerGame');
    var gc = new ControllerGame();
    //gc.garbageCollection();
    gc.processRooms();
  })
  //stats.doStats();
}