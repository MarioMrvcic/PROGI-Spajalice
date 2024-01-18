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
  faSpinner,
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
  const [isPublic, setIsPublic] = useState(
    window.location.pathname.startsWith("/profile/public/")
  );
  const [isPublicUsers, setIsPublicUsers] = useState(false);
  const [currentReviewEvent, setCurrentReviewEvent] = useState("");

  const { encodedEmail } = useParams();
  const decodedEmail = decodeURIComponent(encodedEmail);
  const [adminView, setAdminView] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [upcomingPublicEvents, setUpcomingPublicEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [pastPublicEvents, setPastPublicEvents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [publicReviews, setPublicReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setProfileData(data);
        localStorage.setItem("profileData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const checkIfPublicAllowed = async () => {
      try {
        const response = await fetch("/api/getUser/" + decodedEmail);
        const data = await response.json();

        if (data.role == "VISITOR" && isPublicProfile) {
          navigate("/");
          return;
        }
        return;
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        //get upcoming events for user
        const eventsResponse = await fetch(
          "/api/getEventsIntrestedIn/" + decodedEmail
        );
        if (eventsResponse.status === 404) {
          console.log("No upcoming events for user.");
          return;
        }
        const allEventsData = await eventsResponse.json();

        //get upcoming event interests for user
        const allEventInterests = await fetch(
          "/api/getEventInterest/" + decodedEmail
        );
        const allEventInterestData = await allEventInterests.json();

        const upcomingEvents = allEventsData.filter((event) => {
          const parseTime = event.eventStartTime.split(":");
          const date = new Date(event.eventDate).setHours(
            parseTime[0],
            parseTime[1],
            0,
            0
          );
          return date > new Date();
        });

        const pastEvents = allEventsData.filter((event) => {
          const parseTime = event.eventStartTime.split(":");
          const date = new Date(event.eventDate).setHours(
            parseTime[0],
            parseTime[1],
            0,
            0
          );
          return date <= new Date();
        });

        const eventInterests = upcomingEvents.map((event) => {
          return {
            ...event,
            interest:
              allEventInterestData.find(
                (interest) => interest.eventId === event._id
              ).interest === "YES"
                ? "Dolazim"
                : "Možda dolazim",
          };
        });
        setUpcomingEvents(eventInterests);
        setPastEvents(pastEvents);

        //get all user reviews
        const userReviews = pastEvents.reduce((accumulator, event) => {
          const userReview = event.reviews.find(
            (review) => review.userEmail === decodedEmail
          );

          if (userReview) {
            accumulator.push({
              event: { ...event },
              review: { ...userReview },
            });
          }

          return accumulator;
        }, []);

        setReviews(userReviews);

        if (window.location.pathname.startsWith("/profile/public/")) {
          //get upcoming public events
          const publicEventsResponse = await fetch(
            "/api/getEventsByEventCreator/" + decodedEmail
          );
          if (publicEventsResponse.status === 404) {
            console.log("No upcoming public events for user.");
            return;
          }
          const allPublicEventsData = await publicEventsResponse.json();

          //get upcoming event interests for user

          const upcomingPublicEvents = allPublicEventsData.filter((event) => {
            const parseTime = event.eventStartTime.split(":");
            const date = new Date(event.eventDate).setHours(
              parseTime[0],
              parseTime[1],
              0,
              0
            );
            return date > new Date();
          });

          const pastPublicEvents = allPublicEventsData.filter((event) => {
            const parseTime = event.eventStartTime.split(":");
            const date = new Date(event.eventDate).setHours(
              parseTime[0],
              parseTime[1],
              0,
              0
            );
            return date <= new Date();
          });

          const allEventPublicInterests = await fetch(
            "/api/getEventInterest/" + authStateEmail
          );
          const allEventPublicInterestData =
            await allEventPublicInterests.json();

          const eventPublicInterests = upcomingPublicEvents.map((event) => {
            const foundInterest = allEventPublicInterestData.find(
              (interest) => interest.eventId === event._id
            );

            let interestText = "Najavite se▼";

            if (foundInterest) {
              switch (foundInterest.interest) {
                case "YES":
                  interestText = "Dolazim";
                  break;
                case "MAYBE":
                  interestText = "Možda dolazim";
                  break;
                case "NO":
                  interestText = "Ne dolazim";
                  break;

                default:
                  break;
              }
            }
            return {
              ...event,
              interest: interestText,
            };
          });

          setUpcomingPublicEvents(eventPublicInterests);

          setPastPublicEvents(pastPublicEvents);

          const publicReviews = pastPublicEvents.reduce((reviews, event) => {
            const publicEventReviews = event.reviews.map((review) => ({
              ...review,
              eventId: event._id,
              eventData: event,
            }));

            return reviews.concat(publicEventReviews);
          }, []);

          setPublicReviews(publicReviews);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        setIsLoading(false);
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
    const authStateRole = authStateData ? JSON.parse(authStateData).role : null;

    if (
      authStateEmail !== decodedEmail &&
      !isPublicProfile &&
      authStateRole !== "ADMIN"
    ) {
      navigate("/");
      return;
    }

    if (authStateRole === "ADMIN" && decodedEmail != authStateEmail) {
      setAdminView(true);
    }

    if (authStateEmail && authStateEmail !== decodedEmail) {
      setIsPublicUsers(false);
    } else {
      setIsPublicUsers(true);
    }
    checkIfPublicAllowed();

    if (decodedEmail && decodedEmail !== storedEmail) {
      fetchData();
      fetchEvents();
    } else {
      setProfileData(JSON.parse(storedProfileData));
      fetchEvents();
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

  const handleDeleteReview = (eventId) => {
    const updatedReviews = [...reviews];

    const indexToDelete = updatedReviews.findIndex(
      (review) =>
        review.eventId === eventId && review.userEmail === decodedEmail
    );
    updatedReviews.splice(indexToDelete, 1);
    setReviews(updatedReviews);
    refreshProfilePage();
  };

  const refreshProfilePage = () => {
    window.location.reload();
  };

  function scrollToDivButton(index) {
    const targetDiv = document.getElementById("reviewSection");
    setCurrentReviewEvent(pastPublicEvents[index]._id);
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
          {!isPublic && !adminView && (
            <button className="editButton" onClick={() => setButtonPopup(true)}>
              Edit profile
            </button>
          )}

          {profileData.role == "ORGANIZER" && !isPublic && !adminView && (
            <button
              className="paymentButton"
              onClick={() => navigate("/payment")}
            >
              Complete payment
            </button>
          )}

          {profileData.role == "ORGANIZER" && !isPublic && !adminView && (
            <button
              className="viewPublicButton"
              onClick={() => navigate("/profile/public/" + encodedEmail)}
            >
              View public profile
            </button>
          )}
          {!isPublic && !adminView && (
            <button
              className="changePasswordButton"
              onClick={() => setPasswordPopup(true)}
            >
              Change password
            </button>
          )}

          {isPublic && isPublicUsers && !adminView && (
            <button
              className="viewPrivateButton"
              onClick={() => navigate("/profile/" + encodedEmail)}
            >
              View private profile
            </button>
          )}

          {isPublic && isPublicUsers && !adminView && (
            <button
              className="createEventButton"
              onClick={() => navigate("/manage_event")}
            >
              Create event
            </button>
          )}

          {isPublic && !isPublicUsers && !adminView && (
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
                      eventData={event}
                      key={index}
                      onDelete={() => handleDeleteInterest(index)}
                      adminView={adminView}
                    />
                  ))}
                </div>
              ) : (
                <div className="eventDisplay">
                  {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="iconLoading" />
                  ) : (
                    <h1>You have no upcoming events</h1>
                  )}
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
                      eventData={event}
                      key={index}
                      eventReview={
                        event.reviews?.find(
                          (item) => item.userEmail === decodedEmail
                        ) || null
                      }
                      isPastEvent={true}
                      currentUser={decodedEmail}
                      adminView={adminView}
                      refreshProfilePage={refreshProfilePage}
                      onDelete={() => handleDeleteInterest(index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="eventDisplay">
                  {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="iconLoading" />
                  ) : (
                    <h1>You have no past events</h1>
                  )}
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

              {upcomingPublicEvents.length > 0 ? (
                <div className="eventDisplay">
                  {upcomingPublicEvents.map((event, index) => (
                    <SimpleEvent
                      eventData={event}
                      key={index}
                      publicUpcoming={true}
                      isPublicOwner={isPublicUsers}
                      onDelete={() => handleDeleteInterestPublic(index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="eventDisplay">
                  {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="iconLoading" />
                  ) : (
                    <h1>
                      {profileData.firstName} {profileData.lastName} has no
                      upcoming events.
                    </h1>
                  )}
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

              {pastPublicEvents.length > 0 ? (
                <div className="eventDisplay">
                  {pastPublicEvents.map((event, index) => (
                    <SimpleEvent
                      eventData={event}
                      key={index}
                      eventReview={event.review}
                      publicPast={true}
                      isPublicOwner={isPublicUsers}
                      scrollAction={() => scrollToDivButton(index)}
                      onDelete={() => handleDeleteInterest(index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="eventDisplay">
                  {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="iconLoading" />
                  ) : (
                    <h1>
                      {profileData.firstName} {profileData.lastName} has no past
                      events.
                    </h1>
                  )}
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
                      reviewTitle={review.review.reviewTitle}
                      reviewBody={review.review.reviewBody}
                      reviewRating={review.review.reviewRating}
                      reviewDate={
                        new Date(review.review.reviewCreationDate)
                          .toISOString()
                          .split("T")[0]
                      }
                      reviewUser={review.review.userEmail}
                      eventData={review.event}
                      currentUser={decodedEmail}
                      onDelete={() => handleDeleteReview(index)}
                      refreshProfilePage={refreshProfilePage}
                    />
                  ))}
                </div>
              ) : (
                <div className="ReviewsDisplay">
                  {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="iconLoading" />
                  ) : (
                    <h1>You haven't submitted any reviews</h1>
                  )}
                </div>
              )}
            </div>
          )}
          {isPublic && (
            <div className="user-reviews" id="reviewSection">
              <div className="eventTitleDiv">
                <FontAwesomeIcon icon={faCalendarWeek} className="iconEvent" />
                {currentReviewEvent == "" && (
                  <h1 className="eventTitle">
                    Select an event from past events to see reviews
                  </h1>
                )}
                {currentReviewEvent != "" && (
                  <h1 className="eventTitle">
                    {
                      pastPublicEvents.find(
                        (event) => event._id === currentReviewEvent
                      )?.eventName
                    }{" "}
                    reviews
                  </h1>
                )}
              </div>
              {currentReviewEvent != "" && (
                <div className="ReviewsDisplay">
                  {publicReviews.map(
                    (review, index) =>
                      review.eventId == currentReviewEvent && (
                        <Review
                          key={index}
                          reviewTitle={review.reviewTitle}
                          reviewBody={review.reviewBody}
                          reviewRating={review.reviewRating}
                          reviewDate={
                            new Date(review.reviewCreationDate)
                              .toISOString()
                              .split("T")[0]
                          }
                          reviewUser={review.userEmail}
                          eventId={review.eventId}
                          eventData={review.eventData}
                          publicReview={true}
                          onDelete={() => handleDeleteReview(index)}
                          refreshProfilePage={refreshProfilePage}
                        />
                      )
                  )}
                  {publicReviews.filter(
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
