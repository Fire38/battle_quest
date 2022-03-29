import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getTeamList } from "../../actions/teamActions";
import { teamReducer } from "../../reducers/teamReducer";


export const TeamList = () => {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamReducer)


    useEffect(() => {
        dispatch(getTeamList());
    }, [])

    if (teams.error){
        return(
            <div>
                Произошла ошибка<br/>
                {teams.errorMessage}
            </div>
        )
    }

    let teamList = ""
    if (Object.values(teams.teamsList).length > 0){
        teamList = Object.values(teams.teamsList).map((team) => 
        <li className="list-group-item" key={team.id}>
            <NavLink className="nav-link font-weight-bold" to={`/team/${team.id}/`} id="navlink">
                { team.name }
            </NavLink>
        </li>
        )
    }else{
        teamList = <div>Список команд пуст</div>
    }

    
    return(
        <div>
            <h3>Список команд</h3>
            <ul className="list-group">
                { teamList }
            </ul>
        </div>
    )
}

