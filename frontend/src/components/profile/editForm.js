import React from "react";
import "./editForm.css";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faX,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

function EditForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState("VISITOR");
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [isEventTypeDropdownOpen, setIsEventTypeDropdownOpen] = useState(false);
  const [isPlaceDropdownOpen, setIsPlaceDropdownOpen] = useState(false);

  useEffect(() => {
    setFirstName(props.profileData.firstName || "");
    setLastName(props.profileData.lastName || "");
    setAddress(props.profileData.address || "");
    setWebsiteUrl(props.profileData.websiteUrl || "");
    setFacebookUrl(props.profileData.facebookUrl || "");
    setSelectedRole(props.profileData.role || "VISITOR");
    setSelectedEventTypes(props.profileData.intrestedInTypes || []);
    setSelectedPlaces(props.profileData.intrestedInPlace || []);
  }, [props.profileData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName) {
      setError("First Name and Last Name are required fields");
      return;
    }

    const editedProfile = {
      firstName,
      lastName,
      email: props.profileData.email,
      address,
      websiteUrl,
      facebookUrl,
      role: selectedRole,
      intrestedInTypes: selectedEventTypes,
      intrestedInPlace: selectedPlaces,
    };

    props.onEditProfile(editedProfile);
    setIsEventTypeDropdownOpen(false);
    setIsPlaceDropdownOpen(false);
    props.setTrigger(false);
  };

  const handleCancel = () => {
    setError(null);
    setFirstName(props.profileData.firstName || "");
    setLastName(props.profileData.lastName || "");
    setAddress(props.profileData.address || "");
    setWebsiteUrl(props.profileData.websiteUrl || "");
    setFacebookUrl(props.profileData.facebookUrl || "");
    setSelectedRole(props.profileData.role || "VISITOR");
    setSelectedEventTypes(props.profileData.intrestedInTypes || []);
    setSelectedPlaces(props.profileData.intrestedInPlace || []);
    props.setTrigger(false);
    setIsEventTypeDropdownOpen(false);
    setIsPlaceDropdownOpen(false);
  };

  const toggleEventTypeDropdown = () => {
    setIsEventTypeDropdownOpen(!isEventTypeDropdownOpen);
  };

  const togglePlaceDropdown = () => {
    setIsPlaceDropdownOpen(!isPlaceDropdownOpen);
  };

  const handleEventTypeClick = (eventType) => {
    if (selectedEventTypes.includes(eventType)) {
      setSelectedEventTypes(
        selectedEventTypes.filter((type) => type !== eventType)
      );
    } else {
      setSelectedEventTypes([...selectedEventTypes, eventType]);
    }
  };

  const handlePlaceClick = (place) => {
    if (selectedPlaces.includes(place)) {
      setSelectedPlaces(selectedPlaces.filter((type) => type !== place));
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  return props.trigger ? (
    <div className="popup">
      <form className="edit--form">
        <div className="iconDiv">
          <label htmlFor="name">First Name</label>
          <FontAwesomeIcon
            icon={faCheck}
            className={`iconCheck ${firstName && "visible"}`}
          />
          <FontAwesomeIcon
            icon={faX}
            className={`iconX ${!firstName && "visible"}`}
          />
        </div>
        <input
          type="text"
          id="name"
          name="name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <div className="iconDiv">
          <label htmlFor="name">Last Name</label>
          <FontAwesomeIcon
            icon={faCheck}
            className={`iconCheck ${lastName && "visible"}`}
          />
          <FontAwesomeIcon
            icon={faX}
            className={`iconX ${!lastName && "visible"}`}
          />
        </div>
        <input
          type="text"
          id="name"
          name="name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <div className="iconDiv">
          <label htmlFor="address">Address</label>
          <FontAwesomeIcon icon={faCheck} className="iconCheck visible" />
          <FontAwesomeIcon icon={faX} className="iconX" />
        </div>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="iconDiv">
          <label htmlFor="websiteUrl">Website URL</label>
          <FontAwesomeIcon icon={faCheck} className="iconCheck visible" />
          <FontAwesomeIcon icon={faX} className="iconX" />
        </div>
        <input
          type="text"
          id="websiteUrl"
          name="websiteUrl"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />

        <div className="iconDiv">
          <label htmlFor="facebookUrl">Facebook URL</label>
          <FontAwesomeIcon icon={faCheck} className="iconCheck visible" />
          <FontAwesomeIcon icon={faX} className="iconX" />
        </div>
        <input
          type="text"
          id="facebookUrl"
          name="facebookUrl"
          value={facebookUrl}
          onChange={(e) => setFacebookUrl(e.target.value)}
        />

        <div className="dropdown">
          <div className="dropdown-toggle" onClick={toggleEventTypeDropdown}>
            <p className="selectEventTypesText">Interested in event types</p>
            <FontAwesomeIcon
              icon={isEventTypeDropdownOpen ? faCaretUp : faCaretDown}
              className="dropdown-icon"
            />
          </div>
          {isEventTypeDropdownOpen && (
            <div className="dropdown-options">
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("CONFERENCE") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("CONFERENCE")}
              >
                Conference
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("SEMINAR") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("SEMINAR")}
              >
                Seminar
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("WORKSHOP") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("WORKSHOP")}
              >
                Workshop
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("WEBINAR") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("WEBINAR")}
              >
                Webinar
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("EXPO") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("EXPO")}
              >
                Expo
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("SYMPOSIUM") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("SYMPOSIUM")}
              >
                Symposium
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("FESTIVAL") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("FESTIVAL")}
              >
                Festival
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("CONCERT") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("CONCERT")}
              >
                Concert
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("SPORTS") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("SPORTS")}
              >
                Sports
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("NETWORKING") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("NETWORKING")}
              >
                Networking
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("FUNDRAISING") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("FUNDRAISING")}
              >
                Fundraising
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("CULTURAL") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("CULTURAL")}
              >
                Cultural
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("ART") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("ART")}
              >
                Art
              </div>
              <div
                className={`dropdown-option ${
                  selectedEventTypes.includes("HACKATHON") ? "selected" : ""
                }`}
                onClick={() => handleEventTypeClick("HACKATHON")}
              >
                Hackathon
              </div>
            </div>
          )}
        </div>

        <div className="dropdown">
          <div className="dropdown-toggle" onClick={togglePlaceDropdown}>
            <p className="selectPlaceText">Interested in places</p>
            <FontAwesomeIcon
              icon={isPlaceDropdownOpen ? faCaretUp : faCaretDown}
              className="dropdown-icon"
            />
          </div>
          {isPlaceDropdownOpen && (
            <div className="dropdown-options">
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("ZAGREB") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("ZAGREB")}
              >
                ZAGREB
              </div>
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("SPLIT") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("SPLIT")}
              >
                SPLIT
              </div>
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("RIJEKA") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("RIJEKA")}
              >
                RIJEKA
              </div>
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("OSIJEK") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("OSIJEK")}
              >
                OSIJEK
              </div>
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("ZADAR") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("ZADAR")}
              >
                ZADAR
              </div>
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("SLAVONSKIBROD") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("SLAVONSKIBROD")}
              >
                SLAVONSKI BROD
              </div>
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("PULA") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("PULA")}
              >
                PULA
              </div>
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("KARLOVAC") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("KARLOVAC")}
              >
                KARLOVAC
              </div>
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("SISAK") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("SISAK")}
              >
                SISAK
              </div>
              <div
                className={`dropdown-option ${
                  selectedPlaces.includes("ŠIBENIK") ? "selected" : ""
                }`}
                onClick={() => handlePlaceClick("ŠIBENIK")}
              >
                ŠIBENIK
              </div>
            </div>
          )}
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="VISITOR"
              checked={selectedRole === "VISITOR"}
              onChange={() => setSelectedRole("VISITOR")}
            />
            Visitor
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="ORGANIZER"
              checked={selectedRole === "ORGANIZER"}
              onChange={() => setSelectedRole("ORGANIZER")}
            />
            Organizer
          </label>
        </div>

        <input type="submit" value="Edit" onClick={handleSubmit} />
        <button className="close-btn" onClick={handleCancel}>
          Cancel
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  ) : (
    ""
  );
}

export default EditForm;
