import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createTeam } from "../../../actions/teamActions";
import { toast } from "react-toastify";

import { getPlayerTeam } from "../../../actions/userActions";
import { autoLogin } from "../../../actions/userActions";

export const CreateTeamForm = () => {
    const [teamName, setTeamName] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.userReducer)

    const handleChange = (event) => {
        setTeamName(event.target.value)
    }

    const notify = (text) => toast(text);

    const handleClick = event => {
        event.preventDefault();
        dispatch(createTeam(teamName))
        setTeamName("")
        dispatch(getPlayerTeam())
        dispatch(autoLogin())
        navigate("/team/my-team/");
        //notify("Команда успешно создана")
    }

    
    if (userInfo.teamInfo.length > 0){
        navigate("/team/my-team/");
    }

    return(
        <div>
            <h3>Создание команды</h3>
            <form className="col-xl-4 ">
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Введите название команды" 
                        value={teamName}
                        onChange={handleChange}/>
                </div>
                <button id="controlBtn" className="btn btn-outline-dark btn-warning col-12" type="button" onClick={handleClick}>Создать команду</button>
            </form>
        </div>
    )
}