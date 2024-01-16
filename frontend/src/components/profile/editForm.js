import React from 'react'
import './editForm.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

function EditForm(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [facebookUrl, setFacebookUrl] = useState('')
    const [selectedRole, setSelectedRole] = useState('VISITOR')
    const [selectedEventTypes, setSelectedEventTypes] = useState([])
    const [selectedPlaces, setSelectedPlaces] = useState([])
    const [error, setError] = useState(null)
    const [isEventTypeDropdownOpen, setIsEventTypeDropdownOpen] = useState(false)
    const [isPlaceDropdownOpen, setIsPlaceDropdownOpen] = useState(false)

    const placesArray = ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar', 'Slavonski Brod', 'Pula', 'Karlovac', 'Sisak', 'Šibenik']
    const eventTypesArray = [
        'CONFERENCE',
        'SEMINAR',
        'WORKSHOP',
        'WEBINAR',
        'EXPO',
        'SYMPOSIUM',
        'FESTIVAL',
        'CONCERT',
        'SPORTS',
        'NETWORKING',
        'FUNDRAISING',
        'CULTURAL',
        'ART',
        'HACKATHON',
    ]

    useEffect(() => {
        setFirstName(props.profileData.firstName || '')
        setLastName(props.profileData.lastName || '')
        setAddress(props.profileData.address || '')
        setWebsiteUrl(props.profileData.websiteUrl || '')
        setFacebookUrl(props.profileData.facebookUrl || '')
        setSelectedRole(props.profileData.role || 'VISITOR')
        setSelectedEventTypes(props.profileData.intrestedInTypes || [])
        
        setSelectedPlaces(props.profileData.intrestedInPlace ? props.profileData.intrestedInPlace.map((item) => item.name) : [])
    }, [props.profileData])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!firstName || !lastName) {
            setError('First Name and Last Name are required fields')
            return
        }

        const editedProfile = {
            firstName,
            lastName,
            email: props.profileData.email,
            address,
            websiteUrl,
            facebookUrl,
            role: selectedRole,
            intrestedInTypes: selectedEventTypes,
            intrestedInPlace: selectedPlaces.map((place) => ({ name: place })),
        }
        console.log(editedProfile)

        props.onEditProfile(editedProfile)
        setIsEventTypeDropdownOpen(false)
        setIsPlaceDropdownOpen(false)
        props.setTrigger(false)
    }

    const handleCancel = () => {
        setError(null)
        setFirstName(props.profileData.firstName || '')
        setLastName(props.profileData.lastName || '')
        setAddress(props.profileData.address || '')
        setWebsiteUrl(props.profileData.websiteUrl || '')
        setFacebookUrl(props.profileData.facebookUrl || '')
        setSelectedRole(props.profileData.role || 'VISITOR')
        setSelectedEventTypes(props.profileData.intrestedInTypes || [])
        setSelectedPlaces(props.profileData.intrestedInPlace || [])
        props.setTrigger(false)
        setIsEventTypeDropdownOpen(false)
        setIsPlaceDropdownOpen(false)
    }

    const toggleEventTypeDropdown = () => {
        setIsEventTypeDropdownOpen(!isEventTypeDropdownOpen)
    }

    const togglePlaceDropdown = () => {
        setIsPlaceDropdownOpen(!isPlaceDropdownOpen)
    }

    const handleEventTypeClick = (eventType) => {
        if (selectedEventTypes.includes(eventType)) {
            setSelectedEventTypes(selectedEventTypes.filter((type) => type !== eventType))
        } else {
            setSelectedEventTypes([...selectedEventTypes, eventType])
        }
    }

    const handlePlaceClick = (place) => {
        if (selectedPlaces.includes(place)) {
            setSelectedPlaces(selectedPlaces.filter((type) => type !== place))
        } else {
            setSelectedPlaces([...selectedPlaces, place])
        }
    }

    return props.trigger ? (
        <div className="popup">
            <form className="edit--form">
                <div className="iconDiv">
                    <label htmlFor="name">First Name</label>
                    <FontAwesomeIcon icon={faCheck} className={`iconCheck ${firstName && 'visible'}`} />
                    <FontAwesomeIcon icon={faX} className={`iconX ${!firstName && 'visible'}`} />
                </div>
                <input type="text" id="name" name="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <div className="iconDiv">
                    <label htmlFor="name">Last Name</label>
                    <FontAwesomeIcon icon={faCheck} className={`iconCheck ${lastName && 'visible'}`} />
                    <FontAwesomeIcon icon={faX} className={`iconX ${!lastName && 'visible'}`} />
                </div>
                <input type="text" id="name" name="name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <div className="iconDiv">
                    <label htmlFor="address">Address</label>
                    <FontAwesomeIcon icon={faCheck} className="iconCheck visible" />
                    <FontAwesomeIcon icon={faX} className="iconX" />
                </div>
                <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />

                <div className="iconDiv">
                    <label htmlFor="websiteUrl">Website URL</label>
                    <FontAwesomeIcon icon={faCheck} className="iconCheck visible" />
                    <FontAwesomeIcon icon={faX} className="iconX" />
                </div>
                <input type="text" id="websiteUrl" name="websiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />

                <div className="iconDiv">
                    <label htmlFor="facebookUrl">Facebook URL</label>
                    <FontAwesomeIcon icon={faCheck} className="iconCheck visible" />
                    <FontAwesomeIcon icon={faX} className="iconX" />
                </div>
                <input
                    type="text"
                    id="facebookUrl"
                    name="facebookUrl"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                />

                <div className="dropdown">
                    <div className="dropdown-toggle" onClick={toggleEventTypeDropdown}>
                        <p className="selectEventTypesText">Interested in event types</p>
                        <FontAwesomeIcon icon={isEventTypeDropdownOpen ? faCaretUp : faCaretDown} className="dropdown-icon" />
                    </div>
                    {isEventTypeDropdownOpen && (
                        <div className="dropdown-options">
                            {eventTypesArray.map((eventType) => (
                                <div
                                    className={`dropdown-option ${selectedEventTypes.includes(eventType) ? 'selected' : ''}`}
                                    onClick={() => handleEventTypeClick(eventType)}>
                                    {eventType}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="dropdown">
                    <div className="dropdown-toggle" onClick={togglePlaceDropdown}>
                        <p className="selectPlaceText">Interested in places</p>
                        <FontAwesomeIcon icon={isPlaceDropdownOpen ? faCaretUp : faCaretDown} className="dropdown-icon" />
                    </div>
                    {isPlaceDropdownOpen && (
                        <div className="dropdown-options">
                            {placesArray.map((place) => (
                                <div
                                    className={`dropdown-option ${selectedPlaces.includes(place) ? 'selected' : ''}`}
                                    onClick={() => handlePlaceClick(place)}>
                                    {place}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="VISITOR"
                            checked={selectedRole === 'VISITOR'}
                            onChange={() => setSelectedRole('VISITOR')}
                        />
                        Visitor
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="ORGANIZER"
                            checked={selectedRole === 'ORGANIZER'}
                            onChange={() => setSelectedRole('ORGANIZER')}
                        />
                        Organizer
                    </label>
                </div>

                <input type="submit" value="Edit" onClick={handleSubmit} />
                <button className="close-btn" onClick={handleCancel}>
                    Cancel
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    ) : (
        ''
    )
}

export default EditForm
