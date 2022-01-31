import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTeamList } from "../../actions/teamActions";
import { teamReducer } from "../../reducers/teamReducer";


export const TeamList = () => {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamReducer.teams)

    useEffect(() => {
        dispatch(getTeamList())
    }, [])

    let teamList = Object.values(teams).map((team) => 
        <li key={team.id}>{ team.name }</li>
    )
    
    return(
        <div>
            <ul>
                { teamList }
            </ul>
        </div>
    )
}