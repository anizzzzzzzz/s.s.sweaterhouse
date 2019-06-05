import {DELETE_USER_SESSION, USER_SESSION} from "./constant/ActionTypes";

export const createUserSession = (user)=>{
    return {
        type : USER_SESSION,
        payload: user
    }
};

export const deleteUserSession = ()=>{
    return {
        type: DELETE_USER_SESSION
    }
};