import axiosInstance from "../../axiosApi";


export const loginUser = (payload) => ({ type: "LOGIN_USER", payload });

export const logoutUser = () => ({ type: "LOGOUT" });

export const loginError = (error) => ({ type: "ERROR", error });

export const getInviteListSuccess = (payload) => ({type: "GET_INVITE_LIST_SUCCESS", payload})

export const getInviteListError = (payload) => ({type: "GET_INVITE_LIST_ERROR", payload})

export const getPlayerTeamSuccess = (payload) => ({type: "GET_PLAYER_TEAM_SUCCESS", payload})

export const getPlayerTeamError = (payload) => ({type: "GET_PLAYER_TEAM_ERROR", payload})

export const leaveTeam = () => ({type: "LEAVE_TEAM"})

export const failureInviteRequest = (error) => ({type: "FAILURE_INVITE", error})

export const fetchUser = (userInfo) => async dispatch => {
    try{
        const res = await axiosInstance.post("/auth/token/obtain/", {
            username: userInfo.username,
            password: userInfo.password
        });
        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + res.data.access;
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        dispatch(autoLogin());
        return res
    }catch(error){
        dispatch(loginError(error.message));
    }
}


export const registerUser = (userInfo) => async dispatch => {
    try{
        const res = await axiosInstance.post("/auth/user/create/", {
            username: userInfo.username,
            password: userInfo.password
        });
        if (res.status === 201){
            const res = await axiosInstance.post("auth/token/obtain/", {
                username: userInfo.username,
                password: userInfo.password
            });
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + res.data.access
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            dispatch(autoLogin())
            return res.data
        }
    } catch(error) {
        console.log("Ошибка регистрации ", error)
    }
}


export const autoLogin = () => async dispatch => {
    try{
        // { skipAuthRefresh: true } было передано как аргумент, попробуем без него
        const res = await axiosInstance.get("auth/get_user/")
        dispatch(loginUser(res.data))
    }catch(error){
        console.log('auloLogin ', error)
    }
}


export const getInviteList = () => async dispatch => {
    try{
        const res = await axiosInstance.get("/core/invites/")
        dispatch(getInviteListSuccess(res.data))
    }catch(error){
        dispatch(getInviteListError(error.message))
    }
}


export const acceptInvite = (teamId) => async dispatch => {
    try{
        const res = await axiosInstance.post("/core/invites/", {
            teamId: teamId,
        })
        if (res.status === 200){
            dispatch(getInviteList())
        }
    }catch(error){
        console.log(error)
    }
}

export const leaveFromTeam = () => async dispatch => {
    try{
        const res = await axiosInstance.post("/core/leave_from_team/");
        if (res.status === 200){
            //console.log("отработал3")

            dispatch(leaveTeam())
            dispatch(getPlayerTeam())

        }
    }catch(error){
        console.log(error)
    }
}


export const inviteToTeam = (invitedPlayer) => async dispatch => {
    try{
        const res = await axiosInstance.post("/core/invite_to_team/", {
            invitedPlayer: invitedPlayer
        })
    }catch(error){
        console.log(error.response.data)
        dispatch(failureInviteRequest(error.response.data.message))
    }
}


export const removeFromTeam = (removedPlayer) => async dispatch => {
    try{
        const res = await axiosInstance.post("/core/remove_from_team/", {
            removedPlayer: removedPlayer
        })
    }catch(error){
        console.log(error)
    }
}




export const changeCaptain = (assignedPlayer) => async dispatch => {
    try{
        const res = await axiosInstance.post("/core/change_captain/", {
            assignedPlayer: assignedPlayer
        })
        if (res.status === 200){
            const res = await axiosInstance.get("/core/get_player_team/")
            dispatch(getPlayerTeamSuccess(res.data))
            dispatch(autoLogin());
        }
    }catch(error){
        console.log(error)
    }
}


export const changeTeamName = (newTeamName) => async dispatch => {
    try{
        const res = await axiosInstance.post("/core/change_team_name/", {
            newTeamName: newTeamName
        })
        if (res.status === 200){
            const res = await axiosInstance.get("/core/get_player_team/")
            dispatch(getPlayerTeamSuccess(res.data))
        }
    }catch(error){
        console.log(error)
    }
}


export const getPlayerTeam = () => async dispatch => {
    try{
        const res = await axiosInstance.get("/core/get_player_team/")
        dispatch(getPlayerTeamSuccess(res.data))
    }catch(error){
        dispatch(getPlayerTeamError(error.message))
    }
}