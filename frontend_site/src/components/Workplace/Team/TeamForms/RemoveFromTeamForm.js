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
    }

    return(
        <div className="input-group mb-3">
            <input 
                type="text"
                className="form-control" 
                placeholder="Введите id или ник игрока" 
                aria-label="Recipient's username" 
                aria-describedby="button-addon2"
                onChange={handleChange}/>
            <button className="btn btn-outline-secondary btn-warning" type="button" id="button-addon2" onClick={handleClick}>Выгнать из команды</button>
        </div>
    )
}