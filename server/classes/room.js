class room{
	constructor(id, name, nameSpace, privateRoom=false){
		this.id = id
		this.name = name,
		this.nameSpace = nameSpace,
		this.privateRoom = privateRoom
		this.history = []
	}
	addMessage(data){
		this.history.push(data)
	}
	clearHistory(){
		this.history = []
	}
}

module.exports = room