
import {Harvester} from "./harvester"
import {roleUpgrader} from "./upgrader"

export const creepLogic: { [key: string]: CreepLogic } = {
  harvester: Harvester,
  upgrader: roleUpgrader
}


export  interface CreepLogic {
  run(creep: Creep): void;
  spawn(room: Room): boolean;
  spawnData(room: Room): {name: string, body: BodyPartConstant[], memory: CreepMemory};
}
