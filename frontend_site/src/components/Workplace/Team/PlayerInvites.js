import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getInviteList, acceptInvite } from "../../actions/userActions";


export const PlayerInvites = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(getInviteList())
    }, [user.loggedIn])


    const accept = (teamId) => {
        dispatch(acceptInvite(teamId))
    }

    if (user.error){
        return(
            <div>
                <b>Произошла ошибка, возможно вы не авторизированы</b><br/>
                {user.errorMessage}
            </div>
        )
    }


    let inviteList = ""
    if (Object.values(user.invites).length > 0){
        inviteList = Object.values(user.invites).map((invite) =>
            <li className="list-group-item" key={invite.team.id}>
                {invite.team.name}
                <button className="btn btn-warning btn-sm" onClick={() => accept(invite.team.id)}>Вступить в команду</button>
            </li>
            )
        }else{
            inviteList = <div>Список приглашений пуст</div>
        }




    return (
        <div>
            <h3 className="text-center">Приглашения в команду</h3>
            <ul className="list-group">
                {inviteList}
            </ul>
        </div>
    )
}