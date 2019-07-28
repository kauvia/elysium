class _Component {
	getProperties() {
		const keys = Object.keys(this);
		const properties = {};
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let value = this[key];

			properties[key] = value;
		}
		return properties;
	}
}

class Position extends _Component {
	constructor(x, y, angle) {
		super();
		this.name = "Position";
		this.x = x;
		this.y = y;
		this.angle = angle;

	}
}class Type extends _Component {
	constructor(type) {
		super();
		this.name = "Type";
		this.type = type;
	}
}

class Size extends _Component {
	constructor(width, height) {
		super();

		this.name = "Size";
		this.width = width;
		this.height = height;
	}
}

class Velocity extends _Component {
	constructor(x = 0, y = 0) {
		super();

		this.name = "Velocity";
		this.x = x;
		this.y = y;
	}
}

class Acceleration extends _Component {
	constructor(value=0) {
		super();

		this.name = "Acceleration";
		this.value = value;
	}
}

class Faction extends _Component {
	constructor(faction) {
		super();

		this.name = "Faction";
		this.faction = faction;
	}
}
class State extends _Component {
	constructor(active = false) {
		super();

		this.name = "State";
		this.active = active;
	}
}
class Sprite extends _Component {
	constructor(sprite) {
		super();

		this.name = "Sprite";
		this.sprite = sprite;
	}
}
export { Type,Position, Size, Velocity, Acceleration, Faction, State, Sprite };
