class EntityManager {
	constructor() {
		this.entityMap = new Map();
		this.entityCount = 0;

	}

	createEntity(){
		const entity = {id:this.entityCount}
		this.entityMap.set(this.entityCount,entity)
		this.entityCount++
		return entity
	}

	// shouldn't be used generally...
	destroyEntity(id){
		this.entityMap.delete(id)
		return id;
	}


	addComponent(entity,component) {
		component.getProperties()
		entity[component.name]=component.getProperties();
		return entity;
	}

	removeComponent(entity,component) {
		let name;
		typeof component === "function"
			? (name = component.name)
			: (name = component);
		delete entity[name];
		return entity;
    }
}

export default EntityManager;