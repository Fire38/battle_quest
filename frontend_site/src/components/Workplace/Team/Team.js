import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import { TeamList } from "./TeamList";
import { PlayerTeam } from "./PlayerTeam";
import { PlayerInvites } from "./PlayerInvites";
import { TeamPage } from "./TeamPage";
import { CreateTeamForm } from "./TeamForms/CreateTeamForm";



export const Team = () => {
    return (
        <div className="row">
            <div className="col-2">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link inactive")}  to="my-team/" id="navlink">
                            Моя команда
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink className="nav-link" to="my-invities/" id="navlink">
                            Приглашения
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink className="nav-link" to="all-teams/" id="navlink">
                            Все команды
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-10">
                <Routes>
                    <Route path="/my-team/" element={ <PlayerTeam/> }/>
                    <Route path="/my-invities/" element={ <PlayerInvites/> }/>
                    <Route path="/all-teams/" element={ <TeamList/> }/>
                    <Route path="/:teamId/" element={ <TeamPage/> }/>
                    <Route path="/create-team/" element={ <CreateTeamForm/> }/>

                </Routes>
            </div>
        </div>
    )
}