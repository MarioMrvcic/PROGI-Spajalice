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
                    <button className="changePasswordButton" onClick={() => setPasswordPopup(true)}>
                        Change password
                    </button>
                </div>

                <div className="upcoming--events">
                    <div className="eventTitleDiv">
                        <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                        <h1 className="eventTitle">Upcoming events</h1>
                    </div>

                    <div className="eventDisplay">
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                    </div>
                </div>

                <div className="past--events">
                    <div className="eventTitleDiv">
                        <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                        <h1 className="eventTitle">Past events</h1>
                    </div>
                    <div className="eventDisplay">
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
                        <SimpleEvent eventName="Festival glazbe" eventDate="2.12.2021." />
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
