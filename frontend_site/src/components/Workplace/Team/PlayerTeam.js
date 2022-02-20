import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserTeamInfo } from "../../actions/userActions";


export const PlayerTeam = () => {
    const dispatch = useDispatch();
    const teamInfo = useSelector(state => state.userReducer.teamInfo)
    const userInfo = useSelector(state => state.userReducer.user)

    useEffect(() => {
        dispatch(getUserTeamInfo())
    }, [])
    console.log(teamInfo)


    if (teamInfo.team !== false ){
        return(
            <div className="container-fluid">
                <div className="row">
                        <h3>{teamInfo.name}</h3> 
                </div>
                <div className="row">
                    <div className="col-3">
                        <img height="250px" width="250px" src={teamInfo.logo}></img>
                    </div>
                    <div className="col-3">
                        Состав команды
                    </div>
                    <div className="col-4">
                    {
                        userInfo.captain  
                        ?
                        <div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Введите id или ник игрока" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                                <button className="btn btn-outline-secondary btn-warning" type="button" id="button-addon2">Пригласить в команду</button>
                            </div>
    
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Введите id или ник игрока" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                                <button className="btn btn-outline-secondary btn-warning" type="button" id="button-addon2">Выгнать из команды</button>
                            </div>
    
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Введите id или ник игрока" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                                <button className="btn btn-outline-secondary btn-warning" type="button" id="button-addon2">Назначить капитаном</button>
                            </div>
    
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Введите новое название команды" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                                <button className="btn btn-outline-secondary btn-warning" type="button" id="button-addon2">Переименовать команду</button>
                            </div>
                            <button className="btn btn-danger btn-sm">Распустить команду</button>
                        </div>
                        :
                        ""
                    }
                    </div>
                </div>

                   
            </div>
        )
    } else{
        return(
            <div>
                Вы не в команде, получите приглашение или создайте свою команду
            </div>
        )
    }


}