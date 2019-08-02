import {  World } from "wasm-elysium";
import { memory } from "wasm-elysium/wasm_elysium_bg";

const ENTITY_COUNT = 20000;
const ENTITY_LENGTH = 6;
const world = World.new(ENTITY_COUNT);


const lens = Math.round(ENTITY_COUNT * ENTITY_LENGTH);

let entities = null;

let intervalTime = Date.now();
let deltaTime = 0;

setInterval(() => {
	intervalTime = Date.now();

	world.tick();
	const entitiesPtr = world.entities();
	entities = new Int32Array(memory.buffer, entitiesPtr, lens);

}, 50);


const app = new PIXI.Application({ width: 800, height: 600 });

document.getElementById("container").appendChild(app.view);

const loader = PIXI.Loader.shared;
const entityMap = new Map;

const loadComplete = () => {
	console.log(loader)
	for (let i = 0; i < ENTITY_COUNT; i++) {
		const img = new PIXI.Sprite(loader.resources.img.texture);
		img.anchor.x = 0.5;
		img.anchor.y = 0.5;
		img.scale.x = 0.5;
		img.scale.y = 0.5;
		entityMap.set(i,img)
		app.stage.addChild(img);
	}
};

loader.add("img", "./missile1.png").load(loadComplete);

const rAF = x => {
	return window.requestAnimationFrame(x);
};

const drawLoop = () => {
	const timmy = Date.now();

	deltaTime = Date.now() - intervalTime;

	for (let i=0; i < ENTITY_COUNT; i++) {

		const num = i * 6;
		const entity = entityMap.get(i);

		entity.x =entities[num] + Math.floor((entities[num + 2] * deltaTime) / 50)
		entity.y = 	entities[num + 1] + Math.floor((entities[num + 3] * deltaTime) / 50)
	}

	rAF(drawLoop);
};
setTimeout(() => {
	drawLoop();
}, 1000);
