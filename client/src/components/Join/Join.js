import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../../icons/logo.svg'

import './Join.css'

function Join() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [key, setKey] = useState('')

    const generateKey = () => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < 16; i++ ) {
                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        setKey(result)
        setRoom(key)
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <img className="joinImage" src={logo} alt="logo_image"/>
                <h1 className="heading">Instant Chatting</h1>
                <div><input placeholder="Enter Username" className="joinInput" type="text" onChange={(e) => setName(e.target.value)} /></div>
                <div><input placeholder="Enter Roomname" className="joinInput mt-20" type="text" onChange={(e) => setRoom(e.target.value)} value={room}/></div>
                <div>
                    <button  className="button mt-20" onClick={()=>{generateKey()}}>Generate Room Key</button>
                </div>
                <Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to = {`/chat?name=${name}&room=${room}`}>
                <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
