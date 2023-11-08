import './EventCard.css';
import React from 'react';

function EventCard(props){

    return(
        <div>
            <div className="EventCard">
                <h1>{props.eventName}</h1>
                <div className="EventCard--info">
                    <p>{props.eventType}</p>
                    <p>{props.eventDate}</p>
                    <p>{props.eventStartTime}</p>
                    <p>{props.eventLocation}</p>
                    <p>{props.eventDuration}</p>
                </div>
            </div>
        </div>
    );
}

export default EventCard;