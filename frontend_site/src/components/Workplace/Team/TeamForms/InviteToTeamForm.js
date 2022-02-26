import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { inviteToTeam } from "../../../actions/userActions";


export const InviteToTeamForm = () => {
    const [invitedPlayer, setInvitedPlayer] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setInvitedPlayer(event.target.value)
    }   

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(inviteToTeam(invitedPlayer))
    }

    return(
        <form>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Введите id или ник игрока" 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2"
                    onChange={handleChange}/>
                <button className="btn btn-outline-secondary btn-warning" type="button" id="button-addon2" onClick={handleClick}>Пригласить в команду</button>
            </div>
        </form>

    )
}