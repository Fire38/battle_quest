const initialState = {
    loggedIn: false,
    error: false,
    errorMessage: '',
    user: {},
    invites: {}
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
        default:
            return state
    }
}