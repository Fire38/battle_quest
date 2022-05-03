import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { inviteToTeam } from "../../../actions/userActions";


export const InviteToTeamForm = () => {
    const [invitedPlayer, setInvitedPlayer] = useState("");
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer)

    const handleChange = (event) => {
        setInvitedPlayer(event.target.value)
    }   

    const notify = (text) => toast(text);

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(inviteToTeam(invitedPlayer))
        setInvitedPlayer("")
        console.log(userInfo)
        //userInfo.error ? notify(userInfo.errorMessage) : notify("Приглашение отправлено!")
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