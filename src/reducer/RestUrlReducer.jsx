import {FIND_ALL_BY_TYPE} from "../action/constant/ActionTypes";

const getStoredRestUrl = (state = null, action)=>{
    switch (action.type){
        case FIND_ALL_BY_TYPE:
            return action.payload;
        default:
            return state;
    }
};

export default getStoredRestUrl;