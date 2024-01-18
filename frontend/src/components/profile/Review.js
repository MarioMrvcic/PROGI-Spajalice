import React, { useEffect } from "react";
import "./Review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

function Review(props) {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewDate, setReviewDate] = useState("");
  const [reviewPopup, setReviewPopup] = useState(false);
  const [allReviews, setAllReviews] = useState(props.eventData.reviews || []);

  useEffect(() => {
    setReviewTitle(props.reviewTitle);
    setReviewBody(props.reviewBody);
    setRating(props.reviewRating);
    setReviewDate(props.reviewDate);
  }, [props.reviewRating]);

  const handleUpdateReview = (reviewData) => {
    setReviewTitle(reviewData.reviewTitle);
    setReviewBody(reviewData.reviewBody);
    setRating(reviewData.reviewRating);
    setReviewDate(reviewData.reviewCreationDate);

    const indexToUpdate = allReviews.findIndex(
      (review) => review.userEmail === props.reviewUser
    );

    const updatedReviews = [...allReviews];
    updatedReviews[indexToUpdate] = {
      ...reviewData,
      userEmail: props.reviewUser,
    };

    setAllReviews(updatedReviews);

    fetch("/api/editEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.eventData._id,
        eventName: props.eventData.eventName,
        isEventPaid: props.eventData.isEventPaid,
        eventLocation: props.eventData.eventLocation,
        photos: props.eventData.photos,
        eventType: props.eventData.eventType,
        eventDate: new Date(props.eventData.eventDate)
          .toISOString()
          .split("T")[0],
        eventStartTime: props.eventData.eventStartTime,
        eventDuration: props.eventData.eventDuration,
        eventDescription: props.eventData.eventDescription,
        price: props.eventData.price,
        eventCreator: props.eventData.eventCreator,
        reviews: updatedReviews,
      }),
    }).then(() => {
      props.refreshProfilePage();
    });

    setReviewPopup(false);
  };

  const handleDeleteReview = (eventId) => {
    const updatedReviews = allReviews.filter(
      (review) => review.userEmail !== props.currentUser
    );
    setAllReviews(updatedReviews);

    fetch("/api/editEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.eventData._id,
        eventName: props.eventData.eventName,
        isEventPaid: props.eventData.isEventPaid,
        eventLocation: props.eventData.eventLocation,
        photos: props.eventData.photos,
        eventType: props.eventData.eventType,
        eventDate: new Date(props.eventData.eventDate)
          .toISOString()
          .split("T")[0],
        eventStartTime: props.eventData.eventStartTime,
        eventDuration: props.eventData.eventDuration,
        eventDescription: props.eventData.eventDescription,
        price: props.eventData.price,
        eventCreator: props.eventData.eventCreator,
        reviews: updatedReviews,
      }),
    });

    props.onDelete(eventId);
    setReviewPopup(false);
  };

  return (
    <div className="simpleReview">
      <div className="titleDivReview">
        <h1 className="simpleReview-title">{reviewTitle}</h1>
        <div className="infoDiv">
          <p>
            Creation date:{" "}
            {new Date(props.reviewDate).toISOString().split("T")[0]}
          </p>
          <p>User: {props.reviewUser}</p>
        </div>
      </div>
      <div className="ratingDiv">
        <p>Rating:</p>
        <FontAwesomeIcon
          icon={faStar}
          className={`star1 ${rating >= 1 ? "active" : ""}`}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={`star2 ${rating >= 2 ? "active" : ""}`}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={`star3 ${rating >= 3 ? "active" : ""}`}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={`star4 ${rating >= 4 ? "active" : ""}`}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={`star5 ${rating >= 5 ? "active" : ""}`}
        />
      </div>
      <div className="textDiv">
        <p>{reviewBody}</p>
      </div>
      <div>
        <p className="simpleReview-eventTitle">{props.eventData.eventName}</p>
        <div className="simpleReview-eventDate">
          {new Date(props.eventData.eventDate).toISOString().split("T")[0]}
        </div>
        {!props.publicReview && (
          <button
            className="edit-review-Button"
            onClick={() => {
              setReviewPopup(true);
            }}
          >
            Edit
          </button>
        )}
        {!props.publicReview && (
          <button
            className="delete-review-Button"
            onClick={() => {
              handleDeleteReview(props.eventData._id);
            }}
          >
            Delete
          </button>
        )}
      </div>
      <ReviewForm
        trigger={reviewPopup}
        setTrigger={setReviewPopup}
        reviewData={{
          userEmail: props.reviewUser,
          reviewCreationDate: reviewDate,
          reviewTitle: reviewTitle,
          reviewBody: reviewBody,
          reviewRating: rating,
        }}
        eventData={props.eventData}
        thisIsReview={true}
        currentUser={props.currentUser}
        onUpdateReview={handleUpdateReview}
      >
        <h3>Popup</h3>
      </ReviewForm>
    </div>
  );
}

export default Review;
