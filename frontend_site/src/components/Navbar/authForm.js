import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerUser, fetchUser } from "../actions/userActions";


export const AuthForm = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(registerUser(user));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(fetchUser(user));
    }

    return(
        <form className="d-flex">
            <input 
                className="form-control me-2" 
                type="text" 
                placeholder="Введите логин" 
                aria-label="login"
                name="username"
                onChange={handleChange}/>
            <input 
                className="form-control me-2" 
                type="password" 
                placeholder="Введите пароль" 
                aria-label="password"
                name="password"
                onChange={handleChange}/>
            <button className="btn btn-outline-success" type="submit" onClick={handleLogin}>Войти</button>
            <button className="btn btn-outline-success" type="submit" onClick={handleRegister}>Зарегистрироваться</button>
        </form>
    )

}


