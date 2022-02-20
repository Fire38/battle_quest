import axiosInstance from "../../axiosApi";


export const loginUser = (payload) => ({ type: "LOGIN_USER", payload });

export const logoutUser = () => ({ type: "LOGOUT" });

export const loginError = (error) => ({ type: "ERROR", error });

export const getInviteListSuccess = (payload) => ({type: "GET_INVITE_LIST_SUCCESS", payload})

export const getInviteListError = (error) => ({type: "GET_INVITE_LIST_ERROR", error})

export const getUserTeamInfoSuccess = (payload) => ({type: "GET_USERS_TEAM_INFO_SUCCESS", payload})

export const getUserTeamInfoError = (payload) => ({type: "GET_USERS_TEAM_INFO_ERROR", error})


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


export const getUserTeamInfo = () => async dispatch => {
    try{
        const res = await axiosInstance.get("/core/get_user_team/")
        dispatch(getUserTeamInfoSuccess(res.data))
    }catch(error){
        dispatch(getUserTeamInfoError(error.message))
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
    }catch(error){
        console.log(error)
    }
}