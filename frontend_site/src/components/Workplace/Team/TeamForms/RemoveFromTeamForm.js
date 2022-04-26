import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { removeFromTeam } from "../../../actions/userActions";


export const RemoveFromTeamForm = () => {
    const [removedPlayer, setRemovedPlayer] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setRemovedPlayer(event.target.value)
    }

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(removeFromTeam(removedPlayer))
        setRemovedPlayer("")
    }

    return(
        <div className="mb-3">
            <input 
                type="text"
                className="form-control mb-1" 
                placeholder="Введите id или ник игрока" 
                aria-label="Recipient's username" 
                aria-describedby="button-addon2"
                onChange={handleChange}
                value={removedPlayer}
            />
            <button id="controlBtn" className="btn btn-outline-dark btn-warning col-12" type="button" onClick={handleClick}>Выгнать из команды</button>
        </div>
    )
}