const initialState = {
    loggedIn: false,
    error: false,
    errorMessage: '',
    user: {}
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
                user: {}
            }
        case "ERROR":
            return{
                ...state,
                error: true,
                errorMessage: action.payload.error
            }
        default:
            return state
    }
}