// import Entity from "./ECS/entities/entity.js";
// import RanN from "./helpers/calc.js";

// let entityCount = 0;

// const teamOne = new Map();
// const teamOneBullets = new Map();

// const testing = new Map();

// testing.set(1, { chicken: "fried" });

// const teamTwo = new Map();
// const teamTwoBullets = new Map();

// const freeBullets = new Map();

// for (let i = 0; i < 2000; i++) {
// 	let entity = new Entity(entityCount);
// 	entityCount++;
// 	entity.size = 3;
// 	entity.type = "bullet";

// 	freeBullets.set(entity.id, entity);
// }

// for (let i = 0; i < 2000; i++) {
// 	let entity = new Entity(entityCount);
// 	entityCount++;
// 	// entity.x = 500;
// 	// entity.y = 300;

// 	// entity.velx=0;
// 	// entity.vely=0;
// 	entity.x = RanN(300) + 50;
// 	entity.y = RanN(500) + 50;
// 	entity.velx = Math.random();
// 	entity.vely = Math.random() - 0.5;
// 	entity.lastShot = Date.now();

// 	entity.active = true;

// 	entity.size = 5;
// 	entity.color = "blue";
// 	entity.type = "ship";

// 	teamOne.set(entity.id, entity);
// }
// for (let i = 0; i < 2000; i++) {
// 	let entity = new Entity(entityCount);
// 	entityCount++;

// 	// entity.x = 450;
// 	// entity.y = 255;

// 	// entity.velx=0;
// 	// entity.vely=0;
// 	entity.x = RanN(300) + 450;
// 	entity.y = RanN(500) + 50;
// 	entity.velx = -Math.random();
// 	entity.vely = Math.random() - 0.5;

// 	entity.active = true;

// 	entity.size = 5;
// 	entity.lastShot = Date.now();
// 	entity.color = "red";
// 	entity.type = "ship";

// 	teamTwo.set(entity.id, entity);
// }


// const moveEntity = mapObj => {
// 	for (let entity of mapObj.values()) {
// 		if (entity.time) {
// 			if (Date.now() - entity.time > 3000) {
// 				entity.active = false;
// 				freeBullets.set(entity.id, entity);
// 			}
// 		}
// 		if (entity.active) {
//             headCount++
// 			entity.x += entity.velx;
// 			entity.y += entity.vely;

// 			if (entity.x > 800) {
// 				entity.x = 0;
// 			}
// 			if (entity.x < 0) {
// 				entity.x = 800;
// 			}
// 			if (entity.y > 600) {
// 				entity.y = 0;
// 			}
// 			if (entity.y < 0) {
// 				entity.y = 600;
// 			}
// 		}
//     }
    

// };
// let headCount = 0;
// setInterval(() => {
//     let deltaTime = Date.now() - prevTime;
//     prevTime = Date.now();

// //	      console.log(deltaTime)

// //	  console.log(freeBullets)
// 	moveEntity(teamOne);
// 	moveEntity(teamTwo);
// 	moveEntity(teamOneBullets);
// 	moveEntity(teamTwoBullets);

// 	//collision detection

// 	targetSelection(teamOne, teamTwo, "teamOne");
// 	targetSelection(teamTwo, teamOne, "teamTwo");

// 	collisionDetection(teamOneBullets, teamTwo, true, "teamOneBullets");
// 	collisionDetection(teamTwoBullets, teamOne, true, "teamTwoBullets");

// 	//	console.log(deltaTime);

// 	postMessage([
// 		prevTime,
// 		teamOne,
// 		teamTwo,
// 		teamOneBullets,
// 		teamTwoBullets,
//         deltaTime,
//         headCount
//     ]);
//     headCount=0;
// }, 50);

// const collisionDetection = (arrOne, arrTwo, isBullet = false, whoseBullet) => {
// 	let checkDistance = isBullet ? 3 : 100;

// 	for (let obj1 of arrOne.values()) {
// 		if (obj1.active) {
// 			for (let obj2 of arrTwo.values()) {
// 				if (obj2.active) {
// 					let distance = Math.sqrt(
// 						Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)
// 					);
// 					if (distance < checkDistance) {
// 						if (obj1.type === "ship" && obj2.type === "ship") {
// 							if (Date.now() - obj1.lastShot > 3000) {
// 								let angle = findAngle(obj1, obj2);

