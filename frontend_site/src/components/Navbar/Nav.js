import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { MobileNav } from "./mobileNav";
import { AuthForm } from "./authForm";
import { logoutUser } from "./../actions/userActions";
import  Logo  from "../../../static/img/logo.png";



export const Nav = () => {
    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const greeting = "Привет, " + user.user.username +"!"

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark d-none d-xl-block">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img src={ Logo } style={{'height': '48px', 'weight': '48px'}}/></a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="games" id="navlink">
                                    Игры
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="team" id="navlink">
                                    Команда
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="profile" id="navlink">
                                    Профиль
                                </NavLink>
                            </li>
                            {
                                user.loggedIn 
                                ?
                                <li className="nav-item nav-link" id="navlink" onClick={handleLogout}>
                                    Выйти
                                </li>
                                :
                                ""
                            }
                        </ul>
                        { 
                            user.loggedIn 
                            ?  
                            greeting
                            : 
                            <AuthForm/>
                        }
                    </div>
                </div>
            </nav>

                <MobileNav/>



        </div>
    )
}