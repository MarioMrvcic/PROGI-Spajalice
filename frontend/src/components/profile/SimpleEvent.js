import './SimpleEvent.css'
import { useState } from 'react'
import ChangeInterestForm from './ChangeInterestForm'
import ReviewForm from './ReviewForm'

function SimpleEvent(props) {
    const [changeInterestPopup, setChangeInterestPopup] = useState(false)
    const [interest, setInterest] = useState(props.eventInterest)
    const [reviewPopup, setReviewPopup] = useState(false)

    const [reviews, setReviews] = useState([
        {
            userEmail: 'duje.juric@gmail.com',
            eventId: '6',
            reviewCreationDate: '2022-01-15',
            reviewTitle: 'ZABAVA',
            reviewBody: 'Odličan event, svaka čast organizatoru',
            reviewRating: 4,
        },
        {
            userEmail: 'duje.juric@gmail.com',
            eventId: '9',
            reviewCreationDate: '2023-01-15',
            reviewTitle: 'KAOS',
            reviewBody: 'Benger od eventa, nikad više neću doć',
            reviewRating: 2,
        },
    ])

    const hasReview = reviews.some((review) => review.eventId === props.eventId)

    const updateInterest = (editedInterest) => {
        setInterest(editedInterest.selectedInterest)
        setChangeInterestPopup(false)
    }

    const deleteInterest = () => {
        props.onDelete()
        setChangeInterestPopup(false)
    }

    const handleUpdateReview = (reviewData) => {
        const indexToUpdate = reviews.findIndex((review) => review.eventId === reviewData.eventId)
        const updatedReviews = reviews
        updatedReviews[indexToUpdate] = reviewData
        setReviews(updatedReviews)
        setReviewPopup(false)
    }

    const handleAddReview = (reviewData) => {
        setReviews((prevReviews) => [...prevReviews, reviewData])
        setReviewPopup(false)
    }

    return (
        <div className="simpleEvent">
            <h1 className="simpleEvent--title">{props.eventName}</h1>
            <div>
                <p className="simpleEvent--date">{props.eventDate}</p>
                <div className="simpleEvent--hostName">Adidas</div>

                {props.eventReview ? (
                    hasReview ? (
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
                    )
                ) : (
                    <button
                        className={`interestButton ${interest === 'Dolazim' ? 'green' : interest === 'Možda dolazim' ? 'yellow' : ''}`}
                        onClick={() => setChangeInterestPopup(true)}>
                        {interest}
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
                editMode={hasReview}
                reviewData={hasReview ? reviews.find((review) => review.eventId === props.eventId) : null}
                onUpdateReview={handleUpdateReview}
                onAddReview={handleAddReview}>
                <h3>Popup</h3>
            </ReviewForm>
        </div>
    )
}

export default SimpleEvent
