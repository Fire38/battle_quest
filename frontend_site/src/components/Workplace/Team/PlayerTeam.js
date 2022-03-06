import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserTeamInfo, leaveFromTeam } from "../../actions/userActions";

import { InviteToTeamForm } from "./TeamForms/InviteToTeamForm";
import { RemoveFromTeamForm } from "./TeamForms/RemoveFromTeamForm";
import { ChangeCaptainForm } from "./TeamForms/ChangeCaptainForm";
import { ChangeTeamNameForm } from "./TeamForms/ChangeTeamNameForm";


export const PlayerTeam = () => {
    const dispatch = useDispatch();
    const teamInfo = useSelector(state => state.userReducer.teamInfo)
    const userInfo = useSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(getUserTeamInfo())
    }, [])

    let teamStructure = ""
    
    if (teamInfo.members){
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
    )}
    console.log(userInfo)

    if (userInfo.error){
        return(
            <div>
                {userInfo.errorMessage}
            </div>
        )
    }

    if (teamInfo){
        return(
            <div className="container-fluid">
                <div className="row">
                        <h3>{teamInfo.name}</h3> 
                </div>
                <div className="row">
                    <div className="col-3">
                        <img height="250px" width="250px" src={teamInfo.logo}></img>
                    </div>
                    <div className="col-3">
                        Состав команды
                        <ul className="list-group list-group-flush">
                            {teamStructure}
                        </ul>
                    </div>
                    <div className="col-4">
                    {
                        userInfo.user.captain  
                        ?
                        <div>
                            <InviteToTeamForm/>
                            <RemoveFromTeamForm/>
                            <ChangeCaptainForm/>
                            <ChangeTeamNameForm/>
                        </div>
                        :
                        <button className="btn btn-outline-secondary btn-warning" onClick={leaveFromTeam()}>Выйти из команды</button>
                    }
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                Вы не в команде, получите приглашение или создайте свою команду
            </div>
        )
    }


}