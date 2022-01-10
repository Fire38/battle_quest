import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";


export const Team = () => {
    return (
        <div className="row">
            <div className="col-2">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <NavLink className="nav-link font-weight-bold text-white" to="my-team">
                            Моя команда
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink className="nav-link font-weight-bold text-white" to="my-invities">
                            Приглашения
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink className="nav-link font-weight-bold text-white" to="all-teams">
                            Все команды
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-10">
                <Routes>
                    <Route path="/my-team" element={ <div>Моя команда</div> }/>
                    <Route path="/my-invities" element={ <div>Мои приглашения</div> }/>
                    <Route path="/all-teams" element={ <div>Все команды</div> }/>
                </Routes>
            </div>
        </div>
    )
}