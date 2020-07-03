import io from 'socket.io-client'

const uriSlack = 'localhost:5000'

const username = prompt('enter a username')

const socketSlack = io.connect(uriSlack, {
    query:{
        username
    }
})

export const sockekSlackNS = endPoint => (
    io.connect(`${uriSlack}${endPoint}`)
)

export default socketSlack