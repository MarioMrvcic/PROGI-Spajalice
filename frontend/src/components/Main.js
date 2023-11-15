import './Main.css'
import EventCard from './EventCard'
import {React, useState, useEffect} from 'react'

function Main(){
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch('/api/getEvents') 
        .then(data => data.json())
        .then(events => setEvents(events));
    }, []);

    //napomena, treba popraviti prikaz eventa ovdje, i u EventCard.js-u, dodati lokaciju
    return(
        
        <div className="Main">
            
            {/*eventLocation={event.eventLocation}*/} 
            {
                events.map(event =>
                    <EventCard
                        key={event._id}
                        eventName={event.eventName}
                        eventType={event.eventType}
                        eventDate={event.eventDate} 
                        eventStartTime={event.eventStartTime}
                        eventDuration={event.eventDuration}
                    />
                    )
                    
            }
            
        
        </div>
    )

}

export default Main;