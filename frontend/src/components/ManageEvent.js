import { useNavigate, useLocation } from "react-router-dom";
import "./ManageEvent.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ImageUploading from 'react-images-uploading';
import CurrencyInput from 'react-currency-input-field';
import React from "react";
import { useParams } from 'react-router-dom'

function ManageEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pushedProps } = location.state || {};
  const [eventName, setEventName] = useState("");
  const [eventTypes, setEventTypes] = useState([]);
  const [eventType, setEventType] = useState("CONFERENCE");
  const [isEventPaid, setIsEventPaid] = useState(false)
  const [eventPrice, setEventPrice] = useState(0);
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [locationNames, setLocationNames] = useState([]);
  const [eventLocation, setEventLocation] = useState("Zagreb");
  const [eventId, setEventId] = useState("");
  const { token, role, email } = useAuth();
  const [eventReviews, setEventReviews] = useState([])

  const [images, setImages] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const maxNumber = 10;
  const [hasOrganizerPaid, setHasOrganizerPaid] = useState(false)

  function setMinDate() {
    var today = new Date().toISOString().split("T")[0];
    document.getElementsByName("eventDate")[0].setAttribute("min", today);
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    const imageUrls =imageList.map((image) => ({photoURL: image['photoURL'] }));
    setImages(imageList);
    setImagesURL(imageUrls);
    console.log(imageList)
  };
  function checkPaymentStatus() {
    fetch(`api/checkPaymentStatus/${email}`)
      .then(response => response.json())
      .then(data => {
        setHasOrganizerPaid(prevState => {
          if (data) {
            setIsEventPaid(!isEventPaid);
          } else {
            alert("You must pay the subscription fee to create a paid event");
          }
          return data; // Update the state with the new value
        });
      })
      .catch(error => console.error('Error fetching payment status:', error));
  }
  
  const handleCheck = () => {
    setHasOrganizerPaid(checkPaymentStatus());
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label className = "check-box"> 
        <input type="checkbox" checked={value} onChange={onChange} />
        <span class="checkmark"></span>
        {label}
      </label>
    );
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !eventName ||
      !eventDate ||
      !eventStartTime ||
      !eventDuration ||
      !eventDescription ||
      images.length == 0
    ) {
      alert("Please fill in all the fields");
      return;
    }

    const endpoint=pushedProps ? "/api/editEvent" : "/api/addEvent";

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        _id: eventId,
        eventName,
        isEventPaid,
        eventLocation:{name: eventLocation},
        photos: imagesURL,
        eventType,
        eventDate,
        eventStartTime,
        eventDuration,
        eventDescription,
        price: eventPrice,
        eventCreator: email,
        reviews: eventReviews
      }),
    })
        .then(() => alert(pushedProps ? "Event updated!" : "Event added!"))
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.error("Error submitting event:", error));
  }

  useEffect(() => {
    setMinDate();
    if (role != "ORGANIZER" && role != "ADMIN"){
      navigate("/");
    }
    if (pushedProps != null){
      const formattedDate = pushedProps.eventDate.split('T')[0]
      console.log(pushedProps);
      setEventName(pushedProps.eventName);
      setEventType(pushedProps.eventType);
      setEventLocation(pushedProps.eventLocation.name);
      setIsEventPaid(pushedProps.isEventPaid);
      setEventPrice(pushedProps.eventPrice);
      setEventDate(formattedDate);
      setEventStartTime(pushedProps.eventStartTime);
      setEventDuration(pushedProps.eventDuration);
      setEventDescription(pushedProps.eventDescription);
      setImagesURL(pushedProps.eventPhotos);
      setImages(pushedProps.eventPhotos)
      setEventId(pushedProps.eventId);
      setEventReviews(pushedProps.eventReviews)
      console.log(pushedProps)
    }

    if(pushedProps!=null){
      if (pushedProps.eventPrice==0){
        setIsEventPaid(false);
      } else{
        setIsEventPaid(true);
      }
    }

  }, []);

  useEffect(() => {
    if (token) {
      fetch("/api/eventTypes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
          .then((response) => response.json())
          .then((data) => {
            setEventTypes(data);
            return fetch("/api/places/names", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          })
          .then(response => response.json())
          .then(data => setLocationNames(data))
          .catch(error => console.error(error));
    }
  }, [token])



  return (
    <div className="manageEvent">
      <h1>Manage Event</h1>
      <form className="manageEvent--form">
        <label htmlFor="eventName">Event name:</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <label htmlFor="eventType">Event type:</label>
        <select
          id="eventType"
          name="eventType"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          {eventTypes.map((eventType, index) => (
            <option key={index} value={eventType}>
              {eventType}
            </option>
          ))}
        </select>
        <label htmlFor="eventLocation">Event location:</label>
        <select id="eventLocation"
                name="eventLocation"
                value={eventLocation}
                onChange={e => setEventLocation(e.target.value)}>
          {locationNames.map((eventLocation, index) => (
              <option key={index} value={eventLocation}>{eventLocation}</option>
          ))}
        </select>
        <div className="check">
          <Checkbox
            label="Event is paid"
            value={isEventPaid}
            onChange={handleCheck}
          />
        </div>
        <div className="priceField">
          <CurrencyInput
            disabled={!isEventPaid}
            id="priceInput"
            name="priceInput"
            placeholder="Please enter a price"
            defaultValue={isEventPaid ? eventPrice : 0.0}
            decimalsLimit={2}
            suffix="€"
            onValueChange={(e) => setEventPrice(e)}
          />
        </div>  
        <label htmlFor="eventDate">Event date:</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <label htmlFor="eventStartTime">Event start time:</label>
        <input
          type="time"
          id="eventStartTime"
          name="eventStartTime"
          value={eventStartTime}
          onChange={(e) => setEventStartTime(e.target.value)}
        />
        <label htmlFor="eventDuration">Event end:</label>
        <input
          type="time"
          id="eventDuration"
          name="eventDuration"
          value={eventDuration}
          onChange={(e) => setEventDuration(e.target.value)}
        />
        <label htmlFor="eventDescription">Event description:</label>
        <textarea
          type="text"
          id="eventDescription"
          name="eventDescription"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      <div>
        <ImageUploading
        multiple
        value={images}
        onChange={onChangeImage}
        maxNumber={maxNumber}
        dataURLKey="photoURL"
        >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['photoURL']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>

              </div>
            ))}
          </div>
        )}
        </ImageUploading>
        </div>
    </div>
  );
}

export default ManageEvent;
