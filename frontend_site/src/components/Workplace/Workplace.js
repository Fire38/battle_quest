import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Nav } from "../Navbar/Nav";
import { GamesPage } from "./Games/GamesPage";
import { Team } from "./Team/Team";
import { Profile } from "./Profile/Profile";
import { LoginForm } from "./mobileLogin";

import { ToastContainer, toast } from 'react-toastify';


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
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    toastStyle={{ backgroundColor: "#212529", color:"gold" }}
                />
            </div>

        </div>
    )
}