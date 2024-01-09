import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import './PasswordForm.css'

function PasswordForm(props) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {}, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setError('Please fill all fields.')
            return
        }

        if (newPassword !== confirmNewPassword) {
            setError('New passwords must match.')
            return
        }

        //Dodati provjeru za old password

        const passwordData = {
            oldPassword,
            newPassword,
            confirmNewPassword,
        }

        props.onUpdatePassword(passwordData)

        setError(null)
        setConfirmNewPassword('')
        setNewPassword('')
        setOldPassword('')
        props.setTrigger(false)
    }

    const handeCancel = () => {
        setError(null)
        setConfirmNewPassword('')
        setNewPassword('')
        setOldPassword('')
        props.setTrigger(false)
    }

    return props.trigger ? (
        <div className="popup">
            <form className="password--form">
                <div className="iconDiv">
                    <label htmlFor="oldPassword">Old Password</label>
                    <FontAwesomeIcon icon={faCheck} className={`iconCheck ${oldPassword && 'visible'}`} />
                    <FontAwesomeIcon icon={faX} className={`iconX ${!oldPassword && 'visible'}`} />
                </div>
                <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />

                <div className="iconDiv">
                    <label htmlFor="newPassword">New Password</label>
                    <FontAwesomeIcon icon={faCheck} className={`iconCheck ${newPassword && 'visible'}`} />
                    <FontAwesomeIcon icon={faX} className={`iconX ${!newPassword && 'visible'}`} />
                </div>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <div className="iconDiv">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={`iconCheck ${confirmNewPassword && confirmNewPassword == newPassword && 'visible'}`}
                    />
                    <FontAwesomeIcon
                        icon={faX}
                        className={`iconX ${(!confirmNewPassword || confirmNewPassword != newPassword) && 'visible'}`}
                    />
                </div>
                <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />

                <input type="submit" value="Change Password" onClick={handleSubmit} />
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

export default PasswordForm
