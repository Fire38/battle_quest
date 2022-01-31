const initialState = {
    teams: {},
    errorMessage: ""
}


export const teamReducer = (state=initialState, action) => {
    switch(action.type){
        case "GET_TEAM_LIST_SUCCESS":
            return{
                ...state,
                teams: {...action.payload}
            }
        case "GET_TEAM_LIST_ERROR":
            return{
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }
}