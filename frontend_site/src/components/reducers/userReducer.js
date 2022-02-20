const initialState = {
    loggedIn: false,
    error: false,
    errorMessage: '',
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
            return{
                ...state,
                loggedIn: false,
                user: {}
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
                invites: action.payload
            }
        case "GET_INVITE_LIST_ERROR":
            return{
                ...state,
                error: true,
                errorMessage: action.payload
            }
        case "GET_USERS_TEAM_INFO_SUCCESS":
            return{
                ...state,
                teamInfo: action.payload
            }
        case "GET_USERS_TEAM_INFO_ERROR":
            return{
                ...state,
                error: true,
                errorMessage: action.payload
            }
        default:
            return state
    }
}