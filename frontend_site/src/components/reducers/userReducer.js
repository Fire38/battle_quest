import axiosInstance from "../../axiosApi"

const initialState = {
    loggedIn: false,
    error: false,
    errorMessage: "",
    user: {},
    invites: {},
    teamInfo: {}
}


export const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOGIN_USER":
            return{
                ...state,
                loggedIn: true,
                user: {...action.payload}
            }
        case "LOGOUT":
            localStorage.clear()
            // https://github.com/nuxt-community/auth-module/issues/57
            axiosInstance.defaults.headers["Authorization"] = null
            return{
                ...state,
                loggedIn: false,
                user: {},
                invites: {}
            }
        case "ERROR":
            return{
                ...state,
                error: true,
                errorMessage: action.payload.error
            }
        case "GET_INVITE_LIST_SUCCESS":
            return{
                ...state,
                invites: action.payload,
                error: false
            }
        case "GET_INVITE_LIST_ERROR":
            return{
                ...state,
                error: true,
                errorMessage: action.payload
            }
        case "GET_PLAYER_TEAM_SUCCESS":
            return{
                ...state,
                error: false,
                teamInfo: action.payload
            }
        case "GET_PLAYER_TEAM_ERROR":
            return{
                ...state,
                error: true,
                errorMessage: action.payload
            }
        default:
            return state
    }
}