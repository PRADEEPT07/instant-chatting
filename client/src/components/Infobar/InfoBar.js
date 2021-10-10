import React from 'react'
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'
import './InfoBar.css'

function InfoBar({ room }) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineicon" src={onlineIcon} alt="online_image" />
                <h3 className="infoBarRoomName">{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close_image"></img></a>
            </div>
        </div>
    )
}

export default InfoBar
