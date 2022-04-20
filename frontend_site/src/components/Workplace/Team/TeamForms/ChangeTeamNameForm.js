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
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Введите новое название команды" 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2"
                    value={teamName}
                    onChange={handleChange}/>
                <button className="btn btn-outline-dark btn-warning" type="button" id="button-addon2" onClick={handleClick}>Переименовать команду</button>
            </div>
        </form>
    )
}