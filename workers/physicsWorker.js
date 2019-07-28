import ranN from "../helpers/calc.js";

class PhysicsWorkerModule {
	constructor() {
		this.entityMap = new Map();

		this.prevTime = Date.now();
		this.looping = false;
	}

	messageHander = e => {
		console.log(e.data);
		let message = e.data;

		this.entityMap = message.data;

		if (!this.looping) {
            this.looping = true
			this.mainLoop();
		}
	};

	moveEntities() {
		for (let entity of this.entityMap.values()) {
			if (entity.State.active) {
				entity.Position.angle += Math.random() / 10;

				entity.Velocity.x +=
					Math.sin(entity.Position.angle) * entity.Acceleration.value;
				entity.Velocity.y -=
					Math.cos(entity.Position.angle) * entity.Acceleration.value;

				entity.Position.x += entity.Velocity.x;
				entity.Position.y += entity.Velocity.y;
			}
		}
	}

	sendMessage(e) {
		postMessage(e);
	}

	mainLoop = () => {
		setInterval(() => {
			let deltaTime = Date.now() - this.prevTime;
			this.prevTime = Date.now();

			this.moveEntities();
			this.sendMessage({ target: "all", data: this.entityMap });
		}, 50);
	};
}

const PhysicsWorker = new PhysicsWorkerModule();

onmessage = PhysicsWorker.messageHander;
