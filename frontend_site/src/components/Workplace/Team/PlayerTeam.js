import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { leaveFromTeam } from "../../actions/userActions";

import { InviteToTeamForm } from "./TeamForms/InviteToTeamForm";
import { RemoveFromTeamForm } from "./TeamForms/RemoveFromTeamForm";
import { ChangeCaptainForm } from "./TeamForms/ChangeCaptainForm";
import { ChangeTeamNameForm } from "./TeamForms/ChangeTeamNameForm";

import { getPlayerTeam } from "../../actions/userActions";


export const PlayerTeam = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(getPlayerTeam());
    }, [userInfo.user])


    if(userInfo.error){
        return(
            <div>
                <b>Произошла ошибка</b><br/>
                {userInfo.errorMessage}<br/>
                Возможно вы не авторизованы или не в команде. Авторизируйтесь, получите приглашение или <NavLink id="navlink" to="/team/create-team/">создайте свою команду</NavLink>
            </div>
        )
    }

    let teamStructure = ""
    if (Object.keys(userInfo.teamInfo).length !== 0 && userInfo.teamInfo.name.length !== 0){
        teamStructure = Object.values(userInfo.teamInfo.members).map((member) =>
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


    if (userInfo.teamInfo && Object.keys(userInfo.teamInfo).length !== 0){
        return(
            <div className="container-fluid">
                <div className="row text-center">
                    <h3><b>{userInfo.teamInfo.name}</b></h3> 
                </div>
                <div className="row">
                    <div className="col-xl-3 col-sm-4 text-center">
                        <img className="rounded" height="250px" width="250px" src={userInfo.teamInfo.logo}></img>
                    </div>
                    <div className="col-xl-3 col-sm-3">
                        <div className="text-center">Состав команды</div>
                        <ul className="list-group list-group-flush">
                            {teamStructure}
                        </ul>
                    </div>
                    <div className="col-xl-4 col-sm-5">
                        {
                            userInfo.user.captain
                            ?
                            <div>
                                <InviteToTeamForm/>
                                <hr/>
                                <RemoveFromTeamForm/>
                                <hr/>
                                <ChangeCaptainForm/>
                                <hr/>
                                <ChangeTeamNameForm/>
                            </div>
                            :
                            <button className="btn btn-outline-secondary btn-warning" onClick={() => dispatch(leaveFromTeam())}>Выйти из команды</button>
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


