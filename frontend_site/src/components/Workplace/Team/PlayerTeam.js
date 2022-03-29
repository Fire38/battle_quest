import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { leaveFromTeam } from "../../actions/userActions";

import { InviteToTeamForm } from "./TeamForms/InviteToTeamForm";
import { RemoveFromTeamForm } from "./TeamForms/RemoveFromTeamForm";
import { ChangeCaptainForm } from "./TeamForms/ChangeCaptainForm";
import { ChangeTeamNameForm } from "./TeamForms/ChangeTeamNameForm";


export const PlayerTeam = () => {
    const userInfo = useSelector(state => state.userReducer)
    let teamStructure = ""

    if (Object.keys(userInfo.user).length !== 0 && userInfo.user.team){
        teamStructure = Object.values(userInfo.user.team.members).map((member) =>
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

    if (userInfo.error){
        return(
            <div>
                {userInfo.errorMessage}
            </div>
        )
    }

    if (userInfo.user.team){
        return(
            <div className="container-fluid">
                <div className="row">
                        <h3><b>{userInfo.user.team.name}</b></h3> 
                </div>
                <div className="row">
                    <div className="col-3">
                        <img className="rounded" height="250px" width="250px" src={userInfo.user.team.logo}></img>
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
                Вы не в команде, получите приглашение или <NavLink id="navlink" to="/team/create-team/">создайте свою команду</NavLink>
            </div>
        )
    }
}


