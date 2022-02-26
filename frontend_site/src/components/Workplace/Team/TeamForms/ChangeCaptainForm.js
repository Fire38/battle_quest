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
                <button className="btn btn-outline-secondary btn-warning" type="button" id="button-addon2" onClick={handleClick}>Назначить капитаном</button>
            </div>
        </form>

    )
}