const ranN = num => Math.floor(Math.random() * num); //return random number from 0-num
const toRad = angleInDegree => (angleInDegree * Math.PI) / 180;
const findDistance = (obj1, obj2) => {
	let distance = Math.sqrt(
		Math.pow(obj1.posXY[0] - obj2.posXY[0], 2) +
			Math.pow(obj1.posXY[1] - obj2.posXY[1], 2)
	);
	return distance;
};
const findRelativeVelocity = (
	obj1,
	obj2 = {
		veloXY: [0, 0]
	}
) => {
	let relativeVelocity =
		obj1.veloXY[0] - obj2.veloXY[0] + obj1.veloXY[1] - obj2.veloXY[1];
	if (relativeVelocity < 0) {
		relativeVelocity = -Math.sqrt(
			Math.pow(obj1.veloXY[0] - obj2.veloXY[0], 2) +
				Math.pow(obj1.veloXY[1] - obj2.veloXY[1], 2)
		);
	} else {
		relativeVelocity = Math.sqrt(
			Math.pow(obj1.veloXY[0] - obj2.veloXY[0], 2) +
				Math.pow(obj1.veloXY[1] - obj2.veloXY[1], 2)
		);
	}
	return relativeVelocity;
};
const findAngle = (obj1, obj2) => {
	let angle = Math.atan2(
		obj2.posXY[1] - obj1.posXY[1],
		obj2.posXY[0] - obj1.posXY[0]
	);
	angle = (angle * 180) / Math.PI;
	angle += 90;
	if (angle < 0) {
		angle += 360;
	}
	return angle;
};

export default ranN;