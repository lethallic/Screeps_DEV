/**
 * Extend Creep
 */

 Object.defineProperty(Creep.prototype, "behavior", {
    get : function() {
      return this.memory['behavior'] || null;
    },
    set : function(newBehavior) {
      if ( newBehavior != null ) {
          this.memory['behavior'] = newBehavior
      } else {
        delete this.memory['behavior'];
      }
    }
 });

 Object.defineProperty(Creep.prototype, "role", {
   get : function() {
     return this.memory['role'] || null;
   },
   set : function(newRole) {
     if ( newRole != null ) {
         this.memory['role'] = newRole
     } else {
       delete this.memory['role'];
     }
   }
 });

Object.defineProperty(Creep.prototype, "target", {
  get : function() {
    return this.memory['target'] || null;
  },
  set : function(newTarget) {
    if ( newTarget != null ) {
        this.memory['target'] = newTarget
    } else {
      delete this.memory['target'];
    }
  }
})


var _moveOptions = {
  // TODO: insert move options
};
Creep.prototype.move = function(target) {
  if ( this.fatigue == 0 ) {
    this.moveTo(target, _moveOptions);
  }
}

/**
 * Extend source
 */
Object.defineProperty(Source.prototype, "defended"), {
  get : function() {
    var RANGE = 5;

    var targets = this.pos.findInRange(FIND_HOSTILE_CREEPS, RANGE);
    if (targets.length) {
      return true;
    }

    targets = this.pos.findInRange(FIND_HOSTILE_STRUCTURES, RANGE);
    if (targets.length) {
      return true;
    }

    return false;
  }
});
