import { CreepLogic } from "creeps";

const Harvester: CreepLogic = {

  run: function(creep: Creep) {

    
    if(creep.store.getFreeCapacity() > 0) {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
    else {
      // here is the sayHello() prototype
      console.log('Spawn: ' + _.keys(Game.spawns) );
      for (var spawn in Game.spawns) {
        console.log(spawn);
        if (Game.spawns[spawn].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
          if(creep.transfer(Game.spawns[spawn], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say('Going to harvester.');
            creep.moveTo(Game.spawns[spawn]);
          }
          break;
        }
      }
    }
  },
  // checks if the room needs to spawn a creep
  spawn: function(room: Room) {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
    console.log('Harvesters: ' + harvesters.length, room.name);

    if (harvesters.length < 2) {
        return true;
    }
    return false;
  },
  // returns an object with the data to spawn a new creep
  spawnData: function(room: Room): {name: string, body: BodyPartConstant[], memory: any} {
    let name = 'Harvester' + Game.time;
    let body = [WORK, CARRY, MOVE];
    let memory = {role: 'harvester'};

    return {name, body, memory};
  }
};

export {Harvester};
