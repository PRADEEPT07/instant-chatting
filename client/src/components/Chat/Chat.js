import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from '../Infobar/InfoBar'
import InputMessage from '../InputMessage/InputMessage'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer';
import './Chat.css'

let socket

var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
}

function Chat({location}) {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = "localhost:5000"

    useEffect(() => {
        const { name, room} = queryString.parse(location.search)

        socket = io.connect(ENDPOINT, connectionOptions)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error)
            }
        })
    },[ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault()
        
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <InputMessage message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat
