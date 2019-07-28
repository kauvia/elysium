import EntityManager from "../ECS/entities/entityManager.js";

import ranN from "../helpers/calc.js";

import * as Components from "../ECS/components/index.js";

import AiSys from "../ECS/systems/AiSys/AiSys.js";

class ScriptWorkerModule {
	constructor() {
		this.EntityManager = new EntityManager();
	}

	initialize() {
		this._preloadEntities();
	}

	_preloadEntities() {
		for (let i = 0; i < 3000; i++) {
			const entity = this.EntityManager.createEntity();
			this.EntityManager.addComponent(entity, new Components.Position());
			//    this.EntityManager.addComponent(entity, new Components.Size);
			this.EntityManager.addComponent(entity, new Components.Velocity());
			this.EntityManager.addComponent(entity, new Components.Acceleration());
			this.EntityManager.addComponent(entity, new Components.Faction());
			this.EntityManager.addComponent(entity, new Components.State());
			this.EntityManager.addComponent(entity, new Components.Sprite());
			this.EntityManager.addComponent(entity, new Components.Type());

			if (i < 1000) {
				entity.Faction.faction = "One";
				entity.Sprite.sprite = "shipOne";
				entity.Type.type = "ship";

				entity.Position.x = ranN(300) + 50;
				entity.Position.y = ranN(500) + 50;
				entity.Position.angle = Math.PI * 2 * Math.random();


                entity.Acceleration.value =0.01

				entity.State.active = true;
			} else if (i < 2000) {
				entity.Faction.faction = "Two";
				entity.Sprite.sprite = "shipTwo";
                entity.Type.type = "ship";
                
                entity.Acceleration.value =0.01


				entity.Position.x = ranN(300) + 450;
				entity.Position.y = ranN(500) + 50;
				entity.Position.angle = (Math.PI * 2) / Math.random();

				entity.State.active = true;
			} else if (i < 3000) {
				entity.Sprite.sprite = "bullet";
				entity.Type.type = "bullet";
			}
		}
	}

	sendEntityMap(target,instructions) {
		postMessage({ target: target,instructions:instructions ,data: this.EntityManager.entityMap });
	}

	messageHandler = e => {

    };
}

const scriptWorker = new ScriptWorkerModule();

onmessage = scriptWorker.messageHandler;

let now = Date.now();
scriptWorker.initialize();
scriptWorker.sendEntityMap("render","preloadAssets");
scriptWorker.sendEntityMap("physics","startPhysics");
console.log(Date.now() - now);
