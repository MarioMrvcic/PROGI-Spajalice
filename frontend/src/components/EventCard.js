import './EventCard.css'
import React from 'react'

function EventCard(props) {
    const formattedDate = props.eventDate.split('T')[0]

    return (
        <div>
            <div className="EventCard">
                {/* ovako nešto može ići ako dodamo slike u bazu podataka: <img src={props.eventImage} alt="Event Image" />  */}
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="slika eventa"/>
                <div className="EventCard--text">
                    <h1 className="EventCard--name">{props.eventName}</h1>
                    <div className="EventCard--info">
                        <p>{props.eventType} /</p>
                        <p>{formattedDate} /</p>
                        <p>{props.eventStartTime} /</p>
                        {/* <p>{props.eventLocation} /</p> */}
                        <p>{props.eventDuration}</p>
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna
                        aliqua. Bibendum enim facilisis gravida neque. Tincidunt augue interdum velit euismod in.
                        Scelerisque eleifend donec
                        pretium vulputate sapien nec. Mi proin sed libero enim sed faucibus turpis. Senectus et netus et
                        malesuada fames ac
                        turpis egestas integer. Enim nec dui nunc mattis. Id porta nibh venenatis cras sed felis eget
                        velit. Et sollicitudin
                        ac orci phasellus egestas tellus rutrum. Eget mi proin sed libero. Quis auctor elit sed
                        vulputate mi sit amet.
                    </p>

                    <div className="EventCard--dodatno ">
                        <div className="EventCard--hostName">Ime hosta</div>
                        <button className="EventCard--button"> Najavite se</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard
