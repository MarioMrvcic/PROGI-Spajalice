import './EventCard.css'
import { React, useState, useEffect } from 'react'

function seeMore(event){
    event.preventDefault()
    alert(event.target.id)
    document.getElementsByName("bigInfo")[0].style.display = "flex"
    document.getElementsByName("smallInfo")[0].style.display = "none"
}

function seeLess(event){
    event.preventDefault()
    document.getElementsByName("bigInfo")[0].style.display = "none"
    document.getElementsByName("smallInfo")[0].style.display = "flex"
}

function EventCard(props) {
    const [showSmallInfo, setShowSmallInfo] = useState(true);
    const [showBigInfo, setShowBigInfo] = useState(false);
    const formattedDate = props.eventDate.split('T')[0]

    const seeMore = () => {
        setShowSmallInfo(false);
        setShowBigInfo(true);
      };
    
      const seeLess = () => {
        setShowSmallInfo(true);
        setShowBigInfo(false);
      };

    return (
        <div>
            <div className={showSmallInfo ? 'EventCard' : 'EventCard hidden'} name="smallInfo">
                {/* ovako nešto može ići ako dodamo slike u bazu podataka: <img src={props.eventImage} alt="Event Image" />  */}
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="slika eventa" />
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Bibendum enim facilisis gravida neque. Tincidunt augue interdum velit euismod in. Scelerisque eleifend donec
                        pretium vulputate sapien nec. Mi proin sed libero enim sed faucibus turpis. Senectus et netus et malesuada fames ac
                        turpis egestas integer. Enim nec dui nunc mattis. Id porta nibh venenatis cras sed felis eget velit. Et sollicitudin
                        ac orci phasellus egestas tellus rutrum. Eget mi proin sed libero. Quis auctor elit sed vulputate mi sit amet.
                    </p>

                    <div className="EventCard--dodatno ">
                        <div className="EventCard--hostName">Ime hosta</div>
                        <button className="EventCard--button" onClick={seeMore}>Više</button>
                        <button className="EventCard--button"> Najavite se </button>
                    </div>
                </div>
            </div>
            <div className={showBigInfo ? 'EventPage' : 'EventPage hidden'}>
                {/* ovako nešto može ići ako dodamo slike u bazu podataka: <img src={props.eventImage} alt="Event Image" />  */}
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="slika eventa" />
                <div className="EventPage--text">
                    <h1 className="EventPage--name">{props.eventName}</h1>
                    <div className="EventPage--info">
                        <p>{props.eventType} /</p>
                        <p>{formattedDate} /</p>
                        <p>{props.eventStartTime} /</p>
                        {/* <p>{props.eventLocation} /</p> */}
                        <p>{props.eventDuration}</p>
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Bibendum enim facilisis gravida neque. Tincidunt augue interdum velit euismod in. Scelerisque eleifend donec
                        pretium vulputate sapien nec. Mi proin sed libero enim sed faucibus turpis. Senectus et netus et malesuada fames ac
                        turpis egestas integer. Enim nec dui nunc mattis. Id porta nibh venenatis cras sed felis eget velit. Et sollicitudin
                        ac orci phasellus egestas tellus rutrum. Eget mi proin sed libero. Quis auctor elit sed vulputate mi sit amet.
                    </p>

                    <div className="EventPage--dodatno ">
                        <div className="EventPage--hostName">Ime hosta</div>
                        <button className="EventPage--button" onClick={seeLess}>Manje</button>
                        <button className="EventPage--button"> Najavite se </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard
