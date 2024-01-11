import React from "react";
import "./UserCard.css";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
    const navigate = useNavigate();

    const goToProfile = () => {
        const encodedEmail = encodeURIComponent(props.email);
        navigate(`/profile/${encodedEmail}`);
    }

    return (
        <div className='userCard'>
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>{props.role}</p>
            <div className="actions">
                <Button variant="outlined" onClick={goToProfile}>View</Button>
                <Button variant="outlined">Edit</Button>
                <IconButton aria-label="delete" onClick={() => props.deleteUser(props.email)}>
                    <DeleteIcon />
                </IconButton>
            </div>

        </div>
    );
};

export default UserCard;