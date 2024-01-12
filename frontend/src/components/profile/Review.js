import React, { useEffect } from 'react'
import './Review.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function ReviewForm(props) {
    const [rating, setRating] = useState(0)
    useEffect(() => {
        setRating(props.reviewRating)
    }, [props.reviewRating])

    return (
        <div className="simpleReview">
            <div className="titleDivReview">
                <h1 className="simpleReview-title">{props.reviewTitle}</h1>
                <p>Creation date: {props.reviewDate}</p>
                <p>User: Duje</p>
            </div>
            <div className="ratingDiv">
                <p>Rating:</p>
                <FontAwesomeIcon icon={faStar} className={`star1 ${rating >= 1 ? 'active' : ''}`} />
                <FontAwesomeIcon icon={faStar} className={`star2 ${rating >= 2 ? 'active' : ''}`} />
                <FontAwesomeIcon icon={faStar} className={`star3 ${rating >= 3 ? 'active' : ''}`} />
                <FontAwesomeIcon icon={faStar} className={`star4 ${rating >= 4 ? 'active' : ''}`} />
                <FontAwesomeIcon icon={faStar} className={`star5 ${rating >= 5 ? 'active' : ''}`} />
            </div>
            <div>
                <p className="simpleReview-eventTitle">Party Fer</p>
                <div className="simpleReview-eventDate">2022-05-15</div>
                <button className="edit-review-Button" onClick={() => {}}>
                    Edit
                </button>

                <button className="delete-review-Button" onClick={() => {}}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ReviewForm
