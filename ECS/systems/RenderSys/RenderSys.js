class RenderSys {
	constructor(SCREEN_WIDTH, SCREEN_HEIGHT, entity) {
		this.app = new PIXI.Application({ width: 800, height: 600 });
		document.getElementById("container").appendChild(this.app.view);

		this.updateTime = Date.now();
		this.updateTime2 = Date.now();

		this.timeOut = 100;

        this.imgPool = new Map();
        
        this.entityMap = new Map();
	}

	rAF(x) {
		return window.requestAnimationFrame(x);
	}

	initialize() {
        this.loadTextures();
        this.drawLoop()
	}

	preloadAssets(data) {
		console.log("preloading");
		this.loadImgPool(data);
	}

	loadTextures() {
		this.loader = PIXI.Loader.shared;
		this.loader
			.add("shipOne", "../../../images/ship1.png")
			.add("shipTwo", "../../../images/ship2.png")
			.add("bullet", "../../../images/missile1.png")
			.load(this.handleLoadComplete);
	}

	loadImgPool(data) {
		let timeNow = Date.now();
		for (let entity of data.values()) {
			const img = new PIXI.Sprite(
				this.loader.resources[entity.Sprite.sprite].texture
			);
			img.anchor.x = 0.5;
			img.anchor.y = 0.5;
			img.scale.x = 0.5;
			img.scale.y = 0.5;
			this.imgPool.set(entity.id, img);
			if (entity.State.active) {
				img.x = entity.Position.x;
				img.y = entity.Position.y;
				img.rotation = entity.Position.angle;
				this.app.stage.addChild(img);
			}
		}
this.entityMap=data
		console.log(Date.now() - timeNow);
	}

	handleLoadComplete = () => {
		console.log("textures loaded");
	};

	drawGroup(map, speedMultiplex) {
		if (map) {
			for (let sprite of this.imgPool.values()) {
			}

			for (let entity of map.values()) {
				let interX = entity.x + entity.velx * speedMultiplex;
				let interY = entity.y + entity.vely * speedMultiplex;
				if (entity.active) {
					let sprite = this.imgPool.get(entity.id);
					sprite.x = interX;
					sprite.y = interY;
				}
			}
		}
	}

	_draw(deltaTime) {
		for (let entity of this.entityMap.values()) {
           let sprite = this.imgPool.get(entity.id)
            if (entity.State.active){
            const interX = entity.Position.x+entity.Velocity.x
            const interY = entity.Position.y+entity.Velocity.y
            sprite.x=interX;
            sprite.y=interY;
            sprite.rotation = entity.Position.angle
            }
		}
	}

	drawLoop = () => {
		//	let deltaTime = Date.now() - this.updateTime;
		this._draw();
		this.rAF(this.drawLoop);
	};
}

export default RenderSys;
