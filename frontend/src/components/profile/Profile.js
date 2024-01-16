import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faGlobe,
  faUser,
  faCalendarWeek,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import EditForm from "./editForm";
import PasswordForm from "./PasswordForm";
import SimpleEvent from "./SimpleEvent";
import { useParams } from "react-router-dom";
import Review from "./Review";

function Profile() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const { email, roleEdit } = useAuth();
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(false);
  const [isPublicUsers, setIsPublicUsers] = useState(false);
  const [currentReviewEvent, setCurrentReviewEvent] = useState("");

  const { encodedEmail } = useParams();
  const decodedEmail = decodeURIComponent(encodedEmail);

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  //   const [upcomingPublicEvents, setUpcomingPublicEvents] = useState([]);
  //   const [pastEvents, setPastEvents] = useState([]);
  const [pastPublicEvents, setPastPublicEvents] = useState([]);

  //   const [reviews, setReviews] = useState([]);

  const [upcomingPublicEvents, setUpcomingPublicEvents] = useState([
    {
      eventName: "Event 1",
      eventDate: "2022-01-15",
      interest: "",
      _id: "1",
      eventCreator: "Duje",
    },
    {
      eventName: "Event 2",
      eventDate: "2022-02-20",
      interest: "",
      _id: "2",
      eventCreator: "Duje",
    },
    {
      eventName: "Event 3",
      eventDate: "2022-03-25",
      interest: "Dolazim",
      _id: "3",
      eventCreator: "Duje",
    },
    {
      eventName: "Event 4",
      eventDate: "2022-04-10",
      interest: "Možda dolazim",
      _id: "4",
      eventCreator: "Duje",
    },
    {
      eventName: "Event 5",
      eventDate: "2022-05-15",
      interest: "Dolazim",
      _id: "5",
      eventCreator: "Duje",
    },
  ]);

  const [pastEvents, setPastEvents] = useState([
    {
      eventName: "Event 6",
      eventDate: "2021-01-15",
      review: "true",
      _id: "6",
      eventCreator: "Duje",
    },
    {
      eventName: "Event 7",
      eventDate: "2021-02-20",
      review: "false",
      _id: "7",
      eventCreator: "Duje",
    },
    {
      eventName: "Event 8",
      eventDate: "2021-03-25",
      review: "false",
      _id: "8",
      eventCreator: "Duje",
    },
    {
      eventName: "Event 9",
      eventDate: "2021-04-10",
      review: "false",
      _id: "9",
      eventCreator: "Duje",
    },
    {
      eventName: "Event 10",
      eventDate: "2021-05-15",
      review: "false",
      _id: "10",
      eventCreator: "Duje",
    },
  ]);

  const [reviews, setReviews] = useState([
    {
      userEmail: "duje.juric@gmail.com",
      eventId: "6",
      reviewCreationDate: "2022-01-15",
      reviewTitle: "ZABAVA",
      reviewBody: "Odličan event, svaka čast organizatoru",
      reviewRating: 4,
    },
    {
      userEmail: "duje.juric@gmail.com",
      eventId: "9",
      reviewCreationDate: "2023-01-15",
      reviewTitle: "KAOS",
      reviewBody: "Benger od eventa, nikad više neću doć",
      reviewRating: 2,
    },
    {
      userEmail: "duje.juric@gmail.com",
      eventId: "4",
      reviewCreationDate: "2023-01-15",
      reviewTitle: "Dosta loš event!",
      reviewBody: "Ne dolazim više, baš užas!",
      reviewRating: 1,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (!decodedEmail) {
        navigate("/");
        return;
      }

      try {
        //get User data
        const response = await fetch("/api/getUser/" + decodedEmail);

        if (response.status === 404) {
          console.log("Email not found in the database.");
          navigate("/");
          return;
        }

        const data = await response.json();
        setProfileData(data);
        localStorage.setItem("profileData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        //get upcoming events for user
        const upcomingEventsResponse = await fetch(
          "/api/getEventsIntrestedIn/" + decodedEmail
        );
        if (upcomingEventsResponse.status === 404) {
          console.log("No upcoming events for user.");
          return;
        }
        const upcomingEventsData = await upcomingEventsResponse.json();
        console.log(upcomingEventsData);
        setUpcomingEvents(upcomingEventsData);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };

    const storedProfileData = localStorage.getItem("profileData");
    const storedEmail = storedProfileData
      ? JSON.parse(storedProfileData).email
      : null;

    const isPublicProfile =
      window.location.pathname.startsWith("/profile/public/");
    setIsPublic(isPublicProfile);

    const authStateData = localStorage.getItem("authState");
    const authStateEmail = authStateData
      ? JSON.parse(authStateData).email
      : null;

    if (authStateEmail !== decodedEmail && !isPublicProfile) {
      navigate("/");
      return;
    }

    if (authStateEmail && authStateEmail !== decodedEmail) {
      setIsPublicUsers(false);
    } else {
      setIsPublicUsers(true);
    }

    if (decodedEmail && decodedEmail !== storedEmail) {
      fetchData();
      fetchEvents();
    } else {
      setProfileData(JSON.parse(storedProfileData));
      fetchEvents();
    }
    if (profileData.role != "ORGANIZER" && isPublicProfile) {
      navigate("/");
      return;
    }
  }, [decodedEmail, navigate]);

  const updateProfile = (editedProfile) => {
    setProfileData(editedProfile);

    fetch("/api/auth/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProfile),
    }).then(() => alert("Profile edited!"));

    localStorage.setItem("profileData", JSON.stringify(editedProfile));
    roleEdit(editedProfile.role);
    setButtonPopup(false);
  };

  const updatePassword = (passwordData) => {
    const editedProfile = {
      ...profileData,
      password: passwordData.newPassword,
    };

    fetch("/api/auth/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProfile),
    }).then(() => alert("Password edited!"));

    setPasswordPopup(false);
  };

  const handleDeleteInterest = (index) => {
    const newUpcomingEvents = [...upcomingEvents];
    newUpcomingEvents.splice(index, 1);
    setUpcomingEvents(newUpcomingEvents);
  };

  const handleDeleteInterestPublic = (index) => {
    const newUpcomingPublicEvents = [...upcomingPublicEvents];
    newUpcomingPublicEvents.splice(index, 1);
    setUpcomingPublicEvents(newUpcomingPublicEvents);
  };

  const handleDeleteReview = (index) => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
  };

  function scrollToDivButton(index) {
    const targetDiv = document.getElementById("reviewSection");
    setCurrentReviewEvent(pastEvents[index]._id);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div>
      <div className="Profile">
        <div className="profile--form">
          <div className="profile--form--title">
            <div className="profile--form--nameDiv">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <p className="profile--name">
                {profileData.firstName} {profileData.lastName}
              </p>
            </div>
            {!isPublic && <p className="profile--role">{profileData.role}</p>}
          </div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <p>{profileData.email}</p>
          </div>
          <div className="profile--form--address">
            <FontAwesomeIcon icon={faLocationDot} className="icon" />
            <p>{profileData.address || "----------"}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faGlobe} className="icon" />
            <p>{profileData.websiteUrl || "----------"}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faSquareFacebook} className="icon" />
            <p>{profileData.facebookUrl || "----------"}</p>
          </div>
          {!isPublic && (
            <button className="editButton" onClick={() => setButtonPopup(true)}>
              Edit profile
            </button>
          )}

          {profileData.role == "ORGANIZER" && !isPublic && (
            <button
              className="paymentButton"
              onClick={() => navigate("/payment")}
            >
              Complete payment
            </button>
          )}

          {profileData.role == "ORGANIZER" && !isPublic && (
            <button
              className="viewPublicButton"
              onClick={() => navigate("/profile/public/" + encodedEmail)}
            >
              View public profile
            </button>
          )}
          {!isPublic && (
            <button
              className="changePasswordButton"
              onClick={() => setPasswordPopup(true)}
            >
              Change password
            </button>
          )}

          {isPublic && isPublicUsers && (
            <button
              className="viewPrivateButton"
              onClick={() => navigate("/profile/" + encodedEmail)}
            >
              View private profile
            </button>
          )}

          {isPublic && isPublicUsers && (
            <button
              className="createEventButton"
              onClick={() => navigate("/manage_event")}
            >
              Create event
            </button>
          )}

          {isPublic && !isPublicUsers && (
            <button className="subscribeButton" onClick={() => {}}>
              Subscribe
            </button>
          )}
        </div>

        <div className="secondDiv">
          {!isPublic && (
            <div className="upcoming--events">
              <div className="eventTitleDiv">
                <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                <h1 className="eventTitle">Your upcoming events</h1>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="eventDisplay">
                  {upcomingEvents.map((event, index) => (
                    <SimpleEvent
                      key={index}
                      eventName={event.eventName}
                      eventDate={
                        new Date(event.eventDate).toISOString().split("T")[0]
                      }
                      eventInterest={"Možda dolazim"}
                      eventCreator={event.eventCreator}
                      eventId={event._id}
                      onDelete={() => handleDeleteInterest(index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="eventDisplay">
                  <h1>You have no upcoming events</h1>
                </div>
              )}
            </div>
          )}

          {!isPublic && (
            <div className="past--events">
              <div className="eventTitleDiv">
                <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                <h1 className="eventTitle">Your past events</h1>
              </div>

              {pastEvents.length > 0 ? (
                <div className="eventDisplay">
                  {pastEvents.map((event, index) => (
                    <SimpleEvent
                      key={index}
                      eventName={event.eventName}
                      eventDate={event.eventDate}
                      eventReview={event.review}
                      eventId={event._id}
                      eventCreator={event.eventCreator}
                      onDelete={() => handleDeleteInterest(index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="eventDisplay">
                  <h1>You have no past events</h1>
                </div>
              )}
            </div>
          )}

          {isPublic && (
            <div className="upcoming--events">
              <div className="eventTitleDiv">
                <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                <h1 className="eventTitle">
                  {profileData.firstName} {profileData.lastName} upcoming events
                </h1>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="eventDisplay">
                  {upcomingPublicEvents.map((event, index) => (
                    <SimpleEvent
                      key={index}
                      eventName={event.eventName}
                      eventDate={event.eventDate}
                      eventInterest={event.interest}
                      eventId={event._id}
                      eventCreator={event.eventCreator}
                      publicUpcoming={true}
                      isPublicOwner={isPublicUsers}
                      onDelete={() => handleDeleteInterestPublic(index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="eventDisplay">
                  <h1>
                    {profileData.firstName} {profileData.lastName} has no
                    upcoming events.
                  </h1>
                </div>
              )}
            </div>
          )}

          {isPublic && (
            <div className="past--events">
              <div className="eventTitleDiv">
                <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                <h1 className="eventTitle">
                  {profileData.firstName} {profileData.lastName} past events
                </h1>
              </div>

              {pastEvents.length > 0 ? (
                <div className="eventDisplay">
                  {pastEvents.map((event, index) => (
                    <SimpleEvent
                      key={index}
                      eventName={event.eventName}
                      eventDate={event.eventDate}
                      eventReview={event.review}
                      eventId={event._id}
                      eventCreator={event.eventCreator}
                      publicPast={true}
                      isPublicOwner={isPublicUsers}
                      scrollAction={() => scrollToDivButton(index)}
                      onDelete={() => handleDeleteInterest(index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="eventDisplay">
                  <h1>
                    {profileData.firstName} {profileData.lastName} has no past
                    events.
                  </h1>
                </div>
              )}
            </div>
          )}
          {!isPublic && (
            <div className="user-reviews">
              <div className="eventTitleDiv">
                <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                <h1 className="eventTitle">Your reviews</h1>
              </div>

              {reviews.length > 0 ? (
                <div className="ReviewsDisplay">
                  {reviews.map((review, index) => (
                    <Review
                      key={index}
                      reviewTitle={review.reviewTitle}
                      reviewBody={review.reviewBody}
                      reviewRating={review.reviewRating}
                      reviewDate={review.reviewCreationDate}
                      reviewUser={review.userEmail}
                      eventId={review.eventId}
                      onDelete={() => handleDeleteReview(index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="ReviewsDisplay">
                  <h1>You haven't submitted any reviews</h1>
                </div>
              )}
            </div>
          )}
          {isPublic && (
            <div className="user-reviews" id="reviewSection">
              <div className="eventTitleDiv">
                <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                {currentReviewEvent == "" && (
                  <h1 className="eventTitle">Select an event to review</h1>
                )}
                {currentReviewEvent != "" && (
                  <h1 className="eventTitle">
                    EventId: {currentReviewEvent} reviews
                  </h1>
                )}
              </div>
              {currentReviewEvent != "" && (
                <div className="ReviewsDisplay">
                  {reviews.map(
                    (review, index) =>
                      review.eventId == currentReviewEvent && (
                        <Review
                          key={index}
                          reviewTitle={review.reviewTitle}
                          reviewBody={review.reviewBody}
                          reviewRating={review.reviewRating}
                          reviewDate={review.reviewCreationDate}
                          reviewUser={review.userEmail}
                          eventId={review.eventId}
                          onDelete={() => handleDeleteReview(index)}
                        />
                      )
                  )}
                  {reviews.filter(
                    (review) => review.eventId === currentReviewEvent
                  ).length === 0 && <h1>Selected event has no reviews.</h1>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <EditForm
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        profileData={profileData}
        onEditProfile={updateProfile}
      >
        <h3>Popup</h3>
      </EditForm>
      <PasswordForm
        trigger={passwordPopup}
        emailAuth={profileData.email}
        setTrigger={setPasswordPopup}
        onUpdatePassword={updatePassword}
      >
        <h3>Popup</h3>
      </PasswordForm>
    </div>
  );
}

export default Profile;
