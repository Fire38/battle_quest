import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerUser } from "../actions/userActions";


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

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser(user));
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
            <button className="btn btn-outline-success" type="submit">Войти</button>
            <button className="btn btn-outline-success" type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
        </form>
    )

}


