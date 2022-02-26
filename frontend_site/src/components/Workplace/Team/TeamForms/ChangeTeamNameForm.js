import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeTeamName } from "../../../actions/userActions";


export const ChangeTeamNameForm = () => {
    const [teamName, setTeamName] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setTeamName(event.target.value)
    }   

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(changeTeamName(teamName))
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
                    onChange={handleChange}/>
                <button className="btn btn-outline-secondary btn-warning" type="button" id="button-addon2" onClick={handleClick}>Переименовать команду</button>
            </div>
        </form>
    )
}