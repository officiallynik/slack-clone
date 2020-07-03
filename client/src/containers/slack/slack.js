import React, { useEffect, useState } from 'react'
import SideBar from './sidebar'
import './slack.css'
import socket, { sockekSlackNS } from '../../components/socketSlack'

const Slack = props => {

    const [nameSpace, setNameSpace] = useState([])
    const [activeNS, setActiveNS] = useState(null)
    const [rooms, setRooms] = useState([])
    const [nameSpaceProp, setNameSpaceProp] = useState(null)

    const [activeRoom, setActiveRoom] = useState(null)
    const [inRoom, setInRoom] = useState(false)
    const [numClients, setNumClients] = useState(0)

    const [messages, setMessages] = useState([])

    const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false)

    useEffect(() => {
        socket.on('nsData', data => {
            console.log(data)
            setNameSpace(data)
        })
    }, [])

    useEffect(() => {
        if(activeNS){
            console.log('room data')
            const socketNameSpace = sockekSlackNS(activeNS.endpoint)

            setNameSpaceProp(socketNameSpace)
    
            socketNameSpace.on('roomData', data => {
                console.log(data)
                setRooms(data)
            })
        }
    }, [activeNS])

    const handleNameSpaceJoin = idx => {
        console.log('clicked NS')
        setActiveNS(nameSpace[idx])
    }

    const handleRoomJoin = idx => {
        setInRoom(true)
        setActiveRoom(rooms[idx])
        nameSpaceProp.emit('roomJoinReq', rooms[idx].name)
        
        nameSpaceProp.on('numRoomClients', data => {
            setNumClients(data)
        })

        nameSpaceProp.on('roomHistory', data => {
           setMessages(data)
        })

        nameSpaceProp.on('msgToAllClients', data => {
            console.log(data)
            setMessages(prevState => (
                [...prevState, data]
            ))
        })
    }

    const handleMsgSubmit = (e, msg) => {
        e.preventDefault()
        nameSpaceProp.emit('msgFromClient', {
            room: activeRoom.name,
            msg: msg
        })
    }

    const handleOpenWhiteBoard = () => {
        setIsWhiteBoardOpen(prevState => !prevState)
    }

    return (
        <div className='slack'>
            <SideBar 
                nameSpace={nameSpace} 
                handleNameSpaceClick={handleNameSpaceJoin} 
                activeNS={activeNS} 
                rooms={rooms}
                inRoom={inRoom}
                handleRoomClick={handleRoomJoin}
                activeRoom={activeRoom}
                numClients={numClients}
                messages={messages}
                handleMsgSubmit={handleMsgSubmit}
                openWhiteBoard={handleOpenWhiteBoard}
                isWhiteBoardOpen={isWhiteBoardOpen}
                socket={nameSpaceProp}
                room={activeRoom}
            />
        </div>
    )
}

export default Slack