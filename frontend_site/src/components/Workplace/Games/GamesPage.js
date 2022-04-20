import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import { GamesList } from "./GamesList";


export const GamesPage = () => {
    return (
        <div className="row">
            <div className="d-none d-xl-block col-xl-2">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <NavLink className="nav-link font-weight-bold" to="all-games" id="navlink">
                            Все игры
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink className="nav-link font-weight-bold" to="my-games" id="navlink">
                            Мои игры
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink className="nav-link font-weight-bold" to="old-games" id="navlink">
                            Прошедшие игры
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="d-xl-none d-sm-block col-xs-12">
                <ul className="row list-group list-group-horizontal">
                    <li className="col-4 list-group-item text-center">
                        <NavLink className="nav-link font-weight-bold" to="all-games" id="navlink">
                            Все игры
                        </NavLink>
                    </li>
                    <li className="col-4 list-group-item text-center">
                        <NavLink className="nav-link font-weight-bold" to="my-games" id="navlink">
                            Мои игры
                        </NavLink>
                    </li>
                    <li className="col-4 list-group-item text-center">
                        <NavLink className="nav-link font-weight-bold" to="old-games" id="navlink">
                            Прошедшие игры
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-10">
                <Routes>
                    <Route path="/all-games" element={ <GamesList/> }/>
                    <Route path="/my-games" element={ <div>Мои игры</div> }/>
                    <Route path="/old-games" element={ <div>Прошедшие игры</div> }/>
                </Routes>
            </div>
        </div>
    )
}