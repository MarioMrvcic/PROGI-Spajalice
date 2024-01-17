import React from "react";
import "./ReviewForm.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUser,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function ReviewForm(props) {
  const today = new Date();
  const [title, setTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.editMode && props.reviewData) {
      setTitle(props.reviewData.reviewTitle || "");
      setReviewBody(props.reviewData.reviewBody || "");
      setRating(props.reviewData.reviewRating || 0);
    } else if (props.thisIsReview) {
      setTitle(props.reviewData.reviewTitle || "");
      setReviewBody(props.reviewData.reviewBody || "");
      setRating(props.reviewData.reviewRating || 0);
    } else {
      setTitle("");
      setReviewBody("");
      setRating(0);
    }
  }, [props.editMode, props.reviewData]);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !reviewBody || !rating) {
      setError("All fields are required");
      return;
    }
    setError(null);

    const reviewData = {
      userEmail: props.currentUser,
      reviewCreationDate: today.toISOString().split("T")[0],
      reviewTitle: title,
      reviewBody: reviewBody,
      reviewRating: rating,
    };

    if (props.thisIsReview) {
      const reviewData2 = {
        reviewCreationDate: today.toISOString().split("T")[0],
        reviewTitle: title,
        reviewBody: reviewBody,
        reviewRating: rating,
      };
      props.onUpdateReview(reviewData2);
      props.setTrigger(false);
    } else {
      if (props.editMode) {
        props.onUpdateReview(reviewData);
      } else {
        props.onAddReview(reviewData);
      }

      props.setTrigger(false);
    }
  };

  const handeCancel = () => {
    setError(null);
    props.setTrigger(false);
  };

  const handleDeleteReview = () => {
    props.onDeleteReview();

    props.setTrigger(false);
  };

  return props.trigger ? (
    <div className="reviewPopup">
      <form className="reviewForm">
        <div className="reviewTitleDiv1">
          <h1>{props.eventData.eventName}</h1>
          <div>
            <div>
              <FontAwesomeIcon icon={faUser} className="organiserIcon" />
              <p className="organiserName">{props.eventData.eventCreator}</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faCalendarWeek} className="calenderIcon" />
              <p className="locationDate">
                {
                  new Date(props.eventData.eventDate)
                    .toISOString()
                    .split("T")[0]
                }
              </p>
            </div>
          </div>
        </div>
        <label htmlFor="title" className="textR">
          Review title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Write your review title here..."
          value={title}
          className="reviewTextBox"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <div className="reviewBodyDiv">
          <label htmlFor="reviewBody" className="textR">
            Review
          </label>
          <textarea
            id="reviewBody"
            name="reviewBody"
            rows="4"
            cols="50"
            placeholder="Write your review here..."
            className="reviewTextBox"
            value={reviewBody}
            onChange={(event) => {
              setReviewBody(event.target.value);
            }}
          />
        </div>
        <div className="reviewRatingDiv">
          <label htmlFor="title" className="textR">
            Rating:
          </label>
          <FontAwesomeIcon
            icon={faStar}
            className={`star1 ${rating >= 1 ? "active" : ""}`}
            onClick={() => handleStarClick(1)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={`star2 ${rating >= 2 ? "active" : ""}`}
            onClick={() => handleStarClick(2)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={`star3 ${rating >= 3 ? "active" : ""}`}
            onClick={() => handleStarClick(3)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={`star4 ${rating >= 4 ? "active" : ""}`}
            onClick={() => handleStarClick(4)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={`star5 ${rating >= 5 ? "active" : ""}`}
            onClick={() => handleStarClick(5)}
          />
        </div>

        <input
          type="submit"
          className="review-Button"
          value={props.editMode ? "Edit review" : "Submit review"}
          onClick={handleSubmit}
        />
        {props.editMode && (
          <button className="delete-Button" onClick={handleDeleteReview}>
            Delete review
          </button>
        )}
        <button className="cancel-Button" onClick={handeCancel}>
          Cancel
        </button>
        {error && <p className="errorReview">{error}</p>}
      </form>
    </div>
  ) : (
    ""
  );
}

export default ReviewForm;
