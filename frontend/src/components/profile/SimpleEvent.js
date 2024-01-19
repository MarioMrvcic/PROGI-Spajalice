import './SimpleEvent.css'
import { useState } from 'react'
import ChangeInterestForm from './ChangeInterestForm'
import ReviewForm from './ReviewForm'
import { useNavigate } from 'react-router-dom'

function SimpleEvent(props) {
    const [changeInterestPopup, setChangeInterestPopup] = useState(false)
    const [interest, setInterest] = useState(props.eventData.interest)
    const [reviewPopup, setReviewPopup] = useState(false)
    const [userReview, setUserReview] = useState(props.eventReview)
    const [allReviews, setAllReviews] = useState(props.eventData.reviews)
    const navigate = useNavigate()

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
            eventId: props.eventData._id,
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
            eventId: props.eventData._id,
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
        setUserReview(reviewData)

        const indexToUpdate = allReviews.findIndex((review) => review.userEmail === reviewData.userEmail)

        const updatedReviews = [...allReviews]
        updatedReviews[indexToUpdate] = reviewData

        setAllReviews(updatedReviews)

        fetch('/api/editEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: props.eventData._id,
                eventName: props.eventData.eventName,
                isEventPaid: props.eventData.isEventPaid,
                eventLocation: props.eventData.eventLocation,
                photos: props.eventData.photos,
                eventType: props.eventData.eventType,
                eventDate: new Date(props.eventData.eventDate).toISOString().split('T')[0],
                eventStartTime: props.eventData.eventStartTime,
                eventDuration: props.eventData.eventDuration,
                eventDescription: props.eventData.eventDescription,
                price: props.eventData.price,
                eventCreator: props.eventData.eventCreator,
                reviews: updatedReviews,
            }),
        }).then(() => {
            props.refreshProfilePage()
        })
        setReviewPopup(false)
    }

    const handleAddReview = (reviewData) => {
        setUserReview(reviewData)

        const updatedReviews = [...allReviews, reviewData]
        setAllReviews(updatedReviews)

        fetch('/api/editEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: props.eventData._id,
                eventName: props.eventData.eventName,
                isEventPaid: props.eventData.isEventPaid,
                eventLocation: props.eventData.eventLocation,
                photos: props.eventData.photos,
                eventType: props.eventData.eventType,
                eventDate: new Date(props.eventData.eventDate).toISOString().split('T')[0],
                eventStartTime: props.eventData.eventStartTime,
                eventDuration: props.eventData.eventDuration,
                eventDescription: props.eventData.eventDescription,
                price: props.eventData.price,
                eventCreator: props.eventData.eventCreator,
                reviews: updatedReviews,
            }),
        }).then(() => {
            props.refreshProfilePage()
        })

        setReviewPopup(false)
    }

    const handleDeleteReview = () => {
        setUserReview(null)

        const updatedReviews = allReviews.filter((review) => review.userEmail !== props.currentUser)
        setAllReviews(updatedReviews)

        fetch('/api/editEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: props.eventData._id,
                eventName: props.eventData.eventName,
                isEventPaid: props.eventData.isEventPaid,
                eventLocation: props.eventData.eventLocation,
                photos: props.eventData.photos,
                eventType: props.eventData.eventType,
                eventDate: new Date(props.eventData.eventDate).toISOString().split('T')[0],
                eventStartTime: props.eventData.eventStartTime,
                eventDuration: props.eventData.eventDuration,
                eventDescription: props.eventData.eventDescription,
                price: props.eventData.price,
                eventCreator: props.eventData.eventCreator,
                reviews: updatedReviews,
            }),
        }).then(() => {
            props.refreshProfilePage()
        })

        setReviewPopup(false)
    }

    const onEditEvent = () => {
        const propsToEdit = {
            eventId: props.eventData._id,
            eventName: props.eventData.eventName,
            eventType: props.eventData.eventType,
            eventDate: props.eventData.eventDate,
            eventStartTime: props.eventData.eventStartTime,
            eventDuration: props.eventData.eventDuration,
            eventDescription: props.eventData.eventDescription,
            eventCreator: props.eventData.eventCreator,
            eventCreatorEmail: props.eventData.eventCreator,
            eventPhotos: props.eventData.photos,
            eventPrice: props.eventData.price,
            eventLocation: props.eventData.eventLocation,
            eventReviews: props.eventData.reviews || [],
        }

        // eventId={event._id}
        // eventName={event.eventName}
        // eventType={event.eventType}
        // eventDate={event.eventDate}
        // eventStartTime={event.eventStartTime}
        // eventDuration={event.eventDuration}
        // eventDescription={event.eventDescription}
        // eventCreator={eventCreators[event.eventCreator]}
        // eventCreatorEmail={event.eventCreator}
        // eventPhotos={event.photos}
        // eventPrice={event.price}
        // eventLocation={event.eventLocation}
        // eventReviews = {event.reviews || []}

        navigate('/manage_event', { state: { pushedProps: propsToEdit } })
    }

    return (
        <div className="simpleEvent">
            <h1 className="simpleEvent--title">{props.eventData.eventName}</h1>
            <div>
                <div>
                    <p className="simpleEvent--date">{new Date(props.eventData.eventDate).toISOString().split('T')[0]}</p>
                    <div className="simpleEvent--hostName">{props.eventData.eventCreator}</div>
                </div>

                {props.isPastEvent &&
                    !props.publicUpcoming &&
                    !props.publicPast &&
                    (userReview ? (
                        <button
                            className="reviewButton"
                            onClick={() => {
                                {
                                    !props.adminView && setReviewPopup(true)
                                }
                            }}>
                            Edit review
                        </button>
                    ) : (
                        <button
                            className="reviewButton"
                            onClick={() => {
                                {
                                    !props.adminView && setReviewPopup(true)
                                }
                            }}>
                            Submit review
                        </button>
                    ))}

                {!props.isPastEvent && !props.publicUpcoming && !props.publicPast && (
                    <button
                        className={`interestButton ${interest === 'Dolazim' ? 'green' : interest === 'Možda dolazim' ? 'yellow' : ''}`}
                        onClick={() => {
                            !props.adminView && setChangeInterestPopup(true)
                        }}>
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
                                : interest === 'Najavite se▼'
                                ? 'normal'
                                : interest === 'Ne dolazim'
                                ? 'red'
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
                publicUpcoming={props.publicUpcoming}
                onUpdateInterest={updateInterest}
                onDelete={deleteInterest}>
                <h3>Popup</h3>
            </ChangeInterestForm>

            <ReviewForm
                trigger={reviewPopup}
                setTrigger={setReviewPopup}
                reviews={userReview}
                eventData={props.eventData}
                editMode={userReview}
                reviewData={userReview ?? null}
                currentUser={props.currentUser}
                onUpdateReview={handleUpdateReview}
                onAddReview={handleAddReview}
                onDeleteReview={handleDeleteReview}>
                <h3>Popup</h3>
            </ReviewForm>
        </div>
    )
}

export default SimpleEvent
