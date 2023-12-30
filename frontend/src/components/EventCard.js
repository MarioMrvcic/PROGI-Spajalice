import './EventCard.css'
import {useState, } from 'react'

function EventCard(props) {
    const [showSmallInfo, setShowSmallInfo] = useState(true);
    const [showBigInfo, setShowBigInfo] = useState(false);
    const formattedDate = props.eventDate.split('T')[0]
    const [value, setValue] = useState('Najavite se');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

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
                        {props.eventDescription}
                    </p>

                    <div className="EventCard--dodatno ">
                        <div className="EventCard--hostName">Ime hosta</div>
                        <button className="EventCard--button" onClick={seeMore}>Više</button>
                        <select className="EventCard--button" value={value} onChange={handleChange}>
                            <option value="najavite se">Najavite se</option>
                            <option value="dolazim">+ Dolazim</option>
                            <option value="mozda dolazim">~ Možda dolazim</option>
                            <option value="ne dolazim">- Ne dolazim</option>
                        </select>
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
                        {props.eventDescription}
                    </p>

                    <div className="EventPage--dodatno ">
                        <div className="EventPage--hostName">Ime hosta</div>
                        <button className="EventPage--button" onClick={seeLess}>Manje</button>
                        <select className="EventPage--button" value={value} onChange={handleChange}>
                            <option value="najavite se">Najavite se</option>
                            <option value="dolazim">+ Dolazim</option>
                            <option value="mozda dolazim">~ Možda dolazim</option>
                            <option value="ne dolazim">- Ne dolazim</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard
