import React, { useEffect } from "react";
import { getInviteList, acceptInvite } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";


export const PlayerInvites = () => {
    const dispatch = useDispatch();
    const invites = useSelector(state => state.userReducer.invites)

    useEffect(() => {
        dispatch(getInviteList())
    }, [])

    const accept = (teamId) => {
        dispatch(acceptInvite(teamId))
    }

    let inviteList = Object.values(invites).map((invite) =>
        <li className="list-group-item" key={invite.team.id}>
            { invite.team.name }
            <button className="btn btn-warning btn-sm" onClick={() => accept(invite.team.id)}>Вступить в команду</button>
        </li>
    )


    return(
        <div>
            <h3>Приглашения в команду</h3>
            <ul className="list-group">
                { inviteList }
            </ul>
        </div>
    )
}