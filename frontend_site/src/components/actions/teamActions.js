import axiosInstance from "../../axiosApi";


const getTeamListSuccess = (payload) => ({type: "GET_TEAM_LIST_SUCCESS", payload})

const getTeamListError = (error) => ({type: "GET_TEAM_LIST_ERROR", error})


export const getTeamList = () => async dispatch => {
    try{
        const res = await axiosInstance.get("/core/teams/")
        dispatch(getTeamListSuccess(res.data))
    }catch(error){
        getTeamListError(error.message)
    }
}