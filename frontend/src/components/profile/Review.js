import React, { useEffect } from 'react'
import './Review.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import ReviewForm from './ReviewForm'

function Review(props) {
    const [reviewTitle, setReviewTitle] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [rating, setRating] = useState(0)
    const [reviewPopup, setReviewPopup] = useState(false)

    useEffect(() => {
        setReviewTitle(props.reviewTitle)
        setReviewBody(props.reviewBody)
        setRating(props.reviewRating)
    }, [props.reviewRating])

    const handleUpdateReview = (reviewData) => {
        setReviewTitle(reviewData.reviewTitle)
        setReviewBody(reviewData.reviewBody)
        setRating(reviewData.reviewRating)
        setReviewPopup(false)
    }

    const handleDeleteReview = (eventId) => {
        props.onDelete(eventId)
        setReviewPopup(false)
    }

    return (
        <div className="simpleReview">
            <div className="titleDivReview">
                <h1 className="simpleReview-title">{reviewTitle}</h1>
                <div className="infoDiv">
                    <p>Creation date: {props.reviewDate}</p>
                    <p>User: {props.reviewUser}</p>
                </div>
            </div>
            <div className="ratingDiv">
                <p>Rating:</p>
                <FontAwesomeIcon icon={faStar} className={`star1 ${rating >= 1 ? 'active' : ''}`} />
                <FontAwesomeIcon icon={faStar} className={`star2 ${rating >= 2 ? 'active' : ''}`} />
                <FontAwesomeIcon icon={faStar} className={`star3 ${rating >= 3 ? 'active' : ''}`} />
                <FontAwesomeIcon icon={faStar} className={`star4 ${rating >= 4 ? 'active' : ''}`} />
                <FontAwesomeIcon icon={faStar} className={`star5 ${rating >= 5 ? 'active' : ''}`} />
            </div>
            <div className="textDiv">
                <p>{reviewBody}</p>
            </div>
            <div>
                <p className="simpleReview-eventTitle">Party Fer</p>
                <div className="simpleReview-eventDate">2022-05-15</div>
                <button
                    className="edit-review-Button"
                    onClick={() => {
                        setReviewPopup(true)
                    }}>
                    Edit
                </button>
                <button
                    className="delete-review-Button"
                    onClick={() => {
                        handleDeleteReview(props.eventId)
                    }}>
                    Delete
                </button>
            </div>
            <ReviewForm
                trigger={reviewPopup}
                setTrigger={setReviewPopup}
                reviewData={{
                    userEmail: props.reviewUser,
                    eventId: props.eventId,
                    reviewCreationDate: props.reviewDate,
                    reviewTitle: reviewTitle,
                    reviewBody: reviewBody,
                    reviewRating: rating,
                }}
                thisIsReview={true}
                onUpdateReview={handleUpdateReview}>
                <h3>Popup</h3>
            </ReviewForm>
        </div>
    )
}

export default Review
