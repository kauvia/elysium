import RenderSys from "./ECS/systems/RenderSys/RenderSys.js";
import EntityManager from "./ECS/entities/entityManager.js";

import ranN from "./helpers/calc.js";

import * as Components from "./ECS/components/index.js";



class PhysicsWorkerModule {
	constructor(entityMap) {
		this.entityMap = entityMap;

		this.prevTime = Date.now();
		this.looping = false;
	}

	moveEntities() {
		for (let entity of this.entityMap.values()) {
			if (entity.State.active) {
				entity.Position.angle += (Math.random()-0.5) / 10;

				entity.Velocity.x +=
					Math.sin(entity.Position.angle) * entity.Acceleration.value;
				entity.Velocity.y -=
					Math.cos(entity.Position.angle) * entity.Acceleration.value;

				entity.Position.x += entity.Velocity.x;
				entity.Position.y += entity.Velocity.y;
			}
		}
	}


	mainLoop = () => {
		setInterval(() => {
			let deltaTime = Date.now() - this.prevTime;
			this.prevTime = Date.now();

			this.moveEntities();
		}, 50);
	};
}



class ScriptWorkerModule {
	constructor(entityMap) {
		this.entityMap = entityMap;
		this.EntityManager = new EntityManager(entityMap);

	}

	initialize() {
		this._preloadEntities();
	}

	_preloadEntities() {
		for (let i = 0; i < 12000; i++) {
			const entity = this.EntityManager.createEntity();
			this.EntityManager.addComponent(entity, new Components.Position());
			//    this.EntityManager.addComponent(entity, new Components.Size);
			this.EntityManager.addComponent(entity, new Components.Velocity());
			this.EntityManager.addComponent(entity, new Components.Acceleration());
			this.EntityManager.addComponent(entity, new Components.Faction());
			this.EntityManager.addComponent(entity, new Components.State());
			this.EntityManager.addComponent(entity, new Components.Sprite());
			this.EntityManager.addComponent(entity, new Components.Type());

			if (i < 5000) {
				entity.Faction.faction = "One";
				entity.Sprite.sprite = "shipOne";
				entity.Type.type = "ship";

				entity.Position.x = ranN(300) + 50;
				entity.Position.y = ranN(500) + 50;
				entity.Position.angle = Math.PI * 2 * Math.random();


                entity.Acceleration.value =0.01

				entity.State.active = true;
			} else if (i < 10000) {
				entity.Faction.faction = "Two";
				entity.Sprite.sprite = "shipTwo";
                entity.Type.type = "ship";
                
                entity.Acceleration.value =0.01


				entity.Position.x = ranN(300) + 450;
				entity.Position.y = ranN(500) + 50;
				entity.Position.angle = (Math.PI * 2) / Math.random();

				entity.State.active = true;
			} else if (i < 12000) {
				entity.Sprite.sprite = "bullet";
				entity.Type.type = "bullet";
			}
		}
	}
}




class Engine {
	constructor(SCREEN_WIDTH, SCREEN_HEIGHT) {
		this.SCREEN_WIDTH = SCREEN_WIDTH;
		this.SCREEN_HEIGHT = SCREEN_HEIGHT;

		this.entityMap = new Map();


		this.RenderSys = new RenderSys(this.SCREEN_WIDTH, this.SCREEN_HEIGHT,this.entityMap);
	



		this.PhysicsWorker = new PhysicsWorkerModule(this.entityMap);
		this.ScriptingWorker = new ScriptWorkerModule(this.entityMap)

	}

	initialize() {
		console.log("initialzing Engine");
		this.ScriptingWorker.initialize()
		this.RenderSys.initialize();
		this.PhysicsWorker.mainLoop()

		console.log(this.entityMap)
	}


	main = () => {};
}



export default Engine;
