import { useNavigate } from "react-router-dom";
import "./ManageEvent.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ImageUploading from 'react-images-uploading';
import React from "react";

function ManageEvent() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  const [eventTypes, setEventTypes] = useState([]);
  const [eventType, setEventType] = useState("CONFERENCE");
  const [isEventPaid, setIsEventPaid] = useState(false)
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [locationNames, setLocationNames] = useState([]);
  const [eventLocation, setEventLocation] = useState("Zagreb");
  const { token, role, email } = useAuth();

  const [images, setImages] = useState([]);
  const maxNumber = 10;

  function setMinDate() {
    var today = new Date().toISOString().split("T")[0];
    document.getElementsByName("eventDate")[0].setAttribute("min", today);
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleCheck = () => {
    setIsEventPaid(!isEventPaid);
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
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
      !eventDescription
    ) {
      alert("Please fill in all the fields");
      return;
    }

    const eventToCreate = {
      eventName,
      isEventPaid,
      //eventLocation,
      eventUrl,
      images,
      eventType,
      eventDate,
      eventStartTime,
      eventDuration,
      eventDescription,
      eventCreator: email,
    };

    fetch("/api/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventToCreate),
    })
      .then(() => alert("Event added!"))
      .then(() => {
        navigate("/");
      });
    console.log(eventToCreate);
  }

  useEffect(() => {
    setMinDate();
    if (role != "ORGANIZER" && role != "ADMIN"){
      //navigate("/");
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
        <select value={eventLocation} onChange={e => setEventLocation(e.target.value)}>
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
        <br></br>
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
        <label htmlFor="eventDuration">Event duration:</label>
        <input
          type="time"
          id="eventDuration"
          name="eventDuration"
          value={eventDuration}
          onChange={(e) => setEventDuration(e.target.value)}
        />
        <label htmlFor="eventUrl">Event webpage:</label>
        <input
          type="text"
          id="eventUrl"
          name="eventUrl"
          value={eventUrl}
          onChange={(e) => setEventUrl(e.target.value)}
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
        dataURLKey="data_url"
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
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
                {console.log(image['data_url'])}
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
