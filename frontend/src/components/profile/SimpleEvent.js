import './SimpleEvent.css'
import { useState } from 'react'
import ChangeInterestForm from './ChangeInterestForm'
import ReviewForm from './ReviewForm'

function SimpleEvent(props) {
    const [changeInterestPopup, setChangeInterestPopup] = useState(false)
    const [interest, setInterest] = useState(props.eventInterest)
    const [reviewPopup, setReviewPopup] = useState(false)

    // const [reviews, setReviews] = useState([
    //     {
    //         userEmail: 'duje@gmail.com',
    //         eventId: '6',
    //         reviewCreationDate: '2022-01-15',
    //         reviewTitle: 'ZABAVA',
    //         reviewBody: 'Odličan event, svaka čast organizatoru',
    //         reviewRating: 4,
    //     },
    //     {
    //         userEmail: 'duje.juric@gmail.com',
    //         eventId: '9',
    //         reviewCreationDate: '2023-01-15',
    //         reviewTitle: 'KAOS',
    //         reviewBody: 'Benger od eventa, nikad više neću doć',
    //         reviewRating: 2,
    //     },
    // ])

    const [reviews, setReviews] = useState(props.eventReview)

    const updateInterest = (editedInterest) => {
        setInterest(editedInterest.selectedInterest)

        const authStateData = localStorage.getItem('authState')
        const authStateEmail = authStateData ? JSON.parse(authStateData).email : null

        let newInterest
        if (editedInterest.selectedInterest == 'Ne dolazim') {
            newInterest = 'NO'
        } else if (editedInterest.selectedInterest == 'Dolazim') {
            newInterest = 'YES'
        } else {
            newInterest = 'MAYBE'
        }

        const editedInterestData = {
            eventId: props.eventId,
            interest: newInterest,
            userEmail: authStateEmail,
        }

        fetch('/api/changeInterest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedInterestData),
        })
        setChangeInterestPopup(false)
    }

    const deleteInterest = () => {
        const authStateData = localStorage.getItem('authState')
        const authStateEmail = authStateData ? JSON.parse(authStateData).email : null
        const editedInterestData = {
            eventId: props.eventId,
            interest: 'NO',
            userEmail: authStateEmail,
        }

        fetch('/api/changeInterest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedInterestData),
        })
        props.onDelete()
        setChangeInterestPopup(false)
    }

    const handleUpdateReview = (reviewData) => {
        setReviews(reviewData)
        setReviewPopup(false)
    }

    const handleAddReview = (reviewData) => {
        setReviews(reviewData)
        setReviewPopup(false)
    }

    const handleDeleteReview = () => {
        setReviews(null)
        setReviewPopup(false)
    }

    const onEditEvent = () => {
        //implementirati edit
    }

    return (
        <div className="simpleEvent">
            <h1 className="simpleEvent--title">{props.eventName}</h1>
            <div>
                <div>
                    <p className="simpleEvent--date">{props.eventDate}</p>
                    <div className="simpleEvent--hostName">{props.eventCreator}</div>
                </div>

                {props.isPastEvent &&
                    !props.publicUpcoming &&
                    !props.publicPast &&
                    (reviews ? (
                        <button
                            className="reviewButton"
                            onClick={() => {
                                setReviewPopup(true)
                            }}>
                            Edit review
                        </button>
                    ) : (
                        <button
                            className="reviewButton"
                            onClick={() => {
                                setReviewPopup(true)
                            }}>
                            Submit review
                        </button>
                    ))}

                {!props.isPastEvent && !props.publicUpcoming && !props.publicPast && (
                    <button
                        className={`interestButton ${interest === 'Dolazim' ? 'green' : interest === 'Možda dolazim' ? 'yellow' : ''}`}
                        onClick={() => setChangeInterestPopup(true)}>
                        {interest}
                    </button>
                )}

                {props.publicUpcoming && props.isPublicOwner && (
                    <button
                        className="interestButton"
                        onClick={() => {
                            onEditEvent()
                        }}>
                        Edit
                    </button>
                )}

                {props.publicUpcoming && !props.isPublicOwner && (
                    <button
                        className={`interestButton ${
                            interest === 'Dolazim'
                                ? 'green'
                                : interest === 'Možda dolazim'
                                ? 'yellow'
                                : interest === 'Najavite se'
                                ? 'normal'
                                : ''
                        }`}
                        onClick={() => setChangeInterestPopup(true)}>
                        {interest}
                    </button>
                )}

                {props.publicPast && (
                    <button
                        className="interestButton"
                        onClick={() => {
                            props.scrollAction()
                        }}>
                        View reviews
                    </button>
                )}
            </div>

            <ChangeInterestForm
                trigger={changeInterestPopup}
                setTrigger={setChangeInterestPopup}
                interest={interest}
                onUpdateInterest={updateInterest}
                onDelete={deleteInterest}>
                <h3>Popup</h3>
            </ChangeInterestForm>

            <ReviewForm
                trigger={reviewPopup}
                setTrigger={setReviewPopup}
                reviews={reviews}
                eventId={props.eventId}
                editMode={reviews}
                reviewData={reviews ?? null}
                onUpdateReview={handleUpdateReview}
                onAddReview={handleAddReview}
                onDeleteReview={handleDeleteReview}>
                <h3>Popup</h3>
            </ReviewForm>
        </div>
    )
}

export default SimpleEvent
