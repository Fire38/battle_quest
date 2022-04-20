import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Nav } from "../Navbar/Nav";
import { GamesPage } from "./Games/GamesPage";
import { Team } from "./Team/Team";
import { Profile } from "./Profile/Profile";
import { LoginForm } from "./mobileLogin";


export const Workplace = () => {
    return (
        <div>
            <Nav/>
            <div className="container-fluid" id="workplace">
                <Routes>
                    <Route path="*" element={ <GamesPage/> }/>
                    <Route path="/games/*" element={ <GamesPage/> }/>
                    <Route path="/team/" element={<Navigate to="/team/my-team/" />}/>
                    <Route path="/team/*" element={ <Team/> }/>
                    <Route path="/profile/" element={ <Profile/> }/>
                    <Route path="/login/" element={ <LoginForm/> }/>
                </Routes>
            </div>
        </div>
    )
}