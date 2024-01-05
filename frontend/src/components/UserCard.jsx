import React from "react";
import "./UserCard.css";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const UserCard = (props) => {
  return (
    <div className='userCard'>
      <p>{props.name}</p>
      <p>{props.email}</p>
      <p>{props.role}</p>
      <div className="actions">
        <Button variant="outlined">Edit</Button>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
      
    </div>
  );
};

export default UserCard;
