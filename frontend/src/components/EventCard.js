import './EventCard.css'
import {useState, } from 'react'
import ReactionMenu from "./ReactionMenu"
import {useNavigate} from 'react-router-dom'

function EventCard(props) {
    const navigate = useNavigate();
    const [showSmallInfo, setShowSmallInfo] = useState(true);
    const [showBigInfo, setShowBigInfo] = useState(false);
    const formattedDate = props.eventDate.split('T')[0]
    const [value, setValue] = useState('Najavite se');
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const [response, setResponse] = useState("Najavite se▼")

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

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    const navigateToProfile = async () => {
        const response = await fetch('/api/getUser/' + props.eventCreatorEmail);

        if (response.status === 404) {
            console.log('Email not found in the database.')
            return;
        }

        navigate(`/profile/${props.eventCreatorEmail}`);
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
                        {/* <p>{props.eventLocation} /</p> */}
                        <p>{formattedDate} /</p>
                        <p>{props.eventStartTime} /</p>
                        <p>{props.eventDuration}</p>
                    </div>

                    <p>
                        {props.eventDescription}
                    </p>

                    <div className="EventCard--dodatno ">
                        <div className="EventCard--hostName" onClick={navigateToProfile}>  {props.eventCreator}</div>
                        <button className="EventCard--button" onClick={seeMore}>Više</button>
                        <div className="menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button className="responseText">{response}</button>
                            {isDropdownVisible && <ReactionMenu setResponse={setResponse}/>}
                        </div>
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
                        {/* <p>{props.eventLocation} /</p> */}
                        <p>{formattedDate} /</p>
                        <p>{props.eventStartTime} /</p>
                        <p>{props.eventDuration}</p>
                    </div>

                    <p>
                        {props.eventDescription}
                    </p>

                    <div className="EventPage--dodatno ">
                        <div className="EventPage--hostName" onClick={navigateToProfile}>{props.eventCreator}</div>
                        <button className="EventPage--button" onClick={seeLess}>Manje</button>
                        <div className="menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button className="responseText">{response}</button>
                            {isDropdownVisible && <ReactionMenu setResponse={setResponse}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard
