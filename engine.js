import RenderSys from "./ECS/systems/RenderSys/RenderSys.js";

class Engine {
	constructor(SCREEN_WIDTH, SCREEN_HEIGHT) {
		this.SCREEN_WIDTH = SCREEN_WIDTH;
		this.SCREEN_HEIGHT = SCREEN_HEIGHT;

		this.RenderSys = new RenderSys(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
	
		this.physicsWorker = new Worker("./workers/physicsWorker.js",{type:"module"})
		this.scriptingWorker = new Worker("./workers/scriptingWorker.js",{type:"module"})
	
		this.physicsWorker.onmessage = this.workersHandler
		this.scriptingWorker.onmessage = this.workersHandler
	}

	workersHandler=e=>{

		const message = e.data;
		this.RenderSys.entityMap=message.data

		if (message.target === "render"){
			if (message.instructions === "preloadAssets"){
			
				this.RenderSys.preloadAssets(message.data)


			}


		} else if (message.target === "physics"){

			this.physicsWorker.postMessage({instructions:message.instructions,data:message.data})
		} else if (message.target === "all"){

			this.physicsWorker.postMessage({data:message.data})
//			console.log("getting stuff")
		}


	}



	initialize() {
		console.log("initialzing Engine");
		this.RenderSys.initialize();
	}

	main = () => {};
}

export default Engine;
