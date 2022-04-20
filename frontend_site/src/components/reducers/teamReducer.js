const initialState = {
    teamsList: {},
    teamInfo: "",
    error: false,
    errorMessage: ""
}


export const teamReducer = (state=initialState, action) => {
    switch(action.type){
        case "GET_TEAM_LIST_SUCCESS":
            return{
                ...state,
                teamsList: {...action.payload},
                error: false
            }
        case "GET_TEAM_LIST_ERROR":
            return{
                ...state,
                error: true,
                errorMessage: action.payload
            }
        case "GET_TEAM_INFO_SUCCESS":
            return{
                ...state,
                error: false,
                errorMessage: "",
                teamInfo: action.payload,

            }
        case "GET_TEAM_INFO_ERROR":
            return{
                ...state,
                error: true,
                errorMessage: action.payload
            }
        case "RESET_ERROR":
            console.log('RESET')
            return{
                ...state,
                error: false,
                errorMessage: ""
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