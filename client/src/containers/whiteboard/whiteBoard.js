import React, { useRef, useState, useEffect } from 'react'

const WhiteBoard = props => {
    const canvas = useRef(null)
    
    const [isDrawing, setIsDrawing] = useState(false)
    const [start, setStart] = useState([])
    
    const draw = (x0, y0, x1, y1) => {
        const ctx = canvas.current.getContext('2d')
        
        ctx.beginPath()
        ctx.moveTo(x0 - props.offsetWidth, y0 - props.offsetHeight)
        ctx.lineTo(x1 - props.offsetWidth, y1 - props.offsetHeight)
        ctx.lineWidth = 10;
        ctx.lineCap = 'round'
        ctx.strokeStyle = 'black'
        ctx.stroke()
        ctx.closePath()
    }

    useEffect(() => {
        props.socket.on("drawMsgToAllClients", data => draw(data.x0, data.y0, data.x1, data.y1))

        return () => {
            props.socket.off("drawMsgToAllClients")
        }
    }, [props.socket])
    
    return [
        <canvas
            ref={canvas}
            width={props.width}
            height={props.height}
                        
            onMouseDown={e => {
                setIsDrawing(true)
                setStart([e.clientX, e.clientY])
            }}
            onMouseUp={() => {
                canvas.current.getContext('2d').beginPath()
                setIsDrawing(false)
            }}
            onMouseMove={e => {
                if(isDrawing){
                    draw(start[0], start[1], e.clientX, e.clientY) 
                    props.socket.emit('drawDataFromClient', {
                        room: props.room.name,
                        draw:{
                            x0: start[0],
                            y0: start[1],
                            x1: e.clientX,
                            y1: e.clientY
                        }
                    })
                    setStart([e.clientX, e.clientY])
                }
            }}
            onMouseOut={() => {
                canvas.current.getContext('2d').beginPath()
                setIsDrawing(false)
            }}

            onTouchStart={e => {
                setIsDrawing(true)
                console.log("draw start")
                setStart([e.touches[0].clientX, e.touches[0].clientY])
            }}
            onTouchEnd={() => {
                console.log("draw done")
                canvas.current.getContext('2d').beginPath()
                setIsDrawing(false)
            }}
            onTouchMove={e => {
                if(isDrawing){
                    draw(start[0], start[1], e.clientX, e.clientY)
                    props.socket.emit('dataFromClient', {
                        x0: start[0],
                        y0: start[1],
                        x1: e.touches[0].clientX,
                        y1: e.touches[0].clientY
                    })
                    setStart([e.touches[0].clientX, e.touches[0].clientY])
                }
            }}
        />
    ]
}

export default WhiteBoard