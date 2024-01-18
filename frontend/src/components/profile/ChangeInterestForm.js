import React from "react";
import "./ChangeInterestForm.css";
import { useState } from "react";

function ChangeInterestForm(props) {
  const [selectedInterest, setSelectedInterest] = useState(props.interest);
  const [warning, setWarning] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedInterest === "Ne dolazim" && !props.publicUpcoming) {
      props.onDelete();
      return;
    }

    const editedInterest = {
      selectedInterest,
    };

    props.onUpdateInterest(editedInterest);
    props.setTrigger(false);
  };

  const handeCancel = () => {
    setWarning(null);
    setSelectedInterest("Dolazim");
    props.setTrigger(false);
  };

  return props.trigger ? (
    <div className="ChangeInterestPopup">
      <form className="changeInterestForm">
        <div>
          <label className="radioButton">
            <input
              type="radio"
              name="role"
              value="Dolazim"
              checked={selectedInterest === "Dolazim"}
              onChange={() => {
                setSelectedInterest("Dolazim");
                setWarning(null);
              }}
            />
            Dolazim
          </label>
        </div>
        <div>
          <label className="radioButton">
            <input
              type="radio"
              name="role"
              value="Možda dolazim"
              checked={selectedInterest === "Možda dolazim"}
              onChange={() => {
                setSelectedInterest("Možda dolazim");
                setWarning(null);
              }}
            />
            Možda dolazim
          </label>
        </div>
        <div>
          <label className="radioButton">
            <input
              type="radio"
              name="role"
              value="Ne dolazim"
              checked={selectedInterest === "Ne dolazim"}
              onChange={() => {
                setSelectedInterest("Ne dolazim");
                setWarning("Jeste li sigurni da ne želite doći na događaj?");
              }}
            />
            Ne dolazim
          </label>
        </div>
        {warning && <p className="warning">{warning}</p>}
        <input
          type="submit"
          value="Edit"
          className="interestSubmit"
          onClick={handleSubmit}
        />
        <button className="cancelButton" onClick={handeCancel}>
          Cancel
        </button>
      </form>
    </div>
  ) : (
    ""
  );
}

export default ChangeInterestForm;
