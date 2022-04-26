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
        setInvitedPlayer("")
    }

    return(
        <form>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control mb-1" 
                    placeholder="Введите id или ник игрока" 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2"
                    value={invitedPlayer}
                    onChange={handleChange}/>
                <button id="controlBtn" className="btn btn-outline-dark btn-warning col-12" type="button" onClick={handleClick}>Пригласить в команду</button>
            </div>
        </form>

    )
}