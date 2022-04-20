import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchUser } from "../actions/userActions";


export const LoginForm = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer)
    const navigate = useNavigate();


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

    if (userInfo.loggedIn){
        console.log(userInfo.loggedIn)
        navigate("/");
    }


    return(
        <div>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Введите логин" 
                aria-label="Recipient's username" 
                aria-describedby="button-addon2"
                name="username"
                onChange={handleChange}
            />
            <input 
                type="password" 
                className="form-control" 
                placeholder="Введите пароль" 
                aria-label="Recipient's username" 
                aria-describedby="button-addon2"
                name="password"
                onChange={handleChange}
            />
            <button className="btn btn-outline-dark btn-warning" type="submit"  onClick={handleLogin}>Войти</button>
        </div>
    )
}