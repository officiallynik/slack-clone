const app = require('express')(),
	  socketio = require('socket.io'),
	  cors = require('cors')

app.use(cors())

const data = require('./seed')
const port = process.env.PORT || 5000
const ip = process.env.IP || ""

const server = app.listen(port, ip, () => console.log("Server Running on PORT", port))

const io = socketio(server)

io.on('connection', socket => {

	let nameSpaces = data.map(ns => {
		return{
			name: ns.name,
			endpoint: ns.endpoint,
		}
	})

	socket.emit('nsData', nameSpaces)
})

data.forEach(ns => {
	// console.log(ns.endpoint)
	io.of(`${ns.endpoint}`).on('connection', socket => {
		// const username = socket.handshake.query.username 

		// console.log("new client connected to " + ns.name + " username: " + username)

		socket.emit('roomData', ns.rooms)

		socket.on('roomJoinReq', data => {
			// console.log(data)
			// socket.join("Room Join Req", data)
			const roomToLeave = Object.keys(socket.rooms)[1]
			// console.log(roomToLeave)
			socket.leave(roomToLeave)
			io.of(ns.endpoint).in(roomToLeave).clients((err, clients) => {
				io.of(ns.endpoint).in(roomToLeave).emit('numRoomClients', clients.length)
			})
			
			socket.join(data)
			io.of(ns.endpoint).in(data).clients((err, clients) => {
				io.of(ns.endpoint).in(data).emit('numRoomClients', clients.length)
			})

			socket.on('disconnect', () => {
				io.of(ns.endpoint).in(data).clients((err, clients) => {
					io.of(ns.endpoint).in(data).emit('numRoomClients', clients.length)
				})	
			})

			const nsRoom = ns.rooms.find(room => {
				return room.name === data
			})
			
			socket.emit('roomHistory', nsRoom.history)
		})

		socket.on('msgFromClient', data => {	
			console.log(data)
			const nsRoom = ns.rooms.find(room => {
				return room.name === data.room
			})

			const msg = {
				msg: data.msg,
				date: Date.now(),
				user: data.user
			}

			nsRoom.history.push(msg)

			io.of(ns.endpoint).to(data.room).emit("msgToAllClients", msg)
		})

		socket.on('drawDataFromClient', data => {
			io.of(ns.endpoint).to(data.room).emit("drawMsgToAllClients", data.draw)
		})

	})
})