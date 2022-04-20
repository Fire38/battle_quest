import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';

import { logoutUser } from "../actions/userActions";




export const MobileNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    const handleStateChange = () =>{
        setMenuOpen(menuOpen)
    }


    return(
        <div className="d-block d-sm-none" id="forHumburgerMenu">
            <Menu 
                right 
                noOverlay
                width={ '70%' }
                isOpen={menuOpen}
                onStateChange={() => handleStateChange()}
                >
                {
                    user.loggedIn
                    ?
                    ""
                    :
                    <li className="nav-item text-center text-bold text-warning" onClick={handleLogout}>
                        <NavLink to="login" className="nav-link text-bold text-warning">Войти</NavLink>
                    </li>
                }
                
                <li className="nav-item text-center">
                    <NavLink to="games" className="nav-link text-bold text-warning">Игры</NavLink>
                </li>
                <li className="nav-item text-center">
                    <NavLink to="team" className="nav-link text-bold text-warning">Команда</NavLink>
                </li>
                <li className="nav-item text-center">
                    <NavLink to="profile" className="nav-link text-bold text-warning">Профиль</NavLink>
                </li>
                {
                    user.loggedIn
                    ?
                    <li className="nav-item text-center text-bold text-warning" onClick={handleLogout}>
                        Выйти
                    </li>
                    :
                    ""
                }
            </Menu>
        </div>
    )
}