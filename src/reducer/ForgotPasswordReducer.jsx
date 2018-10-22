import {CLEAR_FORGOT_PASSWORD_USERNAME, SAVE_FORGOT_PASSWORD_USERNAME} from "../action/constant/ActionTypes";

const initialState = {username:''};

const forgotPasswordUsername = (state=initialState, action) => {
    switch (action.type){
        case SAVE_FORGOT_PASSWORD_USERNAME:
            return {
                ...state,
                username:action.payload
            };
        case CLEAR_FORGOT_PASSWORD_USERNAME:
            return {
                ...state,
                username:''
            };
        default:
            return state;
    }
};

export default forgotPasswordUsername;