class nameSpace{
	constructor(id, name, endpoint){
		this.id = id
		this.name = name
		this.endpoint = endpoint
		this.rooms = []
	}

	addRoom(object){
		this.rooms.push(object)
	}
}

module.exports = nameSpace