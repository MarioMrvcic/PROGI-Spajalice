import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faEnvelope, faGlobe, faUser, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import EditForm from './editForm'
import PasswordForm from './PasswordForm'
import SimpleEvent from './SimpleEvent'

function Profile() {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [passwordPopup, setPasswordPopup] = useState(false)
    const navigate = useNavigate()

    const [upcomingEvents, setUpcomingEvents] = useState([
        { name: 'Event 1', date: '2022-01-15', interest: 'Dolazim', eventId: '1' },
        { name: 'Event 2', date: '2022-02-20', interest: 'Možda dolazim', eventId: '2' },
        { name: 'Event 3', date: '2022-03-25', interest: 'Dolazim', eventId: '3' },
        { name: 'Event 4', date: '2022-04-10', interest: 'Možda dolazim', eventId: '4' },
        { name: 'Event 5', date: '2022-05-15', interest: 'Dolazim', eventId: '5' },
    ])

    const [pastEvents, setPastEvents] = useState([
        { name: 'Event 6', date: '2021-01-15', review: 'true', eventId: '6' },
        { name: 'Event 7', date: '2021-02-20', review: 'false', eventId: '7' },
        { name: 'Event 8', date: '2021-03-25', review: 'true', eventId: '8' },
        { name: 'Event 9', date: '2021-04-10', review: 'false', eventId: '9' },
        { name: 'Event 10', date: '2021-05-15', review: 'false', eventId: '10' },
    ])

    const [profileData, setProfileData] = useState({
        firstName: 'Duje',
        lastName: 'Jurić',
        role: 'ORGANIZER',
        email: 'duje.juric@gmail.com',
        address: 'Maršeti 14.C, Pazin',
        websiteUrl: 'www.dujejuric.com',
        facebookUrl: 'dujej56',
    })

    const updateProfile = (editedProfile) => {
        setProfileData({
            ...profileData,
            firstName: editedProfile.firstName,
            lastName: editedProfile.lastName,
            email: editedProfile.Email,
            address: editedProfile.address,
            websiteUrl: editedProfile.websiteUrl,
            facebookUrl: editedProfile.facebookUrl,
            role: editedProfile.role,
        })

        setButtonPopup(false)
    }

    const updatePassword = (passwordData) => {
        //za update passworda

        setPasswordPopup(false)
    }

    const handleDeleteInterest = (index) => {
        const newUpcomingEvents = [...upcomingEvents]
        newUpcomingEvents.splice(index, 1)
        setUpcomingEvents(newUpcomingEvents)
    }

    return (
        <div>
            <div className="Profile">
                <div className="profile--form">
                    <div className="profile--form--title">
                        <div className="profile--form--nameDiv">
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <p className="profile--name">
                                {profileData.firstName} {profileData.lastName}
                            </p>
                        </div>
                        <p className="profile--role">{profileData.role}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <p>{profileData.email}</p>
                    </div>
                    <div className="profile--form--address">
                        <FontAwesomeIcon icon={faLocationDot} className="icon" />
                        <p>{profileData.address || '----------'}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faGlobe} className="icon" />
                        <p>{profileData.websiteUrl || '----------'}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faSquareFacebook} className="icon" />
                        <p>{profileData.facebookUrl || '----------'}</p>
                    </div>
                    <button className="editButton" onClick={() => setButtonPopup(true)}>
                        Edit profile
                    </button>

                    <button className="paymentButton" onClick={() => navigate('/payment')}>
                        Complete payment
                    </button>

                    <button className="changePasswordButton" onClick={() => setPasswordPopup(true)}>
                        Change password
                    </button>
                </div>

                <div className="upcoming--events">
                    <div className="eventTitleDiv">
                        <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                        <h1 className="eventTitle">Your upcoming events</h1>
                    </div>

                    <div className="eventDisplay">
                        {upcomingEvents.map((event, index) => (
                            <SimpleEvent
                                key={index}
                                eventName={event.name}
                                eventDate={event.date}
                                eventInterest={event.interest}
                                eventId={event.eventId}
                                onDelete={() => handleDeleteInterest(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="past--events">
                    <div className="eventTitleDiv">
                        <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                        <h1 className="eventTitle">Your past events</h1>
                    </div>
                    <div className="eventDisplay">
                        {pastEvents.map((event, index) => (
                            <SimpleEvent
                                key={index}
                                eventName={event.name}
                                eventDate={event.date}
                                eventReview={event.review}
                                eventId={event.eventId}
                                onDelete={() => handleDeleteInterest(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <EditForm trigger={buttonPopup} setTrigger={setButtonPopup} profileData={profileData} onEditProfile={updateProfile}>
                <h3>Popup</h3>
            </EditForm>
            <PasswordForm trigger={passwordPopup} setTrigger={setPasswordPopup} onUpdatePassword={updatePassword}>
                <h3>Popup</h3>
            </PasswordForm>
        </div>
    )
}

export default Profile
