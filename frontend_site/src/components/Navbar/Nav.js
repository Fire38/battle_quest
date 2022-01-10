import React from "react";
import { NavLink } from "react-router-dom";

import  Logo  from "../../../static/img/logo.png"


export const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src={ Logo } style={{'height': '48px', 'weight': '48px'}}/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                </ul>
                <form className="d-flex">
                    <input className="form-control me-2" type="text" placeholder="Введите логин" aria-label="login"/>
                    <input className="form-control me-2" type="password" placeholder="Введите пароль" aria-label="password"/>
                    <button className="btn btn-outline-success" type="submit">Войти</button>
                    <button className="btn btn-outline-success" type="submit">Зарегистрироваться</button>
                </form>
                </div>
            </div>
            </nav>
    )
}