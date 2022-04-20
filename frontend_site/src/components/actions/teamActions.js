import axiosInstance from "../../axiosApi";


const getTeamListSuccess = (payload) => ({type: "GET_TEAM_LIST_SUCCESS", payload})

const getTeamListError = (payload) => ({type: "GET_TEAM_LIST_ERROR", payload})

export const getTeamInfoSuccess = (payload) => ({type: "GET_TEAM_INFO_SUCCESS", payload})

export const getTeamInfoError = (payload) => ({type: "GET_TEAM_INFO_ERROR", payload})

export const resetError = (payload) => ({type: "RESET_ERROR"})

export const getPlayerTeamSuccess = (payload) => ({type: "GET_PLAYER_TEAM_SUCCESS", payload})

export const getPlayerTeamError = (payload) => ({type: "GET_PLAYER_TEAM_ERROR", payload})



export const getTeamList = () => async dispatch => {
    try{
        const res = await axiosInstance.get("/core/teams_list/")
        dispatch(getTeamListSuccess(res.data))
    }catch(error){
        dispatch(getTeamListError(error.message))
    }
}


export const getTeamInfo = (teamId) => async dispatch => {
    try{
        const res = await axiosInstance.get(`/core/get_team/${teamId}/`)
        dispatch(getTeamInfoSuccess(res.data))

    }catch(error){
        if (error.response.status === 400){
            dispatch(getTeamInfoError("Авторизуйтесь, чтобы увидеть информацию о команде"))
        }else if (error.response.status === 404){
            dispatch(getTeamInfoError("Вы не в команде, примите приглашение или создайте свою команду"))
        }
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

