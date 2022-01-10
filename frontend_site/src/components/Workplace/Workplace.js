import React from "react";
import { Routes, Route } from "react-router-dom";


import { Games } from "./Games/Games";
import { Team } from "./Team/Team";
import { Profile } from "./Profile/Profile";


export const Workplace = () => {
    return (
        <div className="container-fluid" id="workplace">
            <Routes>
                <Route path='*' element={ <Games/> }/>
                <Route path='/games/*' element={ <Games/> }/>
                <Route path='/team/*' element={ <Team/> }/>
                <Route path='/profile' element={ <Profile/> }/>
            </Routes>
        </div>
    )
}