// 								let entity = freeBullets.values().next().value;
// 								entityCount++;
// 								entity.x = obj1.x;
// 								entity.y = obj1.y;
// 								entity.velx = obj1.velx + Math.sin(angle) * 1 - obj2.velx;
// 								entity.vely = obj1.vely - Math.cos(angle) * 1 - obj2.vely;

// 								entity.active = true;
// 								entity.time = Date.now();

// 								entity.color = "green";

// 								freeBullets.delete(entity.id);

// 								teamOneBullets.set(entity.id, entity);

// 								obj1.lastShot = Date.now();
// 							}
// 							if (Date.now() - obj2.lastShot > 3000) {
// 								let angle = findAngle(obj2, obj1);

// 								let entity = freeBullets.values().next().value;
// 								entityCount++;
// 								entity.x = obj2.x;
// 								entity.y = obj2.y;
// 								entity.velx = obj2.velx + Math.sin(angle) * 1 - obj1.velx;
// 								entity.vely = obj2.vely - Math.cos(angle) * 1 - obj1.vely;

// 								entity.active = true;

// 								entity.time = Date.now();

// 								entity.color = "yellow";

// 								freeBullets.delete(entity.id);

// 								teamTwoBullets.set(entity.id, entity);

// 								obj2.lastShot = Date.now();
// 							}
// 						} else if (obj1.type === "bullet") {
// 							obj1.active = false;
// 							obj2.active = false;
// 							freeBullets.set(obj1.id, obj1);

// 							if (whoseBullet === "teamOneBullets") {
// 								teamOneBullets.delete(obj1.id);
// 							} else if (whoseBullet === "teamTwoBullets") {
// 								teamTwoBullets.delete(obj1.id);
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// };

// const findAngle = (obj1, obj2) => {
// 	let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
// 	angle += Math.PI / 2;
// 	if (angle < 0) {
// 		angle += Math.PI * 2;
// 	}
// 	return angle;
// };

// const toRad = angleInDegree => (angleInDegree * Math.PI) / 180;

// const targetSelection = (arrOne, arrTwo, whoIsTargeting) => {
// 	for (let obj1 of arrOne.values()) {
// 		if (obj1.active) {
// 			if (!obj1.target) {
// 				for (let obj2 of arrTwo.values()) {
// 					if (obj2.active) {
// 						let distance = Math.sqrt(
// 							Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)
// 						);
// 						if (distance < 50) {
// 							obj1.target = obj2;
// 						}
// 					}
// 				}
// 			} else {
// 				let distance = Math.sqrt(
// 					Math.pow(obj1.x - obj1.target.x, 2) +
// 						Math.pow(obj1.y - obj1.target.y, 2)
// 				);
// 				if (!obj1.target.active || distance > 100) {
// 					obj1.target = null;
// 				} else {
// 					let angle = findAngle(obj1, obj1.target);

// 					let deltax = Math.sin(angle);
// 					let deltay = -Math.cos(angle);

// 					if (Math.abs(obj1.velx + deltax) < 2 && distance > 25) {
// 						obj1.velx += deltax * 0.1;
// 					}
// 					if (Math.abs(obj1.vely + deltay) < 2 && distance > 25) {
// 						obj1.vely += deltay * 0.1;
// 					}

// 					if (Date.now() - obj1.lastShot > 3000) {
// 						let entity = freeBullets.values().next().value;
// 						entityCount++;
// 						entity.x = obj1.x;
// 						entity.y = obj1.y;
// 						entity.velx = obj1.velx + deltax * 2 - obj1.target.velx;
// 						entity.vely = obj1.vely + deltay * 2 - obj1.target.vely;

// 						entity.active = true;
// 						entity.time = Date.now();

// 						if (whoIsTargeting === "teamOne") {
// 							entity.color = "green";
// 							teamOneBullets.set(entity.id, entity);
// 						} else {
// 							entity.color = "yellow";
// 							teamTwoBullets.set(entity.id, entity);
// 						}

// 						freeBullets.delete(entity.id);

// 						obj1.lastShot = Date.now();
// 					}
// 				}
// 			}
// 		}
// 	}
// };

import EntityManager from "./ECS/entities/entityManager.js"

const _EntityManager = new EntityManager()
onmessage = (e)=>{
    let map =e.data;
    for (let entity of map.keys()){
        console.log(entity)
   //     _EntityManager.addComponent()
    }

    postMessage(map)
}