import {DELETE_USER_SESSION, USER_SESSION} from "../action/constant/ActionTypes";

let initialState = {username:'',token:''};

const getUserSession = (state = initialState, action)=>{
    switch (action.type){
        case USER_SESSION:
            return {
                ...state,
                username:action.payload.username,
                token:action.payload.token,
                roles:action.payload.roles
            };
        case DELETE_USER_SESSION:
            return {
                ...state,
                username:'',
                token:'',
                roles:[]
            };
        default:
            return state;
    }
};

export default getUserSession;