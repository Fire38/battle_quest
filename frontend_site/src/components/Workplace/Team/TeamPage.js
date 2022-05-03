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
        <li className="list-group-item text-center" key={member.id}>
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
                <div className="row text-center">
                        <h3><b>{teamInfo.name}</b></h3> 
                </div>
                <div className="row">
                    <div className="col-xl-3 col-sm-4 text-center">
                        <img className="rounded" height="250px" width="250px" src={teamInfo.logo}></img>
                    </div>
                    <div className="col-xl-3 col-sm-3">
                        <div className="text-center">Состав команды</div>
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