import {FIND_ALL_BY_TYPE} from "./constant/ActionTypes";

export const storeRestUrl = (restUrl)=>{
    return {
        type : FIND_ALL_BY_TYPE,
        payload : restUrl
    }
};