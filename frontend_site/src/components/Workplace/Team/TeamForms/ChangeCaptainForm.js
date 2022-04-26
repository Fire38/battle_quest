import React, { useState } from "react";
import { useDispatch} from "react-redux";

import { changeCaptain } from "../../../actions/userActions";


export const ChangeCaptainForm = () => {
    const [assignedPlayer, setAssignedPlayer] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setAssignedPlayer(event.target.value)
    }

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(changeCaptain(assignedPlayer))
        setAssignedPlayer("")
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
                    value={assignedPlayer}
                    onChange={handleChange}
                />
                <button id="controlBtn" className="btn btn-outline-dark btn-warning col-12" type="button" onClick={handleClick}>Назначить капитаном</button>
            </div>
        </form>

    )
}