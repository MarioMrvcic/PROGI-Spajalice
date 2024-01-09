import './SimpleEvent.css'
import { useState } from 'react'

function SimpleEvent(props) {
    return (
        <div className="simpleEvent">
            <h1 className="simpleEvent--title">{props.eventName}</h1>
            <div>
                <p className="simpleEvent--date">{props.eventDate}</p>
                <div className="simpleEvent--hostName">Adidas</div>
            </div>
        </div>
    )
}
export default SimpleEvent
