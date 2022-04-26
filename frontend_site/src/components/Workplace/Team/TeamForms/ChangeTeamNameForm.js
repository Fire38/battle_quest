import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeTeamName } from "../../../actions/teamActions";


export const ChangeTeamNameForm = () => {
    const [teamName, setTeamName] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setTeamName(event.target.value)
    }   

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(changeTeamName(teamName))
        setTeamName("")
    }


    return(
        <form>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control mb-1" 
                    placeholder="Введите новое название команды" 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2"
                    value={teamName}
                    onChange={handleChange}/>
                <button id="controlBtn" className="btn btn-outline-dark btn-warning col-12" type="button" onClick={handleClick}>Переименовать команду</button>
            </div>
        </form>
    )
}