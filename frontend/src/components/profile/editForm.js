import React from 'react'
import './editForm.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'

function EditForm(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [address, setAddress] = useState('')
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [facebookUrl, setFacebookUrl] = useState('')
    const [error, setError] = useState(null)
    const [selectedRole, setSelectedRole] = useState('VISITOR')

    useEffect(() => {
        setFirstName(props.profileData.firstName || '')
        setLastName(props.profileData.lastName || '')

        setAddress(props.profileData.address || '')
        setWebsiteUrl(props.profileData.websiteUrl || '')
        setFacebookUrl(props.profileData.facebookUrl || '')
        setSelectedRole(props.profileData.role || 'VISITOR')
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
        }

        props.onEditProfile(editedProfile)
        props.setTrigger(false)
    }

    const handeCancel = () => {
        setError(null)
        setFirstName(props.profileData.firstName || '')
        setLastName(props.profileData.lastName || '')

        setAddress(props.profileData.address || '')
        setWebsiteUrl(props.profileData.websiteUrl || '')
        setFacebookUrl(props.profileData.facebookUrl || '')
        setSelectedRole(props.profileData.role || 'VISITOR')
        props.setTrigger(false)
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
                <button className="close-btn" onClick={handeCancel}>
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
