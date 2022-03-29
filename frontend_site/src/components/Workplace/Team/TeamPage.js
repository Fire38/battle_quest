import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getTeamInfo } from "../../actions/teamActions";


export const TeamPage = () => {
    const dispatch = useDispatch();
    const teamInfo = useSelector(state => state.teamReducer.teamInfo)
    let params = useParams();

    useEffect(() => {
        dispatch(getTeamInfo(params.teamId))
    }, [])

    let teamStructure = ""

    if (teamInfo && teamInfo.members.length !== 0){
        teamStructure = Object.values(teamInfo.members).map((member) =>
        <li className="list-group-item" key={member.id}>
            {member.username} 
            {
                member.captain 
                ? 
                <span className="badge rounded-pill bg-warning text-dark">К</span>
                :
                ""
            }
        </li>
    )} else{
        teamStructure = <div>Никого нет:(</div>
    }


    if (teamInfo){
        return(
            <div className="container-fluid">
                <div className="row">
                        <h3>Команда: <b>{teamInfo.name}</b></h3> 
                </div>
                <div className="row">
                    <div className="col-3">
                        <img height="250px" width="250px" src={teamInfo.logo}></img>
                    </div>
                    <div className="col-3">
                        <b>Состав</b>
                        <ul className="list-group list-group-flush">
                            { teamStructure }
                        </ul>
                    </div>

                </div>
            </div>
        )
    }

    

    return(
        <div>Страница команды</div>
    )
}