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
        dispatch(logoutUser());
        closeMenu();
    }

    const handleStateChange = (state) =>{
        setMenuOpen(state.isOpen)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }


    return(
        <div className="d-block d-sm-none" id="forHumburgerMenu">
            <Menu 
                right 
                noOverlay
                width={ '100%' }
                isOpen={menuOpen}
                onStateChange={(state) => handleStateChange(state)}
                >
                {
                    user.loggedIn
                    ?
                    ""
                    :
                    <li className="nav-item text-center text-bold text-warning" onClick={handleLogout}>
                        <NavLink to="login" className="nav-link text-bold text-warning" onClick={() =>closeMenu()}>Вход/Регистрация</NavLink>
                    </li>
                }
                
                <li className="nav-item text-center">
                    <NavLink to="games" className="nav-link text-bold text-warning" onClick={() =>closeMenu()}>Игры</NavLink>
                </li>
                <li className="nav-item text-center">
                    <NavLink to="team" className="nav-link text-bold text-warning" onClick={() => closeMenu()}>Команда</NavLink>
                </li>
                <li className="nav-item text-center">
                    <NavLink to="profile" className="nav-link text-bold text-warning" onClick={() => closeMenu()}>Профиль</NavLink>
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