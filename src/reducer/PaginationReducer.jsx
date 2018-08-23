import {TRACK_PAGINATION} from "../action/constant/ActionTypes";

const trackingPagination = (state=0, action)=>{
    switch(action.type){
        case TRACK_PAGINATION:
            return action.payload;
        default:
            return state;
    }
};

export default trackingPagination;