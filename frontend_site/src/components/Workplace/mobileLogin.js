import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser, fetchUser } from "../actions/userActions";


export const LoginForm = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer)
    const navigate = useNavigate();

    const notify = (text) => toast(text);

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(fetchUser(user));
    }

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(registerUser(user))
        userInfo.error ? notify(userInfo.errorMessage) : notify("Регистрация пользователя прошла успешно")
        
    }

    if (userInfo.loggedIn){
        navigate("/");
    }

    return(
        <div>
            <input 
                type="text" 
                className="form-control mb-2" 
                placeholder="Введите логин" 
                aria-label="Recipient's username" 
                aria-describedby="button-addon2"
                name="username"
                onChange={handleChange}
            />
            <input 
                type="password" 
                className="form-control mb-2" 
                placeholder="Введите пароль" 
                aria-label="Recipient's username" 
                aria-describedby="button-addon2"
                name="password"
                onChange={handleChange}
            />
            <button className="btn btn-outline-dark btn-warning col-12 mb-2" type="submit"  onClick={handleLogin}>Войти</button>
            <button className="btn btn-outline-dark btn-warning col-12" type="submit" onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    )
}