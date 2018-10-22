import {CLEAR_FORGOT_PASSWORD_USERNAME, SAVE_FORGOT_PASSWORD_USERNAME} from "./constant/ActionTypes";

export const saveForgotPasswordUsername = (username)=> {
    return {
        type : SAVE_FORGOT_PASSWORD_USERNAME,
        payload : username
    }
};

export const clearForgotPasswordUsername = () => {
    return {
        type : CLEAR_FORGOT_PASSWORD_USERNAME
    }
};