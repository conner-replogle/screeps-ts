import { CreepLogic } from "creeps";

const roleUpgrader : CreepLogic= {

  run: function(creep:Creep) {
      if(creep.store[RESOURCE_ENERGY] == 0) {
          var sources = creep.room.find(FIND_SOURCES);
          if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0]);
          }
      }
      else if (creep.room.controller != null) {
          if(creep.upgradeController(creep.room.controller!) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller!);
          }
      }
  },
  // checks if the room needs to spawn a creep
  spawn: function(room: Room) {
      var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.name);
      console.log('Upgraders: ' + upgraders.length, room.name);

      if (upgraders.length < 2) {
          return true;
      }
      return false;
  },
  // returns an object with the data to spawn a new creep
  spawnData: function(room: Room): {name: string, body: BodyPartConstant[], memory: any} {
      let name = 'Upgrader' + Game.time;
      let body = [WORK, CARRY, MOVE];
      let memory = {role: 'upgrader'};

      return {name, body, memory};
  }
};


export  {roleUpgrader};
